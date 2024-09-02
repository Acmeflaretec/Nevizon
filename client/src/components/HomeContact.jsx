import React from 'react';
import { Link } from 'react-router-dom';
import './HomeContact.css'; // Ensure to create this CSS file

function HomeContact() {
  return (
    <section className="home-contact py-5">
      <div className="container text-center">
        <h2 className="mb-4">Get In Touch</h2>
        <p className="mb-4">
          Have questions about our products or need assistance? We're here to help! Reach out to us for any inquiries or support.
        </p>
        <Link to="/contact" className="btn btn-primary">
          Contact Us
        </Link>
      </div>
    </section>
  );
}

export default HomeContact;
