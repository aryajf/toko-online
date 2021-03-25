const {Barang, User} = require('../models')
const { Op } = require("sequelize");
const validatorMessage = require('../config/validatorMessage')
const Validator = require('fastest-validator')
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const directory = path.join(__dirname, '../public/images/barang/')

module.exports = {
    index: async (req, res) => {
        const barang = await Barang.findAll({
            include: {
                model: User,
                as: 'user'
            }
        })
        if(barang.length != 0){
            res.json({
                barang: barang.map(barang => {
                    return{
                        id: barang.id,
                        title: barang.title,
                        description: barang.description,
                        total: barang.total,
                        cover: barang.cover,
                        createdAt: dateFormat(barang.createdAt),
                        updatedAt: dateFormat(barang.updatedAt),
                        user_id: barang.user.id,
                        user_name: barang.user.name,
                        user_email: barang.user.email,
                    }
                }),
                message: 'Barang berhasil ditampilkan',
                request: {
                    method: req.method,
                    url: process.env.BASE_URL + 'barang'
                },
                status: true
            })
        }else{res.status(404).json({message : 'Barang tidak ditemukan', status: false})}
    },
    show: async (req, res) => {
        const barang = await Barang.findOne({
            where : {
                id : req.params.id
            },
            include: {
                model: User,
                as: 'user'
            }
        })
        if(barang.length != 0){
            res.json({
                barang: {
                    id: barang.id,
                    title: barang.title,
                    description: barang.description,
                    total: barang.total,
                    cover: barang.cover,
                    createdAt: dateFormat(barang.createdAt),
                    updatedAt: dateFormat(barang.updatedAt),
                    user_id: barang.user.id,
                    user_name: barang.user.name,
                    user_email: barang.user.email,
                },
                message : 'Barang berhasil ditampilkan',
                request : {
                    method: req.method,
                    url: process.env.BASE_URL + 'barang'
                },
                status: true
            })
        }else{res.status(404).json({message : 'Barang tidak ditemukan', status: false})}
    },
    withUser: async (req, res) => {
        const barang = await Barang.findAll({
            where : {
                user_id : req.decoded.id
            }
        })
        if(barang.length != 0){
            res.json({
                barang: barang.map(barang => {
                    return{
                    id: barang.id,
                    title: barang.title,
                    description: barang.description,
                    total: barang.total,
                    cover: barang.cover,
                    createdAt: dateFormat(barang.createdAt),
                    updatedAt: dateFormat(barang.updatedAt),
                    }
                }),
                message : 'Barang berhasil ditampilkan',
                request : {
                    method: req.method,
                    url: process.env.BASE_URL + 'barang'
                },
                status: true
            })
        }else{res.status(404).json({message : 'Barang tidak ditemukan', status: false})}
    },
    store: async (req, res) => {
        if(!req.file){
            res.status(400).json({
                message: 'Harap isi form dengan benar',
                errors: [{message: 'Cover wajib diisi'}]
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

        req.body.total = parseInt(req.body.total)
        
        let requestBarang = {
            title : req.body.title,
            description : req.body.description,
            total : req.body.total,
            cover : fileName,
            user_id : req.decoded.id,
        }
        
        if(barangValidation(requestBarang, req.method) == null){
            let barang =  await Barang.create(requestBarang)
            sharp(req.file.buffer).resize(640,480).jpeg({
                quality: 80,
                chromeSubsampling: '4:4:4'
            }).toFile(pathResult)

            res.status(201).json({
                data: {
                    id: barang.id,
                    title: barang.title,
                },
                message: 'Barang berhasil ditambah',
                request: {
                    method: req.method,
                    url: process.env.BASE_URL + '/barang'
                },
                status: true
            })
        }else{
            res.status(400).send(barangValidation(requestBarang, req.method))
        }
    },
    update : async (req, res) => {
        const barang = await Barang.findOne({where : {id : req.params.id}})
        req.body.total = parseInt(req.body.total)

        if(req.file){
            // Create Path Upload
            const getFileName = req.file.originalname.split('.')[0]
            const unique = new Date().toISOString().replace(/[\/\\:]/g, "_")
            const extension = req.file.mimetype.split("/").pop()
            const fileName = getFileName + '-' + unique + '.' + extension
            const pathResult = directory + '/' + fileName

            let requestBarang = {
                title: req.body.title,
                description: req.body.description,
                total: req.body.total,
                cover: fileName
            }

            if(barangValidation(requestBarang, req.method) == null){
                if(barang.length != 0){
                    try{
                        // Check File Exists
                        const existsPath = directory + barang.cover
                        if(fs.existsSync(existsPath)){
                            fs.unlinkSync(existsPath)
                        }
                        barang.update(requestBarang)
                        sharp(req.file.buffer).resize(640,480).jpeg({
                            quality: 80,
                            chromeSubsampling: '4:4:4'
                        }).toFile(pathResult)
                        res.json({
                            data: {
                                id: barang.id,
                                title: barang.title,
                                total: barang.total,
                                description: barang.description,
                            },
                            message: 'barang berhasil diubah',
                            request: {
                                method: req.method,
                                url: process.env.BASE_URL + '/barang/' + req.params.id
                            },
                            status: true
                        })
                    }catch(err){
                        res.status(400).json({
                            error: err.message,
                            message: 'Barang gagal diupdate',
                            status: false
                        })
                    }
                }else{
                    res.status(404).json({message: 'Barang tidak ditemukan', status: false})
                }
            }else{
                res.status(400).send(barangValidation(requestBarang, req.method))
            }
        }else{
            let requestBarang = {
                title: req.body.title,
                total: req.body.total,
                description: req.body.description
            }

            if(barangValidation(requestBarang, req.method) == null){
                if(barang.length != 0){
                    try{
                        barang.update(requestBarang)
                        res.json({
                            data: {
                                id: barang.id,
                                title: barang.title,
                                total: barang.total,
                                description: barang.description,
                            },
                            message: 'Barang berhasil diubah',
                            request: {
                                method: req.method,
                                url: process.env.BASE_URL + '/barang/' + req.params.slug
                            },
                            status: true
                        })
                    }catch(err){
                        res.status(400).json({
                            error: err.message,
                            message: 'Barang gagal diubah',
                            status: false
                        })
                    }
                }else{
                    res.status(404).json({message: 'Barang tidak ditemukan', status: false})
                }
            }else{
                res.status(400).send(barangValidation(requestBarang, req.method))
            }
        }
    },
    delete : async (req, res) => {
        const barang = await Barang.findOne({where : {id : req.params.id}})
        const filePath = path.join(__dirname, '../public/images/barang/'+barang.cover)

        if(barang.length != 0){
            try{
                if(fs.existsSync(filePath)){
                    fs.unlinkSync(filePath)
                }
                await Barang.destroy({
                    where : {
                        id : req.params.id
                    }
                })
                res.json({
                    message : 'Barang berhasil dihapus',
                    request : {
                        method: req.method,
                        url: process.env.BASE_URL + '/barang/' + req.params.id
                    },
                    status: true
                })
            }catch(err){
                res.status(400).json({
                    error: err.message,
                    message: 'Barang gagal dihapus',
                    status: false
                })
            }
        }else{res.status(404).json({message : 'Barang tidak ditemukan', status: false})}
    },
    search: async (req, res) => {
        const barang = await Barang.findAll({
            where:{
                title : {
                    [Op.like]: `%${req.params.keyword}%`,
                }
            },
            include: {
                model: User,
                as: 'user'
            }
        })

        if(barang.length != 0){
            res.json({
                message : 'Pencarian barang berhasil',
                barang: barang.map(barang => {
                    return{
                        id: barang.id,
                        title: barang.title,
                        total: barang.total,
                        cover: barang.cover,
                        user_name: barang.user.name,
                    }
                }),
                request : {
                    method: req.method,
                    url: process.env.BASE_URL + '/barang/' + req.params.keyword
                },
                status: true
            })
        }else{
            res.json({
                message : 'Barang tidak ditemukan',
                request : {
                    method: req.method,
                    url: process.env.BASE_URL + '/barang/' + req.params.keyword
                },
                status: true
            })
        }
    },
    purchase: async (req, res) => {
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
                    item.total -= parseInt(result.total)
                    console.log(item.total);
                    await Barang.update({ total: item.total }, {
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

function barangValidation(dataRequest, method){
    let schema
    if(method == 'PUT'){
        schema = {
            title: 'string|empty:false|min:3',
            total: 'number|integer|positive|min:0|empty:false',
            description: 'string|empty:false|min:5'
        }
    }else{
        schema = {
            title: 'string|empty:false|min:3',
            total: 'number|integer|positive|min:0|empty:false',
            description: 'string|empty:false|min:5',
            cover: 'string|empty:false'
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

function dateFormat(now){
    const offsetMs = now.getTimezoneOffset() * 60 * 1000
    const dateLocal = new Date(now.getTime() - offsetMs)
    const str = dateLocal.toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " ")
    return str
}