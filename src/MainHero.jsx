import React from 'react'


   function Section({ id, className = "", children }) {
  return (
    <section id={id} className={`scroll-mt-24 ${className}`}>
      {children}
    </section>
  );
}

function MainHero() {
  return (
    <div className="relative">
      <a href="#donation-form">
        <img
          src="/desktopbanner.webp"
          alt="Mahayagya Desktop Banner"
          className="hidden md:block h-screen w-full object-cover"
        />
        <img
          src="/mobilebanner.webp"
          alt="Mahayagya Mobile Banner"
          className="block md:hidden h-screen w-full object-cover"
        />
      </a>
    </div>
  );
}


export default MainHero