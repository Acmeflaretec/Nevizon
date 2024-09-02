const { Router } = require('express');
const router = Router();
const authorization = require("../middlewares/authorization");
const { getUser, addToCart, removeFromCart, addToWishlist, removeFromWishlist, updateQty, getUsers,getWishLists,getCartDetailsByUserId
  ,updateUser,checkEmail,sendOtp,compareOtp,sendRegistrationOtp,checkRegisterEmail,
 } = require('../controllers/userController');

//router.use(authorization)
router.get('/', getUser);
router.patch('/',authorization, updateUser);   
router.get('/getAllUsers', getUsers);
router.patch('/updateQty',authorization, updateQty);
router.patch('/addToCart/:id',authorization, addToCart);
router.patch('/removeFromCart/:id',authorization, removeFromCart);
router.patch('/addToWishlist/:id',authorization, addToWishlist);   
router.patch('/removeFromWishlist/:id',authorization, removeFromWishlist);
router.get('/getwishlist',authorization, getWishLists);
router.get('/getcarts', authorization,getCartDetailsByUserId); 
router.post('/checkemail', checkEmail);
router.post('/sendOtp', sendOtp);
router.post('/compareOtp', compareOtp);
router.post('/sendRegistrationOtp', sendRegistrationOtp);
router.post('/checkRegisterEmail', checkRegisterEmail);


module.exports = router;
 