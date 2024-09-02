import React, { useState } from 'react';
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';
import { Col, Container, Row, Image, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { FaLock, FaUser, FaEnvelope, FaPhone, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import OtpComponent from '../../components/otpComponent/OtpComponent';

function Register() {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await axiosInstance.post("/user/checkRegisterEmail", { email: userDetails?.email });
      if (response.status === 200) {
        sendOtp();
        setOpen(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage(error?.response?.data?.message);
      } else {
        setErrorMessage(error?.response?.data?.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const sendOtp = async () => {
    try {
      await axiosInstance.post("/user/sendRegistrationOtp", { email: userDetails?.email });
    } catch (error) {
      console.log(error);
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <header style={{ backgroundColor: "#ffffff", boxShadow: "0 2px 4px rgba(0,0,0,.1)" }}>
        <Container className="py-3">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Image src="logo.png" fluid alt="Logo" style={{ maxWidth: '120px' }} />
            </Link>
            <div style={{ color: "#dc3545" }}>
              <FaLock style={{ marginRight: "0.5rem" }} />
              <span style={{ fontWeight: "bold" }}>Secure Sign Up</span>
            </div>
          </div>
        </Container>
      </header>
      
      {open ? (
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col xs={12} sm={10} md={8} lg={6} xl={5}>
              <div style={{ backgroundColor: "#ffffff", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,.1)", padding: "2rem" }}>
                <h2 style={{ textAlign: "center", marginBottom: "1.5rem", color: "#333" }}>Create an Account</h2>
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <div style={{ position: "relative" }}>
                      <Form.Control
                        type="text"
                        placeholder="Enter your username"
                        name="username"
                        required
                        value={userDetails.username}
                        onChange={handleChange}
                        style={{ paddingLeft: "2.5rem" }}
                      />
                      <FaUser style={{ position: "absolute", top: "50%", left: "0.75rem", transform: "translateY(-50%)", color: "#dc3545" }} />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <div style={{ position: "relative" }}>
                      <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        required
                        value={userDetails.email}
                        onChange={handleChange}
                        style={{ paddingLeft: "2.5rem" }}
                      />
                      <FaEnvelope style={{ position: "absolute", top: "50%", left: "0.75rem", transform: "translateY(-50%)", color: "#dc3545" }} />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPhone">
                    <Form.Label>Phone number</Form.Label>
                    <div style={{ position: "relative" }}>
                      <Form.Control
                        type="tel"
                        placeholder="Enter your phone number"
                        name="phone"
                        required
                        value={userDetails.phone}
                        onChange={handleChange}
                        style={{ paddingLeft: "2.5rem" }}
                      />
                      <FaPhone style={{ position: "absolute", top: "50%", left: "0.75rem", transform: "translateY(-50%)", color: "#dc3545" }} />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <div style={{ position: "relative" }}>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        name="password"
                        required
                        value={userDetails.password}
                        onChange={handleChange}
                        style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                      />
                      <FaLock style={{ position: "absolute", top: "50%", left: "0.75rem", transform: "translateY(-50%)", color: "#dc3545" }} />
                      <div
                        onClick={handlePasswordVisibility}
                        style={{ position: "absolute", top: "50%", right: "0.75rem", transform: "translateY(-50%)", cursor: "pointer", color: "#dc3545" }}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </div>
                    </div>
                  </Form.Group>

                  <Button
                    variant="danger"
                    type="submit"
                    disabled={isLoading}
                    style={{ width: "100%", marginTop: "1rem", backgroundColor: "#dc3545", borderColor: "#dc3545" }}
                  >
                    {isLoading ? <Spinner animation="border" size="sm" /> : 'Sign Up'}
                  </Button>
                </Form>

                <div style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "0.875rem" }}>
                  Already have an account?{" "}
                  <Link to="/login" style={{ color: "#dc3545", textDecoration: "none", fontWeight: "bold" }}>
                    Sign in
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      ) : (
        <OtpComponent emailId={userDetails.email} setOpen={setOpen} type='register' userDetails={userDetails} />
      )}
    </div>
  );
}

export default Register;
