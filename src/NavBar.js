import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./App.css";

const allLinks = [
  { to: "/", label: "Home" },
  { to: "/normal-subnet", label: "FLSM" },
  { to: "/vlsm-subnet", label: "VLSM" },
  { to: "/ip-info", label: "IP Info" },
  { to: "/binary-converter", label: "Binary" },
  { to: "/cidr-range", label: "CIDR" },
  { to: "/wildcard-mask", label: "Wildcard" },
  { to: "/overlap-detector", label: "Overlap" },
  { to: "/ip-class", label: "IP Class" },
  { to: "/subnet-quiz", label: "Quiz" },
  { to: "/network-summary", label: "Summary" },
  { to: "/subnet-visual-map", label: "Visual Map" },
  { to: "/ip-heatmap", label: "Heatmap" },
  { to: "/subnet-comparison", label: "Compare" },
  { to: "/blog", label: "Blog" },
  { to: "/NetworkTrafficChart", label: "Traffic Chart" },
  { to: "/SubnetPieChart", label: "Subnet Pie Chart" },
  { to: "/iptimeline", label: "IP Timeline" },
];

// Links shown in navbar on desktop; rest go in "More" dropdown
const primaryLinks = allLinks.slice(0, 5);
const moreLinks = allLinks.slice(5);

export default function NavBar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const menuRef = useRef(null);
  const moreRef = useRef(null);
  const closeTimer = useRef(null);

  const openMore = () => {
    clearTimeout(closeTimer.current);
    setMoreOpen(true);
  };
  const closeMoreDelayed = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMoreOpen(false), 150);
  };

  // Close "More" dropdown on route change
  useEffect(() => {
    setMoreOpen(false);
  }, [location.pathname]);

  // Close "More" dropdown on outside click, and on Escape
  useEffect(() => {
    const handleClick = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
    };
    const handleKey = (e) => {
      if (e.key === "Escape") setMoreOpen(false);
    };
    if (moreOpen) {
      document.addEventListener("mousedown", handleClick);
      document.addEventListener("keydown", handleKey);
    }
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [moreOpen]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Close menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav className="nav-bar" ref={menuRef}>
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <rect
              x="1"
              y="1"
              width="9"
              height="9"
              rx="2"
              fill="#ffc93c"
              opacity="0.9"
            />
            <rect
              x="12"
              y="1"
              width="9"
              height="9"
              rx="2"
              fill="#ffc93c"
              opacity="0.4"
            />
            <rect
              x="1"
              y="12"
              width="9"
              height="9"
              rx="2"
              fill="#ffc93c"
              opacity="0.4"
            />
            <rect
              x="12"
              y="12"
              width="9"
              height="9"
              rx="2"
              fill="#1fe3ae"
              opacity="0.8"
            />
          </svg>
          Sub<span>Calc</span>
        </Link>

        {/* Desktop links */}
        <div className="nav-links-desktop">
          {primaryLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`nav-link ${location.pathname === to ? "active" : ""}`}
            >
              {label}
            </Link>
          ))}

          {/* More dropdown */}
          <div
            className="nav-more-wrapper"
            ref={moreRef}
            onMouseEnter={openMore}
            onMouseLeave={closeMoreDelayed}
          >
            <button
              className="nav-more-btn"
              onClick={() => setMoreOpen((o) => !o)}
              aria-haspopup="true"
              aria-expanded={moreOpen}
            >
              More ▾
            </button>
            <div
              className={`nav-more-dropdown ${moreOpen ? "open" : ""}`}
              role="menu"
            >
              <div className="nav-more-dropdown-inner">
                {moreLinks.map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    role="menuitem"
                    className={`nav-more-item ${location.pathname === to ? "active" : ""}`}
                    onClick={() => setMoreOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Hamburger button — shown on mobile/tablet */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <HamburgerIcon open={menuOpen} />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="nav-mobile-backdrop"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile menu drawer */}
      <div className={`nav-mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="nav-mobile-inner">
          <div className="nav-mobile-header">
            <Link
              to="/"
              className="nav-logo"
              onClick={() => setMenuOpen(false)}
            >
              <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
                <rect
                  x="1"
                  y="1"
                  width="9"
                  height="9"
                  rx="2"
                  fill="#ffc93c"
                  opacity="0.9"
                />
                <rect
                  x="12"
                  y="1"
                  width="9"
                  height="9"
                  rx="2"
                  fill="#ffc93c"
                  opacity="0.4"
                />
                <rect
                  x="1"
                  y="12"
                  width="9"
                  height="9"
                  rx="2"
                  fill="#ffc93c"
                  opacity="0.4"
                />
                <rect
                  x="12"
                  y="12"
                  width="9"
                  height="9"
                  rx="2"
                  fill="#1fe3ae"
                  opacity="0.8"
                />
              </svg>
              Sub<span>Calc</span>
            </Link>
            <button
              className="nav-mobile-close"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <div className="nav-mobile-links">
            {allLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`nav-mobile-link ${location.pathname === to ? "active" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
                <span className="nav-mobile-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function HamburgerIcon({ open }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      style={{ transition: "transform 0.2s" }}
    >
      {open ? (
        <>
          <line
            x1="4"
            y1="4"
            x2="18"
            y2="18"
            stroke="var(--text-secondary)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="18"
            y1="4"
            x2="4"
            y2="18"
            stroke="var(--text-secondary)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </>
      ) : (
        <>
          <line
            x1="3"
            y1="6"
            x2="19"
            y2="6"
            stroke="var(--text-secondary)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="3"
            y1="11"
            x2="19"
            y2="11"
            stroke="var(--text-secondary)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="3"
            y1="16"
            x2="19"
            y2="16"
            stroke="var(--text-secondary)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}
