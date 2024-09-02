import React, { useEffect, useState, useRef } from 'react';
import axiosInstance from '../axios';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import MiddleNav from '../components/MiddleNav';
import LoadingScreen from '../components/loading/LoadingScreen';

// Dummy product data for demonstration
const dummyProducts = [
  { id: 1, name: 'CHARCOAL ENHANCED BAMBOO TOOTHBRUSH', imageUrl: 'https://img.freepik.com/premium-photo/eco-friendly-bamboo-toothbrush-pastel-background-zero-waste-life-without-plastic_223515-200.jpg?w=996', price: '120', quantity: '500' },
  { id: 2, name: 'BAMBOO TOOTHBRUSH [ white ]', imageUrl: 'https://img.freepik.com/free-photo/top-view-toothbrushes-towels_23-2148678027.jpg?w=826&t=st=1720514150~exp=1720514750~hmac=d12b18a24d3805634f531efeebf4641f623175b2449f1117084539d439e22e35', price: '150', quantity: '500' },
  { id: 3, name: 'BAMBOO TONQUE CLEANER', imageUrl: 'https://img.freepik.com/free-photo/eco-friendly-environment-bamboo-tube-straws_23-2148768567.jpg?t=st=1720514232~exp=1720517832~hmac=62cd94a2d5614c27c2c97a3235759bf284823b8b6df313938850f4dd238eb4fe&w=1060', price: '180', quantity: '500' },
  { id: 4, name: 'ECO-FRIENDLY COTTON BUDS', imageUrl: 'https://img.freepik.com/premium-photo/heap-bamboo-cotton-swabs-buds-top-view-beige-surface-copy-space_224798-1095.jpg?w=996', price: '180', quantity: '500' },
];

const Allproducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const hasFetchedProducts = useRef(false);
  const [category, setCategory] = useState([]);
  const userDetails = useSelector(state => state.userDetails);
  const navigate = useNavigate();
  const location = useLocation();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [notif, setNotif] = useState(true);
const [loadProd,setLoadProd] = useState([])
  const [loading, setLoading] = useState({}); // Add loading state
  const [loadScreenState, setLoadScreenState] = useState(true); // Loading state


  let urlQuery = `/products?page=${page}&limit=${limit}&sortField=createdAt&sortOrder=desc`;

  const fetchProducts = async (urlQ) => {
    try {
      const response = await axiosInstance.get(urlQ);
      setProducts((prevProducts) => [...prevProducts, ...response?.data?.data]);


      setLoadProd(response?.data?.data)
      const wishlistResponse = await axiosInstance.get('/user/getwishlist');
      setWishlistItems(wishlistResponse?.data?.data);
      const cartResponse = await axiosInstance.get('/user/getcarts');
      setCartItems(cartResponse?.data?.data?.item);
    } catch (error) {
      console.error('Error fetching products:', error);
    }finally {
      setLoadScreenState(false); // Set loading to false after data is fetched
  }
  };

  const fetchCategory = async (urlC) => {
    try {
      const response = await axiosInstance.get(urlC);
      setCategory(response?.data?.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    if (!hasFetchedProducts.current) {
      const searchParams = new URLSearchParams(location.search);
      const initialCategory = searchParams.get('category') || '';
      setFilterCategory(initialCategory);
      fetchProducts(`${urlQuery}&category=${initialCategory}`);
      fetchCategory(`/category`);
      hasFetchedProducts.current = true;
    }
  }, [location.search]);

  const handleSearch = async (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const onLoad = async () => {
    setPage(page + 1);
    let urlQ = `/products?page=${page + 1}&limit=${limit}&sortField=createdAt&sortOrder=desc`;
    if (searchTerm !== '') urlQ += `&search=${searchTerm}`;
    if (filterCategory !== '') urlQ += `&category=${filterCategory}`;
    await fetchProducts(urlQ);
  };

  const onSearch = async () => {
    setProducts([]);
    setPage(1);
    let urlQ = `/products?page=1&limit=${limit}&sortField=createdAt&sortOrder=desc&search=${searchTerm}`;
    if (filterCategory !== '') urlQ += `&category=${filterCategory}`;
    fetchProducts(urlQ);
  };

  const handleFilterCategory = (e) => {
    setProducts([]);
    setFilterCategory(e.target.value);
    setPage(1);
    let urlQ = `/products?page=1&limit=${limit}&sortField=createdAt&sortOrder=desc&category=${e.target.value}`;
    if (searchTerm !== '') urlQ += `&search=${searchTerm}`;
    fetchProducts(urlQ);
  };

  const fetchCart = async () => {
    try {
      const cartResponse = await axiosInstance.get('/user/getcarts');
      setCartItems(cartResponse?.data?.data?.item);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const fetchWishlist = async () => {
    try {
      const wishlistResponse = await axiosInstance.get('/user/getwishlist');
      setWishlistItems(wishlistResponse?.data?.data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const addWishlist = async (proId) => {
    if (!userDetails) {
      navigate('/login');
    } else {
      try {
        const response = await axiosInstance.patch(`/user/addToWishlist/${proId}`);
        await fetchWishlist();
        setNotif(prev => !prev);
      } catch (error) {
        console.error('Error adding to wishlist:', error);
      }
    }
  };

  const removeWishlist = async (proId) => {
    if (!userDetails) {
      navigate('/login');
    } else {
      try {
        const response = await axiosInstance.patch(`/user/removeFromWishlist/${proId}`);
        await fetchWishlist();
        setNotif(prev => !prev);
      } catch (error) {
        console.error('Error removing from wishlist:', error);
      }
    }
  };

  const addCart = async (proId) => {
    if (!userDetails) {
      navigate('/login');
    } else {
      setLoading(prev => ({ ...prev, [proId]: true }));
      try {
        const response = await axiosInstance.patch(`/user/addToCart/${proId}`);
        await fetchCart();
        setNotif(prev => !prev);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(prev => ({ ...prev, [proId]: false })); 
        await fetchCart();
      }
    }
  };

  const removeCart = async (proId) => {
    if (!userDetails) {
      navigate('/login');
    } else {
      try {
        const itemId = cartItems?.find(item => item?.productId?._id === proId)._id;
        const response = await axiosInstance.patch(`/user/removeFromCart/${itemId}`);
        await fetchCart();
        setNotif(prev => !prev);
      } catch (error) {
        console.error('Error removing from cart:', error);
      }
    }
  };

  const isInWishlist = (productId) => {
    if (wishlistItems === undefined) {
      return null;
    }
    return wishlistItems.some((item) => item?._id === productId);
    };
  const isInCart = (productId) => {
    if (cartItems === undefined) {
      return null;
    }
    return cartItems?.some((item) => item?.productId?._id === productId);
    };

  const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };

  // dummy data and fn's
  const [productsD, setProductsD] = useState([]);

  useEffect(() => {
   
  
      setProductsD(dummyProducts);
 
  }, []);

  return (
    <>
      <MiddleNav notification={notif} />
{
  loadScreenState ? (
    <LoadingScreen/>
  )  : (
    <section className="products-section py-5">
    <Container>
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Products
      </motion.h2>
      <Row>
      {products?.map((item, index) => (
        <Col key={item?._id} md={4} className="mb-4">
          <motion.div 
            className="product-card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link to={`/product/${item._id}`} className="product-link">
              <div className="product-image">
                <img src={`${import.meta.env.VITE_API_BASE_URL_LOCALHOST}/uploads/${item?.image[0]}`} alt={item?.name} className="img-fluid" />
              </div>
              <div className="product-info">
                <h3 className="product-title">{item?.name}</h3>
                <div className="price-info">
                  <span className="current-price">₹{item?.sale_rate}</span>
                  <span className="original-price">₹{item?.price}</span>
                  <span className="discount-badge">{item?.discount}% off</span>
                </div>
                <p className="product-quantity"> {truncateText(item?.subheading, 20)} </p>
              </div>
            </Link>
            <div className="product-actions">
              {
! isInWishlist(item?._id) ?  <button className="btn btn-outline-success btn-sm"  onClick={ ()=> addWishlist(item?._id)}>
<i className="fa-solid fa-heart"></i>
</button>   :
<button className="btn btn-outline-danger btn-sm" onClick={()=> removeWishlist(item?._id)}>
<i className="fa-solid fa-heart"></i>
</button>

              }
             
             {
               ! isInCart(item?._id)?  (
          
            <button className="btn btn-success btn-sm" onClick={() => addCart(item?._id)} disabled={loading[item?._id]}>
                  {loading[item?._id] ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  ) : (
                    <>
                      <i className="fas fa-shopping-cart"></i> Add to Cart
                    </>
                  )}
                </button>
            ) :
        (    <button className="btn btn-warning btn-sm" onClick={()=> navigate('/cart')}>
            <i className="fas fa-shopping-cart"></i> Go to Cart
          </button> )
             }


              

            </div>
          </motion.div>
        </Col>
      ))}
    </Row>
    <div className='text-center mt-4 p-5'>
        {!loadProd.length <=0 &&  <button className='btn btn-success' onClick={onLoad}>Load More</button>}
        </div>
    </Container>
  </section>
  )
}

     
      <Footer />
    </>
  );
};

export default Allproducts;
