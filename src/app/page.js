"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Carousel, Row, Col, Card, Button, Badge, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faFilm, 
  faStar, 
  faTags, 
  faUsers, 
  faTicketAlt, 
  faMapMarkerAlt, 
  faVideo, 
  faChevronRight 
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

import { getMovies, getBookings, seedDatabase } from "@/data/movieData";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    seedDatabase();
    setMovies(getMovies());
    setBookings(getBookings());
  }, []);

  const featuredMovies = useMemo(() => {
    return movies.filter(m => m.featured);
  }, [movies]);

  // Auto-play interval for custom 3D hero slider
  useEffect(() => {
    if (featuredMovies.length <= 1) return;
    
    const intervalId = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featuredMovies.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [featuredMovies.length]);

  const nowShowing = useMemo(() => {
    return movies.slice(0, 4);
  }, [movies]);

  const featuredGrid = useMemo(() => {
    return movies.filter(m => m.featured).slice(0, 4);
  }, [movies]);

  const stats = useMemo(() => {
    if (movies.length === 0) {
      return { total: 0, avgRating: 0, topGenre: "N/A", bookingsCount: bookings.length };
    }

    const sumRating = movies.reduce((acc, curr) => acc + curr.rating, 0);
    const avg = (sumRating / movies.length).toFixed(1);

    const genreCounts = {};
    movies.forEach(m => {
      genreCounts[m.genre] = (genreCounts[m.genre] || 0) + 1;
    });
    let top = "N/A";
    let max = 0;
    Object.keys(genreCounts).forEach(g => {
      if (genreCounts[g] > max) {
        max = genreCounts[g];
        top = g;
      }
    });

    return {
      total: movies.length,
      avgRating: avg,
      topGenre: top,
      bookingsCount: bookings.length
    };
  }, [movies, bookings]);

  const theatres = [
    {
      id: "t1",
      name: "CineBook IMAX 3D",
      location: "Grand Avenue, Downtown",
      rating: 4.9,
      type: "IMAX Laser",
      image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: "t2",
      name: "CineBook Dolby Cinema",
      location: "Metropolitan Square",
      rating: 4.8,
      type: "Dolby Atmos & Vision",
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: "t3",
      name: "CineBook Gold VIP Lounge",
      location: "Westside Premium Mall",
      rating: 4.8,
      type: "Luxury Recliners",
      image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=400&auto=format&fit=crop"
    }
  ];

  return (
    <div className="homepage-wrapper animate-fade-in">
      {featuredMovies.length > 0 && (
        <div className="hero-slider-section">
          <div className="hero-bg-container">
            {featuredMovies.map((movie, idx) => (
              <img 
                key={`bg-${movie.id}`}
                src={movie.posterUrl} 
                alt="" 
                className={`hero-bg-backdrop ${idx === activeIndex ? "active" : ""}`}
                referrerPolicy="no-referrer"
              />
            ))}
          </div>

          <div className="hero-overlay-dark"></div>

          <div className="hero-content-wrapper">
            {featuredMovies.map((movie, idx) => {
              if (idx !== activeIndex) return null;
              return (
                <div className="hero-text-side" key={`text-${movie.id}`}>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <Badge bg="warning" text="dark" className="px-3 py-2 text-uppercase tracking-wider fw-bold">
                      ★ TOP TRENDING
                    </Badge>
                  </div>
                  <h1 className="text-white display-4 fw-extrabold mb-2" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}>
                    {movie.title}
                  </h1>
                  <div className="hero-rating-row text-white-50">
                    <span className="rating-badge text-warning fw-bold">★ {movie.rating}</span>
                    <span>•</span>
                    <span className="badge-genre">{movie.genre}</span>
                    <span>•</span>
                    <span className="fw-semibold">{movie.year}</span>
                    {movie.runtime && (
                      <>
                        <span>•</span>
                        <span className="fw-semibold">{movie.runtime}</span>
                      </>
                    )}
                  </div>
                  <p className="text-light mb-4 line-clamp-3 fs-5" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.6)", maxWidth: "650px", lineHeight: "1.6" }}>
                    {movie.synopsis}
                  </p>
                  <div className="d-flex gap-3">
                    <Link href={`/ticket?movieId=${movie.id}`} passHref>
                      <Button className="btn-cinema-primary btn-cinema-glow px-4 py-2.5 fw-bold">
                        <FontAwesomeIcon icon={faTicketAlt} className="me-2" />
                        Book Ticket
                      </Button>
                    </Link>
                    <Link href={`/movies/${movie.id}`} passHref>
                      <Button variant="outline-light" className="btn-cinema-secondary px-4 py-2.5">
                        <FontAwesomeIcon icon={faFilm} className="me-2 text-warning" />
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}

            <div className="hero-3d-side">
              {featuredMovies.map((movie, idx) => {
                const total = featuredMovies.length;
                const diff = (idx - activeIndex + total) % total;
                let cardClass = "card-hidden";

                if (diff === 0) {
                  cardClass = "card-active";
                } else if (diff === 1) {
                  cardClass = "card-next";
                } else if (diff === total - 1) {
                  cardClass = "card-prev";
                }

                return (
                  <div 
                    key={`card-${movie.id}`}
                    className={`hero-3d-card ${cardClass}`}
                    onClick={() => setActiveIndex(idx)}
                    title={movie.title}
                  >
                    <img 
                      src={movie.posterUrl} 
                      alt={movie.title} 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="hero-dots-container">
            {featuredMovies.map((_, idx) => (
              <div 
                key={`dot-${idx}`}
                className={`hero-dot ${idx === activeIndex ? "active" : ""}`}
                onClick={() => setActiveIndex(idx)}
              />
            ))}
          </div>
        </div>
      )}

      <div className="container py-5 px-4 px-md-5">

      <section className="mb-5 animate-fade-in">
        <div className="d-flex justify-content-between align-items-end mb-4">
          <div>
            <span className="text-warning text-uppercase tracking-widest fw-bold small d-block mb-1">🎬 IN THEATRES</span>
            <h2 className="text-gradient fw-bold mb-0">Now Showing Movies</h2>
          </div>
          <Link href="/movies" className="text-warning text-decoration-none fw-semibold d-flex align-items-center gap-1 hover-gold">
            See All Movies <FontAwesomeIcon icon={faChevronRight} className="small" />
          </Link>
        </div>
        <Row className="g-4">
          {nowShowing.map((movie) => (
            <Col xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <Card className="h-100 border-0 glass-card text-white overflow-hidden d-flex flex-column justify-content-between">
                <div className="position-relative overflow-hidden" style={{ aspectRatio: "2/3" }}>
                  <img
                    src={movie.posterUrl}
                    className="card-img-top w-100 h-100 object-fit-cover transition-transform duration-300 card-zoom"
                    style={{ objectFit: "cover" }}
                    alt={movie.title}
                    referrerPolicy="no-referrer"
                  />
                  <div className="position-absolute top-0 end-0 p-2 d-flex flex-column gap-2">
                    <span className="rating-badge shadow bg-dark bg-opacity-75">★ {movie.rating}</span>
                  </div>
                </div>
                <Card.Body className="p-3 bg-dark bg-opacity-40 d-flex flex-column justify-content-between flex-grow-1">
                  <div>
                    <Card.Title className="fs-5 fw-bold text-white mb-2 text-truncate">{movie.title}</Card.Title>
                    <div className="d-flex gap-2 mb-3">
                      <span className="badge-genre">{movie.genre}</span>
                      <span className="text-secondary small mt-1">{movie.year}</span>
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    <Link href={`/movies/${movie.id}`} className="flex-grow-1" passHref>
                      <Button variant="outline-light" size="sm" className="btn-cinema-secondary w-100 py-2">
                        View Details
                      </Button>
                    </Link>
                    <Link href={`/ticket?movieId=${movie.id}`} passHref>
                      <Button variant="warning" size="sm" className="btn-cinema-accent px-3 py-2">
                        Book
                      </Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      <section className="mb-5 animate-fade-in">
        <div className="d-flex justify-content-between align-items-end mb-4">
          <div>
            <span className="text-warning text-uppercase tracking-widest fw-bold small d-block mb-1">⭐ CRITICS' CHOICES</span>
            <h2 className="text-gradient fw-bold mb-0">Featured Movies</h2>
          </div>
        </div>
        <Row className="g-4">
          {featuredGrid.map((movie) => (
            <Col xs={12} sm={6} md={4} lg={3} key={`feat-${movie.id}`}>
              <Card className="h-100 border-0 glass-card text-white overflow-hidden d-flex flex-column justify-content-between">
                <div className="position-relative overflow-hidden" style={{ aspectRatio: "2/3" }}>
                  <img
                    src={movie.posterUrl}
                    className="card-img-top w-100 h-100 object-fit-cover transition-transform duration-300 card-zoom"
                    style={{ objectFit: "cover" }}
                    alt={movie.title}
                    referrerPolicy="no-referrer"
                  />
                  <div className="position-absolute top-0 end-0 p-2 d-flex flex-column gap-2">
                    <span className="rating-badge shadow bg-dark bg-opacity-75">★ {movie.rating}</span>
                    <span className="badge-featured shadow text-center bg-warning text-dark fw-bold">FEATURED</span>
                  </div>
                </div>
                <Card.Body className="p-3 bg-dark bg-opacity-40 d-flex flex-column justify-content-between flex-grow-1">
                  <div>
                    <Card.Title className="fs-5 fw-bold text-white mb-2 text-truncate">{movie.title}</Card.Title>
                    <div className="d-flex gap-2 mb-3">
                      <span className="badge-genre">{movie.genre}</span>
                      <span className="text-secondary small mt-1">{movie.year}</span>
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    <Link href={`/movies/${movie.id}`} className="flex-grow-1" passHref>
                      <Button variant="outline-light" size="sm" className="btn-cinema-secondary w-100 py-2">
                        View Details
                      </Button>
                    </Link>
                    <Link href={`/ticket?movieId=${movie.id}`} passHref>
                      <Button variant="warning" size="sm" className="btn-cinema-accent px-3 py-2">
                        Book
                      </Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      <section className="mb-5 animate-fade-in">
        <div className="mb-4">
          <span className="text-warning text-uppercase tracking-widest fw-bold small d-block mb-1">🗺️ PREMIUM EXPERIENCE</span>
          <h2 className="text-gradient fw-bold">Top Partner Theatres</h2>
        </div>
        <Row className="g-4">
          {theatres.map((theatre) => (
            <Col xs={12} md={4} key={theatre.id}>
              <Card className="glass-card text-white border-0 overflow-hidden h-100">
                <div style={{ height: "200px", overflow: "hidden", position: "relative" }}>
                  <img 
                    src={theatre.image} 
                    alt={theatre.name} 
                    className="w-100 h-100 object-fit-cover card-zoom"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="position-absolute bottom-0 start-0 p-3 bg-gradient-to-t from-dark w-100">
                    <Badge bg="warning" text="dark" className="fw-bold px-2 py-1">
                      {theatre.type}
                    </Badge>
                  </div>
                </div>
                <Card.Body className="p-4 bg-dark bg-opacity-30">
                  <h4 className="fw-bold mb-2">{theatre.name}</h4>
                  <p className="text-secondary small mb-3">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2 text-warning" />
                    {theatre.location}
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-warning fw-semibold">
                      ★ {theatre.rating} / 5.0 Rating
                    </span>
                    <Link href={`/ticket?theatre=${encodeURIComponent(theatre.name)}`} passHref>
                      <Button className="btn-cinema-primary py-1.5 px-3 btn-sm">
                        Select Shows
                      </Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      <section className="py-5 mb-5 rounded-4 glass-panel bg-gradient-to-br from-slate-900 to-slate-800 border-secondary border-opacity-10 animate-fade-in">
        <Container>
          <div className="text-center mb-5">
            <span className="text-warning text-uppercase tracking-widest fw-bold small d-block mb-1">📊 CINEBOOK STATS</span>
            <h2 className="text-gradient fw-bold mb-0">Platform Statistics</h2>
          </div>
          <Row className="g-4 text-center">
            <Col xs={6} md={3}>
              <div className="p-3">
                <FontAwesomeIcon icon={faFilm} className="fs-1 text-warning mb-3" />
                <div className="display-6 fw-extrabold text-white mb-2">{stats.total}</div>
                <div className="text-secondary small fw-semibold text-uppercase tracking-wider">Total Movies</div>
              </div>
            </Col>
            <Col xs={6} md={3}>
              <div className="p-3">
                <FontAwesomeIcon icon={faStar} className="fs-1 text-warning mb-3" />
                <div className="display-6 fw-extrabold text-white mb-2">{stats.avgRating}</div>
                <div className="text-secondary small fw-semibold text-uppercase tracking-wider">Average Rating</div>
              </div>
            </Col>
            <Col xs={6} md={3}>
              <div className="p-3">
                <FontAwesomeIcon icon={faTags} className="fs-1 text-warning mb-3" />
                <div className="display-6 fw-extrabold text-white mb-2 text-truncate" style={{ maxWidth: "200px", margin: "0 auto" }}>{stats.topGenre}</div>
                <div className="text-secondary small fw-semibold text-uppercase tracking-wider">Top Genre</div>
              </div>
            </Col>
            <Col xs={6} md={3}>
              <div className="p-3">
                <FontAwesomeIcon icon={faUsers} className="fs-1 text-warning mb-3" />
                <div className="display-6 fw-extrabold text-white mb-2">{stats.bookingsCount}</div>
                <div className="text-secondary small fw-semibold text-uppercase tracking-wider">Booked Tickets</div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      </div>
    </div>
  );
}
