"use client";

const DESTINATIONS = [
  "Dubai & UAE",
  "Bali & Indonesia",
  "Maldives & Atolls",
  "Swiss Alps",
  "Singapore & Sentosa",
  "Japan & Tokyo",
  "Turkey & Cappadocia",
  "Georgia & Caucasus",
  "Thailand & Phuket",
  "Mauritius",
  "Santorini & Greece",
  "Vietnam & Ha Long",
];

export default function DestinationMarquee() {
  const doubled = [...DESTINATIONS, ...DESTINATIONS];

  return (
    <div
      style={{
        background: "var(--brand-brown)",
        overflow: "hidden",
        padding: "16px 0",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: "trippyMarquee 42s linear infinite",
        }}
      >
        {doubled.map((dest, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "0 34px",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 2.5,
              textTransform: "uppercase",
              color: "rgba(250, 247, 242, 0.8)",
              whiteSpace: "nowrap",
            }}
          >
            <span>{dest}</span>
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "var(--brand-ochre)",
                flexShrink: 0,
              }}
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes trippyMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
