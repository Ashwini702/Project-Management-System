// src/components/teamDeadlines/TeamDeadlineCalendar.jsx
import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { teamDeadlines } from '../../data/teamDeadlinesData';
import TeamDeadlineStatusBadge from './TeamDeadlineStatusBadge';

const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const daysOfWeek = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

const TeamDeadlineCalendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);

  const getDaysInMonth = (m, y) => new Date(y, m + 1, 0).getDate();
  const getFirstDay = (m, y) => new Date(y, m, 1).getDay();
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDay(currentMonth, currentYear);
  const todayStr = today.toISOString().split('T')[0];

  const getDeadlinesForDate = (date) => teamDeadlines.filter(d => d.dueDate === date);
  const getDotColor = (status) => {
    const cmap = { 'Pending': 'var(--warning-color)', 'In Progress': 'var(--primary-color)', 'Under Review': 'var(--accent-purple)', 'Completed': 'var(--success-color)', 'Overdue': 'var(--danger-color)', 'Missed': 'var(--danger-color)' };
    return cmap[status] || 'var(--text-muted)';
  };

  const renderDays = () => {
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(<div key={`e-${i}`} className="td-cal-day empty"></div>);
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      const dayDeadlines = getDeadlinesForDate(dateStr);
      days.push(
        <div key={d} className={`td-cal-day ${dateStr===todayStr?'today':''} ${dateStr===selectedDate?'selected':''}`} onClick={() => setSelectedDate(dateStr)}>
          <span className="td-cal-day-num">{d}</span>
          {dayDeadlines.length > 0 && <div className="td-cal-dots">{dayDeadlines.map(dl => <span key={dl.id} className="td-cal-dot" style={{background: getDotColor(dl.status)}}></span>)}</div>}
        </div>
      );
    }
    return days;
  };

  const selectedDeadlines = selectedDate ? getDeadlinesForDate(selectedDate) : [];

  return (
    <div className="td-calendar">
      <div className="td-cal-header">
        <button className="td-cal-nav" onClick={() => { if(currentMonth===0){setCurrentMonth(11);setCurrentYear(currentYear-1);}else setCurrentMonth(currentMonth-1);}}><FiChevronLeft /></button>
        <h5>{months[currentMonth]} {currentYear}</h5>
        <button className="td-cal-nav" onClick={() => { if(currentMonth===11){setCurrentMonth(0);setCurrentYear(currentYear+1);}else setCurrentMonth(currentMonth+1);}}><FiChevronRight /></button>
      </div>
      <div className="td-cal-weekdays">{daysOfWeek.map(d => <div key={d} className="td-cal-wd">{d}</div>)}</div>
      <div className="td-cal-grid">{renderDays()}</div>
      {selectedDate && (
        <div className="td-cal-selected mt-3">
          <h6>Deadlines for {selectedDate}</h6>
          {selectedDeadlines.length === 0 ? <p className="text-muted">No deadlines</p> :
            selectedDeadlines.map(d => (
              <div key={d.id} className="td-cal-item"><span>{d.title}</span><TeamDeadlineStatusBadge status={d.status} /><small>{d.projectName} • {d.dueTime}</small></div>
            ))
          }
        </div>
      )}
    </div>
  );
};
export default TeamDeadlineCalendar;