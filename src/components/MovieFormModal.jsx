"use client";

import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const GENRES = ["Action", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi", "Thriller", "Fantasy", "Animation"];
const LANGUAGES = ["English", "Spanish", "French", "German", "Korean", "Japanese", "Hindi", "Mandarin"];

export default function MovieFormModal({ show, handleClose, onSave, movieToEdit }) {
  
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [genre, setGenre] = useState("");
  const [language, setLanguage] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");
  const [posterUrl, setPosterUrl] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [featured, setFeatured] = useState(false);

  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (movieToEdit) {
      setTitle(movieToEdit.title || "");
      setDirector(movieToEdit.director || "");
      setGenre(movieToEdit.genre || "");
      setLanguage(movieToEdit.language || "");
      setYear(movieToEdit.year || "");
      setRating(movieToEdit.rating || "");
      setPosterUrl(movieToEdit.posterUrl || "");
      setSynopsis(movieToEdit.synopsis || "");
      setFeatured(movieToEdit.featured || false);
    } else {
      setTitle("");
      setDirector("");
      setGenre("");
      setLanguage("");
      setYear("");
      setRating("");
      setPosterUrl("");
      setSynopsis("");
      setFeatured(false);
    }
    setErrors({});
    setValidated(false);
  }, [movieToEdit, show]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!title.trim()) newErrors.title = "Movie title is required.";
    if (!director.trim()) newErrors.director = "Director name is required.";
    if (!genre) newErrors.genre = "Please select a genre.";
    if (!language) newErrors.language = "Please select a language.";

    const parsedYear = parseInt(year);
    const currentYear = new Date().getFullYear();
    if (!year) {
      newErrors.year = "Release year is required.";
    } else if (isNaN(parsedYear) || parsedYear < 1888 || parsedYear > currentYear + 5) {
      newErrors.year = `Year must be between 1888 and ${currentYear + 5}.`;
    }

    const parsedRating = parseFloat(rating);
    if (!rating && rating !== 0) {
      newErrors.rating = "Rating is required.";
    } else if (isNaN(parsedRating) || parsedRating < 1.0 || parsedRating > 10.0) {
      newErrors.rating = "Rating must be a decimal between 1.0 and 10.0.";
    }

    if (!posterUrl.trim()) {
      newErrors.posterUrl = "Poster URL is required.";
    } else {
      try {
        new URL(posterUrl);
      } catch (e) {
        newErrors.posterUrl = "Please enter a valid URL (starting with http:// or https://).";
      }
    }

    if (!synopsis.trim()) {
      newErrors.synopsis = "Synopsis is required.";
    } else if (synopsis.trim().length < 15) {
      newErrors.synopsis = "Synopsis should be at least 15 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidated(true);

    if (validateForm()) {
      const savedMovie = {
        title: title.trim(),
        director: director.trim(),
        genre,
        language,
        year: parseInt(year),
        rating: parseFloat(rating),
        posterUrl: posterUrl.trim(),
        synopsis: synopsis.trim(),
        featured: !!featured
      };

      if (movieToEdit) {
        savedMovie.id = movieToEdit.id;
      }

      onSave(savedMovie);
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header className="modal-header d-flex justify-content-between align-items-center">
        <Modal.Title className="text-gradient fw-bold">
          {movieToEdit ? "Edit Movie Details" : "Add New Movie"}
        </Modal.Title>
        <button type="button" className="btn-close-custom" onClick={handleClose}>
          ×
        </button>
      </Modal.Header>
      
      <Form noValidate onSubmit={handleSubmit}>
        <Modal.Body className="p-4">
          <Row className="g-3">
            
            <Col md={6}>
              <Form.Group controlId="formMovieTitle">
                <Form.Label className="custom-form-label">Movie Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. Inception"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  isInvalid={validated && !!errors.title}
                  className="custom-form-control"
                />
                <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="formMovieDirector">
                <Form.Label className="custom-form-label">Director</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. Christopher Nolan"
                  value={director}
                  onChange={(e) => setDirector(e.target.value)}
                  isInvalid={validated && !!errors.director}
                  className="custom-form-control"
                />
                <Form.Control.Feedback type="invalid">{errors.director}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="formMovieGenre">
                <Form.Label className="custom-form-label">Genre</Form.Label>
                <Form.Select
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  isInvalid={validated && !!errors.genre}
                  className="custom-form-control"
                >
                  <option value="">-- Select Genre --</option>
                  {GENRES.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.genre}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="formMovieLanguage">
                <Form.Label className="custom-form-label">Language</Form.Label>
                <Form.Select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  isInvalid={validated && !!errors.language}
                  className="custom-form-control"
                >
                  <option value="">-- Select Language --</option>
                  {LANGUAGES.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.language}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="formMovieYear">
                <Form.Label className="custom-form-label">Release Year</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="e.g. 2010"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  isInvalid={validated && !!errors.year}
                  className="custom-form-control"
                />
                <Form.Control.Feedback type="invalid">{errors.year}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="formMovieRating">
                <Form.Label className="custom-form-label">IMDb Rating (1-10)</Form.Label>
                <Form.Control
                  type="number"
                  step="0.1"
                  placeholder="e.g. 8.8"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  isInvalid={validated && !!errors.rating}
                  className="custom-form-control"
                />
                <Form.Control.Feedback type="invalid">{errors.rating}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4} className="d-flex align-items-end pb-3">
              <Form.Group controlId="formMovieFeatured">
                <Form.Check
                  type="checkbox"
                  label="Featured Movie"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="custom-form-check text-white fw-semibold"
                />
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group controlId="formMoviePoster">
                <Form.Label className="custom-form-label">Poster Image URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={posterUrl}
                  onChange={(e) => setPosterUrl(e.target.value)}
                  isInvalid={validated && !!errors.posterUrl}
                  className="custom-form-control"
                />
                <Form.Control.Feedback type="invalid">{errors.posterUrl}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group controlId="formMovieSynopsis">
                <Form.Label className="custom-form-label">Synopsis / Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Write a brief description of the movie plot..."
                  value={synopsis}
                  onChange={(e) => setSynopsis(e.target.value)}
                  isInvalid={validated && !!errors.synopsis}
                  className="custom-form-control"
                />
                <Form.Control.Feedback type="invalid">{errors.synopsis}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer className="modal-footer">
          <Button variant="outline-secondary" onClick={handleClose} className="btn-cinema-secondary py-2">
            Cancel
          </Button>
          <Button type="submit" variant="primary" className="btn-cinema-primary py-2 px-4">
            {movieToEdit ? "Save Changes" : "Add Movie"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
