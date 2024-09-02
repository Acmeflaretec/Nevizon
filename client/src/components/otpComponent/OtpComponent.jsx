import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Alert, Button, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../../axios";

function OtpComponent({ emailId, setOpen, type, userDetails }) {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [error2, setError2] = useState('');
  const [resent, setResent] = useState(false);
  const [success, setSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const sendOtp = async () => {
    try {
      if (type === 'register') {
        await axiosInstance.post("/user/sendRegistrationOtp", { email: emailId });
      } else {
        await axiosInstance.post("/user/sendOtp", { email: emailId });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value;
    setOtp(value);
    if (value.length === 6) {
      setError('');
      handleSubmit(value);
    } else {
      setError('Please enter a valid 6-digit code.');
    }
  };

  const handleSubmit = async (otpValue) => {
    try {
      if (type === 'register') {
        userDetails.clientOtp = otpValue;
        const response = await axiosInstance.post('/auth/register', userDetails);
        if (response?.data?.data?.signupStatus) {
          navigate('/login');
        }
      } else {
        const response = await axiosInstance.post("/user/compareOtp", { email: emailId, otp: otpValue });
        if (response.status === 200) {
          setOpen(false);
          setSuccess(true);
          setTimeout(() => setSuccess(false), 3000);
        } else if (response.status === 400) {
          setError2(response?.data?.message);
        }
      }
    } catch (error) {
      setError2(error?.response?.data?.message || 'An error occurred');
    }
  };

  const handleResend = () => {
    sendOtp();
    setResent(true);
    setTimeLeft(180); // Reset the timer
    setTimeout(() => setResent(false), 3000);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <Container className="d-flex justify-content-center align-items-center bg-light" style={{ height: '80vh' }}>
      <Row className="justify-content-center">
        <Col md="6">
          <div
            className="p-4 shadow-sm"
            style={{
              borderRadius: '10px',
              backgroundColor: '#ffffff',
              color: '#333',
            }}
          >
            <h2 className="mb-4 text-center text-success">Verify Your Email</h2>
            <p className="text-center mb-4">We sent a six-digit confirmation code to <strong>{emailId}</strong>. Please enter it below to confirm your email address.</p>
            <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(otp); }}>
              <Form.Group controlId="formOtp" className="mb-4">
                <Form.Label>OTP</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={handleOtpChange}
                  maxLength="6"
                  isInvalid={!!error && otp.length !== 6}
                />
                <Form.Text className="text-danger">{error || error2}</Form.Text>
              </Form.Group>
              {success && <Alert variant="success" className="text-center">OTP verified successfully!</Alert>}
              <div className="text-center mt-3">
                <p className="mb-1">Didn't receive a code? <Button variant="link" onClick={handleResend} disabled={timeLeft !== 0}>Send code again</Button></p>
                {resent && <Alert variant="success">Code resent successfully!</Alert>}
                <p className="mb-0">Time left: <span className="text-danger">{formatTime(timeLeft)}</span></p>
              </div>
              <div className="text-center mt-3">
                <Button variant="link" onClick={() => navigate('/login')}>Back to login</Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default OtpComponent;
