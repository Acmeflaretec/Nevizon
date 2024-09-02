const express = require('express');
const { createReview, getReviewsByProductId } = require('../controllers/reviewController');

const router = express.Router();

router.post('/', createReview); 
router.get('/:productId', getReviewsByProductId);

module.exports = router;
