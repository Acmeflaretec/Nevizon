const { Router } = require('express');
const router = Router();
const authorization = require("../middlewares/authorization");
const {    getBrands,
  addBrand,
  getBrandById,
  updateBrand,
  deleteBrand } = require('../controllers/brandController');
const { upload } = require('../middlewares/multer');

router.get('/', getBrands);
router.get('/:id', getBrandById);
router.post('/', upload.single('image'), addBrand);
router.patch('/', upload.single('image'), updateBrand);
router.delete('/:id', deleteBrand);

module.exports = router;
