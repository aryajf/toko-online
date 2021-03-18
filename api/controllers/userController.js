const {User} = require('../models')
const bcrypt = require('bcrypt')
const { JWT_SECRET, JWT_SECRET_EXPIRES } = process.env
const jwt = require('jsonwebtoken')

module.exports = {
    profile: async (req, res) => {
        res.json(req.decoded)
    },
    login: async (req, res) => {
        let user = await User.findOne({email: req.body.email})
        if(!user) res.status(404).json({email : req.body.email, message: 'Akunmu belum terdaftar', status :false})
        if(!verifyPassword(req.body.password, user.password)) res.json({message : 'Email dan Password mu gk sesuai tuh', status:false})

        const token = jwt.sign(user.toJSON(), JWT_SECRET, {
            expiresIn : JWT_SECRET_EXPIRES
        })

        res.json({
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
    },
    register: async (req, res) => {
        let user = await User.findOne({where: {email:req.body.email}})
        if(user){
            res.json({email:req.body.email, message: 'Akun sudah terdaftar', status:false})
        }else{
            try{
                const newUser = await User.create({
                    name : req.body.name,
                    email : req.body.email,
                    password : hashPassword(req.body.password),
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
    },
    index: async (req, res) => {
        const user = await User.findAll()
        res.json({
            // user: user.map(user => {
            //     return{
            //         title: user.title,
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
        if(user != null){
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
        const user = await User.findOne({where : {id : req.params.id}})

        if(user != null){
            let requestUser
            requestUser = {
                title : req.body.title,
                description : req.body.description
            }

            let user =  await User.update(requestUser, {
                where : {
                    id : req.params.id
                }
            })

            res.json({
                message : 'User berhasil diperbarui',
                request : {
                    method: req.method,
                    url: process.env.BASE_URL + 'user'
                },
                status: true
            })
        }else{res.status(404).json({message : 'User tidak ditemukan', status: false})}
    },
    delete : async (req, res) => {
        const user = await User.findOne({where : {id : req.params.id}})

        if(user != null){
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

function hashPassword(password){
    return bcrypt.hashSync(password, 10, null)
}

function verifyPassword(password, hashPassword){
    return bcrypt.compareSync(password, hashPassword)
}