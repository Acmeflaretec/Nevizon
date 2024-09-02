const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    subheading: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Category"
    },
    description: {
        type: String,
        required: true
    },
    brand: {
        type: String
    },
    tags: {
        type: String,
        enum: ["featured", "popular", "limited_time_deal", "most_loved"]
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    sale_rate: {
        type: Number,
        required: true
    },
    image: {
        type: Array,
        required:true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    rating: {
        type: Number,
        default: 0
    },
    reviews: {
        type: Array
    },
    benefits:{
        type:[String]
    }
},
{
    timestamps: true
})
module.exports = mongoose.model('Product', productSchema)