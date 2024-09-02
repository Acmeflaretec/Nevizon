const { Router } = require('express');
const router = Router();
const authorization = require("../middlewares/authorization");
const { addProduct, getProducts, deleteProduct, getProductById, updateProduct,getProductsHome,getProductsAdmin } = require('../controllers/productController');
const { upload } = require('../middlewares/multer');

router.post('/', upload.array('images', 10), addProduct);
router.get('/', getProducts);
router.get('/admin', getProductsAdmin);
router.get('/productshome',getProductsHome)
router.delete('/:id',deleteProduct);
router.get('/:id', getProductById);
// router.patch('/',authorization, upload.array('images', 10), updateProduct);
router.patch('/',upload.array('images', 10), updateProduct);

module.exports = router;
