import React from 'react';

export default function Testimonials() {
  const items = [
    { name: 'Mai Lan', role: 'Phụ huynh', text: 'Rất yên tâm khi biết con tôi được theo dõi mỗi ngày.' },
    { name: 'Trường ABC', role: 'Admin', text: 'Quản lý lộ trình và tài xế dễ dàng hơn nhiều.' },
    { name: 'Nguyễn Bình', role: 'Tài xế', text: 'Ứng dụng đơn giản, giúp tôi theo sát lịch trình.' },
  ];

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-yellow-300">What People Say</h2>
        <p className="mt-2 text-gray-200 max-w-2xl mx-auto">Feedback from our users.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {items.map((t, i) => (
          <div
            key={i}
            className="p-6 rounded-lg bg-gradient-to-br from-indigo-900/35 to-purple-800/25 border border-white/6 shadow-md text-gray-100"
          >
            <p className="text-gray-100 italic">“{t.text}”</p>
            <div className="mt-4 font-semibold text-white">{t.name}</div>
            <div className="text-sm text-gray-300">{t.role}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
