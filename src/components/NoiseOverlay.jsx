export default function NoiseOverlay() {
  return (
    <div
      className="noise-overlay"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9000,
        pointerEvents: 'none',
        opacity: 0.035,
        backgroundImage: "url('/noise.png')",
        backgroundSize: '200px 200px',
      }}
    />
  );
}
