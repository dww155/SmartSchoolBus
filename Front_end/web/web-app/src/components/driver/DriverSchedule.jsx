import React, { useEffect, useState } from 'react';
import { useDriver } from '../../contexts/DriverContext';

export default function DriverSchedule() {
  const dayMap = {
    MONDAY: "Thứ Hai",
    TUESDAY: "Thứ Ba",
    WEDNESDAY: "Thứ Tư",
    THURSDAY: "Thứ Năm",
    FRIDAY: "Thứ Sáu",
    SATURDAY: "Thứ Bảy",
    SUNDAY: "Chủ Nhật",
  };

  const [selectedDate, setSelectedDate] = useState('all');
  const { currentDriver } = useDriver();

  // Mock data lịch làm việc
  const mockSchedule = [
    { id: 1, date: '2025-11-09', dayOfWeek: 'Thứ Bảy', route: 'Tuyến Quận 1 - Quận 3', timeStart: '06:30', timeEnd: '08:00', type: 'Đón học sinh', status: 'Hoàn thành' },
    { id: 2, date: '2025-11-09', dayOfWeek: 'Thứ Bảy', route: 'Tuyến Quận 1 - Quận 3', timeStart: '15:00', timeEnd: '16:30', type: 'Trả học sinh', status: 'Sắp tới' },
    { id: 3, date: '2025-11-10', dayOfWeek: 'Chủ Nhật', route: 'Tuyến Quận 1 - Quận 3', timeStart: '06:30', timeEnd: '08:00', type: 'Đón học sinh', status: 'Chưa bắt đầu' },
    { id: 4, date: '2025-11-10', dayOfWeek: 'Chủ Nhật', route: 'Tuyến Quận 1 - Quận 3', timeStart: '15:00', timeEnd: '16:30', type: 'Trả học sinh', status: 'Chưa bắt đầu' },
    { id: 5, date: '2025-11-11', dayOfWeek: 'Thứ Hai', route: 'Tuyến Quận 1 - Quận 3', timeStart: '06:30', timeEnd: '08:00', type: 'Đón học sinh', status: 'Chưa bắt đầu' },
  ];

  const filteredSchedule = selectedDate === 'all'
    ? mockSchedule
    : mockSchedule.filter(s => s.date === selectedDate);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Hoàn thành': return { bg: '#dcfce7', color: '#166534' };
      case 'Sắp tới': return { bg: '#fef3c7', color: '#92400e' };
      case 'Chưa bắt đầu': return { bg: '#e0e7ff', color: '#3730a3' };
      default: return { bg: '#f3f4f6', color: '#374151' };
    }
  };

  const schedules = currentDriver?.schedules || [];

  const filteredSchedules = selectedDate === 'all'
    ? schedules
    : schedules.filter(sch => sch.day === selectedDate);
  return (
    <div style={{
      padding: '0',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{
        maxWidth: '1200px',
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
              Lịch làm việc
            </h1>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>
              Xem lịch làm việc và các chuyến đi của bạn
            </p>
          </div>

          {/* Filter */}
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{
              padding: "10px 16px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              fontSize: "14px",
              outline: "none",
              cursor: "pointer",
            }}
          >
            <option value="all">Tất cả</option>

            {Object.entries(dayMap).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Schedule List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredSchedules.map(schedule => {
            return (
              <div key={schedule.id} style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr auto',
                  gap: '24px',
                  alignItems: 'center'
                }}>

                  {/* DATE / DAY */}
                  <div style={{
                    textAlign: 'center',
                    padding: '12px 16px',
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px',
                    minWidth: '100px'
                  }}>
                    <p style={{
                      fontSize: '24px',
                      fontWeight: '700',
                      color: '#3b82f6',
                      marginBottom: '4px'
                    }}>
                      {schedule.startTime.slice(0, 5)} {/* Giờ HH:mm */}
                    </p>
                    <p style={{ fontSize: '13px', color: '#6b7280' }}>
                      {dayMap[schedule.day]}
                    </p>
                  </div>

                  {/* INFO */}
                  <div>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#1f2937',
                      marginBottom: '8px'
                    }}>
                      {schedule.route?.name}
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <p style={{ fontSize: '14px', color: '#6b7280' }}>
                        <i className="fas fa-bus" style={{ marginRight: '8px', width: '16px' }}></i>
                        Xe: {schedule.bus?.licensePlate}
                      </p>

                      <p style={{ fontSize: '14px', color: '#6b7280' }}>
                        <i className="fas fa-clock" style={{ marginRight: '8px', width: '16px' }}></i>
                        Bắt đầu: {schedule.startTime.slice(0, 5)}
                      </p>
                    </div>
                  </div>

                  {/* STATUS FIXED (vì BE chưa có) */}
                  <span style={{
                    padding: '8px 20px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    backgroundColor: '#e0e7ff',
                    color: '#3730a3'
                  }}>
                    Chưa bắt đầu
                  </span>

                </div>
              </div>
            );
          })}
        </div>

        {filteredSchedule.length === 0 && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '48px',
            textAlign: 'center',
            border: '1px solid #e5e7eb'
          }}>
            <p style={{ color: '#6b7280', fontSize: '16px' }}>
              Không có lịch làm việc nào
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
