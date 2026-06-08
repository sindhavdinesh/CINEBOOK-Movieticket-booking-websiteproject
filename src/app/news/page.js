"use client";

import React, { useState } from "react";
import { Row, Col, Card, Button, Badge, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCalendarAlt, faChevronRight, faNewspaper } from "@fortawesome/free-solid-svg-icons";

export default function NewsPage() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const featuredArticle = {
    id: "f1",
    title: "Dune Part Two Dominates Box Office Globally: How Denis Villeneuve Redefined Sci-Fi Cinema",
    summary: "Denis Villeneuve's desert masterpiece has captured the global box office, surpassing predictions and setting new standards for blockbuster cinema depth. From sound design to visual effects, we dive into the production details that made this an instant classic.",
    content: "Dune: Part Two has taken the global box office by storm, earning rave reviews from both critics and fans alike. Directed by visionary Denis Villeneuve, the sequel completes the adaptation of Frank Herbert's legendary science fiction novel with visual grandeur, deep narrative complexity, and state-of-the-art cinema technology.\n\nFilmed entirely for IMAX screens, the production took place in remote desert locations across Abu Dhabi and Jordan to capture the raw realism of Arrakis. Villeneuve, alongside cinematographer Greig Fraser, utilized custom lenses and advanced lighting strategies to create a sand-scorched, immersive atmosphere. Hans Zimmer's soaring, mechanical soundtrack further cements the cinematic scale.\n\nIndustry analysts estimate Dune: Part Two will surpass $800 million globally, representing a triumph for smart, large-scale cinematic storytelling. As Villeneuve contemplates a third installment based on Dune Messiah, the cinematic community agrees that sci-fi storytelling has been permanently elevated.",
    category: "Box Office",
    date: "June 02, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop"
  };

  const newsArticles = [
    {
      id: "n1",
      title: "Christopher Nolan Hints at Next Secret Film Project with Universal",
      summary: "Following the historic Oscar sweep of Oppenheimer, Christopher Nolan is reportedly scripting a high-concept action thriller with sci-fi elements scheduled for late 2027.",
      content: "Fresh off the massive success of Oppenheimer, Christopher Nolan is not resting on his laurels. According to industry insiders, the British director has already completed the first draft of his next project. Details are under wraps, but sources describe it as a high-concept, espionage action thriller with mind-bending science fiction concepts reminiscent of Inception and Tenet.\n\nUniversal Pictures, which partnered with Nolan for Oppenheimer, is set to distribute the film globally. Casting calls are rumored to begin next month, with A-list actors already circling the leading roles. IMAX cameras will once again play a central role, ensuring Nolan's fans receive another breathtaking theater experience.",
      category: "Production",
      date: "May 29, 2026",
      readTime: "3 min read",
      image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: "n2",
      title: "Spider-Man: Beyond the Spider-Verse Announces Revolutionary Visual Styles",
      summary: "Animators reveal that the final chapter of the Spider-Verse trilogy will feature 10 distinct art styles, representing a milestone in digital animation.",
      content: "Sony Pictures Animation has provided a sneak peek into the final chapter of Miles Morales' adventure. Producers Phil Lord and Chris Miller shared that the upcoming film will expand on the visual styles of its predecessors, incorporating ten distinct animation methodologies corresponding to ten different dimensions.\n\n'We are pushing the boundaries of what is possible in digital medium,' said lead animators. The studio has hired traditional watercolor painters, claymation artists, and digital glitch designers to create a seamless yet jarring multiverse experience. Despite release delays, fans are expecting a masterpiece that will define animation for a generation.",
      category: "Animation",
      date: "May 25, 2026",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: "n3",
      title: "The Rise of Large Format: Why Audiences Choose IMAX Over Home Streaming",
      summary: "New industry study shows 45% increase in premium ticket sales, indicating moviegoers value visual and acoustic scale over bedroom convenience.",
      content: "A comprehensive market study conducted by the Cinema Research Institute has revealed a significant shift in audience habits. Despite the convenience of home streaming networks, moviegoers are turning out in record numbers for premium large formats like IMAX, Dolby Cinema, and ScreenX.\n\nPremium theater ticket sales saw a massive 45% increase year-over-year. The report highlights that audiences view moviegoing as an 'event' and are willing to pay higher ticket prices for superior visual contrast, screen size, and immersive surround sound systems that cannot be replicated in a standard living room. This highlights the enduring power of shared theatrical experiences.",
      category: "Industry News",
      date: "May 20, 2026",
      readTime: "3 min read",
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: "n4",
      title: "Cannes Film Festival 2026: The Top 5 Indie Standouts to Keep on Your Radar",
      summary: "Our critics compile the most promising independent and foreign language films from the French Riviera that will make waves in upcoming festivals.",
      content: "The 79th Cannes Film Festival has closed its doors, leaving film lovers with a slate of spectacular indie achievements. From intimate family dramas in East Asia to experimental horror from Latin America, this year's lineup showcased incredible directorial versatility.\n\nOur top pick includes 'Echoes of Silence,' an introspective drama shot entirely on 16mm film that won the Grand Prix. Another standout is the dystopian satire 'Suburban Paradise,' which won the Best Screenplay award. These independent gems are currently securing theatrical distribution deals and are expected to arrive in partner cinema houses later this year.",
      category: "Festivals",
      date: "May 15, 2026",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=400&auto=format&fit=crop"
    }
  ];

  const handleReadArticle = (article) => {
    setSelectedArticle(article);
  };

  return (
    <div className="container py-3 animate-fade-in">
      <div className="mb-4">
        <span className="text-warning text-uppercase tracking-widest fw-bold small d-block mb-1">📰 MAGAZINE</span>
        <h1 className="text-gradient fw-bold">CineBook News</h1>
        <p className="text-secondary">Read the latest reviews, box office numbers, and production updates from the world of cinema.</p>
      </div>

      <div className="glass-panel p-4 mb-5 relative overflow-hidden">
        <Row className="g-4 align-items-center">
          <Col xs={12} lg={6}>
            <div className="rounded-4 overflow-hidden shadow-lg border border-secondary border-opacity-10" style={{ maxHeight: "350px" }}>
              <img 
                src={featuredArticle.image} 
                alt={featuredArticle.title} 
                className="w-100 h-100 object-fit-cover card-zoom"
                style={{ objectFit: "cover", display: "block" }}
              />
            </div>
          </Col>
          <Col xs={12} lg={6}>
            <div>
              <div className="d-flex align-items-center gap-3 mb-3">
                <Badge bg="warning" text="dark" className="fw-bold px-2.5 py-1.5 uppercase">
                  {featuredArticle.category}
                </Badge>
                <span className="text-secondary small">
                  <FontAwesomeIcon icon={faCalendarAlt} className="me-1 text-warning" />
                  {featuredArticle.date}
                </span>
                <span className="text-secondary small">
                  <FontAwesomeIcon icon={faClock} className="me-1 text-warning" />
                  {featuredArticle.readTime}
                </span>
              </div>
              <h2 className="fw-extrabold text-white mb-3 lh-sm text-gradient">
                {featuredArticle.title}
              </h2>
              <p className="text-light opacity-75 mb-4 fs-5 lh-relaxed">
                {featuredArticle.summary}
              </p>
              <Button className="btn-cinema-primary px-4 py-2 fw-bold" onClick={() => handleReadArticle(featuredArticle)}>
                Read Featured Article
                <FontAwesomeIcon icon={faChevronRight} className="ms-2" />
              </Button>
            </div>
          </Col>
        </Row>
      </div>

      <div className="mb-4">
        <h3 className="text-white fw-bold mb-4 d-flex align-items-center gap-2">
          <FontAwesomeIcon icon={faNewspaper} className="text-warning" />
          Industry Updates
        </h3>
        <Row className="g-4">
          {newsArticles.map((article) => (
            <Col xs={12} md={6} key={article.id}>
              <Card className="h-100 border-0 glass-card text-white overflow-hidden d-flex flex-column justify-content-between">
                <div style={{ height: "200px", overflow: "hidden" }}>
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-100 h-100 object-fit-cover card-zoom"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <Card.Body className="p-4 bg-dark bg-opacity-40 d-flex flex-column justify-content-between flex-grow-1">
                  <div>
                    <div className="d-flex align-items-center gap-3 mb-3 text-secondary small">
                      <Badge bg="secondary" className="fw-semibold text-white px-2 py-1 bg-opacity-30">
                        {article.category}
                      </Badge>
                      <span>
                        <FontAwesomeIcon icon={faCalendarAlt} className="me-1 text-warning" />
                        {article.date}
                      </span>
                      <span>
                        <FontAwesomeIcon icon={faClock} className="me-1 text-warning" />
                        {article.readTime}
                      </span>
                    </div>
                    <Card.Title className="fs-4 fw-bold text-white mb-2 line-clamp-2">{article.title}</Card.Title>
                    <p className="card-text text-secondary small mb-4">{article.summary}</p>
                  </div>
                  <Button variant="outline-light" className="btn-cinema-secondary w-100 py-2 mt-2" onClick={() => handleReadArticle(article)}>
                    Read Article
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {selectedArticle && (
        <Modal 
          show={!!selectedArticle} 
          onHide={() => setSelectedArticle(null)} 
          size="lg" 
          centered 
          contentClassName="glass-panel text-white border-0"
        >
          <Modal.Header closeButton closeVariant="white" className="border-secondary border-opacity-10 p-4">
            <Modal.Title className="fw-bold text-warning">{selectedArticle.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4">
            <div className="mb-4 rounded overflow-hidden" style={{ maxHeight: "380px" }}>
              <img 
                src={selectedArticle.image} 
                alt={selectedArticle.title} 
                className="w-100 h-100 object-fit-cover"
                style={{ objectFit: "cover" }}
              />
            </div>
            
            <div className="d-flex align-items-center gap-3 mb-4 text-secondary small">
              <Badge bg="warning" text="dark" className="fw-bold px-2 py-1">
                {selectedArticle.category}
              </Badge>
              <span>
                <FontAwesomeIcon icon={faCalendarAlt} className="me-1 text-warning" />
                {selectedArticle.date}
              </span>
              <span>
                <FontAwesomeIcon icon={faClock} className="me-1 text-warning" />
                {selectedArticle.readTime}
              </span>
            </div>

            <div className="text-light lh-lg fs-5" style={{ whiteSpace: "pre-line", opacity: 0.9 }}>
              {selectedArticle.content}
            </div>
          </Modal.Body>
          <Modal.Footer className="border-secondary border-opacity-10 p-3">
            <Button variant="outline-light" className="btn-cinema-secondary px-4" onClick={() => setSelectedArticle(null)}>
              Close Reader
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
