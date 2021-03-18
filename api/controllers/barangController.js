const {Barang, Role, User} = require('../models')
const validatorMessage = require('../config/validatorMessage')
const Validator = require('fastest-validator')

module.exports = {
    index: async (req, res) => {
        const barang = await Barang.findAll()
        res.json({
            // barang: barang.map(barang => {
            //     return{
            //         title: barang.title,
            //     }
            // }),
            barang : barang,
            message: 'Barang berhasil ditampilkan',
            request: {
                method: req.method,
                url: process.env.BASE_URL + 'barang'
            },
            status: true
        })
    },
    show: async (req, res) => {
        const barang = await Barang.findOne({
            where : {
                id : req.params.id
            }
        })
        if(barang != null){
            res.json({
                barang : barang,
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
        let requestBarang
        requestBarang = {
            title : req.body.title,
            description : req.body.description,
            cover : req.body.cover,
            user_id : req.body.user_id,
        }
        let barang =  await Barang.create(requestBarang)
        res.json({
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
    },
    update : async (req, res) => {
        const barang = await Barang.findOne({where : {id : req.params.id}})

        if(barang != null){
            let requestBarang
            requestBarang = {
                title : req.body.title,
                description : req.body.description
            }

            let barang =  await Barang.update(requestBarang, {
                where : {
                    id : req.params.id
                }
            })

            res.json({
                message : 'Barang berhasil diperbarui',
                request : {
                    method: req.method,
                    url: process.env.BASE_URL + 'barang'
                },
                status: true
            })
        }else{res.status(404).json({message : 'Barang tidak ditemukan', status: false})}
    },
    delete : async (req, res) => {
        const barang = await Barang.findOne({where : {id : req.params.id}})

        if(barang != null){
            await Barang.destroy({
                where : {
                    id : req.params.id
                }
            })
            res.json({
                message : 'Barang berhasil dihapus',
                request : {
                    method: req.method,
                    url: process.env.BASE_URL + 'barang'
                },
                status: true
            })
        }else{res.status(404).json({message : 'Barang tidak ditemukan', status: false})}

    }
}

function barangErrors(dataRequest, method){
    let schema
    if(method == 'PUT'){
        schema = {
            title : 'string|empty:false|min:3',
            description : 'string|empty:false|min:10'
        }
    }else{
        schema = {
            title : 'string|empty:false|min:3',
            description : 'string|empty:false|min:10'
        }
    }

    const v = new Validator(validatorMessage)
    const validationResponse = v.validate(dataRequest, schema)
    if(validationResponse.length > 0){
        return {
            message : 'Harap isi form dengan benar',
            errors : validationResponse
        }
    }
}