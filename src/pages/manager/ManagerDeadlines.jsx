// src/pages/manager/ManagerDeadlines.jsx
import React, { useEffect, useState, useMemo } from 'react';
import ManagerLayout from '../../layouts/ManagerLayout';
import DeadlineStatsCard from '../../components/managerDeadlines/DeadlineStatsCard';
import DeadlineCard from '../../components/managerDeadlines/DeadlineCard';
import DeadlineTable from '../../components/managerDeadlines/DeadlineTable';
import DeadlineCalendarView from '../../components/managerDeadlines/DeadlineCalendarView';
import DeadlineTimelineView from '../../components/managerDeadlines/DeadlineTimelineView';
import DeadlineFormModal from '../../components/managerDeadlines/DeadlineFormModal';
import DeadlineDetailsModal from '../../components/managerDeadlines/DeadlineDetailsModal';
import DeadlineReminderBox from '../../components/managerDeadlines/DeadlineReminderBox';
import OverdueDeadlineBox from '../../components/managerDeadlines/OverdueDeadlineBox';
import { FiSearch, FiRotateCcw, FiGrid, FiList, FiCalendar, FiClock, FiPlus, FiBell, FiX } from 'react-icons/fi';
import { deadlineStatsData, deadlineTypes, projectsForDeadlines, assigneesForDeadlines, remindersData, overdueDeadlinesData } from '../../data/managerDeadlinesData';
import * as calendarService from '../../services/calendarService';
import { apiData } from '../../services/api';
import '../../styles/managerDeadlines.css';

const ManagerDeadlines = () => {
  const [deadlines, setDeadlines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [projectFilter, setProjectFilter] = useState('All Projects');
  const [assigneeFilter, setAssigneeFilter] = useState('All Assignees');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [priorityFilter, setPriorityFilter] = useState('All Priority');
  const [dateFilter, setDateFilter] = useState('All Dates');
  const [viewMode, setViewMode] = useState('card');
  const [alert, setAlert] = useState(null);

  const [showFormModal, setShowFormModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDeadline, setSelectedDeadline] = useState(null);

const showAlert = (m, t = 'info') => { setAlert({ message: m, type: t }); setTimeout(() => setAlert(null), 3000); };
  const daysRemaining = (value) => value ? Math.ceil((new Date(value + 'T00:00:00').getTime() - new Date().setHours(0, 0, 0, 0)) / 86400000) : 0;
  const toDeadline = (event) => ({
    id: event.id, title: event.title, description: event.description || '',
    type: String(event.event_type || '').replace(/^Deadline:\s*/, '') || 'Task Deadline',
    project: event.project_name || '', relatedTask: event.related_task || '', assignee: event.assigned_to_name || '',
    dueDate: event.event_date ? String(event.event_date).slice(0, 10) : '', dueTime: event.start_time ? String(event.start_time).slice(0, 5) : '',
    priority: event.priority || 'Medium', status: event.status || 'Upcoming', progress: Number(event.progress || 0),
    reminder: event.reminder || 'No Reminder', notes: event.notes || '', daysRemaining: daysRemaining(event.event_date),
    createdDate: event.created_at ? String(event.created_at).slice(0, 10) : '', updatedDate: event.updated_at ? String(event.updated_at).slice(0, 10) : ''
  });
  const deadlinePayload = (form) => ({ title: form.title, description: form.description, event_type: 'Deadline: ' + form.type, project_name: form.project, related_task: form.relatedTask, assigned_to_name: form.assignee, event_date: form.dueDate, start_time: form.dueTime || null, priority: form.priority, status: form.status, reminder: form.reminder, notes: form.notes });
  const loadDeadlines = async () => {
    try { const response = await calendarService.getEvents(); setDeadlines(apiData(response).filter(event => String(event.event_type || '').startsWith('Deadline:')).map(toDeadline)); }
    catch (error) { showAlert(error.response?.data?.message || 'Unable to load deadline records from the database.', 'danger'); }
  };
  useEffect(() => { loadDeadlines(); }, []);

  const filteredDeadlines = useMemo(() => {
    return deadlines.filter(d => {
      const matchesSearch = !searchTerm || d.title.toLowerCase().includes(searchTerm.toLowerCase()) || d.project.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'All Types' || d.type === typeFilter;
      const matchesProject = projectFilter === 'All Projects' || d.project === projectFilter;
      const matchesAssignee = assigneeFilter === 'All Assignees' || d.assignee === assigneeFilter;
      const matchesStatus = statusFilter === 'All Status' || d.status === statusFilter;
      const matchesPriority = priorityFilter === 'All Priority' || d.priority === priorityFilter;
      return matchesSearch && matchesType && matchesProject && matchesAssignee && matchesStatus && matchesPriority;
    });
  }, [deadlines, searchTerm, typeFilter, projectFilter, assigneeFilter, statusFilter, priorityFilter]);

  const resetFilters = () => { setSearchTerm(''); setTypeFilter('All Types'); setProjectFilter('All Projects'); setAssigneeFilter('All Assignees'); setStatusFilter('All Status'); setPriorityFilter('All Priority'); setDateFilter('All Dates'); };

  const handleAdd = () => { setSelectedDeadline(null); setShowFormModal(true); };
  const handleEdit = (d) => { setSelectedDeadline(d); setShowFormModal(true); };
  const handleView = (d) => { setSelectedDeadline(d); setShowDetailsModal(true); };
  const handleMarkComplete = async (d) => { try { await calendarService.updateEvent(d.id, { status: 'Completed' }); await loadDeadlines(); showAlert('Deadline marked as completed in database!', 'success'); } catch (error) { showAlert(error.response?.data?.message || 'Unable to update deadline.', 'danger'); } };
  const handleSendReminder = (d) => showAlert('Reminder sent successfully!', 'success');
  const handleDelete = (d) => { setSelectedDeadline(d); setShowDeleteModal(true); };
  const confirmDelete = async () => { try { await calendarService.deleteEvent(selectedDeadline.id); await loadDeadlines(); setShowDeleteModal(false); showAlert('Deadline deleted from database!', 'success'); } catch (error) { showAlert(error.response?.data?.message || 'Unable to delete deadline.', 'danger'); } };

  const handleFormSubmit = async (fd) => {
    try {
      if (selectedDeadline) await calendarService.updateEvent(selectedDeadline.id, deadlinePayload(fd));
      else await calendarService.createEvent(deadlinePayload(fd));
      await loadDeadlines();
      setShowFormModal(false); setSelectedDeadline(null);
      showAlert(selectedDeadline ? 'Deadline updated in database!' : 'Deadline saved in database!', 'success');
    } catch (error) { showAlert(error.response?.data?.message || 'Unable to save deadline.', 'danger'); }
  };
  return (
    <ManagerLayout>
      <div className="mdl-dashboard">
        <div className="mdl-dash-header">
          <div><h3>Deadlines</h3><p>Track upcoming deadlines, overdue tasks, project milestones, reminders, and team delivery schedules.</p></div>
          <div className="d-flex gap-2">
            <button className="btn btn-primary btn-sm" onClick={handleAdd}><FiPlus /> Add Deadline</button>
            <button className="btn btn-outline-primary btn-sm" onClick={() => showAlert('Reminder sent!', 'success')}><FiBell /> Send Reminder</button>
          </div>
        </div>
        {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`}>{alert.message}<button className="btn-close" onClick={() => setAlert(null)}></button></div>}

        <div className="mdl-stats-grid">{deadlineStatsData.map(s => <DeadlineStatsCard key={s.id} stat={s} />)}</div>

        <div className="filter-section"><div className="filter-row">
          <div className="search-box"><FiSearch className="search-icon" /><input type="text" className="form-control search-input" placeholder="Search deadlines..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
          <div className="filter-selects">
            <select className="form-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}><option value="All Types">All Types</option>{deadlineTypes.map(t => <option key={t} value={t}>{t}</option>)}</select>
            <select className="form-select" value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)}><option value="All Projects">All Projects</option>{projectsForDeadlines.map(p => <option key={p} value={p}>{p}</option>)}</select>
            <select className="form-select" value={assigneeFilter} onChange={(e) => setAssigneeFilter(e.target.value)}><option value="All Assignees">All Assignees</option>{assigneesForDeadlines.map(a => <option key={a} value={a}>{a}</option>)}</select>
            <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}><option value="All Status">All Status</option><option>Upcoming</option><option>Due Today</option><option>Overdue</option><option>Completed</option><option>Rescheduled</option><option>Cancelled</option></select>
            <select className="form-select" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}><option value="All Priority">All Priority</option><option>Low</option><option>Medium</option><option>High</option><option>Urgent</option></select>
          </div>
          <button className="btn btn-light reset-btn" onClick={resetFilters}><FiRotateCcw className="me-2" /> Reset</button>
          <div className="view-toggle">
            <button className={`toggle-btn ${viewMode === 'card' ? 'active' : ''}`} onClick={() => setViewMode('card')}><FiGrid /></button>
            <button className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`} onClick={() => setViewMode('table')}><FiList /></button>
            <button className={`toggle-btn ${viewMode === 'calendar' ? 'active' : ''}`} onClick={() => setViewMode('calendar')}><FiCalendar /></button>
            <button className={`toggle-btn ${viewMode === 'timeline' ? 'active' : ''}`} onClick={() => setViewMode('timeline')}><FiClock /></button>
          </div>
        </div></div>

        {viewMode === 'card' && <div className="mdl-cards-grid">{filteredDeadlines.length === 0 ? <p className="text-center text-muted py-5">No deadlines found</p> : filteredDeadlines.map(d => <DeadlineCard key={d.id} deadline={d} onView={handleView} onEdit={handleEdit} onMarkComplete={handleMarkComplete} onSendReminder={handleSendReminder} onDelete={handleDelete} />)}</div>}
        {viewMode === 'table' && <div className="mdl-table-card"><DeadlineTable deadlines={filteredDeadlines} onView={handleView} onEdit={handleEdit} onMarkComplete={handleMarkComplete} onSendReminder={handleSendReminder} onDelete={handleDelete} /></div>}
        {viewMode === 'calendar' && <DeadlineCalendarView deadlines={filteredDeadlines} />}
        {viewMode === 'timeline' && <DeadlineTimelineView deadlines={filteredDeadlines} />}

        <div className="mdl-dash-grid mt-4">
          <DeadlineReminderBox reminders={remindersData} onSendReminder={handleSendReminder} />
          <OverdueDeadlineBox overdueDeadlines={overdueDeadlinesData} onReschedule={() => showAlert('Reschedule is frontend demo.', 'info')} onSendReminder={handleSendReminder} />
        </div>

        <DeadlineFormModal show={showFormModal} onClose={() => { setShowFormModal(false); setSelectedDeadline(null); }} onSubmit={handleFormSubmit} editDeadline={selectedDeadline} />
        <DeadlineDetailsModal show={showDetailsModal} onClose={() => { setShowDetailsModal(false); setSelectedDeadline(null); }} deadline={selectedDeadline} />

        {showDeleteModal && selectedDeadline && (
          <div className="modal-overlay"><div className="modal-dialog modal-sm"><div className="modal-content">
            <div className="modal-header"><h5 className="modal-title">Delete Deadline</h5><button className="modal-close-btn" onClick={() => setShowDeleteModal(false)}><FiX /></button></div>
            <div className="modal-body"><p>Are you sure you want to delete this deadline?</p><div className="delete-info"><strong>{selectedDeadline.title}</strong></div></div>
            <div className="modal-footer"><button className="btn btn-light" onClick={() => setShowDeleteModal(false)}>Cancel</button><button className="btn btn-danger" onClick={confirmDelete}>Delete</button></div>
          </div></div></div>
        )}
      </div>
    </ManagerLayout>
  );
};

export default ManagerDeadlines;