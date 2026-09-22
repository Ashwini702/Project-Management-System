// src/pages/manager/ManagerClientFeedback.jsx
import React, { useState, useMemo } from 'react';
import ManagerLayout from '../../layouts/ManagerLayout';
import FeedbackStatsCard from '../../components/managerFeedback/FeedbackStatsCard';
import FeedbackCard from '../../components/managerFeedback/FeedbackCard';
import FeedbackTable from '../../components/managerFeedback/FeedbackTable';
import FeedbackDetailsModal from '../../components/managerFeedback/FeedbackDetailsModal';
import FeedbackResponseModal from '../../components/managerFeedback/FeedbackResponseModal';
import ClientSatisfactionBox from '../../components/managerFeedback/ClientSatisfactionBox';
import FeedbackTimeline from '../../components/managerFeedback/FeedbackTimeline';
import FeedbackCategoryBox from '../../components/managerFeedback/FeedbackCategoryBox';
import { FiSearch, FiRotateCcw, FiGrid, FiList, FiSmile, FiClock, FiEdit3, FiDownload, FiX } from 'react-icons/fi';
import { feedbackStatsData, feedbackList, projectsForFeedback, clientsForFeedback, categories, satisfactionData, categoryAnalytics } from '../../data/managerFeedbackData';
import * as feedbackResponseService from '../../services/feedbackResponseService';
import '../../styles/managerFeedback.css';

const ManagerClientFeedback = () => {
  const [feedbacks, setFeedbacks] = useState(feedbackList);
  const [searchTerm, setSearchTerm] = useState('');
  const [projectFilter, setProjectFilter] = useState('All Projects');
  const [clientFilter, setClientFilter] = useState('All Clients');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [priorityFilter, setPriorityFilter] = useState('All Priority');
  const [dateFilter, setDateFilter] = useState('All Dates');
  const [viewMode, setViewMode] = useState('card');
  const [alert, setAlert] = useState(null);

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const showAlert = (m, t = 'info') => { setAlert({ message: m, type: t }); setTimeout(() => setAlert(null), 2000); };

  const filteredFeedbacks = useMemo(() => {
    return feedbacks.filter(f => {
      const matchesSearch = !searchTerm || f.title.toLowerCase().includes(searchTerm.toLowerCase()) || f.message.toLowerCase().includes(searchTerm.toLowerCase()) || f.clientName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesProject = projectFilter === 'All Projects' || f.projectName === projectFilter;
      const matchesClient = clientFilter === 'All Clients' || f.clientName === clientFilter;
      const matchesCategory = categoryFilter === 'All Categories' || f.category === categoryFilter;
      const matchesStatus = statusFilter === 'All Status' || f.status === statusFilter;
      const matchesPriority = priorityFilter === 'All Priority' || f.priority === priorityFilter;
      return matchesSearch && matchesProject && matchesClient && matchesCategory && matchesStatus && matchesPriority;
    });
  }, [feedbacks, searchTerm, projectFilter, clientFilter, categoryFilter, statusFilter, priorityFilter]);

  const resetFilters = () => { setSearchTerm(''); setProjectFilter('All Projects'); setClientFilter('All Clients'); setCategoryFilter('All Categories'); setStatusFilter('All Status'); setPriorityFilter('All Priority'); setDateFilter('All Dates'); };
const handleExport = () => {
    if (!filteredFeedbacks.length) { showAlert('There is no feedback matching the current filters.', 'warning'); return; }
    const columns = ['Title', 'Client', 'Company', 'Project', 'Category', 'Rating', 'Priority', 'Status', 'Submitted Date', 'Message'];
    const csvValue = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;
    const rows = filteredFeedbacks.map(feedback => [feedback.title, feedback.clientName, feedback.companyName, feedback.projectName, feedback.category, feedback.rating, feedback.priority, feedback.status, feedback.submittedDate, feedback.message]);
    const csv = [columns, ...rows].map(row => row.map(csvValue).join(',')).join('\r\n');
    const url = URL.createObjectURL(new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' }));
    const link = document.createElement('a'); link.href = url; link.download = `client-feedback-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link); link.click(); link.remove(); URL.revokeObjectURL(url);
    showAlert(`${filteredFeedbacks.length} feedback record(s) exported to CSV.`, 'success');
  };

  const handleView = (f) => { setSelectedFeedback(f); setShowDetailsModal(true); };
  const handleAddResponse = () => { setSelectedFeedback(null); setShowResponseModal(true); };
  const handleRespond = (f) => { setSelectedFeedback(f); setShowResponseModal(true); };
  const handleResolve = (f) => { setFeedbacks(feedbacks.map(fb => fb.id === f.id ? { ...fb, status: 'Resolved' } : fb)); showAlert('Feedback marked as resolved!', 'success'); };
  const handleApprove = (f) => { setFeedbacks(feedbacks.map(fb => fb.id === f.id ? { ...fb, status: 'Approved' } : fb)); showAlert('Feedback approved!', 'success'); };
  const handleReject = (f) => { setFeedbacks(feedbacks.map(fb => fb.id === f.id ? { ...fb, status: 'Rejected' } : fb)); showAlert('Feedback rejected!', 'warning'); };
  const handleDelete = (f) => { setSelectedFeedback(f); setShowDeleteModal(true); };
  const confirmDelete = () => { setFeedbacks(feedbacks.filter(f => f.id !== selectedFeedback.id)); setShowDeleteModal(false); showAlert('Feedback deleted!', 'success'); };

const handleResponseSubmit = async (form) => {
    if (!form.feedbackId) { showAlert('Please select a feedback item first.', 'info'); return; }
    try {
      const response = await feedbackResponseService.createFeedbackResponse({ feedback_id: Number(form.feedbackId), message: form.message, status_update: form.statusUpdate, internal_note: form.internalNote, notify_client: form.notifyClient });
      const saved = response.data?.data;
      const newResponse = { id: saved?.id || Date.now(), responderName: saved?.responder_name || 'Project Manager', responderRole: 'Project Manager', message: form.message, dateTime: new Date().toISOString().replace('T', ' ').substring(0, 16), statusUpdate: form.statusUpdate, internalNote: form.internalNote };
      setFeedbacks(feedbacks.map(f => f.id === Number(form.feedbackId) ? { ...f, status: form.statusUpdate, lastResponseDate: new Date().toISOString().split('T')[0], responses: [...(f.responses || []), newResponse], activity: [...(f.activity || []), { title: 'Response Sent', user: newResponse.responderName, dateTime: newResponse.dateTime }] } : f));
      setShowResponseModal(false); showAlert('Response saved in database!', 'success');
    } catch (error) { showAlert(error.response?.data?.message || 'Unable to save response.', 'danger'); }
  };

  return (
    <ManagerLayout>
      <div className="mfb-dashboard">
        <div className="mfb-dash-header">
          <div><h3>Client Feedback</h3><p>Review client feedback, respond to concerns, track approvals, resolve issues, and monitor client satisfaction.</p></div>
          <div className="d-flex gap-2">
            <button className="btn btn-primary btn-sm" onClick={handleAddResponse}><FiEdit3 /> Add Response</button>
            <button className="btn btn-outline-primary btn-sm" onClick={handleExport}><FiDownload /> Export</button>
          </div>
        </div>
        {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`}>{alert.message}<button className="btn-close" onClick={() => setAlert(null)}></button></div>}

        <div className="mfb-stats-grid">{feedbackStatsData.map(s => <FeedbackStatsCard key={s.id} stat={s} />)}</div>

        <div className="filter-section"><div className="filter-row">
          <div className="search-box"><FiSearch className="search-icon" /><input type="text" className="form-control search-input" placeholder="Search feedback..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
          <div className="filter-selects">
            <select className="form-select" value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)}><option value="All Projects">All Projects</option>{projectsForFeedback.map(p => <option key={p} value={p}>{p}</option>)}</select>
            <select className="form-select" value={clientFilter} onChange={(e) => setClientFilter(e.target.value)}><option value="All Clients">All Clients</option>{clientsForFeedback.map(c => <option key={c} value={c}>{c}</option>)}</select>
            <select className="form-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}><option value="All Categories">All Categories</option>{categories.map(c => <option key={c} value={c}>{c}</option>)}</select>
            <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}><option value="All Status">All Status</option><option>Pending</option><option>In Review</option><option>Approved</option><option>Rejected</option><option>Resolved</option></select>
            <select className="form-select" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}><option value="All Priority">All Priority</option><option>Low</option><option>Medium</option><option>High</option><option>Urgent</option></select>
          </div>
          <button className="btn btn-light reset-btn" onClick={resetFilters}><FiRotateCcw className="me-2" /> Reset</button>
          <div className="view-toggle">
            <button className={`toggle-btn ${viewMode === 'card' ? 'active' : ''}`} onClick={() => setViewMode('card')}><FiGrid /></button>
            <button className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`} onClick={() => setViewMode('table')}><FiList /></button>
            <button className={`toggle-btn ${viewMode === 'satisfaction' ? 'active' : ''}`} onClick={() => setViewMode('satisfaction')}><FiSmile /></button>
            <button className={`toggle-btn ${viewMode === 'timeline' ? 'active' : ''}`} onClick={() => setViewMode('timeline')}><FiClock /></button>
          </div>
        </div></div>

        {viewMode === 'card' && <div className="mfb-cards-grid">{filteredFeedbacks.length === 0 ? <p className="text-center text-muted py-5">No feedback found</p> : filteredFeedbacks.map(f => <FeedbackCard key={f.id} feedback={f} onView={handleView} onRespond={handleRespond} onResolve={handleResolve} onApprove={handleApprove} onReject={handleReject} onDelete={handleDelete} />)}</div>}
        {viewMode === 'table' && <div className="mfb-table-card"><FeedbackTable feedbacks={filteredFeedbacks} onView={handleView} onRespond={handleRespond} onResolve={handleResolve} onApprove={handleApprove} onReject={handleReject} onDelete={handleDelete} /></div>}
        {viewMode === 'satisfaction' && <ClientSatisfactionBox data={satisfactionData} />}
        {viewMode === 'timeline' && <FeedbackTimeline />}

        <div className="mt-4"><FeedbackCategoryBox categories={categoryAnalytics} /></div>

        <FeedbackDetailsModal show={showDetailsModal} onClose={() => setShowDetailsModal(false)} feedback={selectedFeedback} />
        <FeedbackResponseModal show={showResponseModal} onClose={() => setShowResponseModal(false)} onSubmit={handleResponseSubmit} feedback={selectedFeedback} feedbackOptions={feedbacks} />

        {showDeleteModal && selectedFeedback && (
          <div className="modal-overlay"><div className="modal-dialog modal-sm"><div className="modal-content">
            <div className="modal-header"><h5 className="modal-title">Delete Feedback</h5><button className="modal-close-btn" onClick={() => setShowDeleteModal(false)}><FiX /></button></div>
            <div className="modal-body"><p>Are you sure you want to delete this feedback?</p><div className="delete-info"><strong>{selectedFeedback.title}</strong></div></div>
            <div className="modal-footer"><button className="btn btn-light" onClick={() => setShowDeleteModal(false)}>Cancel</button><button className="btn btn-danger" onClick={confirmDelete}>Delete</button></div>
          </div></div></div>
        )}
      </div>
    </ManagerLayout>
  );
};

export default ManagerClientFeedback;