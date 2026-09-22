// src/components/managerDeadlines/DeadlineCalendarView.jsx
import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { months, daysOfWeek } from '../../data/managerDeadlinesData';

const DeadlineCalendarView = ({ deadlines }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);

  const getDaysInMonth = (m, y) => new Date(y, m + 1, 0).getDate();
  const getFirstDay = (m, y) => new Date(y, m, 1).getDay();

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDay(currentMonth, currentYear);
  const todayStr = today.toISOString().split('T')[0];

  const getDeadlinesForDate = (date) => deadlines.filter(d => d.dueDate === date);

  const renderDays = () => {
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(<div key={`e-${i}`} className="mdl-cal-day empty"></div>);
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const dayDeadlines = getDeadlinesForDate(dateStr);
      const isToday = dateStr === todayStr;
      const isSelected = dateStr === selectedDate;
      const hasOverdue = dayDeadlines.some(dl => dl.status === 'Overdue');
      days.push(
        <div key={d} className={`mdl-cal-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${hasOverdue ? 'has-overdue' : ''}`} onClick={() => setSelectedDate(dateStr)}>
          <span className="mdl-cal-day-num">{d}</span>
          {dayDeadlines.length > 0 && <div className="mdl-cal-badges">{dayDeadlines.map(dl => <span key={dl.id} className={`mdl-cal-dot ${dl.status === 'Overdue' ? 'overdue' : dl.priority === 'Urgent' ? 'urgent' : ''}`}></span>)}</div>}
        </div>
      );
    }
    return days;
  };

  const prevMonth = () => { if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); } else setCurrentMonth(currentMonth - 1); };
  const nextMonth = () => { if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); } else setCurrentMonth(currentMonth + 1); };

  const selectedDeadlines = selectedDate ? getDeadlinesForDate(selectedDate) : [];

  return (
    <div className="mdl-calendar">
      <div className="mdl-cal-header">
        <button className="mdl-cal-nav" onClick={prevMonth}><FiChevronLeft /></button>
        <h5>{months[currentMonth]} {currentYear}</h5>
        <button className="mdl-cal-nav" onClick={nextMonth}><FiChevronRight /></button>
      </div>
      <div className="mdl-cal-weekdays">{daysOfWeek.map(d => <div key={d} className="mdl-cal-wd">{d}</div>)}</div>
      <div className="mdl-cal-grid">{renderDays()}</div>
      {selectedDate && (
        <div className="mdl-cal-selected mt-3">
          <h6>Deadlines for {selectedDate}</h6>
          {selectedDeadlines.length === 0 ? <p className="text-muted">No deadlines</p> :
            selectedDeadlines.map(d => (
              <div key={d.id} className="mdl-cal-selected-item">
                <span className="mdl-name">{d.title}</span>
                <DeadlineStatusBadge status={d.status} />
                <small>{d.project} • {d.assignee}</small>
              </div>
            ))
          }
        </div>
      )}
    </div>
  );
};
export default DeadlineCalendarView;