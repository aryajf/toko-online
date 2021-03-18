var express = require('express');
var router = express.Router();

// Controller
const barangController = require('../controllers/barangController');
const userController = require('../controllers/userController');

// Middleware
const checkAuth = require('../middleware/checkAuth')

router.get('/', function(req, res) {
  res.send('home');
});

// AUTHENTICATION 
router.post('/login', userController.login)
router.post('/register', userController.register)

router.get('/profile', checkAuth, userController.profile)

// Barang
router.route('/barang')
  .get(barangController.index)
  .post(checkAuth, barangController.store);

router.route('/barang/:id')
  .get(barangController.show)
  .put(checkAuth, barangController.update)
  .delete(checkAuth, barangController.delete)

module.exports = router;
