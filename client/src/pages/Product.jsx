import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../axios'
import { useSelector } from 'react-redux';
import { Button, Col, Container, Image, Row, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import MiddleNav from '../components/MiddleNav';
import Review from '../components/Review';
import './Product.css';
import LoadingScreen from '../components/loading/LoadingScreen';

function Product() {
  const [buyNowLoading, setBuyNowLoading] = useState({});
  const [loading, setLoading] = useState({});
  const [loadScreenState, setLoadScreenState] = useState(true); // Loading state

  const [selectedImage, setSelectedImage] = useState(0);
  const [productData, setProductData] = useState([])
  const navigate = useNavigate();
  const { proId } = useParams();


  const [cartItemsData, setCartItemsData] = useState([]);
  const userDetails = useSelector(state => state?.userDetails);
  const [notif, setNotif] = useState(true)




  //  for specific product 
  const fetchProductData = async () => {

    try {
      const urlQuery = `/products/${proId}`
      const response = await axiosInstance.get(urlQuery);
      setProductData(response?.data?.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoadScreenState(false); // Set loading to false after data is fetched
    }

  }

  useEffect(() => {

    fetchProductData()
    fetchCartData()

  }, [proId, notif])

  const fetchCartData = async () => {
    console.log('reached fetch cart 2')
    try {
      const cartResponse = await axiosInstance.get('/user/getcarts');
      setCartItemsData(cartResponse?.data?.data?.item);
    } catch (error) {
      console.log(error);
    }
  };

  const addCartData = async (proId1) => {

    setLoading(prev => ({ ...prev, [proId1]: true }));

    if (!userDetails) {
      navigate('/login')
    } else {

      try {
        const urlQuery = `/user/addToCart/${proId1}`
        const response = await axiosInstance.patch(urlQuery);
        await fetchCartData()
        setNotif(prev => !prev);
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(prev => ({ ...prev, [proId1]: false }));
        await fetchCartData()
      }
    }
  }

  const removeCartData = async (proId1) => {
    if (!userDetails) {
      navigate('/login')
    } else {
      try {
        const ItemId = cartItemsData?.filter((item) => item?.productId?._id == proId1)
        const urlQuery = `/user/removeFromCart/${ItemId[0]?._id}`
        const response = await axiosInstance.patch(urlQuery);
        await fetchCartData()
        setNotif(prev => !prev);
      } catch (error) {
        console.log(error)
      }
    }
  }

  const isInCartData = (productId) => {
    if (cartItemsData === undefined) {
      return null;
    }
    return cartItemsData?.some((item) => item?.productId?._id === productId);
  };

  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
  };

  //Buy now
  const handleBuyNow = async (proId1) => {
    setBuyNowLoading(prev => ({ ...prev, [proId1]: true }));
    if (!userDetails) {
      navigate('/login')
    } else {
      try {
        const urlQuery = `/user/addToCart/${proId1}`
        const response = await axiosInstance.patch(urlQuery);
        await fetchCartData()
        setNotif(prev => !prev);
        navigate('/checkout')
      } catch (error) {
        console.log(error)
      } finally {
        setBuyNowLoading(prev => ({ ...prev, [proId1]: false }));
        await fetchCartData()
      }
    }

  }

  return (
    <>
      <MiddleNav notification={notif} />
      {
        loadScreenState ? (
          <LoadingScreen />
        ) : (
          <Container className="product-details-container my-5">
            <Row>
              {/* Image Gallery */}
              <Col lg={6} className="mb-4">
                {/* <Carousel interval={null} slide={false}>
                  {productData.image && productData?.image?.map((image, index) => (
                    <Carousel.Item key={index}>
                      <Image
                        src={`${import.meta.env.VITE_API_BASE_URL_LOCALHOST}/uploads/${image}`}
                        alt={`Thumbnail ${index}`}
                        fluid
                        className="carousel-image"
                        onClick={() => handleThumbnailClick(index)}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel> */}
                <Carousel interval={null} slide={false}>
                  {productData?.image?.map((media, index) => {
                    const isVideo = /\.(mp4|webm|ogg)$/i.test(media);
                    return (
                      <Carousel.Item key={index}>
                        {isVideo ? (
                          <video
                            src={`${import.meta.env.VITE_API_BASE_URL_LOCALHOST}/uploads/${media}`}
                            controls
                            autoPlay
                            muted
                            loop
                            className="carousel-video"
                            style={{ width: "100%", height: "auto" }}
                          />
                        ) : (
                          <Image
                            src={`${import.meta.env.VITE_API_BASE_URL_LOCALHOST}/uploads/${media}`}
                            alt={`Thumbnail ${index}`}
                            fluid
                            className="carousel-image"
                            onClick={() => handleThumbnailClick(index)}
                          />
                        )}
                      </Carousel.Item>
                    );
                  })}
                </Carousel>
              </Col>

              {/* Product Info */}
              <Col lg={6}>
                <div className="product-info">
                  <h1 className="product-name">{productData.name}</h1>
                  <div className="product-price">
                    <span className="text-muted mrp">MRP: ₹{productData.price}</span>
                    <span className="h3 fw-bold">₹{productData.sale_rate}</span>
                    <span className="text-success discount">({productData.discount}% OFF)</span>
                  </div>
                  <p className="text-muted small mb-4">Inclusive of all taxes</p>

                  <div className="product-benefits mb-4">
                    <h5 className="mb-3">Key Benefits:</h5>
                    <ul className="list-unstyled">
                      {productData?.benefits?.map((benefit, index) => (
                        <li key={index} className="mb-2">
                          <i className="fas fa-check-circle text-success me-2"></i>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="d-grid gap-2">
                    {/* <Link to={userDetails ?  `/checkout` : `/login`} className="btn btn-success btn-lg">Buy Now</Link> */}
                    <button className="btn btn-success btn-lg w-100 mt-4" onClick={() => handleBuyNow(proId)}
                    >
                      {buyNowLoading[proId] ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      ) : (
                        <>
                          <i className="fas fa-shopping-cart"></i> Buy Now
                        </>
                      )}
                    </button>

                    {/* {
              !isInCartData(proId) ? 
              <Button variant="outline-success" size="lg"
               onClick={() => addCartData(proId)}  >Add to Cart</Button>
               :
                <Button variant="outline-danger" size="lg" onClick={() => removeCartData(proId)}>Remove from Cart</Button>
            } */}
                    {
                      !isInCartData(proId) ? (

                        <Button variant="outline-success" size="lg" onClick={() => addCartData(proId)}
                          disabled={loading[proId]}>
                          {loading[proId] ? (
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                          ) : (
                            <>
                              <i className="fas fa-shopping-cart"></i> Add to Cart
                            </>
                          )}
                        </Button>
                      ) :
                        (<Button variant="outline-warning" size="lg" onClick={() => navigate('/cart')}>
                          <i className="fas fa-shopping-cart"></i> Go to Cart
                        </Button>)
                    }

                  </div>
                </div>
              </Col>
            </Row>

            {/* Product Description */}
            <Row className="mt-5">
              <Col>
                <div className="product-description">
                  <h2 className="mb-3">Product Description</h2>
                  <p>{productData.description}</p>
                </div>
              </Col>
            </Row>

            {/* Reviews */}
            <Row className="mt-5">
              <Col>
                <Review productId={productData._id} />
              </Col>
            </Row>
          </Container>
        )

      }


      <Footer />
    </>
  );
}

export default Product;
