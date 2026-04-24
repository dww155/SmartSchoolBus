import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlHeader = () => {
    if (window.scrollY > lastScrollY) setShow(false);
    else setShow(true);
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', controlHeader);
    return () => window.removeEventListener('scroll', controlHeader);
  }, [lastScrollY]);

  // smooth scroll for anchor links with header offset
  const handleAnchor = (e, id) => {
    e.preventDefault();
    const el = document.querySelector(id);
    if (!el) return;
    const headerEl = document.querySelector('header');
    const headerHeight = headerEl ? headerEl.offsetHeight : 64;
    const top = el.getBoundingClientRect().top + window.pageYOffset - headerHeight - 12;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <header
      className={`bg-blue-800 text-white p-3 shadow fixed w-full top-0 left-0 transition-transform duration-300 z-50 ${show ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* logo container: use site-tone translucent background instead of white */}
          <div>
            <img src="/assets/logo1.png" alt="logo" className="w-14 h-16" />
          </div>
          <div>
            <h1 className="text-lg font-bold">Busflix</h1>
            <p className="text-blue-200 text-xs">Real-time school bus tracking</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <a href="#features" onClick={(e) => handleAnchor(e, '#features')} className="text-sm hover:underline">Features</a>
          <a href="#services" onClick={(e) => handleAnchor(e, '#services')} className="text-sm hover:underline">Services</a>
          <a href="#how" onClick={(e) => handleAnchor(e, '#how')} className="text-sm hover:underline">How it works</a>
          <a href="#pricing" onClick={(e) => handleAnchor(e, '#pricing')} className="text-sm hover:underline">Pricing</a>
          <a href="#testimonials" onClick={(e) => handleAnchor(e, '#testimonials')} className="text-sm hover:underline">Testimonials</a>
          <a href="#faq" onClick={(e) => handleAnchor(e, '#faq')} className="text-sm hover:underline">FAQ</a>

          {/* Login: use site-tone translucent background (no white) */}
          <Link to="/login" className="text-sm  bg-yellow-400 px-2 py-2 rounded hover:bg-indigo-900/40">Login</Link>
        </nav>

        <div className="md:hidden">
          <Link to="/login" className="text-sm bg-indigo-900/30 px-3 py-2 rounded">Login</Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;