"use client";

import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const GENRES = ["Action", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi", "Thriller", "Fantasy", "Animation"];

export default function BookingFormModal({ show, handleClose, onSave, bookingToEdit, movies }) {
  // Controlled fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("Male");
  const [favoriteGenre, setFavoriteGenre] = useState("");
  const [movieInterest, setMovieInterest] = useState("");
  const [subscribe, setSubscribe] = useState(false);

  // Validation states
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (bookingToEdit) {
      setName(bookingToEdit.name || "");
      setEmail(bookingToEdit.email || "");
      setPassword(bookingToEdit.password || "******"); // Mock edit password
      setPhone(bookingToEdit.phone || "");
      setGender(bookingToEdit.gender || "Male");
      setFavoriteGenre(bookingToEdit.favoriteGenre || "");
      setMovieInterest(bookingToEdit.movieInterest || "");
      setSubscribe(bookingToEdit.subscribe || false);
    } else {
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setGender("Male");
      setFavoriteGenre("");
      setMovieInterest("");
      setSubscribe(false);
    }
    setErrors({});
    setValidated(false);
  }, [bookingToEdit, show]);

  // Validation Logic
  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Full Name is required.";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    // Email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "Email address is required.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Password check (only validate length if not mock password when editing)
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password !== "******" && password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    // Phone check (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phone) {
      newErrors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }

    if (!favoriteGenre) {
      newErrors.favoriteGenre = "Please select your favorite genre.";
    }

    if (!movieInterest) {
      newErrors.movieInterest = "Please select a movie of interest.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidated(true);

    if (validateForm()) {
      const savedBooking = {
        name: name.trim(),
        email: email.trim(),
        password: password === "******" ? (bookingToEdit?.password || "") : password,
        phone: phone.trim(),
        gender,
        favoriteGenre,
        movieInterest,
        subscribe: !!subscribe
      };

      if (bookingToEdit) {
        savedBooking.id = bookingToEdit.id;
      }

      onSave(savedBooking);
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header className="modal-header d-flex justify-content-between align-items-center">
        <Modal.Title className="text-gradient fw-bold">
          {bookingToEdit ? "Edit Registration Details" : "New User Registration & Booking"}
        </Modal.Title>
        <button type="button" className="btn-close-custom" onClick={handleClose}>
          ×
        </button>
      </Modal.Header>

      <Form noValidate onSubmit={handleSubmit}>
        <Modal.Body className="p-4">
          <Row className="g-3">
            {/* Name */}
            <Col md={6}>
              <Form.Group controlId="bookingName">
                <Form.Label className="custom-form-label">Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  isInvalid={validated && !!errors.name}
                  className="custom-form-control"
                />
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* Email */}
            <Col md={6}>
              <Form.Group controlId="bookingEmail">
                <Form.Label className="custom-form-label">Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="john.doe@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={validated && !!errors.email}
                  className="custom-form-control"
                />
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* Password */}
            <Col md={6}>
              <Form.Group controlId="bookingPassword">
                <Form.Label className="custom-form-label">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={validated && !!errors.password}
                  className="custom-form-control"
                />
                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* Phone */}
            <Col md={6}>
              <Form.Group controlId="bookingPhone">
                <Form.Label className="custom-form-label">Phone Number (10 digits)</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  isInvalid={validated && !!errors.phone}
                  className="custom-form-control"
                />
                <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* Gender (Radio Buttons - Topic 11.3 Gender) */}
            <Col md={6}>
              <Form.Group>
                <Form.Label className="custom-form-label d-block">Gender</Form.Label>
                <div className="d-flex gap-3 py-2">
                  <Form.Check
                    type="radio"
                    id="genderMale"
                    label="Male"
                    name="gender"
                    value="Male"
                    checked={gender === "Male"}
                    onChange={(e) => setGender(e.target.value)}
                    className="text-white custom-form-check"
                  />
                  <Form.Check
                    type="radio"
                    id="genderFemale"
                    label="Female"
                    name="gender"
                    value="Female"
                    checked={gender === "Female"}
                    onChange={(e) => setGender(e.target.value)}
                    className="text-white custom-form-check"
                  />
                  <Form.Check
                    type="radio"
                    id="genderOther"
                    label="Other"
                    name="gender"
                    value="Other"
                    checked={gender === "Other"}
                    onChange={(e) => setGender(e.target.value)}
                    className="text-white custom-form-check"
                  />
                </div>
              </Form.Group>
            </Col>

            {/* Favorite Genre (Selection) */}
            <Col md={6}>
              <Form.Group controlId="bookingFavGenre">
                <Form.Label className="custom-form-label">Favorite Genre</Form.Label>
                <Form.Select
                  value={favoriteGenre}
                  onChange={(e) => setFavoriteGenre(e.target.value)}
                  isInvalid={validated && !!errors.favoriteGenre}
                  className="custom-form-control"
                >
                  <option value="">-- Choose Genre --</option>
                  {GENRES.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.favoriteGenre}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* Movie Interest (Selection linking to the movies database) */}
            <Col md={12}>
              <Form.Group controlId="bookingMovieInterest">
                <Form.Label className="custom-form-label">Movie of Interest</Form.Label>
                <Form.Select
                  value={movieInterest}
                  onChange={(e) => setMovieInterest(e.target.value)}
                  isInvalid={validated && !!errors.movieInterest}
                  className="custom-form-control"
                >
                  <option value="">-- Select Movie --</option>
                  {movies.map((m) => (
                    <option key={m.id} value={m.title}>
                      {m.title} ({m.year}) - ★{m.rating}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.movieInterest}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* Checkbox (Subscribe to Newsletter) */}
            <Col md={12} className="py-2">
              <Form.Group controlId="bookingSubscribe">
                <Form.Check
                  type="checkbox"
                  label="Subscribe to the CinemaGold weekly newsletter and get promo codes!"
                  checked={subscribe}
                  onChange={(e) => setSubscribe(e.target.checked)}
                  className="custom-form-check text-white fw-semibold"
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer className="modal-footer">
          <Button variant="outline-secondary" onClick={handleClose} className="btn-cinema-secondary py-2">
            Cancel
          </Button>
          <Button type="submit" variant="primary" className="btn-cinema-primary py-2 px-4">
            {bookingToEdit ? "Save Changes" : "Submit Registration"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
