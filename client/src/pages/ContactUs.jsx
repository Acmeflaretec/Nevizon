import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Footer from '../components/Footer';
import MiddleNav from '../components/MiddleNav';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can implement your logic here, such as sending the form data to a backend server
    console.log(formData);
    // Clear form fields after submission
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <>
      <MiddleNav />
      <div className="bg-light py-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="text-center mb-5">
                <h2 className="fw-bold">Contact Us</h2>
                <p className="lead">We would love to hear from you!</p>
              </div>
              <Row>
                <Col md={6} className="mb-4">
                  <div className="contact-info">
                    <h3 className="fw-bold">Contact Details</h3>
                    {/* <p>123 Street Name</p> */}
                    <p>Ground floor 32/1066.5.6
                      Town plaza building. Near Up. Complex, Calicut road. Perinthalmanna.
                      Kerala.32, pin: 679322
                    </p>
                    <p>Email: jhagencies.pmna@gmail.com</p>
                    <p>Phone:  +918124666888, +917025853489 </p>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="embed-responsive embed-responsive-16by9">
                    {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d229384.09230961194!2d76.38925131870016!3d9.924207270217979!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0812ffd49cf55b%3A0x64bd90fbed387c99!2sKerala!5e0!3m2!1sen!2sin!4v1720519875154!5m2!1sen!2sin" style={{ width: '100%', height: '400px' }}></iframe> */}
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31334.485547672874!2d76.20965405591485!3d10.977657157730706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7cc529833b09b%3A0x1635a9815f140cc2!2sPerinthalmanna%2C%20Kerala!5e0!3m2!1sen!2sin!4v1727074568607!5m2!1sen!2sin" style={{ width: '100%', height: '400px' }}></iframe>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
