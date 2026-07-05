import React, { useState } from 'react';

export default function DriverReport() {
  const [filter, setFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    studentName: '',
    type: 'Đón',
    status: 'Đã đón',
    note: ''
  });

  // Mock data báo cáo
  const mockReports = [
    { id: 1, date: '2025-11-09', time: '06:45', student: 'Nguyễn Văn A', type: 'Đón', status: 'Đã đón', note: '' },
    { id: 2, date: '2025-11-09', time: '06:50', student: 'Trần Thị B', type: 'Đón', status: 'Đã đón', note: '' },
    { id: 3, date: '2025-11-09', time: '15:30', student: 'Nguyễn Văn A', type: 'Trả', status: 'Đã trả', note: '' },
    { id: 4, date: '2025-11-09', time: '15:35', student: 'Trần Thị B', type: 'Trả', status: 'Vắng mặt', note: 'Học sinh nghỉ học' },
    { id: 5, date: '2025-11-08', time: '06:45', student: 'Lê Văn C', type: 'Đón', status: 'Đã đón', note: '' },
  ];

  const filteredReports = filter === 'all' 
    ? mockReports 
    : mockReports.filter(r => r.type === filter);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Đã tạo báo cáo mới!');
    setShowForm(false);
    setFormData({ studentName: '', type: 'Đón', status: 'Đã đón', note: '' });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Đã đón':
      case 'Đã trả': 
        return { bg: '#dcfce7', color: '#166534' };
      case 'Vắng mặt': 
        return { bg: '#fee2e2', color: '#991b1b' };
      default: 
        return { bg: '#f3f4f6', color: '#374151' };
    }
  };

  return (
    <div style={{
      padding: '0',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '32px'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <div>
            <h1 style={{
              fontSize: '28px',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '8px'
            }}>
              Báo cáo đón/trả
            </h1>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>
              Ghi nhận tình trạng đón và trả học sinh
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              padding: '12px 24px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <i className={`fas fa-${showForm ? 'times' : 'plus'}`}></i>
            {showForm ? 'Đóng form' : 'Tạo báo cáo mới'}
          </button>
        </div>

        {/* Form tạo báo cáo */}
        {showForm && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '16px'
            }}>
              Tạo báo cáo mới
            </h3>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>Tên học sinh</label>
                  <input
                    type="text"
                    value={formData.studentName}
                    onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                    required
                    style={inputStyle}
                    placeholder="Nhập tên học sinh"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Loại</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    style={inputStyle}
                  >
                    <option value="Đón">Đón học sinh</option>
                    <option value="Trả">Trả học sinh</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Trạng thái</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    style={inputStyle}
                  >
                    <option value="Đã đón">Đã đón</option>
                    <option value="Đã trả">Đã trả</option>
                    <option value="Vắng mặt">Vắng mặt</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Ghi chú</label>
                  <input
                    type="text"
                    value={formData.note}
                    onChange={(e) => setFormData({...formData, note: e.target.value})}
                    style={inputStyle}
                    placeholder="Ghi chú (nếu có)"
                  />
                </div>
              </div>
              <button
                type="submit"
                style={{
                  marginTop: '16px',
                  padding: '10px 20px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px'
                }}
              >
                Lưu báo cáo
              </button>
            </form>
          </div>
        )}

        {/* Filter */}
        <div style={{ marginBottom: '16px' }}>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              padding: '10px 16px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="all">Tất cả</option>
            <option value="Đón">Chỉ đón</option>
            <option value="Trả">Chỉ trả</option>
          </select>
        </div>

        {/* Table */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <th style={thStyle}>Ngày</th>
                <th style={thStyle}>Giờ</th>
                <th style={thStyle}>Loại</th>
                <th style={thStyle}>Học sinh</th>
                <th style={thStyle}>Trạng thái</th>
                <th style={thStyle}>Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map(report => {
                const statusStyle = getStatusColor(report.status);
                return (
                  <tr key={report.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={tdStyle}>{report.date}</td>
                    <td style={tdStyle}>{report.time}</td>
                    <td style={tdStyle}>
                      <span style={{
                        padding: '4px 12px',
                        backgroundColor: report.type === 'Đón' ? '#dbeafe' : '#fce7f3',
                        color: report.type === 'Đón' ? '#1e40af' : '#9f1239',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: '500'
                      }}>
                        {report.type}
                      </span>
                    </td>
                    <td style={{...tdStyle, fontWeight: '600', color: '#1f2937'}}>
                      {report.student}
                    </td>
                    <td style={tdStyle}>
                      <span style={{
                        padding: '4px 12px',
                        backgroundColor: statusStyle.bg,
                        color: statusStyle.color,
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: '500'
                      }}>
                        {report.status}
                      </span>
                    </td>
                    <td style={tdStyle}>{report.note || '-'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const labelStyle = {
  display: 'block',
  fontSize: '14px',
  fontWeight: '600',
  color: '#374151',
  marginBottom: '8px'
};

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  border: '1px solid #d1d5db',
  borderRadius: '8px',
  fontSize: '14px',
  outline: 'none'
};

const thStyle = {
  padding: '16px',
  textAlign: 'left',
  fontSize: '14px',
  fontWeight: '600',
  color: '#374151'
};

const tdStyle = {
  padding: '16px',
  fontSize: '14px',
  color: '#6b7280'
};
