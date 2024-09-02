import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Alert,
  Button,
  Spinner,
  Image,
  Card,
} from "react-bootstrap";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axiosInstance from "../../axios";
import { FaLock, FaEnvelope, FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";

function Otp() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [resent, setResent] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds
  const [open, setOpen] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userDetails, setUserDetails] = useState({
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailParam = params.get("email");
    setEmail(emailParam);
  }, [location]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const sendOtp = async () => {
    try {
      await axiosInstance.post("/user/sendOtp", { email });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value;
    setOtp(value);
    if (value.length === 6) {
      setError("");
      handleSubmit(value);
    } else {
      setError("Please enter a valid 6-digit code.");
    }
  };

  const handleSubmit = async (otpValue) => {
    try {
      const response = await axiosInstance.post("/user/compareOtp", {
        email,
        otp: otpValue,
      });
      if (response.status === 200) {
        setOpen(false);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else if (response.status === 400) {
        setError(response?.data?.message);
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const handleResend = () => {
    sendOtp();
    setResent(true);
    setTimeLeft(180);
    setTimeout(() => setResent(false), 3000);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (userDetails.confirmPassword !== userDetails.password) {
      setErrorMessage("Both passwords should be the same");
      setIsLoading(false);
      return; // Stop further processing
    }

    try {
      await axiosInstance.post("/auth/changepassword", {
        email,
        newPassword: userDetails.confirmPassword,
      });
      navigate("/login");
    } catch (error) {
      setErrorMessage(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      <header
        style={{
          backgroundColor: "#ffffff",
          boxShadow: "0 2px 4px rgba(0,0,0,.1)",
          padding: "1rem 0",
        }}
      >
        <Container>
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
            <div style={{ color: "#28a745", display: "flex", alignItems: "center" }}>
              <FaLock style={{ marginRight: "0.5rem" }} />
              <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                Secure Verification
              </span>
            </div>
          </div>
        </Container>
      </header>

      <Container className="py-5">
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6} xl={5}>
            <Card
              style={{
                borderRadius: "10px",
                boxShadow: "0 6px 8px rgba(0,0,0,.15)",
                padding: "2.5rem",
                marginBottom: "1.5rem",
              }}
            >
              <Card.Body>
                {open ? (
                  <>
                    <h2
                      style={{
                        textAlign: "center",
                        marginBottom: "1.5rem",
                        color: "#333",
                        fontWeight: "600",
                      }}
                    >
                      Verify Your Email
                    </h2>
                    <p
                      style={{
                        textAlign: "center",
                        marginBottom: "2rem",
                        fontSize: "1rem",
                        color: "#555",
                      }}
                    >
                      We sent a six-digit confirmation code to <strong>{email}</strong>.
                      Please enter it below to confirm your email address.
                    </p>
                    <Form>
                      <Form.Group controlId="formOtp" className="mb-4">
                        <Form.Label className="fw-bold">OTP</Form.Label>
                        <div style={{ position: "relative" }}>
                          <Form.Control
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={handleOtpChange}
                            maxLength="6"
                            isInvalid={!!error && otp.length !== 6}
                            style={{ paddingLeft: "2.5rem" }}
                          />
                          <FaEnvelope
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "0.75rem",
                              transform: "translateY(-50%)",
                              color: "#6c757d",
                            }}
                          />
                        </div>
                        {error && otp.length !== 6 && (
                          <Form.Text className="text-danger">{error}</Form.Text>
                        )}
                      </Form.Group>
                    </Form>
                    {success && (
                      <Alert variant="success" className="text-center">
                        OTP verified successfully!
                      </Alert>
                    )}
                    <div style={{ textAlign: "center", marginTop: "1rem" }}>
                      <p>
                        Didn't receive a code?{" "}
                        <Button
                          variant="link"
                          onClick={handleResend}
                          disabled={timeLeft !== 0}
                          style={{ fontWeight: "600", padding: 0 }}
                        >
                          Send code again
                        </Button>
                      </p>
                      {resent && (
                        <Alert variant="success" className="text-center">
                          Code resent successfully!
                        </Alert>
                      )}
                      <p>
                        Time left: <span className="fw-bold">{formatTime(timeLeft)}</span>
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <h2
                      style={{
                        textAlign: "center",
                        marginBottom: "1.5rem",
                        color: "#333",
                        fontWeight: "600",
                      }}
                    >
                      Reset Password
                    </h2>
                    {errorMessage && (
                      <Alert variant="danger" className="text-center">
                        {errorMessage}
                      </Alert>
                    )}
                    <Form onSubmit={handleChangePassword}>
                      <Form.Group className="mb-4" controlId="formBasicPassword">
                        <Form.Label className="fw-bold">New Password</Form.Label>
                        <div style={{ position: "relative" }}>
                          <Form.Control
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter new password"
                            name="password"
                            value={userDetails.password}
                            onChange={handleChange}
                            required
                            style={{ paddingLeft: "2.5rem" }}
                          />
                          <FaLock
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "0.75rem",
                              transform: "translateY(-50%)",
                              color: "#6c757d",
                            }}
                          />
                          <Button
                            variant="link"
                            onClick={handlePasswordVisibility}
                            style={{
                              position: "absolute",
                              top: "50%",
                              right: "0.75rem",
                              transform: "translateY(-50%)",
                              color: "#6c757d",
                              padding: 0,
                            }}
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </Button>
                        </div>
                      </Form.Group>

                      <Form.Group className="mb-4" controlId="formBasicConfirmPassword">
                        <Form.Label className="fw-bold">Confirm New Password</Form.Label>
                        <div style={{ position: "relative" }}>
                          <Form.Control
                            type={showPassword2 ? "text" : "password"}
                            placeholder="Confirm new password"
                            name="confirmPassword"
                            value={userDetails.confirmPassword}
                            onChange={handleChange}
                            required
                            style={{ paddingLeft: "2.5rem" }}
                          />
                          <FaLock
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "0.75rem",
                              transform: "translateY(-50%)",
                              color: "#6c757d",
                            }}
                          />
                          <Button
                            variant="link"
                            onClick={handlePasswordVisibility2}
                            style={{
                              position: "absolute",
                              top: "50%",
                              right: "0.75rem",
                              transform: "translateY(-50%)",
                              color: "#6c757d",
                              padding: 0,
                            }}
                          >
                            {showPassword2 ? <FaEyeSlash /> : <FaEye />}
                          </Button>
                        </div>
                      </Form.Group>

                      <Button
                        variant="primary"
                        type="submit"
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          fontSize: "1.1rem",
                          fontWeight: "600",
                        }}
                        disabled={isLoading}
                      >
                        {isLoading ? <Spinner as="span" animation="border" size="sm" /> : "Reset Password"}
                      </Button>
                    </Form>
                  </>
                )}
              </Card.Body>
            </Card>

            <Link
              to="/login"
              className="d-flex justify-content-center align-items-center text-decoration-none"
              style={{ color: "#007bff", fontWeight: "600" }}
            >
              <FaArrowLeft className="me-2" />
              Back to Login
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Otp;
