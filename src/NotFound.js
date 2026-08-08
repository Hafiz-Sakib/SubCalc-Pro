import React from "react";
import { Link, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import "./App.css";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/normal-subnet", label: "FLSM Calculator" },
  { to: "/vlsm-subnet", label: "VLSM Calculator" },
  { to: "/ip-info", label: "IP Info" },
  { to: "/subnet-quiz", label: "Subnetting Quiz" },
  { to: "/blog", label: "Blog" },
];

export default function NotFound() {
  const location = useLocation();

  return (
    <div className="page-wrapper" style={{ background: "var(--bg-deep)" }}>
      <div className="bg-grid" />
      <div
        className="bg-glow-orb"
        style={{
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, rgba(253,121,168,0.1) 0%, transparent 70%)",
          top: -150,
          right: -150,
          animation: "pulse-glow 6s ease-in-out infinite",
        }}
      />

      <NavBar />

      <div
        className="page-content"
        style={{
          maxWidth: 700,
          margin: "0 auto",
          padding: "96px 24px 64px",
          textAlign: "center",
        }}
      >
        <div className="section-tag" style={{ justifyContent: "center" }}>
          Routing Error
        </div>

        <h1
          style={{
            fontSize: "clamp(64px, 14vw, 140px)",
            fontWeight: 800,
            lineHeight: 1,
            marginBottom: 8,
            color: "var(--pink)",
            letterSpacing: "-0.03em",
          }}
        >
          404
        </h1>

        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>
          Destination Unreachable
        </h2>

        <p
          style={{
            fontSize: 14,
            color: "var(--text-secondary)",
            lineHeight: 1.8,
            marginBottom: 8,
          }}
        >
          The route{" "}
          <code
            style={{
              background: "var(--bg-card)",
              padding: "2px 8px",
              borderRadius: 6,
              color: "var(--gold)",
              fontSize: 13,
            }}
          >
            {location.pathname}
          </code>{" "}
          isn't in our routing table.
        </p>
        <p
          style={{
            fontSize: 14,
            color: "var(--text-secondary)",
            lineHeight: 1.8,
            marginBottom: 40,
          }}
        >
          No matching subnet for that address — double check the URL, or pick
          a tool below.
        </p>

        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: 56,
          }}
        >
          <Link to="/" className="btn-primary">
            ← Back to Home
          </Link>
        </div>

        <div className="card animate-fadeInUp" style={{ padding: "28px 32px" }}>
          <div className="section-tag" style={{ justifyContent: "center" }}>
            Try one of these instead
          </div>
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              justifyContent: "center",
              marginTop: 16,
            }}
          >
            {quickLinks.map(({ to, label }) => (
              <Link key={to} to={to} className="nav-link">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <footer className="app-footer">
        Made with ♥ by{" "}
        <a
          href="https://github.com/hafiz-sakib"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mohammad Hafizur Rahman Sakib
        </a>
      </footer>
    </div>
  );
}
