// src/components/calendar/CalendarGrid.jsx
import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { daysOfWeek, months } from '../../data/calendarData';

const CalendarGrid = ({ currentMonth, currentYear, events, selectedDate, onDateSelect, onMonthChange }) => {
  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const today = new Date().toISOString().split('T')[0];

  const getEventsForDate = (date) => events.filter(e => e.date === date);
  const getEventCounts = (date) => {
    const dayEvents = getEventsForDate(date);
    return {
      deadlines: dayEvents.filter(e => e.type === 'Project Deadline' || e.type === 'Task Deadline').length,
      meetings: dayEvents.filter(e => e.type === 'Meeting').length,
      milestones: dayEvents.filter(e => e.type === 'Milestone').length,
      overdue: dayEvents.filter(e => e.status === 'Overdue').length
    };
  };

  const renderCalendarDays = () => {
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const counts = getEventCounts(dateStr);
      const isToday = dateStr === today;
      const isSelected = dateStr === selectedDate;
      const hasOverdue = counts.overdue > 0;

      days.push(
        <div
          key={day}
          className={`calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${hasOverdue ? 'has-overdue' : ''}`}
          onClick={() => onDateSelect(dateStr)}
        >
          <span className="day-number">{day}</span>
          <div className="day-badges">
            {counts.deadlines > 0 && <span className="day-badge deadline">{counts.deadlines} DL</span>}
            {counts.meetings > 0 && <span className="day-badge meeting">{counts.meetings} MT</span>}
            {counts.milestones > 0 && <span className="day-badge milestone">{counts.milestones} MS</span>}
          </div>
        </div>
      );
    }
    return days;
  };

  const prevMonth = () => onMonthChange(currentMonth === 0 ? 11 : currentMonth - 1, currentMonth === 0 ? currentYear - 1 : currentYear);
  const nextMonth = () => onMonthChange(currentMonth === 11 ? 0 : currentMonth + 1, currentMonth === 11 ? currentYear + 1 : currentYear);

  return (
    <div className="calendar-grid-container">
      <div className="calendar-header">
        <button className="cal-nav-btn" onClick={prevMonth}><FiChevronLeft /></button>
        <h4 className="cal-month-title">{months[currentMonth]} {currentYear}</h4>
        <button className="cal-nav-btn" onClick={nextMonth}><FiChevronRight /></button>
      </div>
      <div className="calendar-weekdays">
        {daysOfWeek.map(day => <div key={day} className="weekday">{day}</div>)}
      </div>
      <div className="calendar-days-grid">
        {renderCalendarDays()}
      </div>
    </div>
  );
};

export default CalendarGrid;