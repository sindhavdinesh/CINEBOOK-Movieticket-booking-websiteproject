"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { Row, Col, Card, Button, Form, ButtonGroup, Badge, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faTicketAlt, 
  faCalendarAlt, 
  faClock, 
  faVideo, 
  faCheckCircle, 
  faChair 
} from "@fortawesome/free-solid-svg-icons";
import { useSearchParams, useRouter } from "next/navigation";

import { getMovies, addBooking, seedDatabase } from "@/data/movieData";

function TicketBookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const initialMovieId = searchParams.get("movieId") || "";
  const initialTheatre = searchParams.get("theatre") || "CineBook IMAX 3D";

  const [moviesList, setMoviesList] = useState([]);

  const [selectedMovieId, setSelectedMovieId] = useState(initialMovieId);
  const [selectedTheatre, setSelectedTheatre] = useState(initialTheatre);
  const [selectedDate, setSelectedDate] = useState("Today");
  const [selectedTime, setSelectedTime] = useState("5:00 PM");
  const [selectedSeats, setSelectedSeats] = useState([]);

  const [occupiedSeats, setOccupiedSeats] = useState([]);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastBookingDetails, setLastBookingDetails] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    seedDatabase();
    const list = getMovies();
    setMoviesList(list);
    if (!selectedMovieId && list.length > 0) {
      setSelectedMovieId(list[0].id);
    }
  }, [selectedMovieId]);

  useEffect(() => {
    
    const seats = [];
    const rows = ["A", "B", "C", "D", "E", "F"];
    const cols = [1, 2, 3, 4, 5, 6, 7, 8];

    const count = 8 + Math.floor(Math.random() * 8);
    for (let i = 0; i < count; i++) {
      const r = rows[Math.floor(Math.random() * rows.length)];
      const c = cols[Math.floor(Math.random() * cols.length)];
      const id = `${r}${c}`;
      if (!seats.includes(id)) {
        seats.push(id);
      }
    }
    setOccupiedSeats(seats);
    setSelectedSeats([]); 
  }, [selectedMovieId, selectedTheatre, selectedDate, selectedTime]);

  const selectedMovie = useMemo(() => {
    return moviesList.find(m => m.id === selectedMovieId);
  }, [moviesList, selectedMovieId]);

  const dates = ["Today", "Tomorrow", "Wednesday, June 3", "Thursday, June 4"];
  const times = ["10:00 AM", "1:30 PM", "5:00 PM", "8:30 PM", "11:00 PM"];

  const rows = ["A", "B", "C", "D", "E", "F"];
  const columns = [1, 2, 3, 4, 5, 6, 7, 8];

  const handleSeatClick = (seatId) => {
    if (occupiedSeats.includes(seatId)) return; 

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const getSeatPrice = (seatId) => {
    
    return seatId.startsWith("F") ? 20 : 12;
  };

  const totalPrice = useMemo(() => {
    return selectedSeats.reduce((sum, seat) => sum + getSeatPrice(seat), 0);
  }, [selectedSeats]);

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (!selectedMovie) return;
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }
    if (!name || !email || !phone) {
      alert("Please fill in contact details.");
      return;
    }

    const bookingData = {
      name,
      email,
      phone,
      gender: "Not Specified",
      favoriteGenre: selectedMovie.genre,
      subscribe: true,
      movieInterest: selectedMovie.title,
      
      theatre: selectedTheatre,
      date: selectedDate,
      time: selectedTime,
      seats: selectedSeats.join(", "),
      totalPaid: totalPrice
    };

    const newBooking = addBooking(bookingData);
    setLastBookingDetails({
      ...newBooking,
      movieTitle: selectedMovie.title,
      posterUrl: selectedMovie.posterUrl,
      theatre: selectedTheatre,
      date: selectedDate,
      time: selectedTime,
      seats: selectedSeats.join(", "),
      totalPaid: totalPrice
    });

    setShowSuccessModal(true);

    setSelectedSeats([]);
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <div className="container py-3 animate-fade-in">
      <div className="mb-4">
        <span className="text-warning text-uppercase tracking-widest fw-bold small d-block mb-1">🎟️ TICKETING</span>
        <h1 className="text-gradient fw-bold">Book Your Ticket</h1>
        <p className="text-secondary">Select theatre, showtime, and your premium seats below.</p>
      </div>

      <Row className="g-4">
        
        <Col xs={12} lg={8}>
          
          <div className="glass-panel p-4 mb-4">
            <h4 className="fw-bold mb-4 text-warning">1. Show Details</h4>
            <Row className="g-3 mb-4">
              <Col xs={12} md={6}>
                <Form.Group controlId="movieSelect">
                  <Form.Label className="text-secondary small fw-semibold">Select Movie</Form.Label>
                  <Form.Select
                    value={selectedMovieId}
                    onChange={(e) => setSelectedMovieId(e.target.value)}
                    className="bg-dark bg-opacity-40 text-white border-secondary border-opacity-30 focus-none"
                  >
                    {moviesList.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.title} ({m.genre})
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              
              <Col xs={12} md={6}>
                <Form.Group controlId="theatreSelect">
                  <Form.Label className="text-secondary small fw-semibold">Select Theatre</Form.Label>
                  <Form.Select
                    value={selectedTheatre}
                    onChange={(e) => setSelectedTheatre(e.target.value)}
                    className="bg-dark bg-opacity-40 text-white border-secondary border-opacity-30 focus-none"
                  >
                    <option value="CineBook IMAX 3D">CineBook IMAX 3D</option>
                    <option value="CineBook Dolby Cinema">CineBook Dolby Cinema</option>
                    <option value="CineBook Gold VIP Lounge">CineBook Gold VIP Lounge</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <div className="mb-4">
              <span className="text-secondary small d-block mb-2 fw-semibold">Select Date</span>
              <div className="d-flex flex-wrap gap-2">
                {dates.map((date) => (
                  <Button
                    key={date}
                    variant={selectedDate === date ? "warning" : "outline-light"}
                    onClick={() => setSelectedDate(date)}
                    className={selectedDate === date ? "btn-cinema-accent px-3 py-2" : "btn-cinema-secondary px-3 py-2"}
                  >
                    <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                    {date}
                  </Button>
                ))}
              </div>
            </div>

            <div className="mb-2">
              <span className="text-secondary small d-block mb-2 fw-semibold">Select Showtime</span>
              <div className="d-flex flex-wrap gap-2">
                {times.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "warning" : "outline-light"}
                    onClick={() => setSelectedTime(time)}
                    className={selectedTime === time ? "btn-cinema-accent px-3 py-2" : "btn-cinema-secondary px-3 py-2"}
                  >
                    <FontAwesomeIcon icon={faClock} className="me-2" />
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="glass-panel p-4 mb-4 text-center">
            <h4 className="fw-bold mb-2 text-warning text-md-start">2. Choose Seats</h4>
            <p className="text-secondary small text-md-start mb-4">Rows A-E are Standard ($12). Row F is Premium VIP Lounge seating ($20).</p>

            <div className="d-flex justify-content-center flex-wrap gap-4 mb-4 pb-3 border-bottom border-secondary border-opacity-10">
              <div className="seat-legend-item">
                <div className="seat-legend-box bg-secondary opacity-50" />
                <span>Available</span>
              </div>
              <div className="seat-legend-item">
                <div className="seat-legend-box bg-warning" />
                <span>Selected</span>
              </div>
              <div className="seat-legend-item">
                <div className="seat-legend-box bg-dark border border-secondary border-opacity-20" style={{ opacity: 0.4 }} />
                <span>Booked</span>
              </div>
              <div className="seat-legend-item">
                <div className="seat-legend-box border border-magenta" style={{ borderColor: "#d946ef", borderWidth: "1.5px" }} />
                <span>VIP Row ($20)</span>
              </div>
            </div>

            <div className="cinema-screen" />
            <div className="cinema-screen-text">SCREEN THIS WAY</div>

            <div className="d-inline-block">
              {rows.map((row) => (
                <div key={row} className="d-flex align-items-center gap-3 mb-2 justify-content-center">
                  <span className="fw-bold text-secondary small w-10">{row}</span>
                  <div className="d-flex gap-2">
                    {columns.map((col) => {
                      const seatId = `${row}${col}`;
                      const isOccupied = occupiedSeats.includes(seatId);
                      const isSelected = selectedSeats.includes(seatId);
                      const isVIP = row === "F";

                      return (
                        <div
                          key={seatId}
                          onClick={() => handleSeatClick(seatId)}
                          className={`seat-item ${isOccupied ? "occupied" : ""} ${isSelected ? "selected" : ""} ${isVIP ? "vip" : ""}`}
                          style={{
                            width: "35px",
                            height: "35px",
                          }}
                          title={isOccupied ? "Occupied" : `Seat ${seatId} - $${isVIP ? 20 : 12}`}
                        >
                          {col}
                        </div>
                      );
                    })}
                  </div>
                  <span className="fw-bold text-secondary small w-10">{row}</span>
                </div>
              ))}
            </div>
          </div>
        </Col>

        <Col xs={12} lg={4}>
          <div className="glass-panel p-4 h-100 d-flex flex-column justify-content-between">
            <div>
              <h4 className="fw-bold mb-4 text-warning">Booking Summary</h4>
              
              {selectedMovie ? (
                <>
                  
                  <div className="d-flex gap-3 mb-4 pb-3 border-bottom border-secondary border-opacity-10">
                    <img 
                      src={selectedMovie.posterUrl} 
                      alt={selectedMovie.title} 
                      className="rounded"
                      style={{ width: "65px", height: "90px", objectFit: "cover" }}
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h5 className="fw-bold text-white mb-1">{selectedMovie.title}</h5>
                      <span className="badge-genre">{selectedMovie.genre}</span>
                      <p className="text-secondary small mb-0 mt-1">{selectedMovie.runtime}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-secondary small">Theatre:</span>
                      <span className="text-white small fw-semibold">{selectedTheatre}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-secondary small">Date:</span>
                      <span className="text-white small fw-semibold">{selectedDate}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-secondary small">Showtime:</span>
                      <span className="text-white small fw-semibold">{selectedTime}</span>
                    </div>
                  </div>

                  <div className="mb-4 pb-3 border-bottom border-secondary border-opacity-10">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-secondary small">Selected Seats:</span>
                      <span className="text-warning fw-bold">
                        {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-secondary small">Tickets:</span>
                      <span className="text-white fw-semibold">{selectedSeats.length}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-secondary small">Ticket Subtotal:</span>
                      <span className="text-white fw-bold">${totalPrice}</span>
                    </div>
                  </div>

                  <Form onSubmit={handleConfirmBooking}>
                    <h5 className="fw-bold mb-3 text-warning">Contact Information</h5>
                    <Form.Group className="mb-2" controlId="bookName">
                      <Form.Label className="text-secondary small mb-1">Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-dark bg-opacity-40 text-white border-secondary border-opacity-20 text-sm py-1.5 focus-none"
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="bookEmail">
                      <Form.Label className="text-secondary small mb-1">Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-dark bg-opacity-40 text-white border-secondary border-opacity-20 text-sm py-1.5 focus-none"
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="bookPhone">
                      <Form.Label className="text-secondary small mb-1">Phone Number</Form.Label>
                      <Form.Control
                        type="tel"
                        placeholder="9876543210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="bg-dark bg-opacity-40 text-white border-secondary border-opacity-20 text-sm py-1.5 focus-none"
                        required
                      />
                    </Form.Group>

                    <Button 
                      type="submit" 
                      className="w-100 btn-cinema-primary py-3 fw-bold"
                      disabled={selectedSeats.length === 0}
                    >
                      <FontAwesomeIcon icon={faTicketAlt} className="me-2" />
                      Confirm Seat Booking
                    </Button>
                  </Form>
                </>
              ) : (
                <div className="text-center py-5 text-secondary">
                  <p>Please select a movie first.</p>
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>

      <Modal 
        show={showSuccessModal} 
        onHide={() => setShowSuccessModal(false)} 
        centered 
        contentClassName="glass-panel text-white border-0"
      >
        <Modal.Header closeButton closeVariant="white" className="border-secondary border-opacity-10 p-4">
          <Modal.Title className="fw-bold d-flex align-items-center gap-2 text-warning">
            <FontAwesomeIcon icon={faCheckCircle} className="text-success" />
            Booking Successful!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4 text-center">
          {lastBookingDetails && (
            <>
              <div className="mb-4">
                <img 
                  src={lastBookingDetails.posterUrl} 
                  alt={lastBookingDetails.movieTitle}
                  className="rounded shadow"
                  style={{ width: "100px", height: "145px", objectFit: "cover" }}
                  referrerPolicy="no-referrer"
                />
              </div>
              <h4 className="fw-bold text-white mb-1">{lastBookingDetails.movieTitle}</h4>
              <p className="text-warning fw-bold mb-3">{lastBookingDetails.theatre}</p>
              
              <div className="glass-panel p-3 mb-4 bg-dark bg-opacity-40 text-start border border-secondary border-opacity-10">
                <div className="row mb-2">
                  <div className="col-5 text-secondary small">Ticket ID:</div>
                  <div className="col-7 text-white fw-mono small">{lastBookingDetails.id}</div>
                </div>
                <div className="row mb-2">
                  <div className="col-5 text-secondary small">Showtime:</div>
                  <div className="col-7 text-white fw-semibold">{lastBookingDetails.date} • {lastBookingDetails.time}</div>
                </div>
                <div className="row mb-2">
                  <div className="col-5 text-secondary small">Selected Seats:</div>
                  <div className="col-7 text-warning fw-bold">{lastBookingDetails.seats}</div>
                </div>
                <div className="row mb-2">
                  <div className="col-5 text-secondary small">Amount Paid:</div>
                  <div className="col-7 text-white fw-bold">${lastBookingDetails.totalPaid}</div>
                </div>
                <div className="row">
                  <div className="col-5 text-secondary small">Customer Name:</div>
                  <div className="col-7 text-light">{lastBookingDetails.name}</div>
                </div>
              </div>
              
              <p className="text-secondary small mb-4">A digital ticket confirmation has been sent to <br /><strong className="text-light">{lastBookingDetails.email}</strong></p>
              
              <div className="d-flex gap-2">
                <Button 
                  variant="warning" 
                  onClick={() => setShowSuccessModal(false)}
                  className="btn-cinema-accent w-100 py-2.5 fw-bold"
                >
                  Book More Tickets
                </Button>
                <Button 
                  variant="outline-light" 
                  onClick={() => router.push("/pages")}
                  className="btn-cinema-secondary w-100 py-2.5"
                >
                  View My Bookings
                </Button>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default function TicketPage() {
  return (
    <Suspense fallback={
      <div className="container py-5 text-center text-secondary">
        <h3>Loading CineBook booking engine...</h3>
      </div>
    }>
      <TicketBookingContent />
    </Suspense>
  );
}
