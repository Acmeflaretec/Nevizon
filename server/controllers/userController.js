const User = require('../models/user')
const Otp = require('../models/otp')
const Product = require('../models/product');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');

const getUsers = async (req, res) => {
  try {
    const data = await User.find()
    res.status(200).json({ data })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
  }
};

const getUser = async (req, res) => {
  try {
    const { _id } = req?.decoded
    const data = await User.find({ _id })
    res.status(200).json({ data })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
  }
};

const updateUser = async (req, res) => {
  const { username, email, phone } = req.body;
  const { _id } = req?.decoded
  console.log(req.body);

  try {
    // Check if the user exists
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user data
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { $set: { username, email, phone } },
      { new: true, runValidators: true } // Options to return the updated document and run validators
    );

  return  res.status(200).json({ data: updatedUser, message: 'User updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message ?? 'Something went wrong' });
  }
};


const updateQty = async (req, res) => {
  try {
    const { _id } = req?.decoded
  //  const _id = '66796d0936bb97720a7764f4'
    const { qty, productId } = req?.body
    const userData = await User.findById({ _id })
    await userData.updateCart( productId, qty )
    res.status(201).json({ message: 'Quantity updated to cart' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
  }
};

const addToCart = async (req, res) => {
  try {
     const { _id } = req?.decoded
    //const _id = '66796d0936bb97720a7764f4'

    const productId = req?.params?.id
    const userData =await User.findById({ _id })
    const productData =await Product.findById({ _id:productId })
    userData.addToCart(productData)
    res.status(201).json({ message: 'Product added to cart' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
  }
}

const removeFromCart = async (req, res) => {
  try {
   const { _id } = req?.decoded
    // const _id = '66796d0936bb97720a7764f4'
    const productId = req?.params?.id 
    const userData = await User.findById({ _id })
    userData.removefromCart(productId)
    res.status(201).json({ message: 'Product removed from cart' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
  }
}

const addToWishlist = async (req, res) => {
  try {
    const { _id } = req?.decoded
  // const id = '66796d0936bb97720a7764f4'

    const productId = req?.params?.id
    const userData = await User.findById({_id})
    const productData = await Product.findById({ _id:productId })
    userData.addToWishlist(productId)
    res.status(201).json({ message: 'Product added to wishlist' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
  }
}

const removeFromWishlist = async (req, res) => {
  try {
    const { _id } = req?.decoded
   // const _id = '66796d0936bb97720a7764f4'
    const productId = req?.params?.id
    const userData = await User.findById({ _id })
    console.log('object,')
    userData.removefromWishlist(productId)
    res.status(201).json({ message: 'Product removed from wishlist' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
  }
}

const getWishLists = async (req, res) => {
   const { _id } = req?.decoded
   if (_id) {

    try {
      const userWishlist = await User.getWishlistWithProductsByUserId(_id);
      
      if (userWishlist) {
          res.status(200).json({ data: userWishlist });
      } else {
          res.status(404).json({ data:[] });
      }
  } catch (error) {
    console.log('wish err,', error)
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }

   }else{

    return res.status(404).json({ data: [] });

   }


};

const getCartDetailsByUserId = async (req, res) => {
  const { _id } = req?.decoded

  if (_id) {
    try {
      const cart = await User.getCartWithProductsByUserId(_id);

      if (cart) {
          return res.status(200).json({ data:cart });
      } else {
          return res.status(404).json({data:[] });
      }
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
  }

  }else{

    return res.status(404).json({ data: [] });
  }


}

const checkEmail =async(req,res)=>{
const email = req?.body.email
try {
  
  const data = await User.findOne({email})
  if (data) {
    return res.status(200).json({ message: "Success" });
  } else {
    return res.status(404).json({ message: "Use different email" });
  }
} catch (error) {
  
}
}

const checkRegisterEmail =async(req,res)=>{
  const email = req?.body.email
  try {
    
    const data = await User.findOne({email})
    if (!data) {
      return res.status(200).json({ message: "Success" });
    } else {
      return res.status(404).json({ message: "Already exists use different email" });
    }
  } catch (error) {
    
  }
  }


const sendRegistrationOtp = async (req, res) => {
  const email = req?.body?.email;
  const otpGen = generateOTP();

  try {
    let otp = await Otp.findOne({ email });

    if (!otp) {
      // Create a new OTP document if it doesn't exist
      otp = new Otp({ email, otp: otpGen });
    } else {
      // Update the OTP if it already exists
      otp.otp = otpGen;
    }

    await otp.save();

    // Send email with OTP
    transporter.sendMail(
      {
        from: 'shahilmohammed7@gmail.com',
        to: email,
        subject: 'Your OTP for verification',
        text: `Your OTP is: ${otpGen}`, // Use otpGen instead of otp to send the correct OTP
      },
      (error, info) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ message: 'Failed to send OTP' });
        } else {
          console.log('Email sent: ' + info.response);
          return res.json({ message: 'OTP sent successfully' });
        }
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};





const sendOtp = async (req, res) => {
  const email = req?.body?.email;
  const otp = generateOTP();

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.otp = otp;
    await user.save();

    // Send email with OTP
    transporter.sendMail({
      from: 'shahilmohammed7@gmail.com',
      to: email,
      subject: 'Your OTP for verification',
      text: `Your OTP is: ${otp}`
    }, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: 'Failed to send OTP' });
      } else {
        console.log('Email sent: ' + info.response);
        return res.json({ message: 'OTP sent successfully' });
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};



const compareOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (otp === user.otp) {
      // Clear the OTP from the user's record after verification
      user.otp = undefined;
      await user.save();
      return res.status(200).json({ message: 'OTP verified successfully' });
    } else {
      console.log('Incorrect OTP');
      return res.status(400).json({ message: 'Incorrect OTP' });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};



function generateOTP() {
  return randomstring.generate({
    length: 6,
    charset: 'numeric'
  });
}

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'Kgecoproductss@gmail.com',
    pass: 'ofbi oznx khkt knrc'
  }
});

module.exports = {
    getUser,
    getUsers,
    updateQty,
    addToCart,
    removeFromCart,
    addToWishlist,
    removeFromWishlist,
    getWishLists,
    getCartDetailsByUserId,
    updateUser,
    checkEmail,
    sendOtp,
    compareOtp,
    sendRegistrationOtp,
    checkRegisterEmail,


  }