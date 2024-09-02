import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import { Card, Col, Container, Row, Table, Badge } from 'react-bootstrap';
import { FaBox, FaShippingFast, FaTruck, FaCheckCircle } from 'react-icons/fa';
import Footer from '../components/Footer';
import MiddleNav from '../components/MiddleNav';
import { useParams } from 'react-router-dom';
import './SingleOrder.css';
import LoadingScreen from '../components/loading/LoadingScreen';

function SingleOrder() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('order_confirmed');
  const { orderId } = useParams();
  const [ordersData, setOrdersData] = useState({});
  const [address, setAddress] = useState({});
  const [productsData, setProductsData] = useState([]);
  const [loadScreenState, setLoadScreenState] = useState(true);

  const fetchOrderData = async () => {
    try {
      const response = await axiosInstance.get(`/orders/getorderbyid/${orderId}`);
      setOrdersData(response?.data?.data);
      setAddress(response?.data?.data?.address);
      setProductsData(response?.data?.data?.products?.item);
    } catch (error) {
      console.error('Error fetching order data:', error);
    } finally {
      setLoadScreenState(false);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  useEffect(() => {
    switch (ordersData?.status) {
      case 'Placed': setProgress(0); break;
      case 'Shipped': setProgress(33); break;
      case 'Out for delivery': setProgress(66); break;
      case 'Delivered': setProgress(100); break;
      default: setProgress(0);
    }
  }, [ordersData]);

  const renderProgressBar = () => {
    const steps = [
      { name: 'Order Confirmed', icon: <FaBox />, completed: progress >= 0 },
      { name: 'Shipped', icon: <FaShippingFast />, completed: progress >= 33 },
      { name: 'Out for Delivery', icon: <FaTruck />, completed: progress >= 66 },
      { name: 'Delivered', icon: <FaCheckCircle />, completed: progress >= 100 },
    ];

    return (
      <div className="progress-container my-5">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        {steps.map((step, index) => (
          <div
            key={index}
            className={`round-point ${step?.completed ? 'completed' : ''}`}
            style={{ left: `${index * 33}%` }}
          >
            <div className="icon-container">{step?.icon}</div>
            <p className="step-name">{step?.name}</p>
          </div>
        ))}
        <p className="current-status mt-5">{ordersData.status}</p>
      </div>
    );
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="single-order-page">
      <MiddleNav />
      {loadScreenState ? (
        <LoadingScreen />
      ) : (
        <Container className="py-5">
          <h2 className="mb-4 text-center">Order Details</h2>
          
          <Card className="shadow-sm mb-5 p-5">
            <Card.Body>
              {renderProgressBar()}
            </Card.Body>
          </Card>

          <Row className="g-4">
            <Col lg={8}>
              <Card className="shadow-sm mb-4">
                <Card.Body className="p-4">
                  <h5 className="mb-4">Order Items</h5>
                  {ordersData?.products?.item?.map((item, index) => (
                    <div key={index} className="d-flex align-items-center mb-3 p-3 border rounded">
                      <img
                        src={`${import.meta.env.VITE_API_BASE_URL_LOCALHOST}/uploads/${item?.product_id?.image[0]}`}
                        alt=""
                        className="img-fluid rounded me-3"
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                      />
                      <div>
                        <h6 className="mb-2">{item?.product_id?.name}</h6>
                        <p className="mb-1 text-muted">Quantity: {item.quantity}</p>
                        <p className="mb-0 fw-bold">Price: ₹{item.price}</p>
                      </div>
                    </div>
                  ))}
                </Card.Body>
              </Card>

              <Card className="shadow-sm mb-4">
                <Card.Body className="p-4">
                  <h5 className="mb-4">Order Summary</h5>
                  <Table responsive borderless className="mb-0">
                    <tbody>
                      <tr>
                        <td>Order ID</td>
                        <td className="text-end"><strong>{ordersData?._id}</strong></td>
                      </tr>
                      <tr>
                        <td>Order Date</td>
                        <td className="text-end">{formatDate(ordersData?.createdAt)}</td>
                      </tr>
                      <tr>
                        <td>Status</td>
                        <td className="text-end">
                          <span bg="success" className="px-3 py-2 bg-success-subtle">{ordersData?.status}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>Total</td>
                        <td className="text-end"><h5 className="mb-0">₹{ordersData?.amount}</h5></td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={4}>
              <Card className="shadow-sm">
                <Card.Body className="p-4">
                  <h5 className="mb-4">Delivery Address</h5>
                  <p className="mb-2 fw-bold">{address?.firstname} {address?.lastname}</p>
                  <p className="mb-1">{address?.address_line_1}</p>
                  <p className="mb-1">{address?.address_line_2}</p>
                  <p className="mb-1">
                    {address?.city}, {address?.state} {address?.zip}
                  </p>
                  <p className="mb-0">{address?.Country}</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
      <Footer />
    </div>
  );
}

export default SingleOrder;