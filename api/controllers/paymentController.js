const {Barang, Cart, User, Pembayaran} = require('../models')
const { Op } = require("sequelize");
const validatorMessage = require('../config/validatorMessage')
const Validator = require('fastest-validator')
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const directory = path.join(__dirname, '../public/images/buktiPembayaran/')

module.exports = {
    getUnpaid: async (req, res) => {
        const unpaid = await Pembayaran.findAll({include: [{
            model: Cart,
            as: 'cart',
            include : [{model : Barang, as: 'barang'}] // nested association
        }], where : {user_id : req.decoded.id, status : 'unpaid'}})
        
        if(unpaid.length != 0){
            res.json({
                unpaid: unpaid,
                request : {
                    method: req.method,
                    url: process.env.BASE_URL + '/barang/unpaid'
                },
                status: true
            })
        }
    },
    setUnpaid: async (req, res) => {
        const unpaid = await Cart.findAll({where : {user_id : req.decoded.id, status : 'cart'},include: [{
            model: User,
            as: 'user'
        },{
            model: Barang,
            as: 'barang'
        }]})

        if(unpaid.length != 0){
            req.body.total_harga = parseInt(req.body.total_harga)

            let kode = Math.random().toString(36).replace(/[^a-z]+/g, '')
            
            let requestCart = {
                kode : kode,
                status : 'unpaid',
            }

            unpaid.forEach(item => {
                item.update(requestCart)
            })
            
            let requestPembayaran = {
                kode : kode,
                total_harga : req.body.total_harga,
                user_id : req.decoded.id,
            }

            await Pembayaran.create(requestPembayaran)

            res.json({
                message : 'Barang Berhasil Ditambahkan, upload bukti pembayaran anda terlebih dahulu',
                request : {
                    method: req.method,
                    url: process.env.BASE_URL + '/barang/unpaid'
                },
                status: true
            })
        }else{res.status(404).json({message : 'Cart tidak ditemukan', status: false})}
    },
    getPending: async (req, res) => {
        const pending = await Pembayaran.findAll({include: [{
            model: Cart,
            as: 'cart',
            include : [{model : Barang, as: 'barang'}] // nested association
        }], where : {user_id : req.decoded.id, status : 'pending'}})
        
        if(pending.length != 0){
            res.json({
                pending: pending,
                request : {
                    method: req.method,
                    url: process.env.BASE_URL + '/barang/pending'
                },
                status: true
            })
        }
    },
    setPending: async (req, res) => {
        const pembayaran = await Pembayaran.findOne({where : {user_id : req.decoded.id, kode : req.body.kode}})
        if(pembayaran.length != 0){
            if(!req.file){
                res.status(400).json({
                    message: 'Harap isi form dengan benar',
                    errors: [{message: 'Foto Bukti wajib diisi'}]
                })
            }
            // Create Folder
            if(!fs.existsSync(directory)){
                fs.mkdirSync(directory);
            }

            // Create Path Upload
            const getFileName = req.file.originalname.split('.')[0]
            const unique = new Date().toISOString().replace(/[\/\\:]/g, "_")
            const extension = req.file.mimetype.split("/").pop()
            const fileName = getFileName + '-' + unique + '.' + extension
            const pathResult = directory + '/' + fileName

            let requestUnpaid = {
                foto_bukti : fileName,
                status : 'pending'
            }

            // Check File Exists
            const existsPath = directory + pembayaran.foto_bukti
            if(pembayaran.foto_bukti != null){
                if(fs.existsSync(existsPath)){
                    fs.unlinkSync(existsPath)
                }
            }
            
            await Pembayaran.update(requestUnpaid, {
                where: {
                    kode: req.body.kode
                }
            })

            sharp(req.file.buffer).resize(640,480).jpeg({
                quality: 80,
                chromeSubsampling: '4:4:4'
            }).toFile(pathResult)

            res.status(201).json({
                message: 'Bukti pembelian berhasil diupload, tunggu konfirmasi dari admin yaa :)',
                request: {
                    method: req.method,
                    url: process.env.BASE_URL + '/barang'
                },
                status: true
            })
        }else{res.status(404).json({message : 'Data tidak ditemukan', status: false})}
    },
    getAccepted: async (req, res) => {
        const accepted = await Pembayaran.findAll({include: [{
            model: Cart,
            as: 'cart',
            include : [{model : Barang, as: 'barang'}] // nested association
        }], where : {user_id : req.decoded.id, status : 'accepted'}})
        
        if(accepted.length != 0){
            res.json({
                accepted: accepted,
                request : {
                    method: req.method,
                    url: process.env.BASE_URL + '/barang/accepted'
                },
                status: true
            })
        }
    },
    setAccepted: async (req, res) => {
        const barang = await Barang.findAll()
        
        // barang.map(item=>{
        //     req.body.map(async (result)=>{
        //         if(item.id == result.id){
        //             if(parseInt(result.total) > item.id){
        //                 res.status(400).json({
        //                     message : `Stok Barang ${result.title} Habis`,
        //                     request : {
        //                         method: req.method,
        //                         url: process.env.BASE_URL + '/barang/purchase'
        //                     },
        //                     status: true
        //                 })
        //             }else{
        //                 item.total -= parseInt(result.total)
        //                 console.log(item.total);
        //                 await Barang.update({ total: item.total }, {
        //                     where: {
        //                         id: item.id
        //                     }
        //                 })
        //             }
        //         }
        //     })
        // })
        barang.map(item=>{
            req.body.map(async (result)=>{
                if(item.id == result.id){
                    item.stok -= parseInt(result.stok)
                    await Barang.update({ stok: item.stok }, {
                        where: {
                            id: item.id
                        }
                    })
                }
            })
        })
        res.json({
            message : 'Barang Berhasil Dibeli, Terima Kasih sudah belanja :)',
            request : {
                method: req.method,
                url: process.env.BASE_URL + '/barang/purchase'
            },
            status: true
        })
    },
}

function statusBarang(req, status){
    let data = {
        where : {
            user_id : req.decoded.id,
            status : status
        },
        include: [{
            model: User,
            as: 'user'
        },{
            model: Barang,
            as: 'barang'
        }]
    }

    return data;
}