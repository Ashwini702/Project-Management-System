// src/pages/team/TeamDeadlines.jsx
import React, { useEffect, useState, useMemo } from 'react';
import TeamLayout from '../../layouts/TeamLayout';
import TeamDeadlineStatsCard from '../../components/teamDeadlines/TeamDeadlineStatsCard';
import TeamDeadlineCard from '../../components/teamDeadlines/TeamDeadlineCard';
import TeamDeadlineTable from '../../components/teamDeadlines/TeamDeadlineTable';
import TeamDeadlineCalendar from '../../components/teamDeadlines/TeamDeadlineCalendar';
import TeamDeadlineTimeline from '../../components/teamDeadlines/TeamDeadlineTimeline';
import TeamDeadlineDetailsModal from '../../components/teamDeadlines/TeamDeadlineDetailsModal';
import TeamDeadlineReminderModal from '../../components/teamDeadlines/TeamDeadlineReminderModal';
import UpcomingDeadlineBox from '../../components/teamDeadlines/UpcomingDeadlineBox';
import OverdueDeadlineBox from '../../components/teamDeadlines/OverdueDeadlineBox';
import { FiSearch, FiRotateCcw, FiGrid, FiList, FiCalendar, FiClock, FiBell, FiX } from 'react-icons/fi';
import { deadlineTypes } from '../../data/teamDeadlinesData';
import * as taskService from '../../services/taskService';
import { apiData } from '../../services/api';
import '../../styles/teamDeadlines.css';

const TeamDeadlines = () => {
  const [deadlines, setDeadlines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [projectFilter, setProjectFilter] = useState('All Projects');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [priorityFilter, setPriorityFilter] = useState('All Priority');
  const [dateFilter, setDateFilter] = useState('All Dates');
  const [viewMode, setViewMode] = useState('card');
  const [alert, setAlert] = useState(null);

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [progressForm, setProgressForm] = useState({ progress: 0, status: 'Pending' });
  const [selectedDeadline, setSelectedDeadline] = useState(null);
  const [noteForm, setNoteForm] = useState('');

  const showAlert = (m, t = 'info') => { setAlert({ message: m, type: t }); setTimeout(() => setAlert(null), 2000); };
  const toDeadline = (task) => {
    // Convert API task values once so the card, table and details views all use live data.
    const due = task.deadline || task.due_date || '';
    const dueAt = due ? new Date(`${String(due).slice(0, 10)}T23:59:59`) : null;
    const hasValidDueDate = dueAt && !Number.isNaN(dueAt.getTime());
    const daysRemaining = hasValidDueDate
      ? Math.ceil((dueAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      : null;
    const rawProgress = Number(task.progress);
    const progress = Number.isFinite(rawProgress) ? Math.min(100, Math.max(0, rawProgress)) : 0;
    const overdue = daysRemaining !== null && daysRemaining < 0 && task.status !== 'Completed';

    return {
      ...task,
      title: task.title || '',
      projectName: task.project_name || task.projectName || '',
      type: 'Task Deadline',
      dueDate: due,
      deadline: due,
      daysRemaining,
      status: overdue ? 'Overdue' : (task.status || 'Pending'),
      progress,
      assignedBy: task.assigned_by_name || task.manager_name || 'Project Manager',
      note: '',
      reminderStatus: 'Not Set',
    };
  };
  const loadDeadlines = () => taskService.getTasks().then(response => setDeadlines(apiData(response).map(toDeadline))).catch(error => showAlert(error.response?.data?.message || 'Unable to load deadlines.', 'danger'));
  useEffect(() => { loadDeadlines(); }, []);
  const projects = useMemo(() => [...new Set(deadlines.map(item => item.projectName).filter(Boolean))], [deadlines]);
  const deadlineStatsData = useMemo(() => [
    { id: 1, title: 'Total Deadlines', value: deadlines.length, icon: 'FiClock', desc: 'Your task deadlines', color: 'primary' },
    { id: 2, title: 'Upcoming', value: deadlines.filter(d => d.status !== 'Completed' && d.status !== 'Overdue').length, icon: 'FiCalendar', desc: 'Pending deadlines', color: 'info' },
    { id: 3, title: 'Completed', value: deadlines.filter(d => d.status === 'Completed').length, icon: 'FiCheckCircle', desc: 'Completed tasks', color: 'success' },
    { id: 4, title: 'Overdue', value: deadlines.filter(d => d.status === 'Overdue').length, icon: 'FiAlertTriangle', desc: 'Needs attention', color: 'danger' },
  ], [deadlines]);

  const filteredDeadlines = useMemo(() => {
    return deadlines.filter(d => {
      const matchesSearch = !searchTerm || d.title.toLowerCase().includes(searchTerm.toLowerCase()) || d.projectName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'All Types' || d.type === typeFilter;
      const matchesProject = projectFilter === 'All Projects' || d.projectName === projectFilter;
      const matchesStatus = statusFilter === 'All Status' || d.status === statusFilter;
      const matchesPriority = priorityFilter === 'All Priority' || d.priority === priorityFilter;
      return matchesSearch && matchesType && matchesProject && matchesStatus && matchesPriority;
    });
  }, [deadlines, searchTerm, typeFilter, projectFilter, statusFilter, priorityFilter]);

  const resetFilters = () => { setSearchTerm(''); setTypeFilter('All Types'); setProjectFilter('All Projects'); setStatusFilter('All Status'); setPriorityFilter('All Priority'); setDateFilter('All Dates'); };

  const handleView = (d) => { setSelectedDeadline(d); setShowDetailsModal(true); };
  const handleReminder = (d) => { setSelectedDeadline(d); setShowReminderModal(true); };
  const handleMarkComplete = async (d) => { if (Number(d.progress) < 100) { showAlert('This task is currently ' + d.progress + '%. Update its progress from My Tasks before marking it completed.', 'warning'); return; } try { await taskService.updateTask(d.id, { status: 'Completed', progress: 100 }); setDeadlines(deadlines.map(dl => dl.id === d.id ? { ...dl, status: 'Completed', progress: 100 } : dl)); showAlert('Task marked as completed!', 'success'); } catch (error) { showAlert(error.response?.data?.message || 'Unable to update task.', 'danger'); } };
  const handleAddNote = (d) => { setSelectedDeadline(d); setNoteForm(d.note || ''); setShowNoteModal(true); };
  const handleUpdateProgress = (d) => { setSelectedDeadline(d); setProgressForm({ progress: Number(d.progress) || 0, status: d.status === 'Overdue' ? 'In Progress' : (d.status || 'Pending') }); setShowProgressModal(true); };
  const handleProgressSubmit = async (event) => {
    event.preventDefault();
    if (!selectedDeadline) return;
    const progress = Math.min(100, Math.max(0, Number(progressForm.progress) || 0));
    const status = progress === 100 ? 'Completed' : progressForm.status;
    try {
      const response = await taskService.updateTask(selectedDeadline.id, { progress, status });
      const updated = toDeadline(apiData(response));
      setDeadlines(current => current.map(item => item.id === updated.id ? updated : item));
      setShowProgressModal(false);
      showAlert('Progress saved: ' + progress + '%. Admin can now see the update.', 'success');
    } catch (error) {
      showAlert(error.response?.data?.message || 'Unable to save task progress.', 'danger');
    }
  };
  const handleRequestExtension = () => showAlert('Extension request sent! This is frontend demo.', 'info');

  const handleReminderSubmit = (id, form) => {
    setDeadlines(deadlines.map(d => d.id === id ? { ...d, reminderStatus: 'Set', reminderDate: form.reminderDate, reminderTime: form.reminderTime } : d));
    setShowReminderModal(false); showAlert('Reminder set!', 'success');
  };

  const handleNoteSubmit = (e) => {
    e.preventDefault();
    if (!noteForm.trim()) return;
    setDeadlines(deadlines.map(d => d.id === selectedDeadline.id ? { ...d, note: noteForm } : d));
    setShowNoteModal(false); showAlert('Note added!', 'success');
  };

  return (
    <TeamLayout>
      <div className="td-dashboard">
        <div className="td-dash-header">
          <div><h3>Deadlines</h3><p>Track upcoming deadlines, overdue tasks, project milestones, reminders, and delivery schedules.</p></div>
          <div className="d-flex gap-2">
            <button className="btn btn-primary btn-sm" onClick={() => setShowReminderModal(true)}><FiBell /> Set Reminder</button>
            <button className="btn btn-outline-primary btn-sm" onClick={() => setViewMode('calendar')}><FiCalendar /> View Calendar</button>
          </div>
        </div>
        {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`}>{alert.message}<button className="btn-close" onClick={() => setAlert(null)}></button></div>}

        <div className="td-stats-grid">{deadlineStatsData.map(s => <TeamDeadlineStatsCard key={s.id} stat={s} />)}</div>

        <div className="filter-section"><div className="filter-row">
          <div className="search-box"><FiSearch className="search-icon" /><input type="text" className="form-control search-input" placeholder="Search deadlines..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
          <div className="filter-selects">
            <select className="form-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}><option value="All Types">All Types</option>{deadlineTypes.map(t => <option key={t} value={t}>{t}</option>)}</select>
            <select className="form-select" value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)}><option value="All Projects">All Projects</option>{projects.map(p => <option key={p} value={p}>{p}</option>)}</select>
            <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}><option value="All Status">All Status</option><option>Pending</option><option>In Progress</option><option>Under Review</option><option>Completed</option><option>Overdue</option><option>Missed</option></select>
            <select className="form-select" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}><option value="All Priority">All Priority</option><option>Low</option><option>Medium</option><option>High</option><option>Urgent</option></select>
          </div>
          <button className="btn btn-light reset-btn" onClick={resetFilters}><FiRotateCcw className="me-2" /> Reset</button>
          <div className="view-toggle">
            <button className={`toggle-btn ${viewMode === 'card' ? 'active' : ''}`} onClick={() => setViewMode('card')}><FiGrid /></button>
            <button className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`} onClick={() => setViewMode('table')}><FiList /></button>
            <button className={`toggle-btn ${viewMode === 'calendar' ? 'active' : ''}`} onClick={() => setViewMode('calendar')}><FiCalendar /></button>
            <button className={`toggle-btn ${viewMode === 'timeline' ? 'active' : ''}`} onClick={() => setViewMode('timeline')}><FiClock /></button>
            <button className={`toggle-btn ${viewMode === 'overdue' ? 'active' : ''}`} onClick={() => setViewMode('overdue')}>Overdue</button>
          </div>
        </div></div>

        {viewMode === 'card' && <div className="td-cards-grid">{filteredDeadlines.length === 0 ? <p className="text-muted text-center py-5">No deadlines found</p> : filteredDeadlines.map(d => <TeamDeadlineCard key={d.id} deadline={d} onView={handleView} onReminder={handleReminder} onMarkComplete={handleMarkComplete} onAddNote={handleUpdateProgress} />)}</div>}
        {viewMode === 'table' && <div className="td-table-card"><TeamDeadlineTable deadlines={filteredDeadlines} onView={handleView} onReminder={handleReminder} onMarkComplete={handleMarkComplete} onAddNote={handleAddNote} /></div>}
        {viewMode === 'calendar' && <TeamDeadlineCalendar />}
        {viewMode === 'timeline' && <TeamDeadlineTimeline deadlines={filteredDeadlines} />}
        {viewMode === 'overdue' && <OverdueDeadlineBox onView={handleView} onAddNote={handleAddNote} onRequestExtension={handleRequestExtension} onMarkComplete={handleMarkComplete} />}

        <div className="mt-4"><UpcomingDeadlineBox /></div>

        {showProgressModal && selectedDeadline && (
          <div className="modal-overlay"><div className="modal-dialog"><div className="modal-content">
            <div className="modal-header"><h5 className="modal-title">Update Progress - {selectedDeadline.title}</h5><button className="modal-close-btn" onClick={() => setShowProgressModal(false)}><FiX /></button></div>
            <form onSubmit={handleProgressSubmit}>
              <div className="modal-body">
                <div className="mb-3"><label className="form-label">Progress (%)</label><input className="form-control" type="number" min="0" max="100" value={progressForm.progress} onChange={(event) => setProgressForm(current => ({ ...current, progress: event.target.value }))} required /></div>
                <div className="mb-3"><label className="form-label">Status</label><select className="form-select" value={progressForm.status} onChange={(event) => setProgressForm(current => ({ ...current, status: event.target.value }))}><option>Pending</option><option>In Progress</option><option>Under Review</option><option>Blocked</option><option>Completed</option></select></div>
                <small className="text-muted">At 100%, this task will be marked Completed and will be visible with the same progress to Admin and Manager.</small>
              </div>
              <div className="modal-footer"><button type="button" className="btn btn-light" onClick={() => setShowProgressModal(false)}>Cancel</button><button type="submit" className="btn btn-primary">Save Progress</button></div>
            </form>
          </div></div></div>
        )}
        <TeamDeadlineDetailsModal show={showDetailsModal} onClose={() => setShowDetailsModal(false)} deadline={selectedDeadline} />
        <TeamDeadlineReminderModal show={showReminderModal} onClose={() => setShowReminderModal(false)} deadline={selectedDeadline} onSubmit={handleReminderSubmit} />

        {showNoteModal && selectedDeadline && (
          <div className="modal-overlay"><div className="modal-dialog"><div className="modal-content">
            <div className="modal-header"><h5 className="modal-title">Add Note - {selectedDeadline.title}</h5><button className="modal-close-btn" onClick={() => setShowNoteModal(false)}><FiX /></button></div>
            <form onSubmit={handleNoteSubmit}><div className="modal-body"><div className="mb-3"><label className="form-label">Note</label><textarea className="form-control" rows="3" value={noteForm} onChange={(e) => setNoteForm(e.target.value)}></textarea></div></div>
            <div className="modal-footer"><button type="button" className="btn btn-light" onClick={() => setShowNoteModal(false)}>Cancel</button><button type="submit" className="btn btn-primary">Save Note</button></div></form>
          </div></div></div>
        )}
      </div>
    </TeamLayout>
  );
};

export default TeamDeadlines;
