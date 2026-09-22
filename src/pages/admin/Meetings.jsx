// src/pages/admin/Meetings.jsx
import usePersistentState from '../../hooks/usePersistentState';
import React, { useEffect, useState, useMemo } from 'react';
import * as meetingService from '../../services/meetingService';
import { apiData } from '../../services/api';
import AdminLayout from '../../layouts/AdminLayout';
import PageHeader from '../../components/common/PageHeader';
import MeetingStatsCard from '../../components/meetings/MeetingStatsCard';
import MeetingCard from '../../components/meetings/MeetingCard';
import MeetingTable from '../../components/meetings/MeetingTable';
import MeetingFormModal from '../../components/meetings/MeetingFormModal';
import MeetingDetailsModal from '../../components/meetings/MeetingDetailsModal';
import { FiSearch, FiRotateCcw, FiGrid, FiList, FiClock, FiX } from 'react-icons/fi';
import { meetingStatsData, meetingTypes, meetingStatuses, projectsForMeetings } from '../../data/meetingData';
import '../../styles/meetings.css';

const Meetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [projectFilter, setProjectFilter] = useState('All Projects');
  const [dateFilter, setDateFilter] = useState('All Dates');
  const [viewMode, setViewMode] = useState('card');

  const [showFormModal, setShowFormModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [alert, setAlert] = useState(null);

  const parseJsonList = (value) => {
    if (Array.isArray(value)) return value;
    if (!value) return [];
    try { return JSON.parse(value); } catch { return []; }
  };

  const toUiMeeting = (meeting) => ({
    ...meeting,
    description: meeting.description || '',
    type: meeting.meeting_type || meeting.type || 'Internal Meeting',
    project: meeting.project_name || meeting.project || '',
    client: meeting.client_name || meeting.client || '',
    date: meeting.meeting_date || meeting.date || '',
    startTime: meeting.meeting_time ? String(meeting.meeting_time).slice(0, 5) : '',
    endTime: meeting.end_time ? String(meeting.end_time).slice(0, 5) : '',
    mode: meeting.meeting_mode || meeting.mode || 'Online',
    meetingLink: meeting.meeting_link || meeting.meetingLink || '',
    participants: parseJsonList(meeting.participants),
    agenda: parseJsonList(meeting.agenda),
    notes: parseJsonList(meeting.notes),
    createdDate: meeting.created_at ? String(meeting.created_at).slice(0, 10) : ''
  });

  useEffect(() => {
    meetingService.getMeetings()
      .then(response => setMeetings(apiData(response).map(toUiMeeting)))
      .catch(error => showAlert(error.response?.data?.message || 'Unable to load meetings.', 'danger'));
  }, []);
  const filteredMeetings = useMemo(() => {
    return meetings.filter(m => {
      const matchesSearch = m.title.toLowerCase().includes(searchTerm.toLowerCase()) || m.project.toLowerCase().includes(searchTerm.toLowerCase()) || (m.client || '').toLowerCase().includes(searchTerm.toLowerCase()) || m.participants.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesType = typeFilter === 'All Types' || m.type === typeFilter;
      const matchesStatus = statusFilter === 'All Status' || m.status === statusFilter;
      const matchesProject = projectFilter === 'All Projects' || m.project === projectFilter;
      let matchesDate = true;
      const today = new Date().toISOString().split('T')[0];
      if (dateFilter === 'Today') matchesDate = m.date === today;
      else if (dateFilter === 'Tomorrow') { const t = new Date(); t.setDate(t.getDate() + 1); matchesDate = m.date === t.toISOString().split('T')[0]; }
      else if (dateFilter === 'This Week') { const now = new Date(); const end = new Date(); end.setDate(now.getDate() + (7 - now.getDay())); matchesDate = m.date >= today && m.date <= end.toISOString().split('T')[0]; }
      else if (dateFilter === 'This Month') matchesDate = m.date.startsWith(today.substring(0, 7));
      return matchesSearch && matchesType && matchesStatus && matchesProject && matchesDate;
    });
  }, [meetings, searchTerm, typeFilter, statusFilter, projectFilter, dateFilter]);

  const resetFilters = () => { setSearchTerm(''); setTypeFilter('All Types'); setStatusFilter('All Status'); setProjectFilter('All Projects'); setDateFilter('All Dates'); };
  const showAlert = (m, t = 'success') => { setAlert({ message: m, type: t }); setTimeout(() => setAlert(null), 3000); };

  const handleAdd = () => { setSelectedMeeting(null); setShowFormModal(true); };
  const handleEdit = (m) => { setSelectedMeeting(m); setShowFormModal(true); };
  const handleView = (m) => { setSelectedMeeting(m); setShowViewModal(true); };
  const handleDelete = (m) => { setSelectedMeeting(m); setShowDeleteModal(true); };
  const handleMarkComplete = async (m) => {
    try {
      const response = await meetingService.updateMeeting(m.id, { status: 'Completed' });
      const saved = toUiMeeting(apiData(response));
      setMeetings(current => current.map(mt => mt.id === m.id ? saved : mt));
      showAlert('Meeting marked as completed!');
    } catch (error) { showAlert(error.response?.data?.message || 'Unable to update meeting.', 'danger'); }
  };
  const confirmDelete = async () => {
    try {
      await meetingService.deleteMeeting(selectedMeeting.id);
      setMeetings(current => current.filter(m => m.id !== selectedMeeting.id));
      setShowDeleteModal(false); setSelectedMeeting(null); showAlert('Meeting deleted successfully!');
    } catch (error) { showAlert(error.response?.data?.message || 'Unable to delete meeting.', 'danger'); }
  };

  const handleFormSubmit = async (fd) => {
    const payload = {
      title: fd.title,
      description: fd.description,
      meeting_type: fd.type,
      project_name: fd.project,
      client_name: fd.client,
      meeting_date: fd.date,
      meeting_time: fd.startTime,
      end_time: fd.endTime || null,
      meeting_mode: fd.mode,
      location: fd.location,
      meeting_link: fd.meetingLink,
      participants: JSON.stringify(fd.participants || []),
      agenda: JSON.stringify(fd.agenda || []),
      status: fd.status,
      notes: JSON.stringify(fd.notes || [])
    };
    try {
      const response = selectedMeeting
        ? await meetingService.updateMeeting(selectedMeeting.id, payload)
        : await meetingService.createMeeting(payload);
      const saved = toUiMeeting(apiData(response));
      setMeetings(current => selectedMeeting
        ? current.map(meeting => meeting.id === selectedMeeting.id ? saved : meeting)
        : [saved, ...current]);
      showAlert(selectedMeeting ? 'Meeting updated successfully!' : 'Meeting saved successfully!');
      setShowFormModal(false); setSelectedMeeting(null);
    } catch (error) { showAlert(error.response?.data?.message || 'Unable to save meeting.', 'danger'); }
  };

  const timelineGroups = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    const groups = { Today: [], Tomorrow: [], 'This Week': [], Upcoming: [] };
    filteredMeetings.forEach(m => {
      if (m.date === today) groups['Today'].push(m);
      else if (m.date === tomorrow) groups['Tomorrow'].push(m);
      else if (m.date > tomorrow && m.date <= new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]) groups['This Week'].push(m);
      else groups['Upcoming'].push(m);
    });
    return groups;
  }, [filteredMeetings]);

  return (
    <AdminLayout>
      <PageHeader title="Meeting Management" subtitle="Schedule meetings, manage participants, track agendas, add notes, and monitor meeting status." buttonText="Schedule Meeting" onButtonClick={handleAdd} showButton={true} />
      {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`}>{alert.message}<button className="btn-close" onClick={() => setAlert(null)}></button></div>}

      <div className="mtg-stats-grid">{meetingStatsData.map(s => <MeetingStatsCard key={s.id} stat={s} />)}</div>

      <div className="filter-section"><div className="filter-row">
        <div className="search-box"><FiSearch className="search-icon" /><input type="text" className="form-control search-input" placeholder="Search meetings..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
        <div className="filter-selects">
          <select className="form-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}><option value="All Types">All Types</option>{meetingTypes.map(t => <option key={t} value={t}>{t}</option>)}</select>
          <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}><option value="All Status">All Status</option>{meetingStatuses.map(s => <option key={s} value={s}>{s}</option>)}</select>
          <select className="form-select" value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)}><option value="All Projects">All Projects</option>{projectsForMeetings.map(p => <option key={p} value={p}>{p}</option>)}</select>
          <select className="form-select" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}><option value="All Dates">All Dates</option><option>Today</option><option>Tomorrow</option><option>This Week</option><option>This Month</option></select>
        </div>
        <button className="btn btn-light reset-btn" onClick={resetFilters}><FiRotateCcw className="me-2" /> Reset</button>
        <div className="view-toggle">
          <button className={`toggle-btn ${viewMode === 'card' ? 'active' : ''}`} onClick={() => setViewMode('card')}><FiGrid /></button>
          <button className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`} onClick={() => setViewMode('table')}><FiList /></button>
          <button className={`toggle-btn ${viewMode === 'timeline' ? 'active' : ''}`} onClick={() => setViewMode('timeline')}><FiClock /></button>
        </div>
      </div></div>

      {viewMode === 'card' && <div className="meetings-grid">{filteredMeetings.length === 0 ? <div className="no-meetings"><p className="text-muted">No meetings found</p></div> : filteredMeetings.map(m => <MeetingCard key={m.id} meeting={m} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} onMarkComplete={handleMarkComplete} />)}</div>}
      {viewMode === 'table' && <div className="meetings-table-card"><MeetingTable meetings={filteredMeetings} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} onMarkComplete={handleMarkComplete} /></div>}
      {viewMode === 'timeline' && (
        <div className="timeline-view">
          {Object.entries(timelineGroups).map(([group, groupMeetings]) => groupMeetings.length > 0 && (
            <div key={group} className="timeline-group">
              <h5 className="timeline-group-title">{group} ({groupMeetings.length})</h5>
              <div className="timeline-items">
                {groupMeetings.map(m => (
                  <div key={m.id} className="timeline-item">
                    <div className="timeline-time"><span>{m.startTime}</span><span className="timeline-duration">{m.endTime}</span></div>
                    <div className="timeline-dot"></div>
                    <div className="timeline-card">
                      <div className="timeline-card-header"><h6>{m.title}</h6><MeetingTypeBadge type={m.type} /></div>
                      <div className="timeline-card-meta"><span>{m.project}</span><span>{m.mode}</span><span>{m.participants.length} participants</span></div>
                      <div className="timeline-card-footer"><MeetingStatusBadge status={m.status} /><span className="timeline-location">{m.meetingLink || m.location}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {Object.values(timelineGroups).every(g => g.length === 0) && <p className="text-muted text-center py-5">No meetings found</p>}
        </div>
      )}

      <MeetingFormModal show={showFormModal} onClose={() => { setShowFormModal(false); setSelectedMeeting(null); }} onSubmit={handleFormSubmit} editMeeting={selectedMeeting} />
      <MeetingDetailsModal show={showViewModal} onClose={() => { setShowViewModal(false); setSelectedMeeting(null); }} meeting={selectedMeeting} />

      {showDeleteModal && selectedMeeting && (
        <div className="modal-overlay"><div className="modal-dialog modal-sm"><div className="modal-content">
          <div className="modal-header"><h5 className="modal-title">Delete Meeting</h5><button className="modal-close-btn" onClick={() => { setShowDeleteModal(false); setSelectedMeeting(null); }}><FiX /></button></div>
          <div className="modal-body"><div className="delete-confirmation"><p>Are you sure you want to delete this meeting?</p><div className="delete-info"><strong>{selectedMeeting.title}</strong></div></div></div>
          <div className="modal-footer"><button className="btn btn-light" onClick={() => { setShowDeleteModal(false); setSelectedMeeting(null); }}>Cancel</button><button className="btn btn-danger" onClick={confirmDelete}>Delete</button></div>
        </div></div></div>
      )}
    </AdminLayout>
  );
};

export default Meetings;

