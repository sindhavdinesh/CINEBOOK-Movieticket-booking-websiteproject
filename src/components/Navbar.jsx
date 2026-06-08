"use client";

import React, { useState } from "react";
import { Navbar, Nav, Container, Button, Modal, Form } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faUser, faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";

export default function CineBookNavbar() {
  const pathname = usePathname();

  // Auth modal states
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // "login" | "register"
  const [user, setUser] = useState(null);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (authMode === "login") {
      setUser({ name: email.split("@")[0], email });
    } else {
      setUser({ name: name || "User", email });
    }
    setShowAuthModal(false);
    setEmail("");
    setPassword("");
    setName("");
  };

  const handleLogout = () => {
    setUser(null);
  };

  const openAuth = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <>
      <header className="site-header">
        <Navbar expand="lg" variant="dark" className="w-100 py-0">
          <Container className="px-3 px-md-4">
            <Navbar.Brand as={Link} href="/" className="d-flex align-items-center gap-2 cursor-pointer">
              <span style={{
                background: "linear-gradient(135deg, #facc15 0%, #e2b607 100%)",
                color: "#0f172a",
                padding: "5px 12px",
                borderRadius: "6px",
                fontWeight: "900",
                letterSpacing: "1px",
                fontSize: "1.1rem"
              }}>
                CINE
              </span>
              <span className="fw-bold tracking-wider" style={{ color: "#ffffff", fontSize: "1.2rem" }}>
                BOOK
              </span>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="cinebook-navbar" className="border-0 shadow-none" />

            <Navbar.Collapse id="cinebook-navbar">
              <Nav className="mx-auto gap-1 my-2 my-lg-0">
                <Nav.Link as={Link} href="/" active={pathname === "/"} className="nav-link-custom">Home</Nav.Link>
                <Nav.Link as={Link} href="/movies" active={pathname.startsWith("/movies")} className="nav-link-custom">Movies</Nav.Link>
                <Nav.Link as={Link} href="/ticket" active={pathname === "/ticket"} className="nav-link-custom">Ticket</Nav.Link>
                <Nav.Link as={Link} href="/pages" active={pathname === "/pages"} className="nav-link-custom">Pages</Nav.Link>
                <Nav.Link as={Link} href="/news" active={pathname === "/news"} className="nav-link-custom">News</Nav.Link>
                <Nav.Link as={Link} href="/contact" active={pathname === "/contact"} className="nav-link-custom">Contact</Nav.Link>
              </Nav>

              <div className="d-flex align-items-center gap-2 mt-2 mt-lg-0">
                {user ? (
                  <div className="d-flex align-items-center gap-3">
                    <span className="text-light small">
                      <FontAwesomeIcon icon={faUser} className="me-2 text-warning" />
                      Hi, {user.name}
                    </span>
                    <Button variant="outline-light" size="sm" onClick={handleLogout} className="btn-cinema-secondary py-1 px-3">
                      Logout
                    </Button>
                  </div>
                ) : (
                  <>
                    <Button 
                      variant="link" 
                      onClick={() => openAuth("login")} 
                      className="text-white text-decoration-none px-3"
                    >
                      <FontAwesomeIcon icon={faSignInAlt} className="me-2 text-warning" />
                      Login
                    </Button>
                    <Button 
                      onClick={() => openAuth("register")} 
                      className="btn-cinema-primary py-1.5 px-3"
                    >
                      <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                      Register
                    </Button>
                  </>
                )}
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      {/* Login & Register Modal */}
      <Modal show={showAuthModal} onHide={() => setShowAuthModal(false)} centered contentClassName="glass-panel text-white border-0">
        <Modal.Header closeButton closeVariant="white" className="border-secondary border-opacity-20 p-4">
          <Modal.Title className="fw-bold">
            {authMode === "login" ? "Login to CineBook" : "Create CineBook Account"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form onSubmit={handleAuthSubmit}>
            {authMode === "register" && (
              <Form.Group className="mb-3" controlId="authName">
                <Form.Label className="text-secondary small fw-semibold">Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-dark bg-opacity-50 text-white border-secondary border-opacity-30 focus-none"
                  required
                />
              </Form.Group>
            )}
            <Form.Group className="mb-3" controlId="authEmail">
              <Form.Label className="text-secondary small fw-semibold">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-dark bg-opacity-50 text-white border-secondary border-opacity-30 focus-none"
                required
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="authPassword">
              <Form.Label className="text-secondary small fw-semibold">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-dark bg-opacity-50 text-white border-secondary border-opacity-30 focus-none"
                required
              />
            </Form.Group>
            <Button type="submit" className="w-100 btn-cinema-primary py-2.5 fw-bold mb-3">
              {authMode === "login" ? "Sign In" : "Register"}
            </Button>
          </Form>
          <div className="text-center mt-3">
            {authMode === "login" ? (
              <p className="small text-secondary mb-0">
                New to CineBook?{" "}
                <span onClick={() => setAuthMode("register")} className="text-warning cursor-pointer fw-semibold text-decoration-underline ms-1">
                  Create an account
                </span>
              </p>
            ) : (
              <p className="small text-secondary mb-0">
                Already have an account?{" "}
                <span onClick={() => setAuthMode("login")} className="text-warning cursor-pointer fw-semibold text-decoration-underline ms-1">
                  Sign in
                </span>
              </p>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
