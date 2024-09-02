const mongoose = require('mongoose')

const testimonialSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Testimonial', testimonialSchema)