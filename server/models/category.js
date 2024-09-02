const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   desc: {
      type: String,
   },
   image: {
      type: String,
   },
   products: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
   }],
   isAvailable: {
      type: Boolean,
      default: true
   },
},
   {
      timestamps: true
   })

module.exports = mongoose.model('Category', categorySchema)