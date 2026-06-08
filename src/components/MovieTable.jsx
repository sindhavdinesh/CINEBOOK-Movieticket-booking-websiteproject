"use client";

import React, { useState, useMemo } from "react";
import { Table, Form, InputGroup, Button, Badge, Pagination } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faSort,
  faSortUp,
  faSortDown,
  faTrash,
  faEdit,
  faEye,
  faFilter
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function MovieTable({ movies, onEdit, onDelete }) {
  
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc"); 
  
  const [filterGenre, setFilterGenre] = useState("");
  const [filterLanguage, setFilterLanguage] = useState("");
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const genres = useMemo(() => {
    const allGenres = movies.map(m => m.genre).filter(Boolean);
    return [...new Set(allGenres)];
  }, [movies]);

  const languages = useMemo(() => {
    const allLangs = movies.map(m => m.language).filter(Boolean);
    return [...new Set(allLangs)];
  }, [movies]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    setCurrentPage(1); 
  };

  const processedMovies = useMemo(() => {
    let result = [...movies];

    if (search.trim() !== "") {
      const q = search.toLowerCase();
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.director.toLowerCase().includes(q) ||
          m.genre.toLowerCase().includes(q)
      );
    }

    if (filterGenre !== "") {
      result = result.filter((m) => m.genre === filterGenre);
    }

    if (filterLanguage !== "") {
      result = result.filter((m) => m.language === filterLanguage);
    }

    result.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (sortField === "year" || sortField === "rating") {
        return sortOrder === "asc" ? valA - valB : valB - valA;
      }

      valA = String(valA).toLowerCase();
      valB = String(valB).toLowerCase();
      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [movies, search, sortField, sortOrder, filterGenre, filterLanguage]);

  const totalItems = processedMovies.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const paginatedMovies = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedMovies.slice(startIndex, startIndex + itemsPerPage);
  }, [processedMovies, currentPage, itemsPerPage]);

  React.useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const renderSortIcon = (field) => {
    if (sortField !== field) return <FontAwesomeIcon icon={faSort} className="text-secondary ms-1 small" />;
    return sortOrder === "asc" ? (
      <FontAwesomeIcon icon={faSortUp} className="text-accent ms-1 small" style={{color: "var(--cinema-accent)"}} />
    ) : (
      <FontAwesomeIcon icon={faSortDown} className="text-accent ms-1 small" style={{color: "var(--cinema-accent)"}} />
    );
  };

  return (
    <div className="glass-panel p-4 animate-fade-in">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <h3 className="mb-0 text-gradient d-flex align-items-center gap-2">
          <span>Movie Database Data Table</span>
          <Badge bg="secondary" className="fs-6 px-2 py-1 align-middle">{totalItems} Total</Badge>
        </h3>

        <div className="d-flex align-items-center gap-2">
          <span className="small text-secondary text-nowrap">Show per page:</span>
          <Form.Select
            size="sm"
            className="custom-form-control py-1 px-3 w-auto"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </Form.Select>
        </div>
      </div>

      <div className="row g-3 mb-4">
        
        <div className="col-12 col-md-4">
          <InputGroup>
            <InputGroup.Text className="custom-form-control bg-transparent text-secondary border-end-0">
              <FontAwesomeIcon icon={faSearch} />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search by Title, Director, Genre..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="custom-form-control border-start-0 ps-0"
            />
          </InputGroup>
        </div>

        <div className="col-6 col-md-3">
          <InputGroup>
            <InputGroup.Text className="custom-form-control bg-transparent text-secondary border-end-0">
              <FontAwesomeIcon icon={faFilter} />
            </InputGroup.Text>
            <Form.Select
              value={filterGenre}
              onChange={(e) => {
                setFilterGenre(e.target.value);
                setCurrentPage(1);
              }}
              className="custom-form-control border-start-0 ps-0"
            >
              <option value="">All Genres</option>
              {genres.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </Form.Select>
          </InputGroup>
        </div>

        <div className="col-6 col-md-3">
          <InputGroup>
            <InputGroup.Text className="custom-form-control bg-transparent text-secondary border-end-0">
              <FontAwesomeIcon icon={faFilter} />
            </InputGroup.Text>
            <Form.Select
              value={filterLanguage}
              onChange={(e) => {
                setFilterLanguage(e.target.value);
                setCurrentPage(1);
              }}
              className="custom-form-control border-start-0 ps-0"
            >
              <option value="">All Languages</option>
              {languages.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </Form.Select>
          </InputGroup>
        </div>

        <div className="col-12 col-md-2 d-grid">
          <Button
            variant="outline-secondary"
            onClick={() => {
              setSearch("");
              setFilterGenre("");
              setFilterLanguage("");
              setCurrentPage(1);
            }}
            disabled={!search && !filterGenre && !filterLanguage}
            className="btn-cinema-secondary"
          >
            Clear Filters
          </Button>
        </div>
      </div>

      <div className="custom-table-container">
        <Table responsive className="custom-table table-hover border-0 align-middle">
          <thead>
            <tr>
              <th onClick={() => handleSort("title")} style={{ cursor: "pointer" }}>
                Title {renderSortIcon("title")}
              </th>
              <th>Director</th>
              <th onClick={() => handleSort("genre")} style={{ cursor: "pointer" }}>
                Genre {renderSortIcon("genre")}
              </th>
              <th onClick={() => handleSort("year")} style={{ cursor: "pointer", width: "120px" }} className="text-center">
                Year {renderSortIcon("year")}
              </th>
              <th onClick={() => handleSort("rating")} style={{ cursor: "pointer", width: "120px" }} className="text-center">
                Rating {renderSortIcon("rating")}
              </th>
              <th className="text-center">Language</th>
              <th className="text-center">Featured</th>
              <th style={{ width: "150px" }} className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedMovies.length > 0 ? (
              paginatedMovies.map((movie) => (
                <tr key={movie.id}>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      {movie.posterUrl && (
                        <img
                          src={movie.posterUrl}
                          alt={movie.title}
                          className="rounded"
                          style={{ width: "32px", height: "45px", objectFit: "cover" }}
                          referrerPolicy="no-referrer"
                        />
                      )}
                      <span className="fw-semibold text-white">{movie.title}</span>
                    </div>
                  </td>
                  <td>{movie.director}</td>
                  <td>
                    <span className="badge-genre">{movie.genre}</span>
                  </td>
                  <td className="text-center fw-semibold text-secondary">{movie.year}</td>
                  <td className="text-center">
                    <span className="rating-badge">★ {Number(movie.rating).toFixed(1)}</span>
                  </td>
                  <td className="text-center">{movie.language}</td>
                  <td className="text-center">
                    {movie.featured ? (
                      <span className="badge-featured">YES</span>
                    ) : (
                      <span className="text-secondary small">no</span>
                    )}
                  </td>
                  <td className="text-center">
                    <div className="d-flex gap-2 justify-content-center">
                      <Link href={`/movies/${movie.id}`} passHref>
                        <Button size="sm" variant="outline-info" title="View Details" style={{ borderRadius: "6px" }}>
                          <FontAwesomeIcon icon={faEye} />
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="outline-warning"
                        title="Edit Movie"
                        onClick={() => onEdit(movie)}
                        style={{ borderRadius: "6px" }}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline-danger"
                        title="Delete Movie"
                        onClick={() => onDelete(movie.id)}
                        style={{ borderRadius: "6px" }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-5 text-secondary">
                  No movies found matching the search or filters.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap gap-3">
          <span className="small text-secondary">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} entries
          </span>
          <Pagination className="mb-0 custom-pagination">
            <Pagination.Prev
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
            />
            {[...Array(totalPages)].map((_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
            />
          </Pagination>
        </div>
      )}
    </div>
  );
}
