import React, { useState,useEffect } from 'react'
import axiosInstance from '../axios'
import { useSelector } from 'react-redux';
import { Col, Row, Card, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaMapMarkerAlt, FaShoppingBag } from 'react-icons/fa';
import Footer from '../components/Footer';
import MiddleNav from '../components/MiddleNav';
import ManageAddress from './ManageAddress';
import './Profile.css';
import ProfileInfo from './ProfileInfo';
import proImg from '../assets/images/pro2.png'
import LoadingScreen from '../components/loading/LoadingScreen';
import { Link } from "react-router-dom";


function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const userDetails = useSelector(state => state?.userDetails);
  const [loadScreenState, setLoadScreenState] = useState(true); // Loading state

  const handleTabChange = (tab) => {
    if (tab === 'orders') {
      navigate('/order');
    } else {
      setActiveTab(tab);
    }
  };

  useEffect(() => {
    const delay = 500;  // Set the duration of the loading simulation in milliseconds (e.g., 2000ms)

    // Simulate a loading delay with setTimeout
    const timeout = setTimeout(() => {
      setLoadScreenState(false);  // Set the loading state to false after the delay
    }, delay);

    // Clean up the timeout to prevent memory leaks
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="profile-page">
      <MiddleNav />
{
 loadScreenState ? (
  <LoadingScreen/>
)  : (
<div className="container py-5">
        <Row>
          <Col lg={3}>
            <Card className="profile-sidebar mb-4">
              <Card.Body className="text-center">
                <img
                  src={proImg}
                  alt="User"
                  className="rounded-circle img-thumbnail mb-3"
                  width="150"
                />
                <h4 className="mb-0">{userDetails?.username}</h4>
                <p className="text-muted">{userDetails?.email} </p>
                <Link to="/email" className="text-primary">
                  Change password
                </Link>
              </Card.Body>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link
                    active={activeTab === 'profile'}
                    onClick={() => handleTabChange('profile')}
                  >
                    <FaUser className="me-2" /> Profile Information
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    active={activeTab === 'address'}
                    onClick={() => handleTabChange('address')}
                  >
                    <FaMapMarkerAlt className="me-2" /> Manage Address
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link onClick={() => handleTabChange('orders')}>
                    <FaShoppingBag className="me-2" /> My Orders
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card>
          </Col>
          <Col lg={9}>
            <Card>
              <Card.Body>
                {activeTab === 'profile' && <ProfileInfo />}
                {activeTab === 'address' && <ManageAddress />}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
)

}

      
      <Footer />
    </div>
  );
}

export default Profile;