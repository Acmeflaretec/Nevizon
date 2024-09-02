import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Form, Modal, ProgressBar, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Review.css';
import { useSelector } from 'react-redux';
import axiosInstance from '../axios';

function Review({ productId }) {
  const userDetails = useSelector((state) => state.userDetails);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 0,
    review: '',
  });
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [canWriteReview, setCanWriteReview] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosInstance.get(`/reviews/${productId}`);
        setReviews(response?.data?.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    const checkCanWriteReview = async () => {
      try {
        const response = await axiosInstance.get(`/orders/user/${userDetails?._id}/product/${productId}`);
        setCanWriteReview(response?.data?.canWriteReview);
      } catch (error) {
        console.error('Error checking if user can write review:', error);
      }
    };

    fetchReviews();
    if (userDetails) {
      checkCanWriteReview();
    }
  }, [productId, userDetails]);

  const handleOpenReviewModal = () => setShowReviewModal(true);
  const handleCloseReviewModal = () => setShowReviewModal(false);

  const handleReviewChange = (e) => {
    setNewReview({ ...newReview, [e.target.name]: e.target.value });
    setFormError('');
  };

  const handleSubmitReview = async () => {
    if (!newReview.name || newReview.rating === 0 || !newReview.review) {
      setFormError('All fields are required.');
      return;
    }

    try {
      const response = await axiosInstance.post(`/reviews`, {
        productId,
        userId: userDetails?._id,
        ...newReview,
      }, {
        headers: {
          Authorization: `Bearer ${userDetails?.token}`,
        },
      });

      setReviews([response?.data?.data, ...reviews]);
      setNewReview({ name: '', rating: 0, review: '' });
      handleCloseReviewModal();
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleReadMore = () => {
    setShowAllReviews(true);
  };

  const totalReviews = reviews?.length;
  const ratingCounts = [0, 0, 0, 0, 0];
  reviews?.forEach((review) => {
    ratingCounts[review?.rating - 1]++;
  });

  const totalRating = reviews?.reduce((sum, review) => sum + review?.rating, 0);
  const averageRating = (totalRating / totalReviews).toFixed(1);

  const displayedReviews = showAllReviews ? reviews : reviews?.slice(0, 4);

  return (
    <div className="review-section mt-5">
      <h1 className="text-center mb-4 fw-bold text-red">Customer Reviews</h1>
      <Row className="mb-4">
        <Col md={4}>
          <Card className="rating-summary-card">
            <Card.Body>
              <Card.Title className="fw-bold mb-3 text-red">Ratings & Reviews</Card.Title>
              <Row>
                <Col className="text-center">
                  <div className="rating-summary">
                    <h1 className="text-red">{totalReviews > 0 ? averageRating : '0'}</h1>
                    <div>
                      {[...Array(5)].map((_, index) => (
                        <i
                          key={index}
                          className={`fas fa-star ${index < Math.floor(averageRating) ? 'text-red' : 'text-muted'}`}
                        />
                      ))}
                    </div>
                    <small className="text-red">{totalReviews} ratings</small>
                  </div>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <div>
                    <h5 className="fw-bold text-red">Review this product</h5>
                    <p className="text-muted">Help others make an informed decision</p>
                  </div>
                  <Button
                    variant="outline-danger"
                    className="rounded-pill w-100 p-2 mt-2"
                    onClick={handleOpenReviewModal}
                    disabled={!canWriteReview}
                  >
                    Write a Review
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title className="text-red">Reviews from customers</Card.Title>
              {displayedReviews?.map((review) => (
                <div key={review?._id} className="mb-4">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <div>
                      <div>
                        {[...Array(5)].map((_, index) => (
                          <i
                            key={index}
                            className={`fas fa-star ${index < review?.rating ? 'text-red' : 'text-muted'}`}
                          />
                        ))}
                      </div>
                      <span className="me-2 fw-bold">{review?.name}</span>
                    </div>
                    <div>
                      <small className="me-auto">{new Date(review.date).toLocaleString()}</small>
                    </div>
                  </div>
                  <p>{review?.review}</p>
                </div>
              ))}
              {!showAllReviews && (
                <div className="text-center">
                  <Button variant="outline-danger" onClick={handleReadMore}>
                    Read More Reviews
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showReviewModal} onHide={handleCloseReviewModal}>
        <Modal.Header closeButton>
          <Modal.Title className="text-red">Write a Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newReview?.name}
                onChange={handleReviewChange}
                placeholder="Enter your name"
              />
            </Form.Group>
            <Form.Group controlId="formRating" className="mt-3">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                as="select"
                name="rating"
                value={newReview?.rating}
                onChange={handleReviewChange}
              >
                <option value={0}>Select rating</option>
                <option value={1}>1 star</option>
                <option value={2}>2 stars</option>
                <option value={3}>3 stars</option>
                <option value={4}>4 stars</option>
                <option value={5}>5 stars</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formReview" className="mt-3">
              <Form.Label>Review</Form.Label>
              <Form.Control
                as="textarea"
                name="review"
                value={newReview?.review}
                onChange={handleReviewChange}
                rows={3}
                placeholder="Write your review"
              />
            </Form.Group>
            {formError && <p className="text-danger mt-3">{formError}</p>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseReviewModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleSubmitReview}>
            Submit Review
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Review;
