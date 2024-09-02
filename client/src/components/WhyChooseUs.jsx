import React from 'react';
import { motion } from 'framer-motion';
import './WhyChooseUs.css';

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: 'gamepad',
      title: ' Diverse Selection',
      description: 'At Nevizon, we offer a vast range of toys that cater to all ages and interests. Whether your child loves action figures, educational games, or creative playsets, you will find something that suits their personality and ignites their imagination.',
    },
    {
      icon: 'users',
      title: ' Exceptional Customer Service',
      description: ' We believe in providing a seamless shopping experience, from browsing to delivery. Our dedicated customer service team is always ready to assist you with any queries, ensuring you have a pleasant and hassle-free experience every time you shop with us.',
    },
    {
      icon: 'award',
      title: 'High-Quality Toys',
      description: 'Our toys are crafted from durable, safe, and non-toxic materials, ensuring that your child enjoys hours of fun without any safety concerns. We carefully select every item to meet the highest standards of quality.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <section className="why-choose-us">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Why Choose Us?
        </motion.h2>
        <motion.div 
          className="row"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {reasons.map((reason, index) => (
            <motion.div key={index} className="col-lg-4 col-md-6" variants={itemVariants}>
              <div className="reason-card">
                <div className="icon-wrapper">
                  <i className={`fas fa-${reason.icon}`}></i>
                </div>
                <h3 className="reason-title">{reason.title}</h3>
                <p className="reason-description">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
