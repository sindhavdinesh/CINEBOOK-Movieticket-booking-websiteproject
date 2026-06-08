"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Row, Col, Card, Button, Form, InputGroup, Pagination } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faStar, faCalendarAlt, faSort, faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

// Data operations
import { getMovies, seedDatabase } from "@/data/movieData";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortBy, setSortBy] = useState("rating-desc"); // rating-desc, name-asc, name-desc, year-desc, year-asc
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    seedDatabase();
    setMovies(getMovies());
  }, []);

  // Genres list from movies list
  const genres = useMemo(() => {
    const list = new Set();
    movies.forEach(m => list.add(m.genre));
    return ["All", ...Array.from(list)];
  }, [movies]);

  // Filter and sort movies list
  const filteredAndSortedMovies = useMemo(() => {
    let result = [...movies];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        m => m.title.toLowerCase().includes(q) || 
             m.director.toLowerCase().includes(q) ||
             (m.cast && m.cast.toLowerCase().includes(q))
      );
    }

    // Genre filter
    if (selectedGenre !== "All") {
      result = result.filter(m => m.genre === selectedGenre);
    }

    // Sort operations
    result.sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.title.localeCompare(b.title);
        case "name-desc":
          return b.title.localeCompare(a.title);
        case "rating-desc":
          return b.rating - a.rating;
        case "year-desc":
          return b.year - a.year;
        case "year-asc":
          return a.year - b.year;
        default:
          return b.rating - a.rating;
      }
    });

    return result;
  }, [movies, searchQuery, selectedGenre, sortBy]);

  // Reset pagination when filter/search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedGenre, sortBy]);

  // Pagination calculation
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMovies = useMemo(() => {
    return filteredAndSortedMovies.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredAndSortedMovies, indexOfFirstItem, indexOfLastItem]);

  const totalPages = Math.ceil(filteredAndSortedMovies.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container py-3 animate-fade-in">
      <div className="mb-4">
        <span className="text-warning text-uppercase tracking-widest fw-bold small d-block mb-1">🔍 BROWSE DB</span>
        <h1 className="text-gradient fw-bold">Explore Movies</h1>
        <p className="text-secondary">Search, sort, filter, and discover your next cinematic adventure.</p>
      </div>

      {/* Filter and Search Panel */}
      <div className="glass-panel p-4 mb-5">
        <Row className="g-3 align-items-center">
          {/* Search box */}
          <Col xs={12} md={5}>
            <Form.Group className="mb-0">
              <InputGroup>
                <InputGroup.Text className="bg-dark bg-opacity-40 text-secondary border-secondary border-opacity-30">
                  <FontAwesomeIcon icon={faSearch} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search movie title, director, cast..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-dark bg-opacity-40 text-white border-secondary border-opacity-30 focus-none"
                />
              </InputGroup>
            </Form.Group>
          </Col>

          {/* Genre select */}
          <Col xs={12} sm={6} md={3}>
            <Form.Select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="bg-dark bg-opacity-40 text-white border-secondary border-opacity-30 focus-none"
            >
              <option value="All">All Genres</option>
              {genres.filter(g => g !== "All").map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </Form.Select>
          </Col>

          {/* Sort selection */}
          <Col xs={12} sm={6} md={4}>
            <InputGroup>
              <InputGroup.Text className="bg-dark bg-opacity-40 text-secondary border-secondary border-opacity-30">
                <FontAwesomeIcon icon={faSort} className="text-warning" />
              </InputGroup.Text>
              <Form.Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-dark bg-opacity-40 text-white border-secondary border-opacity-30 focus-none"
              >
                <option value="rating-desc">Rating: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
                <option value="year-desc">Year: Newest First</option>
                <option value="year-asc">Year: Oldest First</option>
              </Form.Select>
            </InputGroup>
          </Col>
        </Row>

        {/* Genre fast pills */}
        <div className="d-flex flex-wrap gap-2 mt-4 pt-3 border-top border-secondary border-opacity-10">
          <span className="text-secondary small mt-1.5 me-2">Fast Filter:</span>
          {genres.map((genre) => (
            <Button
              key={genre}
              variant={selectedGenre === genre ? "warning" : "outline-light"}
              onClick={() => setSelectedGenre(genre)}
              size="sm"
              className={selectedGenre === genre ? "btn-cinema-accent py-1 px-3" : "btn-cinema-secondary py-1 px-3"}
            >
              {genre}
            </Button>
          ))}
        </div>
      </div>

      {/* Listing Grid */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="text-white fw-bold mb-0">Results ({filteredAndSortedMovies.length})</h3>
          <span className="text-secondary small">Showing page {currentPage} of {totalPages || 1}</span>
        </div>

        {currentMovies.length > 0 ? (
          <Row className="g-4">
            {currentMovies.map((movie) => (
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
                      {movie.featured && <span className="badge-featured shadow text-center bg-warning text-dark fw-bold">FEATURED</span>}
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
        ) : (
          <div className="glass-panel text-center py-5">
            <h4 className="text-secondary mb-3">No Movies Found</h4>
            <p className="text-muted">Try adjusting your search terms or genre filter pills.</p>
            <Button 
              variant="outline-light" 
              onClick={() => { setSearchQuery(""); setSelectedGenre("All"); }}
              className="btn-cinema-secondary mt-2 px-4 py-2"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Pagination control */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-5">
          <Pagination className="glass-panel p-1">
            <Pagination.Prev 
              onClick={() => handlePageChange(currentPage - 1)} 
              disabled={currentPage === 1}
              className="page-item-cinema"
            />
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <Pagination.Item
                key={number}
                active={number === currentPage}
                onClick={() => handlePageChange(number)}
                className="page-item-cinema"
              >
                {number}
              </Pagination.Item>
            ))}
            <Pagination.Next 
              onClick={() => handlePageChange(currentPage + 1)} 
              disabled={currentPage === totalPages}
              className="page-item-cinema"
            />
          </Pagination>
        </div>
      )}
    </div>
  );
}
