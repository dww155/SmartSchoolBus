import React from 'react';

export default function HowItWorks() {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-yellow-300">How Busflix Works</h2>
        <p className="mt-2 text-gray-200 max-w-2xl mx-auto">Simple flow for schools, drivers and parents.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 border border-white/5 p-6 rounded-lg text-center text-gray-100">
          <div className="text-4xl mb-4">1</div>
          <h3 className="font-semibold text-white">Schedule & Routes</h3>
          <p className="text-gray-200 mt-2">Admin configures routes and student assignments.</p>
        </div>
        <div className="bg-white/10 border border-white/5 p-6 rounded-lg text-center text-gray-100">
          <div className="text-4xl mb-4">2</div>
          <h3 className="font-semibold text-white">Driver App</h3>
          <p className="text-gray-200 mt-2">Driver follows optimized route and marks stops.</p>
        </div>
        <div className="bg-white/10 border border-white/5 p-6 rounded-lg text-center text-gray-100">
          <div className="text-4xl mb-4">3</div>
          <h3 className="font-semibold text-white">Parent Tracking</h3>
          <p className="text-gray-200 mt-2">Parents see live bus location and receive alerts.</p>
        </div>
      </div>
    </section>
  );
}
