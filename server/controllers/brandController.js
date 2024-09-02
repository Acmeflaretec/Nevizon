const Brand = require('../models/brand');
const fs = require('fs');

const getBrands = async (req, res) => {
  try {
    const data = await Brand.find()
    res.status(200).json({ data })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error?.message ?? 'Something went wrong' })
  }
};

const addBrand = async (req, res) => {
  try {
    const { name, status } = req?.body
    const image = req?.file?.filename
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    const data = new Brand({ name, image, status })
    await data.save()
    res.status(201).json({ data, message: 'Blog created successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error?.message ?? 'Something went wrong' })
  }
}

const getBrandById = async (req, res) => {
  const { id } = req.params;
  try {
    const brand = await Brand.findById(id);
    if (!brand) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json({ data: brand });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error?.message ?? 'Something went wrong' })
  }
}

const updateBrand = async (req, res) => {
  const { _id, name, status } = req.body;
  const image = req?.file?.filename;
  try {
    const data = await Brand.findById(_id);
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
    await Brand.updateOne({ _id }, {
      $set: { name, status, ...(image && { image }) }
    })
    res.status(200).json({ data, message: 'Blog updated successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error?.message ?? 'Something went wrong' })
  }
};

const deleteBrand = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Brand.findByIdAndDelete(id);
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
    res.status(200).json({ message: 'Brand deleted successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error?.message ?? 'Something went wrong' })
  }
};

module.exports = {
  getBrands,
  addBrand,
  getBrandById,
  updateBrand,
  deleteBrand
}