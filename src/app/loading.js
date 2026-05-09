export default function Loading() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-primary)",
      }}
    >
      <div style={{ textAlign: "center" }}>
        {/* Gold pulse dot */}
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "var(--color-gold)",
            margin: "0 auto 16px",
            animation: "pulse 1.2s ease-in-out infinite",
          }}
        />
        <style>{`
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.6); opacity: 0.4; }
          }
        `}</style>
      </div>
    </div>
  );
}
