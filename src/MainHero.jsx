import React from "react";

export default function MainHero() {
  return (
    <div className="w-full">
      <a href="#donation-form" aria-label="Go to Donation Form" className="block">
        <picture>
          {/* Desktop image */}
          <source media="(min-width: 768px)" srcSet="/desktopbanner.webp" />
          {/* Mobile fallback */}
          <img
            src="/mobilebanner.webp"
            alt="Mahayagya Banner"
            className="block w-full h-auto select-none"
            loading="eager"
            fetchpriority="high"
          />
        </picture>
      </a>
    </div>
  );
}
