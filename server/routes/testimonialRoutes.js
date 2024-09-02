const { Router } = require('express');
const router = Router();
const authorization = require("../middlewares/authorization");
const {  getTestimonials,
  addTestimonial,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial } = require('../controllers/testimonialController');
const { upload } = require('../middlewares/multer');

router.get('/', getTestimonials);
router.get('/:id', getTestimonialById);
router.post('/', upload.single('image'), addTestimonial);
router.patch('/', upload.single('image'), updateTestimonial);
router.delete('/:id', deleteTestimonial);

module.exports = router;
