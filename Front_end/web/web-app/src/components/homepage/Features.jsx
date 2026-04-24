import React from 'react';

export default function Features() {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-yellow-300">Key Features</h2>
        <p className="mt-2 text-gray-200 max-w-2xl mx-auto">
          Real-time tracking, notifications, driver info, and safety reports — everything parents and schools need.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-lg bg-gradient-to-br from-indigo-700/40 to-purple-800/30 border border-white/5 shadow-md">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-md bg-yellow-400 text-purple-900 flex items-center justify-center text-xl">🛰️</div>
            <div>
              <h3 className="text-white font-semibold text-lg">Real-time Location</h3>
              <p className="text-gray-200 mt-2 text-sm">Track your child's bus live on the map with frequent updates.</p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-lg bg-gradient-to-br from-indigo-700/40 to-purple-800/30 border border-white/5 shadow-md">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-md bg-yellow-400 text-purple-900 flex items-center justify-center text-xl">🔔</div>
            <div>
              <h3 className="text-white font-semibold text-lg">Arrival Alerts</h3>
              <p className="text-gray-200 mt-2 text-sm">Get notified when the bus is near pick-up/drop-off points.</p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-lg bg-gradient-to-br from-indigo-700/40 to-purple-800/30 border border-white/5 shadow-md">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-md bg-yellow-400 text-purple-900 flex items-center justify-center text-xl">👨‍✈️</div>
            <div>
              <h3 className="text-white font-semibold text-lg">Driver Info</h3>
              <p className="text-gray-200 mt-2 text-sm">View driver name and contact for each trip.</p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-lg bg-gradient-to-br from-indigo-700/40 to-purple-800/30 border border-white/5 shadow-md">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-md bg-yellow-400 text-purple-900 flex items-center justify-center text-xl">📊</div>
            <div>
              <h3 className="text-white font-semibold text-lg">Trip History</h3>
              <p className="text-gray-200 mt-2 text-sm">Review past trips and safety reports per student.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
