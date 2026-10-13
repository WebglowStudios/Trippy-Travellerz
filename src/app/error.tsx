"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Trippy Travellerz application error:", error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(180deg, #F5ECE0 0%, var(--bg-cream) 100%)",
        padding: 24,
      }}
    >
      <div
        style={{
          maxWidth: 520,
          width: "100%",
          textAlign: "center",
          background: "#FFFFFF",
          border: "1.5px solid var(--border-warm)",
          borderRadius: 24,
          padding: "48px 36px",
          boxShadow: "0 12px 40px rgba(60, 40, 20, 0.08)",
        }}
      >
        <div
          style={{
            width: 70,
            height: 70,
            borderRadius: "50%",
            background: "#FFF4ED",
            border: "1.5px solid #FCD9C6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 18px",
          }}
        >
          <span
            className="material-symbols-rounded"
            style={{ fontSize: 36, color: "var(--brand-ochre)" }}
          >
            sync_problem
          </span>
        </div>

        <span className="cursive" style={{ fontSize: 20, color: "var(--brand-ochre)", display: "block", marginBottom: 4 }}>
          A Temporary Interruption
        </span>

        <h1
          className="serif"
          style={{
            fontSize: "clamp(24px, 3vw, 32px)",
            fontWeight: 700,
            color: "var(--text-dark)",
            margin: "0 0 12px",
            lineHeight: 1.25,
          }}
        >
          Something Went Unexpectedly
        </h1>

        <p
          style={{
            fontSize: 14.5,
            color: "var(--text-body)",
            lineHeight: 1.6,
            maxWidth: 420,
            margin: "0 auto 28px",
          }}
        >
          We encountered an unexpected hitch while preparing this view. Our concierge team has been notified, or you can retry loading the page.
        </p>

        {error?.digest && (
          <div
            style={{
              fontSize: 11.5,
              color: "var(--text-muted)",
              background: "#FAF7F2",
              padding: "6px 12px",
              borderRadius: 8,
              display: "inline-block",
              marginBottom: 24,
              fontFamily: "monospace",
            }}
          >
            Ref Code: {error.digest}
          </div>
        )}

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={reset}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 26px",
              background: "var(--brand-brown)",
              color: "#FFFFFF",
              border: "none",
              borderRadius: 9999,
              fontSize: 13.5,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(88, 55, 30, 0.2)",
            }}
          >
            <span className="material-symbols-rounded" style={{ fontSize: 18 }}>refresh</span>
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 24px",
              background: "#FFFFFF",
              color: "var(--brand-brown)",
              border: "1.5px solid var(--border-warm)",
              borderRadius: 9999,
              fontSize: 13.5,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            <span className="material-symbols-rounded" style={{ fontSize: 18 }}>home</span>
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
