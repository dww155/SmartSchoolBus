import React from 'react';

export default function FAQ() {
  const faqs = [
    { q: 'Làm sao để tôi theo dõi chuyến xe?', a: 'Đăng nhập vào ứng dụng phụ huynh, chọn chuyến xe của con và xem bản đồ.' },
    { q: 'Ai có thể xem thông tin tài xế?', a: 'Chỉ phụ huynh và quản trị viên của trường được phép xem thông tin tài xế.' },
    { q: 'Có thông báo khi xe gần đến không?', a: 'Có — hệ thống gửi thông báo khi xe sắp đến điểm đón.' },
  ];

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-yellow-300">FAQ</h2>
        <p className="mt-2 text-gray-200 max-w-2xl mx-auto">Các câu hỏi thường gặp.</p>
      </div>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((f, i) => (
          <div key={i} className="bg-white/10 border border-white/5 p-4 rounded-lg text-gray-100">
            <div className="font-semibold text-white">{f.q}</div>
            <div className="text-gray-200 mt-2">{f.a}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
