import React, { useState } from 'react';

export default function DriverStudentList() {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data học sinh
  const mockStudents = [
    { id: 1, name: 'Nguyễn Văn A', grade: 'Lớp 1A', address: '123 Đường ABC, Quận 1', phone: '0901234567', status: 'Đang học', pickupTime: '06:45' },
    { id: 2, name: 'Trần Thị B', grade: 'Lớp 1A', address: '456 Đường DEF, Quận 1', phone: '0901234568', status: 'Đang học', pickupTime: '06:50' },
    { id: 3, name: 'Lê Văn C', grade: 'Lớp 2B', address: '789 Đường GHI, Quận 3', phone: '0901234569', status: 'Đang học', pickupTime: '07:00' },
    { id: 4, name: 'Phạm Thị D', grade: 'Lớp 2B', address: '321 Đường JKL, Quận 3', phone: '0901234570', status: 'Đang học', pickupTime: '07:05' },
    { id: 5, name: 'Hoàng Văn E', grade: 'Lớp 3A', address: '654 Đường MNO, Quận 1', phone: '0901234571', status: 'Đang học', pickupTime: '07:10' },
    { id: 6, name: 'Vũ Thị F', grade: 'Lớp 3A', address: '987 Đường PQR, Quận 3', phone: '0901234572', status: 'Đang học', pickupTime: '07:15' },
  ];

  const filteredStudents = mockStudents.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.grade.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '8px'
          }}>
            Danh sách học sinh
          </h1>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>
            Tổng số {mockStudents.length} học sinh trên xe
          </p>
        </div>

        {/* Search */}
        <div style={{ marginBottom: '24px' }}>
          <input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc lớp..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              maxWidth: '400px',
              padding: '12px 16px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
        </div>

        {/* Table */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <th style={thStyle}>STT</th>
                <th style={thStyle}>Họ và tên</th>
                <th style={thStyle}>Lớp</th>
                <th style={thStyle}>Địa chỉ đón</th>
                <th style={thStyle}>Giờ đón</th>
                <th style={thStyle}>SĐT phụ huynh</th>
                <th style={thStyle}>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr key={student.id} style={{
                  borderBottom: '1px solid #e5e7eb'
                }}>
                  <td style={tdStyle}>{index + 1}</td>
                  <td style={{...tdStyle, fontWeight: '600', color: '#1f2937'}}>
                    {student.name}
                  </td>
                  <td style={tdStyle}>{student.grade}</td>
                  <td style={tdStyle}>{student.address}</td>
                  <td style={tdStyle}>
                    <span style={{
                      padding: '4px 12px',
                      backgroundColor: '#dbeafe',
                      color: '#1e40af',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: '500'
                    }}>
                      {student.pickupTime}
                    </span>
                  </td>
                  <td style={tdStyle}>{student.phone}</td>
                  <td style={tdStyle}>
                    <span style={{
                      padding: '4px 12px',
                      backgroundColor: '#dcfce7',
                      color: '#166534',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: '500'
                    }}>
                      {student.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredStudents.length === 0 && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '48px',
            textAlign: 'center',
            marginTop: '24px',
            border: '1px solid #e5e7eb'
          }}>
            <p style={{ color: '#6b7280', fontSize: '16px' }}>
              Không tìm thấy học sinh nào
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

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
