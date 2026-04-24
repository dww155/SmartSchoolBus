import React from 'react';
import Navbar from '../components/homepage/Navbar';
import HeroSection from '../components/homepage/HeroSection';
import Features from '../components/homepage/Features';
import Services from '../components/homepage/Services';
import HowItWorks from '../components/homepage/HowItWorks';
import Pricing from '../components/homepage/Pricing';
import Testimonials from '../components/homepage/Testimonials';
import FAQ from '../components/homepage/FAQ';
import Footer from '../components/homepage/Footer';

function HomePage() {
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-indigo-800 to-purple-900 text-gray-100"
      style={{ WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}
    >
      <Navbar />

      {/* ensure content sits below fixed header */}
      <main className="pt-20">
        {/* Hero */}
        <section id="home">
          <HeroSection />
        </section>

        {/* Sections wrapper */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section id="features" className="mt-20">
            <Features />
          </section>

          <section id="services" className="mt-20">
            <Services />
          </section>

          <section id="how" className="mt-20">
            <HowItWorks />
          </section>

          <section id="pricing" className="mt-20">
            <Pricing />
          </section>

          <section id="testimonials" className="mt-20">
            <Testimonials />
          </section>

          <section id="faq" className="mt-20 mb-12">
            <FAQ />
          </section>
        </div>

        <Footer />
      </main>
    </div>
  );
}

export default HomePage;