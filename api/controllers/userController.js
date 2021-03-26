const {User} = require('../models')
const bcrypt = require('bcrypt')
const { JWT_SECRET, JWT_SECRET_EXPIRES } = process.env
const jwt = require('jsonwebtoken')
const Validator = require('fastest-validator')
const validatorMessage = require('../config/validatorMessage')
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const directory = path.join(__dirname, '../public/images/users/')

module.exports = {
    profile: async (req, res) => {
        const user = await User.findOne({
            where : {
                id : req.decoded.id
            }
        })
        res.json(user)
    },
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

        res.status(200).json({
            data: {
                id:user._id,
                name : user.name
            },
            message : 'Berhasil Login',
            request : {
                method : req.method,
                url : process.env.BASE_URL + '/login'
            },
            status : true,
            token : token
        })
    }else{
        res.status(400).send(userValidation(userRequest, req.url))
    }
    },
    register: async (req, res) => {
        let user = await User.findOne({where: {email:req.body.email}})
        const userRequest = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword
        }

        if(userValidation(userRequest, req.url) == null){
        if(user){
            res.status(400).json({email:req.body.email, message: 'Akun sudah pernah terdaftar', status:false})
        }else{
            try{
                const newUser = await User.create({
                    name : userRequest.name,
                    email : userRequest.email,
                    password : hashPassword(userRequest.password),
                })
                res.status(201).json({
                    data: {
                        id: newUser.id,
                        name: newUser.name,
                        email: newUser.email
                    },
                    message: 'Berhasil Register',
                    request: {
                        method: req.method,
                        url: process.env.BASE_URL + '/register'
                    },
                    status: true
                })
            }catch(err){
                res.status(400).json({
                    error: err.message,
                    message: 'Gagal Register',
                    status: false
                })
            }
        }
        }else{
            res.status(400).send(userValidation(userRequest, req.url))
        }
    },
    index: async (req, res) => {
        const user = await User.findAll()
        res.json({
            // user: user.map(user => {
            //     return{
            //         name: user.name,
            //     }
            // }),
            user : user,
            message: 'User berhasil ditampilkan',
            request: {
                method: req.method,
                url: process.env.BASE_URL + 'user'
            },
            status: true
        })
    },
    show: async (req, res) => {
        const user = await User.findOne({
            where : {
                id : req.params.id
            }
        })
        if(user.length != 0){
            res.json({
                user : user,
                message : 'User berhasil ditampilkan',
                request : {
                    method: req.method,
                    url: process.env.BASE_URL + 'user'
                },
                status: true
            })
        }else{res.status(404).json({message : 'User tidak ditemukan', status: false})}
    },
    update : async (req, res) => {
        const user = await User.findOne({where : {id : req.decoded.id}})

        if(req.file){
            // Create Path Upload
            const getFileName = req.file.originalname.split('.')[0]
            const unique = new Date().toISOString().replace(/[\/\\:]/g, "_")
            const extension = req.file.mimetype.split("/").pop()
            const fileName = getFileName + '-' + unique + '.' + extension
            const pathResult = directory + '/' + fileName

            let requestUser = {
                name: req.body.name,
                email: req.body.email,
                profile: fileName
            }

            if(userValidation(requestUser, req.url) == null){
                if(user.length != 0){
                    try{
                        // Check File Exists
                        const existsPath = directory + user.profile
                        if(user.profile !=null){
                            if(fs.existsSync(existsPath)){
                                fs.unlinkSync(existsPath)
                            }
                        }
                        if(!fs.existsSync(existsPath)){
                            fs.mkdirSync(existsPath);
                        }

                        
                        // Create Folder
                        user.update(requestUser)
                        sharp(req.file.buffer).resize(640,480).jpeg({
                            quality: 80,
                            chromeSubsampling: '4:4:4'
                        }).toFile(pathResult)
                        res.json({
                            data: {
                                id: user.id,
                                name: user.name,
                                email: user.email,
                                profile: user.profile,
                            },
                            message: 'Profil berhasil diperbarui',
                            request: {
                                method: req.method,
                                url: process.env.BASE_URL + '/user/profile'
                            },
                            status: true
                        })
                    }catch(err){
                        res.status(400).json({
                            error: err.message,
                            message: 'User gagal diperbarui',
                            status: false
                        })
                    }
                }else{
                    res.status(404).json({message: 'User tidak ditemukan', status: false})
                }
            }else{
                res.status(400).send(userValidation(requestUser, req.url))
            }
        }else{
            let requestUser = {
                name: req.body.name,
                email: req.body.email
            }

            if(userValidation(requestUser, req.url) == null){
                if(user.length != 0){
                    try{
                        user.update(requestUser)
                        res.json({
                            data: {
                                id: user.id,
                                name: user.name,
                                email: user.email,
                            },
                            message: 'Profil berhasil diperbarui',
                            request: {
                                method: req.method,
                                url: process.env.BASE_URL + '/user/profile'
                            },
                            status: true
                        })
                    }catch(err){
                        res.status(400).json({
                            error: err.message,
                            message: 'User gagal diperbarui',
                            status: false
                        })
                    }
                }else{
                    res.status(404).json({message: 'User tidak ditemukan', status: false})
                }
            }else{
                res.status(400).send(userValidation(requestUser, req.url))
            }
        }
    },
    delete : async (req, res) => {
        const user = await User.findOne({where : {id : req.params.id}})

        if(user.length != 0){
            await User.destroy({
                where : {
                    id : req.params.id
                }
            })
            res.json({
                message : 'User berhasil dihapus',
                request : {
                    method: req.method,
                    url: process.env.BASE_URL + 'user'
                },
                status: true
            })
        }else{res.status(404).json({message : 'User tidak ditemukan', status: false})}

    }
}

function userValidation(dataRequest, url){
    let schema
    if(url == '/register'){
        schema = {
            name: 'string|empty:false|required',
            email: 'email|empty:false',
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

function hashPassword(password){
    return bcrypt.hashSync(password, 10, null)
}

function verifyPassword(password, hashPassword){
    return bcrypt.compareSync(password, hashPassword)
}