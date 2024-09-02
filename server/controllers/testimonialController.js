const Testimonial = require('../models/testimonial');
const fs = require('fs');

const getTestimonials = async (req, res) => {
  try {
    const data = await Testimonial.find()
    res.status(200).json({ data })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error?.message ?? 'Something went wrong' })
  }
};

const addTestimonial = async (req, res) => {
  try {
    const { name, comment, status } = req?.body
    const image = req?.file?.filename
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    const data = new Testimonial({ name,comment, image,  status })
    await data.save()
    res.status(201).json({ data, message: 'Blog created successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error?.message ?? 'Something went wrong' })
  }
}

const getTestimonialById = async (req, res) => {
  const { id } = req.params;
  try {
    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json({ data: testimonial });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error?.message ?? 'Something went wrong' })
  }
}

const updateTestimonial = async (req, res) => {
  const { _id, name, comment, status } = req.body;
  const image = req?.file?.filename;
  try {
    const data = await Testimonial.findById(_id);
    if (!data) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    if (image) {
      fs.unlink(`public/uploads/${data?.image}`, (err) => {
        if (err) {
          console.error('Error deleting image:', err);
          return;
        }
        console.log('Image deleted successfully.');
      });
    }
    await Testimonial.updateOne({ _id }, {
      $set: { name, comment, status, ...(image && { image }) }
    })
    res.status(200).json({ data, message: 'Blog updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: error?.message ?? 'Something went wrong' })
  }
};

const deleteTestimonial = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Testimonial.findByIdAndDelete(id);
    if (!data) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    fs.unlink(`public/uploads/${data?.image}`, (err) => {
      if (err) {
        console.error('Error deleting image:', err);
        return;
      }
      console.log('Image deleted successfully.');
    });
    res.status(200).json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error?.message ?? 'Something went wrong' })
  }
};

module.exports = {
  getTestimonials,
  addTestimonial,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial
}