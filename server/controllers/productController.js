const Product = require('../models/product');
const Category = require('../models/category')
const fs = require('fs');

const getProducts = async (req, res) => {
  try {
    const { page = 1, limit, sortField, sortOrder, search, category,
      priceGreaterThan, priceLessThan, priceMin, priceMax, sortDiscount, sortDiscountGreaterThan } = req.query;

    // Convert page and limit to integers
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;
// console.log('lim',limit)

    // Construct the base query
    const query = {};

    query.isAvailable=true

    // Search functionality
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { name: searchRegex },
        { brand: searchRegex }
        // Add additional fields for search as needed
      ];
    }

    // Category filter
    if (category) {
      query.category = category;
    }

    // Sorting
    const sortOptions = {};
    if (sortField && sortOrder) {
      sortOptions[sortField] = sortOrder === 'asc' ? 1 : -1;
    }

    // Price greater than functionality
    if (priceGreaterThan) {
      query.sale_rate = { $gt: parseInt(priceGreaterThan) };
    }

    // Price less than functionality
    if (priceLessThan) {
      query.sale_rate = { $lt: parseInt(priceLessThan) };
    }

    // Price range functionality
    if (priceMin && priceMax) {
      query.sale_rate = { $gte: parseInt(priceMin), $lte: parseInt(priceMax) };
    }

    if (sortDiscount) {
      query.discount = parseInt(sortDiscount);
    }

    // Sort by discount greater than functionality
    if (sortDiscountGreaterThan) {
      query.discount = { $gt: parseInt(sortDiscountGreaterThan) };
    }

    // Find products based on the constructed query
    const totalProducts = await Product.countDocuments(query);
    const products = await Product.find(query)
      .collation({ locale: 'en' }) // Enable case-insensitive search
      .sort(sortOptions)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);
    //const data = await Product.find()
    res.status(200).json({ data:products })
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error?.message ?? "Something went wrong !" });
  }
};

const getProductsAdmin = async (req, res) => {
  try {
    const { page = 1, limit, sortField, sortOrder, search, category,
      priceGreaterThan, priceLessThan, priceMin, priceMax, sortDiscount, sortDiscountGreaterThan } = req.query;

    // Convert page and limit to integers
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;
// console.log('lim',limit)

    // Construct the base query
    const query = {};

    // Search functionality
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { name: searchRegex },
        { brand: searchRegex }
        // Add additional fields for search as needed
      ];
    }

    // Category filter
    if (category) {
      query.category = category;
    }

    // Sorting
    const sortOptions = {};
    if (sortField && sortOrder) {
      sortOptions[sortField] = sortOrder === 'asc' ? 1 : -1;
    }

    // Price greater than functionality
    if (priceGreaterThan) {
      query.sale_rate = { $gt: parseInt(priceGreaterThan) };
    }

    // Price less than functionality
    if (priceLessThan) {
      query.sale_rate = { $lt: parseInt(priceLessThan) };
    }

    // Price range functionality
    if (priceMin && priceMax) {
      query.sale_rate = { $gte: parseInt(priceMin), $lte: parseInt(priceMax) };
    }

    if (sortDiscount) {
      query.discount = parseInt(sortDiscount);
    }

    // Sort by discount greater than functionality
    if (sortDiscountGreaterThan) {
      query.discount = { $gt: parseInt(sortDiscountGreaterThan) };
    }

    // Find products based on the constructed query
    const totalProducts = await Product.countDocuments(query);
    const products = await Product.find(query)
      .collation({ locale: 'en' }) // Enable case-insensitive search
      .sort(sortOptions)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);
    //const data = await Product.find()
    res.status(200).json({ data:products })
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error?.message ?? "Something went wrong !" });
  }
};

const getProductsHome = async (req, res) => {
  try {
    const { page = 1, limit, sortField, sortOrder, search, category,tags,
      priceGreaterThan, priceLessThan, priceMin, priceMax, sortDiscount, sortDiscountGreaterThan } = req.query;

    // Convert page and limit to integers
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;
// console.log('lim',limit)
console.log('lim n',limitNumber)

    // Construct the base query
    const query = {};

    // Search functionality
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { name: searchRegex },
        { brand: searchRegex }
        // Add additional fields for search as needed
      ];
    }

    // Category filter
    if (category) {
      query.category = category;
    }

    if(tags) {
      query.tags = tags
    }

    // Sorting
    const sortOptions = {};
    if (sortField && sortOrder) {
      sortOptions[sortField] = sortOrder === 'asc' ? 1 : -1;
    }

    // Price greater than functionality
    if (priceGreaterThan) {
      query.sale_rate = { $gt: parseInt(priceGreaterThan) };
    }

    // Price less than functionality
    if (priceLessThan) {
      query.sale_rate = { $lt: parseInt(priceLessThan) };
    }

    // Price range functionality
    if (priceMin && priceMax) {
      query.sale_rate = { $gte: parseInt(priceMin), $lte: parseInt(priceMax) };
    }

    if (sortDiscount) {
      query.discount = parseInt(sortDiscount);
    }

    // Sort by discount greater than functionality
    if (sortDiscountGreaterThan) {
      query.discount = { $gt: parseInt(sortDiscountGreaterThan) };
    }

    // Find products based on the constructed query
    const totalProducts = await Product.countDocuments(query);
    console.log('tpro',totalProducts)
    const products = await Product.find(query)
      .collation({ locale: 'en' }) // Enable case-insensitive search
      .sort(sortOptions)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);
    //const data = await Product.find()
    res.status(200).json({ data:products })
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error?.message ?? "Something went wrong !" });
  }
};

const getProductById = async (req, res) => {
  try {
    const data = await Product.findOne({ _id: req.params.id }).populate('category')
    res.status(200).json({ data, message: 'product found successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error?.message ?? "Something went wrong !" });
  }
}

const addProduct = async (req, res) => {

 
  
  try {
    console.log(req.files);
    const { name, subheading, category, brand, price, stock, discount, sale_rate, description,benefits } = req?.body

    console.log('bene',benefits)
  
    if (req.files.length != 0) {
      const product = new Product({
        name, subheading, category, brand, price, stock, discount, sale_rate, description,benefits:benefits ,
        image: req.files.map((x) => x.filename)
      });
      console.log(product);
      await product.save();
      if (product) {
        await Category.updateOne({ _id: category }, { $push: { products: product._id } })
        res.status(200).json({ message: "Product added successfully !" });

      } else {
        res.status(400).json({ message: "Something went wrong !" });
      }
    } else {
      res.status(400).json({ message: "failed only jpg ,jpeg, webp & png file supported !" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error?.message ?? "Something went wrong !" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { _id, name, subheading, brand, price, stock, discount, sale_rate, description, image,isAvailable,benefits } = req?.body
    console.log('ben',benefits)
    
    const images = JSON.parse(image) ?? []
    if (req?.files?.length != 0) {
      req?.files?.map((x) => images.push(x.filename))
    }
    await Product.updateOne({ _id }, {
      $set: { name, subheading, brand, price, stock, discount, sale_rate, description,isAvailable:isAvailable,benefits:benefits, image: images }
    })
    res.status(200).json({ message: "Product updated successfully !" });
  } catch (error) {
    console.log(error.message)
    res.status(400).json({ message: error?.message ?? "Something went wrong !" });
  }
}

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const data = await Product.findByIdAndDelete(id);  
    if (!data) {
      return res.status(404).json({ message: 'Product not found' });
    }
    fs.unlink(`public/uploads/${data?.image}`, (err) => {
      if (err) {
        console.error('Error deleting image:', err);
        return;
      }
      console.log('Image deleted successfully.');
    });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error?.message ?? 'Something went wrong' })
  }
}
module.exports = {
  getProducts,
  getProductsHome,
  getProductById,
  updateProduct,
  addProduct,
  deleteProduct,
  getProductsAdmin,
}