// src/pages/manager/ManagerMeetings.jsx
import React, { useEffect, useState, useMemo } from 'react';
import ManagerLayout from '../../layouts/ManagerLayout';
import MeetingStatsCard from '../../components/managerMeetings/MeetingStatsCard';
import ManagerMeetingCard from '../../components/managerMeetings/ManagerMeetingCard';
import ManagerMeetingTable from '../../components/managerMeetings/ManagerMeetingTable';
import MeetingFormModal from '../../components/managerMeetings/MeetingFormModal';
import MeetingDetailsModal from '../../components/managerMeetings/MeetingDetailsModal';
import MeetingTimelineView from '../../components/managerMeetings/MeetingTimelineView';
import MeetingAgendaBox from '../../components/managerMeetings/MeetingAgendaBox';
import { FiSearch, FiRotateCcw, FiGrid, FiList, FiClock, FiClipboard, FiPlus, FiDownload, FiX } from 'react-icons/fi';
import { meetingStatsData, meetingTypes, meetingStatuses, meetingModes, projectsForMeetings } from '../../data/managerMeetingsData';
import * as meetingService from '../../services/meetingService';
import { apiData } from '../../services/api';
import '../../styles/managerMeetings.css';

const ManagerMeetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [projectFilter, setProjectFilter] = useState('All Projects');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [modeFilter, setModeFilter] = useState('All Modes');
  const [dateFilter, setDateFilter] = useState('All Dates');
  const [viewMode, setViewMode] = useState('card');
  const [alert, setAlert] = useState(null);

  const [showFormModal, setShowFormModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);

const showAlert = (m, t = 'info') => { setAlert({ message: m, type: t }); setTimeout(() => setAlert(null), 3000); };
  const parseList = (value) => { if (Array.isArray(value)) return value; if (!value) return []; try { return JSON.parse(value); } catch { return []; } };
  const toMeeting = (meeting) => ({ ...meeting, type: meeting.meeting_type || 'Internal Meeting', project: meeting.project_name || '', client: meeting.client_name || '', date: meeting.meeting_date ? String(meeting.meeting_date).slice(0, 10) : '', startTime: meeting.meeting_time ? String(meeting.meeting_time).slice(0, 5) : '', endTime: meeting.end_time ? String(meeting.end_time).slice(0, 5) : '', mode: meeting.meeting_mode || 'Online', meetingLink: meeting.meeting_link || '', participants: parseList(meeting.participants), agenda: parseList(meeting.agenda), notes: parseList(meeting.notes) });
  const meetingPayload = (form) => ({ title: form.title, description: form.description, meeting_type: form.type, project_name: form.project, client_name: form.client, meeting_date: form.date, meeting_time: form.startTime, end_time: form.endTime, meeting_mode: form.mode, location: form.location, meeting_link: form.meetingLink, participants: JSON.stringify(form.participants || []), agenda: JSON.stringify(form.agenda || []), status: form.status, notes: JSON.stringify(form.notes || []) });
  const loadMeetings = async () => { try { const response = await meetingService.getMeetings(); setMeetings(apiData(response).map(toMeeting)); } catch (error) { showAlert(error.response?.data?.message || 'Unable to load meetings from the database.', 'danger'); } };
  useEffect(() => { loadMeetings(); }, []);

  const filteredMeetings = useMemo(() => {
    return meetings.filter(m => {
      const matchesSearch = !searchTerm || m.title.toLowerCase().includes(searchTerm.toLowerCase()) || m.project.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'All Types' || m.type === typeFilter;
      const matchesProject = projectFilter === 'All Projects' || m.project === projectFilter;
      const matchesStatus = statusFilter === 'All Status' || m.status === statusFilter;
      const matchesMode = modeFilter === 'All Modes' || m.mode === modeFilter;
      let matchesDate = true;
      const today = new Date().toISOString().split('T')[0];
      if (dateFilter === 'Today') matchesDate = m.date === today;
      else if (dateFilter === 'Tomorrow') { const t = new Date(); t.setDate(t.getDate() + 1); matchesDate = m.date === t.toISOString().split('T')[0]; }
      else if (dateFilter === 'This Week') { const end = new Date(); end.setDate(end.getDate() + (7 - end.getDay())); matchesDate = m.date >= today && m.date <= end.toISOString().split('T')[0]; }
      else if (dateFilter === 'This Month') matchesDate = m.date.startsWith(today.substring(0, 7));
      return matchesSearch && matchesType && matchesProject && matchesStatus && matchesMode && matchesDate;
    });
  }, [meetings, searchTerm, typeFilter, projectFilter, statusFilter, modeFilter, dateFilter]);

  const resetFilters = () => { setSearchTerm(''); setTypeFilter('All Types'); setProjectFilter('All Projects'); setStatusFilter('All Status'); setModeFilter('All Modes'); setDateFilter('All Dates'); };
const handleExport = () => {
    if (!filteredMeetings.length) { showAlert('There are no meetings matching the current filters.', 'warning'); return; }
    const columns = ['Title', 'Type', 'Project', 'Client', 'Date', 'Start Time', 'End Time', 'Mode', 'Participants', 'Status'];
    const csvValue = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;
    const rows = filteredMeetings.map(meeting => [meeting.title, meeting.type, meeting.project, meeting.client, meeting.date, meeting.startTime, meeting.endTime, meeting.mode, (meeting.participants || []).join(', '), meeting.status]);
    const csv = [columns, ...rows].map(row => row.map(csvValue).join(',')).join('\r\n');
    const url = URL.createObjectURL(new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' }));
    const link = document.createElement('a'); link.href = url; link.download = `manager-meetings-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link); link.click(); link.remove(); URL.revokeObjectURL(url);
    showAlert(`${filteredMeetings.length} meeting(s) exported to CSV.`, 'success');
  };

  const handleAdd = () => { setSelectedMeeting(null); setShowFormModal(true); };
  const handleEdit = (m) => { setSelectedMeeting(m); setShowFormModal(true); };
  const handleView = (m) => { setSelectedMeeting(m); setShowDetailsModal(true); };
  const handleMarkComplete = async (m) => { try { await meetingService.updateMeeting(m.id, { status: 'Completed' }); await loadMeetings(); showAlert('Meeting marked as completed in database!', 'success'); } catch (error) { showAlert(error.response?.data?.message || 'Unable to update meeting.', 'danger'); } };
  const handleAddNotes = (m) => { setSelectedMeeting(m); setShowDetailsModal(true); };
  const handleDelete = (m) => { setSelectedMeeting(m); setShowDeleteModal(true); };
  const confirmDelete = async () => { try { await meetingService.deleteMeeting(selectedMeeting.id); await loadMeetings(); setShowDeleteModal(false); showAlert('Meeting deleted from database!', 'success'); } catch (error) { showAlert(error.response?.data?.message || 'Unable to delete meeting.', 'danger'); } };

  const handleFormSubmit = async (fd) => {
    try {
      if (selectedMeeting) await meetingService.updateMeeting(selectedMeeting.id, meetingPayload(fd));
      else await meetingService.createMeeting(meetingPayload(fd));
      await loadMeetings();
      setShowFormModal(false); setSelectedMeeting(null);
      showAlert(selectedMeeting ? 'Meeting updated in database!' : 'Meeting scheduled and saved in database!', 'success');
    } catch (error) { showAlert(error.response?.data?.message || 'Unable to save meeting.', 'danger'); }
  };
  const allAgendas = meetings.flatMap(m => m.agenda.map(a => ({ ...a, meetingTitle: m.title })));

  return (
    <ManagerLayout>
      <div className="mmt-dashboard">
        <div className="mmt-dash-header">
          <div><h3>Meetings</h3><p>Schedule, manage, and track project meetings, client meetings, daily standups, agendas, participants, and notes.</p></div>
          <div className="d-flex gap-2">
            <button className="btn btn-primary btn-sm" onClick={handleAdd}><FiPlus /> Schedule Meeting</button>
            <button className="btn btn-outline-primary btn-sm" onClick={handleExport}><FiDownload /> Export</button>
          </div>
        </div>
        {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`}>{alert.message}<button className="btn-close" onClick={() => setAlert(null)}></button></div>}

        <div className="mmt-stats-grid">{meetingStatsData.map(s => <MeetingStatsCard key={s.id} stat={s} />)}</div>

        <div className="filter-section"><div className="filter-row">
          <div className="search-box"><FiSearch className="search-icon" /><input type="text" className="form-control search-input" placeholder="Search meetings..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
          <div className="filter-selects">
            <select className="form-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}><option value="All Types">All Types</option>{meetingTypes.map(t => <option key={t} value={t}>{t}</option>)}</select>
            <select className="form-select" value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)}><option value="All Projects">All Projects</option>{projectsForMeetings.map(p => <option key={p} value={p}>{p}</option>)}</select>
            <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}><option value="All Status">All Status</option>{meetingStatuses.map(s => <option key={s} value={s}>{s}</option>)}</select>
            <select className="form-select" value={modeFilter} onChange={(e) => setModeFilter(e.target.value)}><option value="All Modes">All Modes</option>{meetingModes.map(m => <option key={m} value={m}>{m}</option>)}</select>
            <select className="form-select" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}><option value="All Dates">All Dates</option><option>Today</option><option>Tomorrow</option><option>This Week</option><option>This Month</option></select>
          </div>
          <button className="btn btn-light reset-btn" onClick={resetFilters}><FiRotateCcw className="me-2" /> Reset</button>
          <div className="view-toggle">
            <button className={`toggle-btn ${viewMode === 'card' ? 'active' : ''}`} onClick={() => setViewMode('card')}><FiGrid /></button>
            <button className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`} onClick={() => setViewMode('table')}><FiList /></button>
            <button className={`toggle-btn ${viewMode === 'timeline' ? 'active' : ''}`} onClick={() => setViewMode('timeline')}><FiClock /></button>
            <button className={`toggle-btn ${viewMode === 'agenda' ? 'active' : ''}`} onClick={() => setViewMode('agenda')}><FiClipboard /></button>
          </div>
        </div></div>

        {viewMode === 'card' && <div className="mmt-cards-grid">{filteredMeetings.length === 0 ? <p className="text-center text-muted py-5">No meetings found</p> : filteredMeetings.map(m => <ManagerMeetingCard key={m.id} meeting={m} onView={handleView} onEdit={handleEdit} onMarkComplete={handleMarkComplete} onAddNotes={handleAddNotes} onDelete={handleDelete} />)}</div>}
        {viewMode === 'table' && <div className="mmt-table-card"><ManagerMeetingTable meetings={filteredMeetings} onView={handleView} onEdit={handleEdit} onMarkComplete={handleMarkComplete} onAddNotes={handleAddNotes} onDelete={handleDelete} /></div>}
        {viewMode === 'timeline' && <MeetingTimelineView meetings={filteredMeetings} />}
        {viewMode === 'agenda' && (
          <div className="mmt-agenda-view">
            <h5 className="mb-3">All Agenda Items</h5>
            {allAgendas.length === 0 ? <p className="text-muted">No agenda items</p> : allAgendas.map(a => (
              <div key={a.id} className="mmt-agenda-view-item">
                <span className="mmt-agenda-dot-sm" style={{ background: a.status === 'Discussed' ? 'var(--success-color)' : a.status === 'Skipped' ? 'var(--text-muted)' : 'var(--warning-color)' }}></span>
                <div>
                  <strong>{a.title}</strong>
                  <p className="mb-0 text-muted">Meeting: {a.meetingTitle} | Status: {a.status}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <MeetingFormModal show={showFormModal} onClose={() => { setShowFormModal(false); setSelectedMeeting(null); }} onSubmit={handleFormSubmit} editMeeting={selectedMeeting} />
        <MeetingDetailsModal show={showDetailsModal} onClose={() => { setShowDetailsModal(false); setSelectedMeeting(null); }} meeting={selectedMeeting} onAlert={showAlert} />

        {showDeleteModal && selectedMeeting && (
          <div className="modal-overlay"><div className="modal-dialog modal-sm"><div className="modal-content">
            <div className="modal-header"><h5 className="modal-title">Delete Meeting</h5><button className="modal-close-btn" onClick={() => setShowDeleteModal(false)}><FiX /></button></div>
            <div className="modal-body"><p>Are you sure you want to delete this meeting?</p><div className="delete-info"><strong>{selectedMeeting.title}</strong></div></div>
            <div className="modal-footer"><button className="btn btn-light" onClick={() => setShowDeleteModal(false)}>Cancel</button><button className="btn btn-danger" onClick={confirmDelete}>Delete</button></div>
          </div></div></div>
        )}
      </div>
    </ManagerLayout>
  );
};

export default ManagerMeetings;