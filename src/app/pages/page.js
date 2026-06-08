"use client";

import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Accordion, Tab, Nav, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faInfoCircle, 
  faQuestionCircle, 
  faDatabase, 
  faFilm, 
  faUsers, 
  faPlus, 
  faServer,
  faWrench
} from "@fortawesome/free-solid-svg-icons";

// CRUD operations and components
import {
  getMovies,
  addMovie,
  updateMovie,
  deleteMovie,
  getBookings,
  addBooking,
  updateBooking,
  deleteBooking,
  seedDatabase
} from "@/data/movieData";

import MovieTable from "@/components/MovieTable";
import BookingTable from "@/components/BookingTable";
import MovieFormModal from "@/components/MovieFormModal";
import BookingFormModal from "@/components/BookingFormModal";

export default function PagesRoot() {
  const [activeTab, setActiveTab] = useState("about");

  // Admin CRUD states
  const [movies, setMovies] = useState([]);
  const [bookings, setBookings] = useState([]);

  // Modal Control States
  const [showMovieModal, setShowMovieModal] = useState(false);
  const [movieToEdit, setMovieToEdit] = useState(null);

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingToEdit, setBookingToEdit] = useState(null);

  useEffect(() => {
    seedDatabase();
    setMovies(getMovies());
    setBookings(getBookings());
  }, []);

  const refreshMovies = () => {
    setMovies(getMovies());
  };

  const refreshBookings = () => {
    setBookings(getBookings());
  };

  // Movie CRUD Handlers
  const handleSaveMovie = (movieData) => {
    if (movieData.id) {
      updateMovie(movieData);
    } else {
      addMovie(movieData);
    }
    refreshMovies();
  };

  const handleDeleteMovie = (id) => {
    if (confirm("Are you sure you want to delete this movie from the database?")) {
      deleteMovie(id);
      refreshMovies();
    }
  };

  const handleOpenEditMovie = (movie) => {
    setMovieToEdit(movie);
    setShowMovieModal(true);
  };

  const handleOpenAddMovie = () => {
    setMovieToEdit(null);
    setShowMovieModal(true);
  };

  // Booking CRUD Handlers
  const handleSaveBooking = (bookingData) => {
    if (bookingData.id) {
      updateBooking(bookingData);
    } else {
      addBooking(bookingData);
    }
    refreshBookings();
  };

  const handleDeleteBooking = (id) => {
    if (confirm("Are you sure you want to delete/cancel this booking?")) {
      deleteBooking(id);
      refreshBookings();
    }
  };

  const handleOpenEditBooking = (booking) => {
    setBookingToEdit(booking);
    setShowBookingModal(true);
  };

  const handleOpenAddBooking = () => {
    setBookingToEdit(null);
    setShowBookingModal(true);
  };

  return (
    <div className="container py-3 animate-fade-in">
      <div className="mb-4">
        <span className="text-warning text-uppercase tracking-widest fw-bold small d-block mb-1">🔗 UTILITIES</span>
        <h1 className="text-gradient fw-bold">Information & Administration</h1>
        <p className="text-secondary">Explore details about CineBook, read frequently asked questions, or manage records.</p>
      </div>

      <Tab.Container id="pages-tabs" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
        <Row>
          {/* Navigation Sidebar */}
          <Col xs={12} md={3} className="mb-4">
            <div className="glass-panel p-3">
              <Nav variant="pills" className="flex-column gap-2">
                <Nav.Item>
                  <Nav.Link 
                    eventKey="about" 
                    className={activeTab === "about" ? "btn-cinema-accent active text-start py-2 px-3 fw-bold" : "text-white text-start py-2 px-3"}
                  >
                    <FontAwesomeIcon icon={faInfoCircle} className="me-2 text-warning" />
                    About Us
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link 
                    eventKey="faq"
                    className={activeTab === "faq" ? "btn-cinema-accent active text-start py-2 px-3 fw-bold" : "text-white text-start py-2 px-3"}
                  >
                    <FontAwesomeIcon icon={faQuestionCircle} className="me-2 text-warning" />
                    FAQs
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link 
                    eventKey="admin"
                    className={activeTab === "admin" ? "btn-cinema-accent active text-start py-2 px-3 fw-bold" : "text-white text-start py-2 px-3"}
                  >
                    <FontAwesomeIcon icon={faWrench} className="me-2 text-warning" />
                    Database Admin
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
          </Col>

          {/* Content Pane */}
          <Col xs={12} md={9}>
            <Tab.Content className="glass-panel p-4">
              
              {/* Tab: About Us */}
              <Tab.Pane eventKey="about">
                <h3 className="fw-bold mb-4 text-gradient">About CineBook</h3>
                <Row className="g-4">
                  <Col xs={12} md={7}>
                    <p className="lead text-light">CineBook is a premium, SaaS-grade cinema booking platform designed for next-generation cinema venues and film festivals.</p>
                    <p className="text-secondary">We leverage cutting edge layout paradigms to deliver responsive design, elegant glassmorphism effects, and highly scalable styling systems. Our goal is to make the ticket buying and database management flow as seamless as possible, bridging the gap between design theory and implementation.</p>
                    <p className="text-secondary">This platform implements custom Session Storage database models, dynamic multi-key sorting, real-time search indexing, stateful pagination algorithms, and functional seat allocation grids.</p>
                  </Col>
                  <Col xs={12} md={5}>
                    <div className="glass-panel p-4 bg-dark bg-opacity-30 border border-secondary border-opacity-10 text-center">
                      <FontAwesomeIcon icon={faServer} className="fs-1 text-warning mb-3" />
                      <h5 className="fw-bold text-white mb-2">Technical Architecture</h5>
                      <div className="d-flex flex-wrap gap-2 justify-content-center mt-3">
                        <Badge bg="dark" className="border border-secondary border-opacity-20 px-2.5 py-1.5 text-secondary">React JS</Badge>
                        <Badge bg="dark" className="border border-secondary border-opacity-20 px-2.5 py-1.5 text-secondary">Next.js</Badge>
                        <Badge bg="dark" className="border border-secondary border-opacity-20 px-2.5 py-1.5 text-secondary">Bootstrap 5</Badge>
                        <Badge bg="dark" className="border border-secondary border-opacity-20 px-2.5 py-1.5 text-secondary">FontAwesome</Badge>
                        <Badge bg="dark" className="border border-secondary border-opacity-20 px-2.5 py-1.5 text-secondary">Session Storage</Badge>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Tab.Pane>

              {/* Tab: FAQs */}
              <Tab.Pane eventKey="faq">
                <h3 className="fw-bold mb-4 text-gradient">Frequently Asked Questions</h3>
                <Accordion defaultActiveKey="0" className="cinema-accordion">
                  <Accordion.Item eventKey="0" className="bg-dark bg-opacity-20 border-secondary border-opacity-10 mb-3 rounded overflow-hidden">
                    <Accordion.Header className="text-white">How do I book tickets on CineBook?</Accordion.Header>
                    <Accordion.Body className="text-secondary">
                      Simply browse movies on the <a href="/movies" className="text-warning">Movies Page</a>, click "View Details", read the info or watch the trailer, and click "Book Tickets". Choose your theater, show date, time, and select your seats on the interactive map. Fill in your details and click Confirm!
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1" className="bg-dark bg-opacity-20 border-secondary border-opacity-10 mb-3 rounded overflow-hidden">
                    <Accordion.Header className="text-white">How does data storage work in this project?</Accordion.Header>
                    <Accordion.Body className="text-secondary">
                      To fulfill syllabus requirements, CineBook uses <strong>Session Storage</strong>. This means all movie additions, edits, deletes, and ticket bookings are preserved locally in your browser tab. If you close the tab, the database resets to seed defaults.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2" className="bg-dark bg-opacity-20 border-secondary border-opacity-10 mb-3 rounded overflow-hidden">
                    <Accordion.Header className="text-white">Can I add or delete movies in the application?</Accordion.Header>
                    <Accordion.Body className="text-secondary">
                      Yes! Navigate to the <strong>Database Admin</strong> tab inside this utility menu. You will find complete databases for Movies and Bookings. You can create new listings, edit cast/genre details, or delete movies. Changes propagate automatically to the Home and Movie Explore grids!
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="3" className="bg-dark bg-opacity-20 border-secondary border-opacity-10 mb-3 rounded overflow-hidden">
                    <Accordion.Header className="text-white">What are VIP rows in the seat selector?</Accordion.Header>
                    <Accordion.Body className="text-secondary">
                      VIP rows (Row F) represent luxury recliner seats with leather highbacks and dedicated food servers. They are priced at $20 per ticket, while standard rows (Rows A to E) are priced at $12.
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Tab.Pane>

              {/* Tab: Admin CRUD Panel */}
              <Tab.Pane eventKey="admin">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3 className="fw-bold mb-0 text-gradient d-flex align-items-center gap-2">
                    <FontAwesomeIcon icon={faDatabase} className="text-warning" />
                    Cinema Database CRUD
                  </h3>
                  <div className="d-flex gap-2">
                    <Button className="btn-cinema-primary btn-sm py-1.5 px-3" onClick={handleOpenAddMovie}>
                      <FontAwesomeIcon icon={faPlus} className="me-2" />
                      Add Movie
                    </Button>
                    <Button variant="outline-light" className="btn-cinema-secondary btn-sm py-1.5 px-3" onClick={handleOpenAddBooking}>
                      <FontAwesomeIcon icon={faPlus} className="me-2 text-warning" />
                      New Booking
                    </Button>
                  </div>
                </div>

                <div className="mb-5">
                  <h5 className="text-warning fw-bold mb-3 d-flex align-items-center gap-2">
                    <FontAwesomeIcon icon={faFilm} />
                    Movie Inventory ({movies.length})
                  </h5>
                  <div className="table-responsive">
                    <MovieTable
                      movies={movies}
                      onEdit={handleOpenEditMovie}
                      onDelete={handleDeleteMovie}
                    />
                  </div>
                </div>

                <div>
                  <h5 className="text-warning fw-bold mb-3 d-flex align-items-center gap-2">
                    <FontAwesomeIcon icon={faUsers} />
                    Booking Records ({bookings.length})
                  </h5>
                  <div className="table-responsive">
                    <BookingTable
                      bookings={bookings}
                      onEdit={handleOpenEditBooking}
                      onDelete={handleDeleteBooking}
                    />
                  </div>
                </div>
              </Tab.Pane>

            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>

      {/* CRUD Modals */}
      <MovieFormModal
        show={showMovieModal}
        handleClose={() => setShowMovieModal(false)}
        onSave={handleSaveMovie}
        movieToEdit={movieToEdit}
      />

      <BookingFormModal
        show={showBookingModal}
        handleClose={() => setShowBookingModal(false)}
        onSave={handleSaveBooking}
        bookingToEdit={bookingToEdit}
        movies={movies}
      />
    </div>
  );
}
