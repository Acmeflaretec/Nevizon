import React from 'react';
import { motion } from 'framer-motion';
import './WhoAreWe.css'; // Custom styles
import { Link } from 'react-router-dom';

const WhoAreWe = () => {
  return (
    <section className="who-are-we">
      <div className="container">
        <div className="row align-items-center">
          <motion.div 
            className="col-lg-6 content-col"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title text-danger">Who Are We?</h2>
            <p className="section-text">
            Nevizon is your one-stop destination for the latest and most exciting toys for kids of all ages. From educational games to fun-filled playsets, we offer a wide range of high-quality toys that spark imagination and creativity. Explore our collection and find the perfect toys to inspire endless hours of joy and learning. At Nevizon, every toy is an adventure waiting to happen!
            </p>
            <Link to={'/about'}>
              <motion.button 
                className="btn btn-primary learn-more-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More About Us
              </motion.button>
            </Link>
          </motion.div>
          <motion.div 
            className="col-lg-6 image-col"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="image-wrapper">
              <img src="who.jpg" alt="Eco-friendly products" className="img-fluid rounded" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default WhoAreWe;
