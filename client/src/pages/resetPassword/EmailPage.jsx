import React, { useState } from "react";
import axiosInstance from "../../axios";
import { useNavigate } from "react-router-dom";
import {
  Col,
  Row,
  Container,
  Form,
  Button,
  Alert,
  Spinner,
  Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

function EmailPage() {
  const [userDetails, setUserDetails] = useState({
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

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
      const response = await axiosInstance.post("/user/checkemail", {
        email: userDetails?.email,
      });
      if (response.status === 200) {
        sendOtp();
        navigate(`/otp?email=${userDetails.email}`);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage(error?.response?.data?.message);
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const sendOtp = async () => {
    try {
      await axiosInstance.post("/user/sendOtp", {
        email: userDetails?.email,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <header
        style={{
          backgroundColor: "#ffffff",
          boxShadow: "0 2px 4px rgba(0,0,0,.1)",
        }}
      >
        <Container className="py-3">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link to="/" style={{ textDecoration: "none" }}>
              <Image
                src="logo.png"
                fluid
                alt="Logo"
                style={{ maxWidth: "120px" }}
              />
            </Link>
            <div style={{ color: "#dc3545" }}>
              <FaLock style={{ marginRight: "0.5rem" }} />
              <span style={{ fontWeight: "bold" }}>Forgot Password</span>
            </div>
          </div>
        </Container>
      </header>

      <Container className="py-5">
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6} xl={5}>
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0,0,0,.1)",
                padding: "2rem",
              }}
            >
              <h2
                style={{
                  textAlign: "center",
                  marginBottom: "1.5rem",
                  color: "#333",
                }}
              >
                Forgot Your Password?
              </h2>
              <p style={{ textAlign: "start", marginBottom: "1.5rem", color: "#666" }}>
                Enter your email below, and we'll send you a code to log in and reset your password.
              </p>
              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <div style={{ position: "relative" }}>
                    <Form.Control
                      type="email"
                      name="email"
                      required
                      value={userDetails.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      style={{ paddingLeft: "2.5rem" }}
                    />
                    <FaEnvelope
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "0.75rem",
                        transform: "translateY(-50%)",
                        color: "#dc3545",
                      }}
                    />
                  </div>
                </Form.Group>

                <Button
                  variant="danger"
                  type="submit"
                  disabled={isLoading}
                  style={{
                    width: "100%",
                    marginTop: "1rem",
                    backgroundColor: "#dc3545",
                    borderColor: "#dc3545",
                  }}
                >
                  {isLoading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>
              </Form>

              <div
                style={{
                  marginTop: "1.5rem",
                  textAlign: "center",
                  fontSize: "0.875rem",
                }}
              >
                Remember your password?{" "}
                <Link
                  to="/login"
                  style={{
                    color: "#dc3545",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >
                  Back to login
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default EmailPage;
