import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "./globals.css";
import CineBookNavbar from "@/components/Navbar";

config.autoAddCss = false;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CineBook | Premium Cinema Ticket Booking Platform",
  description: "Experience premium movie ticket booking with CineBook. Discover now showing movies, book premium seats, search, filter, and enjoy the show.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="d-flex flex-column min-vh-100">
        
        <CineBookNavbar />

        <main className="flex-grow-1 main-content">
          {children}
        </main>

        <footer className="glass-panel mt-auto m-3 p-4 text-center">
          <div className="container">
            <div className="row align-items-center py-3">
              <div className="col-md-6 text-md-start mb-3 mb-md-0">
                <span className="fw-bold fs-5 text-accent-gradient">CineBook Studio</span>
                <p className="text-secondary small mb-0 mt-1">© {new Date().getFullYear()} CineBook. All rights reserved. Crafted for the ultimate movie booking experience.</p>
              </div>
              <div className="col-md-6 text-md-end">
                <div className="d-flex gap-3 justify-content-center justify-content-md-end text-secondary small">
                  <span>Premium Ticketing</span>
                  <span>•</span>
                  <span>Session Storage DB</span>
                  <span>•</span>
                  <span>Interactive seat layouts</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
