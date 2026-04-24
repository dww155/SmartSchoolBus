import React from 'react';

export default function Services() {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-yellow-300">What We Provide</h2>
        <p className="mt-2 text-gray-200 max-w-2xl mx-auto">A complete platform for schools and parents to manage safe student transport.</p>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full px-4">
          <div className="p-6 rounded-lg bg-gradient-to-br from-indigo-900/40 to-purple-800/30 border border-white/6 shadow-md">
            <h3 className="font-semibold text-white text-lg">School Management</h3>
            <p className="text-gray-200 mt-3 text-sm">Route planning, schedules and analytics for administrators.</p>
          </div>

          <div className="p-6 rounded-lg bg-gradient-to-br from-indigo-900/40 to-purple-800/30 border border-white/6 shadow-md">
            <h3 className="font-semibold text-white text-lg">Parent App</h3>
            <p className="text-gray-200 mt-3 text-sm">Live tracking, alerts and child-safe check-in/out.</p>
          </div>

          <div className="p-6 rounded-lg bg-gradient-to-br from-indigo-900/40 to-purple-800/30 border border-white/6 shadow-md">
            <h3 className="font-semibold text-white text-lg">Driver App</h3>
            <p className="text-gray-200 mt-3 text-sm">Navigation, attendance and incident reporting tools for drivers.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
