var express = require('express');
var router = express.Router();

// Controller
const barangController = require('../controllers/barangController');
const userController = require('../controllers/userController');

// Middleware
const fileUpload = require('../middleware/fileUpload')
const checkAuth = require('../middleware/checkAuth')

router.get('/', function(req, res) {
  res.send('home');
});

// AUTHENTICATION 
router.post('/login', userController.login)
router.post('/register', userController.register)

router.get('/profile', checkAuth, userController.profile)

// Barang
router.route('/barang/user')
  .get(checkAuth, barangController.withUser)

router.route('/barang')
  .get(barangController.index)
  .post(checkAuth, fileUpload.single('cover'), barangController.store)

router.route('/barang/:id')
  .get(barangController.show)
  .put(checkAuth, fileUpload.single('cover'), barangController.update)
  .delete(checkAuth, barangController.delete)

module.exports = router;
