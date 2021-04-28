const {Barang, Cart, User, Pembayaran} = require('../models')
const bcrypt = require('bcrypt')
const { JWT_SECRET, JWT_SECRET_EXPIRES } = process.env
const jwt = require('jsonwebtoken')
const { Op } = require("sequelize");
const validatorMessage = require('../config/validatorMessage')
const Validator = require('fastest-validator')
const fs = require('fs')
const path = require('path')
const sharp = require('sharp');
const directory = path.join(__dirname, '../public/images/buktiPembayaran/')

module.exports = {
    login: async (req, res) => {
        const userRequest = {
            email: req.body.email,
            password: req.body.password
        }
        if(userValidation(userRequest, req.url) == null){
            let user = await User.findOne({where : {email: req.body.email}})
            if(!user) res.status(404).json({email: req.body.email, message: 'User tidak terdaftar', status: false})
            if(!verifyPassword(req.body.password, user.password)) res.status(400).json({message: 'Kombinasi email dan password gk sesuai', status: false})

            const token = jwt.sign(user.toJSON(), JWT_SECRET, {
                expiresIn : JWT_SECRET_EXPIRES
            })

            if(user.role == 'Admin'){
                res.status(200).json({
                    data: {
                        id:user._id,
                        name : user.name,
                    },
                    message : 'Berhasil Login',
                    request : {
                        method : req.method,
                        url : process.env.BASE_URL + '/login'
                    },
                    status : true,
                    token : token
                })
            }else{res.status(404).json({message : 'User tidak ditemukan', status: false})}
        }else{res.status(404).json({message : 'User tidak ditemukan', status: false})}
    },
    getUsers: async (req, res) => {
        const users = await User.findAll({where : {
            role : 'User'
        }})
        
        if(users.length != 0){
            res.json({
                users: users,
                request : {
                    method: req.method,
                    url: process.env.BASE_URL + '/barang/users'
                },
                status: true
            })
        }else{res.status(404).json({message : 'User tidak ditemukan', status: false})}
    },
    getPending: async (req, res) => {
        const pending = await Pembayaran.findAll({include: [{
            model: Cart,
            as: 'cart',
            include : [{model : Barang, as: 'barang'},{model : User, as: 'user'}] // nested association
        },{
            model: User,
            as: 'user',
        }], where : {status : 'pending'}, order: [['updatedAt', 'DESC']]})
        
        if(pending.length != 0){
            res.json({
                pending: pending,
                request : {
                    method: req.method,
                    url: process.env.BASE_URL + '/barang/pending'
                },
                status: true
            })
        }else{res.status(404).json({message : 'Data tidak ditemukan', status: false})}
    },
    getAccepted: async (req, res) => {
        const accepted = await Pembayaran.findAll({include: [{
            model: Cart,
            as: 'cart',
            include : [{model : Barang, as: 'barang'},{model : User, as: 'user'}] // nested association
        }], where : {status : 'accepted'},order: [['updatedAt', 'DESC']]})
        
        if(accepted.length != 0){
            res.json({
                accepted: accepted,
                request : {
                    method: req.method,
                    url: process.env.BASE_URL + '/barang/accepted'
                },
                status: true
            })
        }else{res.status(404).json({message : 'Data tidak ditemukan', status: false})}
    },
    setAccepted: async (req, res) => {
        const barang = await Barang.findAll()
        const accepted = await Pembayaran.findAll({include: [{
            model: Cart,
            as: 'cart',
            include : [{model : Barang, as: 'barang'},{model : User, as: 'user'}] // nested association
        }], where : {kode :req.body.kode, status : 'pending'}})

        let error = []

        if(accepted.length != 0){
            barang.map(item=>{
                accepted.map((result)=>{
                    result.cart.map((result)=>{
                        if(item.id == result.barang_id){
                            if(parseInt(result.stok) > item.stok){
                                error.push(parseInt(result.stok) > item.stok)
                                res.status(400).json({
                                    message : `Stok Barang ${result.barang.title} Habis`,
                                    request : {
                                        method: req.method,
                                        url: process.env.BASE_URL + '/barang/purchase'
                                    },
                                    status: false
                                })
                            }
                        }
                    })
                })
            })

            if(!error.includes(true)){
                barang.map(item=>{
                    accepted.map((result)=>{
                        result.cart.map((result)=>{
                            if(item.id == result.barang_id){
                                item.stok -= parseInt(result.stok)
                                Barang.update({ stok: item.stok }, {
                                    where: {
                                        id: item.id
                                    }
                                })
                            }
                        })
                    })
                })
                let AcceptingRequest = {
                    status : 'accepted'
                }
    
                await Pembayaran.update(AcceptingRequest, {
                    where: {
                        kode: req.body.kode
                    }
                })

                res.status(201).json({
                    message : 'Transaksi berhasil anda terima',
                    request : {
                        method: req.method,
                        url: process.env.BASE_URL + '/barang/accepted'
                    },
                    status: true
                })
            }
        }else{res.status(404).json({message : 'Pembayaran tidak ditemukan', status: false})}
    },
}

function userValidation(dataRequest, url){
    let schema
    if(url == '/register'){
        schema = {
            name: 'string|empty:false|required',
            email: 'email|empty:false',
            alamat: 'string|empty:false|required',
            phone: 'string|empty:false|required',
            password: 'string|empty:false|min:3',
            confirmPassword: { type: "equal", field: "password" }
        }
    }else if(url == '/profile'){
        schema = {
            name: 'string|empty:false|required',
            email: 'email|empty:false' }
    }else{
        schema = {
            email: 'email|empty:false',
            password: 'string|empty:false|min:3'
        }
    }

    const v = new Validator(validatorMessage)
    const validationResponse = v.validate(dataRequest, schema)
    if(validationResponse.length > 0){
        return {
            message: "Harap isi form dengan benar",
            errors: validationResponse
        }
    }
}

function verifyPassword(password, hashPassword){
    return bcrypt.compareSync(password, hashPassword)
}