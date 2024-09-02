const { Router } = require('express');
const router = Router();
const authorization = require("../middlewares/authorization");
const { getBanners, addBanner, updateBanner, deleteBanner, getBannerById,getBannersAdmin } = require('../controllers/bannerController');
const { upload } = require('../middlewares/multer');

router.get('/', getBanners);
router.get('/admin', getBannersAdmin);
router.get('/:id', getBannerById);
router.post('/',upload.single('image'), addBanner);
// router.post('/', authorization, upload.single('image'), addBanner);
router.patch('/',upload.single('image'), updateBanner);
// router.patch('/', authorization, upload.single('image'), updateBanner);
// router.delete('/:id', authorization, deleteBanner);
router.delete('/:id', deleteBanner);

module.exports = router;
