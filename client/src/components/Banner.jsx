import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import { motion } from 'framer-motion';
import './Banner.css';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import LoadingScreen from "../components/loading/LoadingScreen";

function Banner() {
  const [banner, setBanner] = useState([]);
  const [loadScreenState, setLoadScreenState] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/banners`);
        setBanner(response?.data?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadScreenState(false);
      }
    };
    fetchData();
  }, []);

  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      {loadScreenState ? (
        <LoadingScreen />
      ) : (
        <div className="banner">
          <div className="banner-overlay"></div>
          <div className="container">
            <div className="row align-items-center">
              <motion.div 
                className="col-lg-6 banner-content"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <h1 className="banner-title" style={{ textAlign: 'center' }}>
                    {banner[0]?.title}<br />
                  </h1>
                  <p className="banner-subtitle">
                    {banner[0]?.subtitle}
                  </p>
                  <Link to={'/allproducts'}>
                    <motion.button 
                      className="btn btn-primary btn-lg mt-4"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className='ban-button'>
                        Explore Products
                      </span>
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
              <motion.div
                className="col-lg-6 banner-image-container"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <Carousel activeIndex={index} onSelect={handleSelect}>
                  {banner?.map((item, idx) => (
                    <Carousel.Item key={idx}>
                      <img
                        src={`${import.meta.env.VITE_API_BASE_URL_LOCALHOST}/uploads/${item?.image}`}
                        alt="Eco-friendly products" 
                        className="img-fluid banner-image" 
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Banner;
