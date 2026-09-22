// src/pages/admin/Calendar.jsx
import React, { useEffect, useState, useMemo } from 'react';
import * as calendarService from '../../services/calendarService';
import { apiData } from '../../services/api';
import AdminLayout from '../../layouts/AdminLayout';
import PageHeader from '../../components/common/PageHeader';
import CalendarStatsCard from '../../components/calendar/CalendarStatsCard';
import CalendarGrid from '../../components/calendar/CalendarGrid';
import CalendarEventCard from '../../components/calendar/CalendarEventCard';
import EventFormModal from '../../components/calendar/EventFormModal';
import EventDetailsModal from '../../components/calendar/EventDetailsModal';
import UpcomingEvents from '../../components/calendar/UpcomingEvents';
import DeadlineList from '../../components/calendar/DeadlineList';
import MilestoneList from '../../components/calendar/MilestoneList';
import { FiSearch, FiRotateCcw, FiGrid, FiList, FiCalendar, FiClock, FiX } from 'react-icons/fi';
import { eventsData, calendarStatsData, deadlinesData, milestonesData, eventTypes, statuses, priorities, months } from '../../data/calendarData';
import '../../styles/calendar.css';

const CalendarPage = () => {
  const today = new Date();
  const [events, setEvents] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(today.toISOString().split('T')[0]);
  const [viewMode, setViewMode] = useState('month');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Events');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [priorityFilter, setPriorityFilter] = useState('All Priority');

  const [showFormModal, setShowFormModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [alert, setAlert] = useState(null);

  const toUiEvent = (event) => ({
    ...event,
    type: event.event_type || event.type || 'Meeting',
    project: event.project_name || event.project || '',
    relatedTask: event.related_task || event.relatedTask || '',
    assignedTo: event.assigned_to_name || event.assignedTo || '',
    date: event.event_date || event.date || '',
    startTime: event.start_time ? String(event.start_time).slice(0, 5) : '',
    endTime: event.end_time ? String(event.end_time).slice(0, 5) : '',
    createdDate: event.created_at ? String(event.created_at).slice(0, 10) : ''
  });

  useEffect(() => {
    calendarService.getEvents()
      .then(response => setEvents(apiData(response).map(toUiEvent)))
      .catch(error => showAlert(error.response?.data?.message || 'Unable to load calendar events.', 'danger'));
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      const matchesSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase()) || e.project.toLowerCase().includes(searchTerm.toLowerCase()) || e.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'All Events' || e.type === typeFilter;
      const matchesStatus = statusFilter === 'All Status' || e.status === statusFilter;
      const matchesPriority = priorityFilter === 'All Priority' || e.priority === priorityFilter;
      return matchesSearch && matchesType && matchesStatus && matchesPriority;
    });
  }, [events, searchTerm, typeFilter, statusFilter, priorityFilter]);

  const selectedDateEvents = filteredEvents.filter(e => e.date === selectedDate);

  const resetFilters = () => { setSearchTerm(''); setTypeFilter('All Events'); setStatusFilter('All Status'); setPriorityFilter('All Priority'); };
  const showAlert = (m, t = 'success') => { setAlert({ message: m, type: t }); setTimeout(() => setAlert(null), 3000); };

  const handleAdd = () => { setSelectedEvent(null); setShowFormModal(true); };
  const handleEdit = (e) => { setSelectedEvent(e); setShowFormModal(true); };
  const handleView = (e) => { setSelectedEvent(e); setShowViewModal(true); };
  const handleDelete = (e) => { setSelectedEvent(e); setShowDeleteModal(true); };
  const confirmDelete = () => { setEvents(events.filter(ev => ev.id !== selectedEvent.id)); setShowDeleteModal(false); setSelectedEvent(null); showAlert('Event deleted successfully!'); };

  const handleFormSubmit = async (fd) => {
    const payload = {
      title: fd.title,
      description: fd.description,
      event_type: fd.type,
      project_name: fd.project,
      related_task: fd.relatedTask,
      assigned_to_name: fd.assignedTo,
      event_date: fd.date,
      start_time: fd.startTime,
      end_time: fd.endTime || null,
      priority: fd.priority,
      status: fd.status,
      reminder: fd.reminder,
      notes: fd.notes
    };
    try {
      const response = selectedEvent
        ? await calendarService.updateEvent(selectedEvent.id, payload)
        : await calendarService.createEvent(payload);
      const saved = toUiEvent(apiData(response));
      setEvents(current => selectedEvent
        ? current.map(event => event.id === selectedEvent.id ? saved : event)
        : [saved, ...current]);
      showAlert(selectedEvent ? 'Event updated successfully!' : 'Event saved successfully!');
      setShowFormModal(false); setSelectedEvent(null);
    } catch (error) {
      showAlert(error.response?.data?.message || 'Unable to save event.', 'danger');
    }
  };

  const handleMonthChange = (month, year) => { setCurrentMonth(month); setCurrentYear(year); };
  const handleDateSelect = (date) => { setSelectedDate(date); setViewMode('day'); };

  const getDayEvents = (date) => filteredEvents.filter(e => e.date === date);

  return (
    <AdminLayout>
      <PageHeader title="Project Calendar" subtitle="Track project deadlines, milestones, meetings, task schedules, and upcoming events in one place." buttonText="Add Event" onButtonClick={handleAdd} showButton={true} />
      {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`}>{alert.message}<button className="btn-close" onClick={() => setAlert(null)}></button></div>}

      <div className="cal-stats-grid">{calendarStatsData.map(s => <CalendarStatsCard key={s.id} stat={s} />)}</div>

      <div className="filter-section">
        <div className="filter-row">
          <div className="search-box"><FiSearch className="search-icon" /><input type="text" className="form-control search-input" placeholder="Search events, projects, tasks..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
          <div className="filter-selects">
            <select className="form-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}><option value="All Events">All Events</option>{eventTypes.map(t => <option key={t} value={t}>{t}</option>)}</select>
            <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}><option value="All Status">All Status</option>{statuses.map(s => <option key={s} value={s}>{s}</option>)}</select>
            <select className="form-select" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}><option value="All Priority">All Priority</option>{priorities.map(p => <option key={p} value={p}>{p}</option>)}</select>
          </div>
          <button className="btn btn-light reset-btn" onClick={resetFilters}><FiRotateCcw className="me-2" /> Reset</button>
          <div className="view-toggle">
            <button className={`toggle-btn ${viewMode === 'month' ? 'active' : ''}`} onClick={() => setViewMode('month')}><FiCalendar /></button>
            <button className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}><FiList /></button>
          </div>
        </div>
      </div>

      <div className="calendar-page-layout">
        <div className="calendar-main">
          {viewMode === 'month' && (
            <CalendarGrid currentMonth={currentMonth} currentYear={currentYear} events={filteredEvents} selectedDate={selectedDate} onDateSelect={handleDateSelect} onMonthChange={handleMonthChange} />
          )}
          {viewMode === 'list' && (
            <div className="events-list-view">
              <h5 className="mb-3">All Events ({filteredEvents.length})</h5>
              <div className="events-grid">{filteredEvents.map(e => <CalendarEventCard key={e.id} event={e} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />)}</div>
            </div>
          )}
          {viewMode === 'day' && (
            <div className="day-view">
              <div className="day-view-header">
                <button className="btn btn-sm btn-light" onClick={() => setViewMode('month')}><FiCalendar className="me-1" /> Back to Calendar</button>
                <h5>Events for {selectedDate}</h5>
              </div>
              <div className="events-grid">{selectedDateEvents.length === 0 ? <p className="text-muted text-center py-5">No events for this date</p> : selectedDateEvents.map(e => <CalendarEventCard key={e.id} event={e} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />)}</div>
            </div>
          )}
        </div>
        <div className="calendar-sidebar">
          <UpcomingEvents events={filteredEvents} />
          <DeadlineList deadlines={deadlinesData} />
          <MilestoneList milestones={milestonesData} />
        </div>
      </div>

      <EventFormModal show={showFormModal} onClose={() => { setShowFormModal(false); setSelectedEvent(null); }} onSubmit={handleFormSubmit} editEvent={selectedEvent} selectedDate={selectedDate} />
      <EventDetailsModal show={showViewModal} onClose={() => { setShowViewModal(false); setSelectedEvent(null); }} event={selectedEvent} />

      {showDeleteModal && selectedEvent && (
        <div className="modal-overlay"><div className="modal-dialog modal-sm"><div className="modal-content">
          <div className="modal-header"><h5 className="modal-title">Delete Event</h5><button className="modal-close-btn" onClick={() => { setShowDeleteModal(false); setSelectedEvent(null); }}><FiX /></button></div>
          <div className="modal-body"><div className="delete-confirmation"><p>Are you sure you want to delete this event?</p><div className="delete-info"><strong>{selectedEvent.title}</strong></div></div></div>
          <div className="modal-footer"><button className="btn btn-light" onClick={() => { setShowDeleteModal(false); setSelectedEvent(null); }}>Cancel</button><button className="btn btn-danger" onClick={confirmDelete}>Delete</button></div>
        </div></div></div>
      )}
    </AdminLayout>
  );
};

export default CalendarPage;

