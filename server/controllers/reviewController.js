const Review = require('../models/reviewModel');
const Product = require('../models/product');
// const Order = require('../models/order'); 

exports.createReview = async (req, res) => {
  try {
    const { productId, name, rating, review,userId } = req.body;

    const newReview = new Review({
      name,
      rating,
      review,
      productId,
      userId
    });

    await newReview.save();
    await Product.findByIdAndUpdate(productId, { $push: { reviews: newReview._id } });

    res.status(201).json({ success: true, data: newReview });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getReviewsByProductId = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ productId }).sort({ date: -1 });
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
