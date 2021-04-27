var express = require('express');
var router = express.Router();

// Controller
const adminController = require('../controllers/adminController');
const barangController = require('../controllers/barangController');
const cartController = require('../controllers/cartController');
const paymentController = require('../controllers/paymentController');
const userController = require('../controllers/userController');

// Middleware
const fileUpload = require('../middleware/fileUpload')
const checkAuth = require('../middleware/checkAuth')
const isAdmin = require('../middleware/checkRole/isAdmin')
const isUser = require('../middleware/checkRole/isUser')

router.get('/', function(req, res) {
  res.send('home');
});

// AUTHENTICATION 
router.post('/login', userController.login)
router.post('/register', userController.register)

// Profile
router.route('/profile')
  .get(checkAuth, userController.profile)
  .put(checkAuth, fileUpload.single('avatar'), userController.update)

// Barang
router.route('/barang/search/:keyword')
  .get(barangController.search);
router.route('/barang/user')
  .get(checkAuth, barangController.withUser)

router.route('/barang')
  .get(barangController.index)
  .post(checkAuth, fileUpload.single('cover'), barangController.store)

router.route('/barang/:id')
  .get(barangController.show)
  .put(checkAuth, fileUpload.single('cover'), barangController.update)
  .delete(checkAuth, barangController.delete)

// Cart
router.route('/cart')
  .get(checkAuth, cartController.getCart)
  
router.route('/cart/:id')
  .post(checkAuth, cartController.setCart)
  .delete(checkAuth, cartController.removeCart)
  
// Unpaid
router.route('/unpaid')
  .get(checkAuth, paymentController.getUnpaid)
  .post(checkAuth, paymentController.setUnpaid)

// Pending
router.route('/pending')
  .get(checkAuth, paymentController.getPending)
  .post(checkAuth, fileUpload.single('foto_bukti'), paymentController.setPending)
  
// Accepted
router.route('/accepted')
  .get(checkAuth, paymentController.getAccepted)

// Admin
router.route('/admin/users')
  .get(checkAuth, isAdmin, adminController.getUsers)

router.route('/admin/pending')
  .get(checkAuth, isAdmin, adminController.getPending)

router.route('/admin/accepted')
  .get(checkAuth, isAdmin, adminController.getAccepted)

router.route('/admin/accepted/:kode')
  .get(checkAuth, isAdmin, adminController.setAccepted)
module.exports = router;
