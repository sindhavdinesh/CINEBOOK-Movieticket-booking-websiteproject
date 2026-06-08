"use client";

import React, { useState } from "react";
import { Row, Col, Form, Button, Modal, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faEnvelope, 
  faPhone, 
  faMapMarkerAlt, 
  faClock, 
  faCheckCircle,
  faPaperPlane
} from "@fortawesome/free-solid-svg-icons";

export default function ContactPage() {
  // Form fields states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // Error states
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Success Modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const validateForm = () => {
    const tempErrors = {};
    
    // Name validation
    if (!name.trim()) {
      tempErrors.name = "Full Name is required.";
    } else if (name.trim().length < 3) {
      tempErrors.name = "Name must be at least 3 characters long.";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      tempErrors.email = "Email address is required.";
    } else if (!emailRegex.test(email)) {
      tempErrors.email = "Please enter a valid email address (e.g. john@example.com).";
    }

    // Phone validation
    const phoneRegex = /^\d{10}$/;
    if (!phone) {
      tempErrors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(phone.replace(/\D/g, ""))) {
      tempErrors.phone = "Please enter a valid 10-digit phone number.";
    }

    // Message validation
    if (!message.trim()) {
      tempErrors.message = "Message content is required.";
    } else if (message.trim().length < 15) {
      tempErrors.message = "Message must be at least 15 characters long.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (validateForm()) {
      setShowSuccessModal(true);
      // Clear form
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setErrors({});
      setIsSubmitted(false);
    }
  };

  return (
    <div className="container py-3 animate-fade-in">
      <div className="mb-4">
        <span className="text-warning text-uppercase tracking-widest fw-bold small d-block mb-1">📬 CONNECT</span>
        <h1 className="text-gradient fw-bold">Contact CineBook</h1>
        <p className="text-secondary">Have questions or feedback? Drop us a message, and our support team will get back to you.</p>
      </div>

      <Row className="g-5">
        {/* Contact Information Column */}
        <Col xs={12} lg={5}>
          <div className="glass-panel p-4 h-100 d-flex flex-column justify-content-between">
            <div>
              <h3 className="fw-bold mb-4 text-warning">Contact Information</h3>
              <p className="text-secondary mb-5">Reach out to us directly through any of our official communication nodes. Our support staff is online 24/7 to process movie bookings and corporate inquiries.</p>
              
              <div className="d-flex align-items-start gap-3 mb-4">
                <div className="contact-icon-box rounded-3 bg-dark bg-opacity-40 border border-secondary border-opacity-10 text-warning">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="fs-5" />
                </div>
                <div>
                  <h6 className="fw-bold text-white mb-1">Location HQ</h6>
                  <p className="text-secondary small mb-0">742 Evergreen Terrace, Sector 4, Metropolis City</p>
                </div>
              </div>

              <div className="d-flex align-items-start gap-3 mb-4">
                <div className="contact-icon-box rounded-3 bg-dark bg-opacity-40 border border-secondary border-opacity-10 text-warning">
                  <FontAwesomeIcon icon={faPhone} className="fs-5" />
                </div>
                <div>
                  <h6 className="fw-bold text-white mb-1">Phone Helpline</h6>
                  <p className="text-secondary small mb-0">+1 (800) 555-CINE • +91 98765 43210</p>
                </div>
              </div>

              <div className="d-flex align-items-start gap-3 mb-4">
                <div className="contact-icon-box rounded-3 bg-dark bg-opacity-40 border border-secondary border-opacity-10 text-warning">
                  <FontAwesomeIcon icon={faEnvelope} className="fs-5" />
                </div>
                <div>
                  <h6 className="fw-bold text-white mb-1">Email Node</h6>
                  <p className="text-secondary small mb-0">support@cinebook.com • corporate@cinebook.com</p>
                </div>
              </div>

              <div className="d-flex align-items-start gap-3 mb-2">
                <div className="contact-icon-box rounded-3 bg-dark bg-opacity-40 border border-secondary border-opacity-10 text-warning">
                  <FontAwesomeIcon icon={faClock} className="fs-5" />
                </div>
                <div>
                  <h6 className="fw-bold text-white mb-1">Operating Hours</h6>
                  <p className="text-secondary small mb-0">Box Office: 09:00 AM - 11:30 PM (Daily)</p>
                </div>
              </div>
            </div>
          </div>
        </Col>

        {/* Contact Form Column */}
        <Col xs={12} lg={7}>
          <div className="glass-panel p-4">
            <h3 className="fw-bold mb-4 text-warning">Send a Message</h3>
            
            <Form onSubmit={handleSubmit} noValidate>
              <Row className="g-3 mb-3">
                <Col xs={12} md={6}>
                  <Form.Group controlId="contactName">
                    <Form.Label className="text-secondary small fw-semibold">Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (isSubmitted) validateForm();
                      }}
                      isInvalid={isSubmitted && !!errors.name}
                      className="bg-dark bg-opacity-40 text-white border-secondary border-opacity-20 py-2.5 focus-none"
                    />
                    <Form.Control.Feedback type="invalid" className="small">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col xs={12} md={6}>
                  <Form.Group controlId="contactPhone">
                    <Form.Label className="text-secondary small fw-semibold">Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="10-digit number"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (isSubmitted) validateForm();
                      }}
                      isInvalid={isSubmitted && !!errors.phone}
                      className="bg-dark bg-opacity-40 text-white border-secondary border-opacity-20 py-2.5 focus-none"
                    />
                    <Form.Control.Feedback type="invalid" className="small">
                      {errors.phone}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3" controlId="contactEmail">
                <Form.Label className="text-secondary small fw-semibold">Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (isSubmitted) validateForm();
                  }}
                  isInvalid={isSubmitted && !!errors.email}
                  className="bg-dark bg-opacity-40 text-white border-secondary border-opacity-20 py-2.5 focus-none"
                />
                <Form.Control.Feedback type="invalid" className="small">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-4" controlId="contactMessage">
                <Form.Label className="text-secondary small fw-semibold">Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Type your message details here..."
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (isSubmitted) validateForm();
                  }}
                  isInvalid={isSubmitted && !!errors.message}
                  className="bg-dark bg-opacity-40 text-white border-secondary border-opacity-20 py-2.5 focus-none"
                />
                <Form.Control.Feedback type="invalid" className="small">
                  {errors.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Button type="submit" className="w-100 btn-cinema-primary py-3 fw-bold">
                <FontAwesomeIcon icon={faPaperPlane} className="me-2" />
                Submit Message
              </Button>
            </Form>
          </div>
        </Col>
      </Row>

      {/* Success Modal */}
      <Modal 
        show={showSuccessModal} 
        onHide={() => setShowSuccessModal(false)} 
        centered 
        contentClassName="glass-panel text-white border-0"
      >
        <Modal.Header closeButton closeVariant="white" className="border-secondary border-opacity-10 p-4">
          <Modal.Title className="fw-bold d-flex align-items-center gap-2 text-warning">
            <FontAwesomeIcon icon={faCheckCircle} className="text-success" />
            Message Received!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4 text-center">
          <div className="fs-1 text-success mb-3">
            <FontAwesomeIcon icon={faCheckCircle} />
          </div>
          <h4 className="fw-bold text-white mb-2">Thank you for writing!</h4>
          <p className="text-secondary">Your inquiry has been logged successfully. Our ticket desks will review the request and follow up at your provided email coordinate within 24 hours.</p>
          <Button 
            variant="warning" 
            onClick={() => setShowSuccessModal(false)}
            className="btn-cinema-accent w-100 py-2.5 fw-bold mt-3"
          >
            Acknowledge
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}
