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
  faUserPlus,
  faCheck,
  faTimes
} from "@fortawesome/free-solid-svg-icons";

export default function BookingTable({ bookings, onEdit, onDelete }) {
  
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc"); 
  const [filterGender, setFilterGender] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  const processedBookings = useMemo(() => {
    let result = [...bookings];

    if (search.trim() !== "") {
      const q = search.toLowerCase();
      result = result.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.email.toLowerCase().includes(q) ||
          b.phone.includes(q) ||
          b.favoriteGenre.toLowerCase().includes(q) ||
          b.movieInterest.toLowerCase().includes(q)
      );
    }

    if (filterGender !== "") {
      result = result.filter((b) => b.gender === filterGender);
    }

    result.sort((a, b) => {
      let valA = a[sortField] || "";
      let valB = b[sortField] || "";

      valA = String(valA).toLowerCase();
      valB = String(valB).toLowerCase();

      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [bookings, search, sortField, sortOrder, filterGender]);

  const totalItems = processedBookings.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedBookings = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedBookings.slice(startIndex, startIndex + itemsPerPage);
  }, [processedBookings, currentPage, itemsPerPage]);

  React.useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const renderSortIcon = (field) => {
    if (sortField !== field) return <FontAwesomeIcon icon={faSort} className="text-secondary ms-1 small" />;
    return sortOrder === "asc" ? (
      <FontAwesomeIcon icon={faSortUp} className="text-accent ms-1 small" style={{ color: "var(--cinema-accent)" }} />
    ) : (
      <FontAwesomeIcon icon={faSortDown} className="text-accent ms-1 small" style={{ color: "var(--cinema-accent)" }} />
    );
  };

  return (
    <div className="glass-panel p-4 animate-fade-in">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <h3 className="mb-0 text-gradient d-flex align-items-center gap-2">
          <span>User Registrations & Bookings</span>
          <Badge bg="info" className="fs-6 px-2 py-1 text-dark align-middle">{totalItems} Total</Badge>
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
        
        <div className="col-12 col-md-5">
          <InputGroup>
            <InputGroup.Text className="custom-form-control bg-transparent text-secondary border-end-0">
              <FontAwesomeIcon icon={faSearch} />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search by Name, Email, Phone, Genre, Movie..."
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
          <Form.Select
            value={filterGender}
            onChange={(e) => {
              setFilterGender(e.target.value);
              setCurrentPage(1);
            }}
            className="custom-form-control"
          >
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other / Non-Binary</option>
          </Form.Select>
        </div>

        <div className="col-6 col-md-4 d-grid">
          <Button
            variant="outline-secondary"
            onClick={() => {
              setSearch("");
              setFilterGender("");
              setCurrentPage(1);
            }}
            disabled={!search && !filterGender}
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
              <th onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>
                Name {renderSortIcon("name")}
              </th>
              <th onClick={() => handleSort("email")} style={{ cursor: "pointer" }}>
                Email {renderSortIcon("email")}
              </th>
              <th>Phone</th>
              <th onClick={() => handleSort("gender")} style={{ cursor: "pointer" }} className="text-center">
                Gender {renderSortIcon("gender")}
              </th>
              <th onClick={() => handleSort("favoriteGenre")} style={{ cursor: "pointer" }} className="text-center">
                Fav Genre {renderSortIcon("favoriteGenre")}
              </th>
              <th>Movie of Interest</th>
              <th className="text-center">Newsletter</th>
              <th style={{ width: "120px" }} className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedBookings.length > 0 ? (
              paginatedBookings.map((b) => (
                <tr key={b.id}>
                  <td>
                    <span className="fw-semibold text-white">{b.name}</span>
                  </td>
                  <td>{b.email}</td>
                  <td>{b.phone}</td>
                  <td className="text-center">
                    <Badge bg={b.gender === "Male" ? "primary" : b.gender === "Female" ? "danger" : "secondary"}>
                      {b.gender}
                    </Badge>
                  </td>
                  <td className="text-center">
                    <span className="badge-genre">{b.favoriteGenre}</span>
                  </td>
                  <td>
                    <span className="text-accent-gradient fw-semibold">{b.movieInterest}</span>
                  </td>
                  <td className="text-center">
                    {b.subscribe ? (
                      <FontAwesomeIcon icon={faCheck} className="text-success" />
                    ) : (
                      <FontAwesomeIcon icon={faTimes} className="text-secondary opacity-50" />
                    )}
                  </td>
                  <td className="text-center">
                    <div className="d-flex gap-2 justify-content-center">
                      <Button
                        size="sm"
                        variant="outline-warning"
                        title="Edit Registration"
                        onClick={() => onEdit(b)}
                        style={{ borderRadius: "6px" }}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline-danger"
                        title="Delete Registration"
                        onClick={() => onDelete(b.id)}
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
                  No user registrations found matching the filters.
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
