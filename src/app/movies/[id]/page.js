"use client";

import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Badge, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faStar,
  faFilm,
  faGlobe,
  faCalendarAlt,
  faUser,
  faTicketAlt,
  faPlay,
  faClock
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useParams } from "next/navigation";

// Data utilities
import { getMovieById, getMovies, seedDatabase } from "@/data/movieData";

export default function MovieDetails() {
  const params = useParams();
  const id = params?.id;

  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal Control
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    seedDatabase();
    const loadedMovie = getMovieById(id);
    setMovie(loadedMovie);

    if (loadedMovie) {
      const allMovies = getMovies();
      const recs = allMovies
        .filter(m => m.genre === loadedMovie.genre && m.id !== loadedMovie.id)
        .slice(0, 4);
      setRecommendations(recs);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5 text-center text-secondary">
        <h3>Loading movie details...</h3>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="container py-5">
        <div className="glass-panel p-5 text-center animate-fade-in" style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 className="text-danger mb-4">Movie Not Found</h2>
          <p className="text-secondary mb-4">The movie details you are looking for do not exist or may have been deleted.</p>
          <Link href="/movies" passHref>
            <Button className="btn-cinema-primary">
              <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
              Return to Movies
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-3 animate-fade-in">
      {/* Back Button */}
      <div className="mb-4">
        <Link href="/movies" passHref>
          <Button variant="outline-light" className="btn-cinema-secondary">
            <FontAwesomeIcon icon={faArrowLeft} className="me-2 text-warning" />
            Back to Movies
          </Button>
        </Link>
      </div>

      {/* Main Details Panel */}
      <div className="glass-panel p-4 p-md-5 mb-5 relative overflow-hidden">
        {/* Blurred backdrop background */}
        <div 
          className="position-absolute top-0 start-0 w-100 h-100 opacity-10 pointer-events-none" 
          style={{
            backgroundImage: `url(${movie.posterUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(40px)"
          }}
        />

        <Row className="g-4 g-md-5 relative z-1">
          {/* Poster Column */}
          <Col xs={12} md={4}>
            <div className="detail-poster-wrapper rounded-4 overflow-hidden shadow-lg border border-secondary border-opacity-20" style={{ aspectRatio: "2/3" }}>
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-100 h-100 object-fit-cover"
                style={{ objectFit: "cover" }}
                referrerPolicy="no-referrer"
              />
            </div>
          </Col>

          {/* Info Details Column */}
          <Col xs={12} md={8} className="d-flex flex-column justify-content-between">
            <div>
              <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
                <span className="rating-badge shadow fs-5 py-2 px-3 bg-dark bg-opacity-70 text-warning">★ {movie.rating} / 10</span>
                <span className="badge-genre fs-6 py-1.5 px-3 bg-secondary bg-opacity-20 text-white">{movie.genre}</span>
                {movie.featured && <span className="badge-featured fs-6 py-1.5 px-3 bg-warning text-dark fw-bold">FEATURED</span>}
              </div>

              <h1 className="display-4 fw-extrabold text-white mb-3 text-gradient">
                {movie.title}
              </h1>

              {/* Description */}
              <p className="text-light fs-5 mb-4 lh-lg" style={{ opacity: 0.9 }}>
                {movie.synopsis}
              </p>

              {/* Metadata Grid */}
              <Row className="g-3 mb-4">
                <Col xs={6} sm={3}>
                  <div className="details-metadata-item">
                    <span className="details-metadata-label text-secondary small d-block mb-1">
                      <FontAwesomeIcon icon={faUser} className="me-1 text-warning" />
                      Director
                    </span>
                    <span className="details-metadata-value text-white fw-semibold">{movie.director}</span>
                  </div>
                </Col>
                <Col xs={6} sm={3}>
                  <div className="details-metadata-item">
                    <span className="details-metadata-label text-secondary small d-block mb-1">
                      <FontAwesomeIcon icon={faCalendarAlt} className="me-1 text-warning" />
                      Release Year
                    </span>
                    <span className="details-metadata-value text-white fw-semibold">{movie.year}</span>
                  </div>
                </Col>
                <Col xs={6} sm={3}>
                  <div className="details-metadata-item">
                    <span className="details-metadata-label text-secondary small d-block mb-1">
                      <FontAwesomeIcon icon={faClock} className="me-1 text-warning" />
                      Duration
                    </span>
                    <span className="details-metadata-value text-white fw-semibold">{movie.runtime || "130 min"}</span>
                  </div>
                </Col>
                <Col xs={6} sm={3}>
                  <div className="details-metadata-item">
                    <span className="details-metadata-label text-secondary small d-block mb-1">
                      <FontAwesomeIcon icon={faGlobe} className="me-1 text-warning" />
                      Language
                    </span>
                    <span className="details-metadata-value text-white fw-semibold">{movie.language}</span>
                  </div>
                </Col>
              </Row>

              {/* Cast */}
              {movie.cast && (
                <div className="mb-4">
                  <span className="text-secondary small d-block mb-1">Cast:</span>
                  <span className="text-light">{movie.cast}</span>
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div className="pt-3 border-top border-secondary border-opacity-10 d-flex flex-wrap gap-3">
              <Link href={`/ticket?movieId=${movie.id}`} passHref>
                <Button className="btn-cinema-primary px-4 py-3 fs-5 fw-bold">
                  <FontAwesomeIcon icon={faTicketAlt} className="me-2" />
                  Book Tickets
                </Button>
              </Link>
              {movie.trailerUrl && (
                <Button variant="outline-light" className="btn-cinema-secondary px-4 py-3 fs-5" onClick={() => setShowTrailer(true)}>
                  <FontAwesomeIcon icon={faPlay} className="me-2 text-warning" />
                  Play Trailer
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </div>

      {/* Recommendations Panel */}
      {recommendations.length > 0 && (
        <div className="mb-4">
          <h3 className="text-gradient fw-bold mb-4">Recommended {movie.genre} Movies</h3>
          <Row className="g-4">
            {recommendations.map((rec) => (
              <Col xs={12} sm={6} md={3} key={rec.id}>
                <Card className="h-100 border-0 glass-card text-white overflow-hidden d-flex flex-column justify-content-between">
                  <div className="position-relative overflow-hidden" style={{ aspectRatio: "2/3" }}>
                    <img
                      src={rec.posterUrl}
                      className="card-img-top w-100 h-100 object-fit-cover card-zoom"
                      style={{ objectFit: "cover" }}
                      alt={rec.title}
                      referrerPolicy="no-referrer"
                    />
                    <div className="position-absolute top-0 end-0 p-2">
                      <span className="rating-badge shadow bg-dark bg-opacity-75">★ {rec.rating}</span>
                    </div>
                  </div>
                  <Card.Body className="p-3 bg-dark bg-opacity-40">
                    <Card.Title className="fs-5 fw-bold text-white mb-2 text-truncate">{rec.title}</Card.Title>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="badge-genre">{rec.genre}</span>
                      <span className="text-secondary small">{rec.year}</span>
                    </div>
                    <Link href={`/movies/${rec.id}`} passHref>
                      <Button variant="outline-light" size="sm" className="btn-cinema-secondary w-100 py-2">
                        View Details
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}

      {/* Trailer Modal */}
      {movie.trailerUrl && (
        <Modal 
          show={showTrailer} 
          onHide={() => setShowTrailer(false)} 
          size="lg" 
          centered 
          contentClassName="glass-panel text-white border-0"
        >
          <Modal.Header closeButton closeVariant="white" className="border-secondary border-opacity-10">
            <Modal.Title className="fw-bold">{movie.title} - Official Trailer</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-0">
            <div className="ratio ratio-16x9">
              <iframe 
                src={movie.trailerUrl} 
                title={`${movie.title} Trailer`} 
                allowFullScreen
                className="w-100 h-100"
              />
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}
