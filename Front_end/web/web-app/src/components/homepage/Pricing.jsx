import React from 'react';

export default function Pricing() {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-yellow-300">Pricing Plans</h2>
        <p className="mt-2 text-gray-200 max-w-2xl mx-auto">Transparent pricing for schools of all sizes.</p>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full px-4">
          <div className="p-6 rounded-lg bg-white/10 border border-white/6 text-center text-gray-100">
            <h3 className="font-semibold text-white text-xl">Starter</h3>
            <p className="mt-4 text-3xl font-bold text-gray-100">Free</p>
            <p className="text-gray-200 mt-2">Basic tracking for up to 2 buses</p>
          </div>

          <div className="p-6 rounded-lg bg-white/10 border border-white/6 text-center text-gray-100">
            <h3 className="font-semibold text-white text-xl">Standard</h3>
            <p className="mt-4 text-3xl font-bold text-gray-100">$99/mo</p>
            <p className="text-gray-200 mt-2">Full features for small schools</p>
          </div>

          <div className="p-6 rounded-lg bg-white/10 border border-white/6 text-center text-gray-100">
            <h3 className="font-semibold text-white text-xl">Enterprise</h3>
            <p className="mt-4 text-3xl font-bold text-gray-100">Contact</p>
            <p className="text-gray-200 mt-2">Custom plans for large districts</p>
          </div>
        </div>
      </div>
    </section>
  );
}
