export default function CinematicHero() {
  return (
    <div className="cinematic-hero">
      {/* Absolute Brand Header positioned top-left over the image */}
      <div className="hero-brand-header">
        <svg
          className="brand-logo-svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Logo icon matching the blue and orange stylized "T" shape */}
          <path
            d="M11 6C11 4.89543 11.8954 4 13 4H23C24.1046 4 25 4.89543 25 6V8C25 9.10457 24.1046 10 23 10H19V24C19 25.1046 18.1046 26 17 26H15C13.8954 26 13 25.1046 13 24V10H12C11.8954 10 11 9.10457 11 8V6Z"
            fill="#0B1F3A"
          />
          <path
            d="M6 10C6 7.79086 7.79086 6 10 6H13V12H10C7.79086 12 6 10.2091 6 10Z"
            fill="#F97316"
          />
        </svg>
        <div className="brand-text-container">
          <span className="brand-logo-text">
            Transit<span className="accent-ops">Ops</span>
          </span>
          <span className="brand-subtitle-text">
            SMART TRANSPORT OPERATIONS PLATFORM
          </span>
        </div>
      </div>

      {/* The background image contains the pre-compiled visual assets */}
      <div className="hero-bg-image" />
      
      {/* Light atmospheric gradient overlay */}
      <div className="hero-overlay" />
      <div className="hero-vignette" />
    </div>
  );
}
