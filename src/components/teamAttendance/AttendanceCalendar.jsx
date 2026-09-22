// src/components/teamAttendance/AttendanceCalendar.jsx
import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { attendanceRecords } from '../../data/teamAttendanceData';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const AttendanceCalendar = ({ onDateSelect }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);

  const getDaysInMonth = (m, y) => new Date(y, m + 1, 0).getDate();
  const getFirstDay = (m, y) => new Date(y, m, 1).getDay();

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDay(currentMonth, currentYear);
  const todayStr = today.toISOString().split('T')[0];

  const getStatusColor = (date) => {
    const record = attendanceRecords.find(r => r.date === date);
    if (!record) return '';
    const cmap = { 'Present': 'var(--success-color)', 'Absent': 'var(--danger-color)', 'Late': 'var(--warning-color)', 'Half Day': 'var(--accent-purple)', 'On Leave': 'var(--primary-color)', 'Holiday': 'var(--text-muted)' };
    return cmap[record.status] || '';
  };

  const renderDays = () => {
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(<div key={`e-${i}`} className="ta-cal-day empty"></div>);
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const color = getStatusColor(dateStr);
      const isToday = dateStr === todayStr;
      const isSelected = dateStr === selectedDate;
      days.push(
        <div key={d} className={`ta-cal-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`} onClick={() => { setSelectedDate(dateStr); onDateSelect(attendanceRecords.find(r => r.date === dateStr)); }}>
          <span className="ta-cal-day-num">{d}</span>
          {color && <span className="ta-cal-dot" style={{ background: color }}></span>}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="ta-calendar">
      <div className="ta-cal-header">
        <button className="ta-cal-nav" onClick={() => { if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); } else setCurrentMonth(currentMonth - 1); }}><FiChevronLeft /></button>
        <h5>{months[currentMonth]} {currentYear}</h5>
        <button className="ta-cal-nav" onClick={() => { if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); } else setCurrentMonth(currentMonth + 1); }}><FiChevronRight /></button>
      </div>
      <div className="ta-cal-weekdays">{daysOfWeek.map(d => <div key={d} className="ta-cal-wd">{d}</div>)}</div>
      <div className="ta-cal-grid">{renderDays()}</div>
      <div className="ta-cal-legend">
        <span><span className="ta-cal-dot" style={{ background: 'var(--success-color)' }}></span> Present</span>
        <span><span className="ta-cal-dot" style={{ background: 'var(--danger-color)' }}></span> Absent</span>
        <span><span className="ta-cal-dot" style={{ background: 'var(--warning-color)' }}></span> Late</span>
        <span><span className="ta-cal-dot" style={{ background: 'var(--accent-purple)' }}></span> Half Day</span>
        <span><span className="ta-cal-dot" style={{ background: 'var(--primary-color)' }}></span> Leave</span>
      </div>
    </div>
  );
};
export default AttendanceCalendar;