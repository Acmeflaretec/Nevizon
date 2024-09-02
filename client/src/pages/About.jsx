import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import Footer from '../components/Footer';
import MiddleNav from '../components/MiddleNav';

const About = () => {
  return (
    <>
      <MiddleNav />
      <div className="bg-light py-5">
        <Container>
          <Row className="justify-content-center align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <Image
                src="who.jpg"
                alt="About"
                fluid
                rounded
                className="shadow-lg"
              />
            </Col>
            <Col lg={6}>
              <div className="px-lg-4">
                <h2 className="fw-bold mb-4">About Us</h2>
                <p className="lead">
                Welcome to Nevizon, your trusted partner in bringing joy, learning, and creativity to children’s lives. At Nevizon, we believe that play is an essential part of a child's development. That’s why we are dedicated to offering an extensive range of high-quality, carefully curated toys that not only entertain but also stimulate the imagination and enhance learning.




                </p>
                <p>
               
Founded with a passion for providing the best toys in the market, Nevizon has become a go-to destination for parents seeking safe, innovative, and fun products for their children. We understand that every child is unique, with different interests and developmental needs, which is why our collection includes a diverse array of toys—from educational tools that encourage cognitive growth to playful items that spark creativity and adventure.
                </p>
                <p>
                  
Our commitment to quality is unwavering. We work closely with reputable manufacturers to ensure that every toy we offer meets the highest standards of safety and durability. We take pride in offering toys that are made from non-toxic, eco-friendly materials, giving parents peace of mind while their children explore and play.
                </p>
                <p>
                At Nevizon, we also recognize the importance of convenience in today’s busy world. Our user-friendly website is designed to make shopping easy and enjoyable, with detailed product descriptions, customer reviews, and helpful filters to guide you to the perfect toy. Whether you’re shopping for a birthday, holiday, or just because, we’re here to help you find exactly what you need.
                </p>
                <p>
           
But Nevizon is more than just a toy store—we’re a community. We are dedicated to building lasting relationships with our customers by providing exceptional service and support. Our customer care team is always ready to assist with any inquiries, ensuring that your shopping experience is smooth from start to finish.
                </p>
                <p>



                Thank you for choosing Nevizon. We are excited to be a part of your child’s journey, bringing smiles, laughter, and learning to playtime. Explore our collection today and discover why Nevizon is the ultimate destination for toys that inspire, educate, and delight!
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default About;
