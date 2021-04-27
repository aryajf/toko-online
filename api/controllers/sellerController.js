const {Barang, Cart, User, Pembayaran} = require('../models')
const { Op } = require("sequelize");
const validatorMessage = require('../config/validatorMessage')
const Validator = require('fastest-validator')
const fs = require('fs')
const path = require('path')
const sharp = require('sharp');
const { isError } = require('util');
const directory = path.join(__dirname, '../public/images/buktiPembayaran/')

module.exports = {
    getPending: async (req, res) => {
        const pending = await Pembayaran.findAll({include: [{
            model: Cart,
            as: 'cart',
            include : [{model : Barang, as: 'barang'},{model : User, as: 'user'}] // nested association
        }], where : {status : 'pending'}})
        
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
    getAccepted: async (req, res) => {
        const accepted = await Pembayaran.findAll({include: [{
            model: Cart,
            as: 'cart',
            include : [{model : Barang, as: 'barang'},{model : User, as: 'user'}] // nested association
        }], where : {status : 'accepted'}})
        
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
        const accepted = await Pembayaran.findAll({include: [{
            model: Cart,
            as: 'cart',
            include : [{model : Barang, as: 'barang'},{model : User, as: 'user'}] // nested association
        }], where : {kode :req.params.kode, status : 'pending'}})

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
                        kode: req.params.kode
                    }
                })

                res.json({
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