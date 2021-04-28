const {Barang, Cart, User} = require('../models')

module.exports = {
    getCart: async (req, res) => {
        const cart = await Cart.findAll({where : {user_id : req.decoded.id, status : 'cart'},include: [{
            model: User,
            as: 'user'
        },{
            model: Barang,
            as: 'barang',
            include : [{model : User, as: 'user'}] // nested association
        }], order: [['updatedAt', 'DESC']]})
        
        if(cart.length != 0){
            res.json({
                cart: cart.map(cart => {
                    return{
                        id: cart.id,
                        user_id: cart.user_id,
                        cart_id: cart.cart_id,
                        kode: cart.kode,
                        status: cart.status,
                        cart_stok: cart.stok,
                        barang_id: cart.barang.id,
                        barang_title: cart.barang.title,
                        barang_pemilik: cart.barang.user.name,
                        barang_description: cart.barang.description,
                        barang_stok: cart.stok,
                        barang_harga: cart.harga,
                        barang_cover: cart.barang.cover,
                        user_alamat: cart.user.alamat,
                        user_phone: cart.user.phone,
                    }
                }),
                message : 'Barang Berhasil Dimasukkan ke keranjang',
                request : {
                    method: req.method,
                    url: process.env.BASE_URL + '/barang/cart'
                },
                status: true
            })
        }
    },
    setCart: async (req, res) => {
        const barang = await Barang.findOne({
            where : {
                id : req.body.id
            }
        })

        if(barang != null){
            req.body.stok = parseInt(req.body.stok)

            let kode = Math.random().toString(36).replace(/[^a-z]+/g, '');

            let harga = req.body.stok * barang.harga ;

            let requestPayment = {
                user_id : req.decoded.id,
                barang_id : req.body.id,
                kode : kode,
                stok : req.body.stok,
                harga : harga,
            }

            await Cart.create(requestPayment)
            
            res.json({
                message : 'Barang Berhasil Dimasukkan ke keranjang',
                request : {
                    method: req.method,
                    url: process.env.BASE_URL + '/barang/cart'
                },
                status: true
            })
        }else{res.status(404).json({message : 'Barang tidak ditemukan', status: false})}
    },
    removeCart: async (req, res) => {
        const cart = await Cart.findOne({where : {user_id : req.decoded.id}})
        
        if(cart.length != 0){
            await Cart.destroy({
                where : {
                    id : req.params.id
                }
            })

            res.json({
                message : 'Barang Berhasil Dihapus dari keranjang',
                request : {
                    method: req.method,
                    url: process.env.BASE_URL + '/barang/cart'
                },
                status: true
            })
        }else{res.status(404).json({message : 'Cart tidak ditemukan', status: false})}
    }
}