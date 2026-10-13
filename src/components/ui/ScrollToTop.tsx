"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      id="scroll-to-top-btn"
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        width: 46,
        height: 46,
        borderRadius: "50%",
        background: "var(--brand-brown)",
        color: "#FFFFFF",
        border: "1.5px solid var(--brand-ochre)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(16px) scale(0.8)",
        pointerEvents: visible ? "all" : "none",
        zIndex: 990,
        boxShadow: "0 8px 24px rgba(88, 55, 30, 0.35)",
      }}
    >
      <span className="material-symbols-rounded" style={{ fontSize: 22 }}>
        arrow_upward
      </span>
    </button>
  );
}
