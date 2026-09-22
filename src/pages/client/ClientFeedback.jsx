// src/pages/client/ClientFeedback.jsx
import React, { useEffect, useState, useMemo } from 'react';
import * as projectService from '../../services/projectService';
import * as feedbackService from '../../services/feedbackService';
import * as feedbackResponseService from '../../services/feedbackResponseService';
import { apiData } from '../../services/api';
import ClientLayout from '../../layouts/ClientLayout';
import ClientFeedbackStatsCard from '../../components/clientFeedback/ClientFeedbackStatsCard';
import ClientFeedbackCard from '../../components/clientFeedback/ClientFeedbackCard';
import ClientFeedbackTable from '../../components/clientFeedback/ClientFeedbackTable';
import ClientFeedbackFormModal from '../../components/clientFeedback/ClientFeedbackFormModal';
import ClientFeedbackDetailsModal from '../../components/clientFeedback/ClientFeedbackDetailsModal';
import ClientFeedbackRatingBox from '../../components/clientFeedback/ClientFeedbackRatingBox';
import ClientFeedbackTimeline from '../../components/clientFeedback/ClientFeedbackTimeline';
import { FiSearch, FiRotateCcw, FiGrid, FiList, FiStar, FiClock, FiPlus, FiMessageSquare, FiX } from 'react-icons/fi';

import '../../styles/clientFeedback.css';

const ClientFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  useEffect(() => { Promise.all([feedbackService.getFeedback(), feedbackResponseService.getFeedbackResponses()]).then(([feedbackResponse, responsesResponse]) => { const responses = apiData(responsesResponse); setFeedbacks(apiData(feedbackResponse).map(feedback => ({ ...feedback, projectName: feedback.project_name, submittedDate: feedback.submitted_date, lastResponseDate: feedback.last_response_date || '-', responseCount: responses.filter(response => Number(response.feedback_id) === Number(feedback.id)).length, attachmentCount: 0, attachments: [], responses: responses.filter(response => Number(response.feedback_id) === Number(feedback.id)).map(response => ({ id: response.id, senderName: response.responder_name || 'Admin', senderRole: 'Admin', message: response.message, dateTime: response.created_at, statusUpdate: response.status_update || '' })), activity: [] }))); }).catch(() => {}); }, []);
  const [assignedProjects, setAssignedProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [projectFilter, setProjectFilter] = useState('All Projects');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [priorityFilter, setPriorityFilter] = useState('All Priority');
  const [dateFilter, setDateFilter] = useState('All Dates');
  const [viewMode, setViewMode] = useState('card');
  const [alert, setAlert] = useState(null);

  const [showFormModal, setShowFormModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const showAlert = (m, t = 'info') => { setAlert({ message: m, type: t }); setTimeout(() => setAlert(null), 2000); };
  const categories = useMemo(() => [...new Set(feedbacks.map(item => item.category).filter(Boolean))].sort(), [feedbacks]);
  const feedbackStatsData = useMemo(() => [
    { id: 1, title: 'Total Feedback', value: feedbacks.length, icon: 'FiMessageSquare', desc: 'Live feedback', color: 'primary' },
    { id: 2, title: 'Pending', value: feedbacks.filter(item => item.status === 'Pending').length, icon: 'FiClock', desc: 'Awaiting response', color: 'warning' },
    { id: 3, title: 'Resolved', value: feedbacks.filter(item => item.status === 'Resolved').length, icon: 'FiCheckCircle', desc: 'Resolved feedback', color: 'success' },
    { id: 4, title: 'Average Rating', value: feedbacks.length ? (feedbacks.reduce((sum, item) => sum + Number(item.rating || 0), 0) / feedbacks.length).toFixed(1) : '—', icon: 'FiStar', desc: 'Live rating average', color: 'info' },
  ], [feedbacks]);
  useEffect(() => { projectService.getProjects().then(response => setAssignedProjects(apiData(response).map(project => project.title))).catch(error => showAlert(error.response?.data?.message || 'Unable to load assigned projects.', 'danger')); }, []);

  const filteredFeedbacks = useMemo(() => {
    return feedbacks.filter(f => {
      const matchesSearch = !searchTerm || f.title.toLowerCase().includes(searchTerm.toLowerCase()) || f.message.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesProject = projectFilter === 'All Projects' || f.projectName === projectFilter;
      const matchesCategory = categoryFilter === 'All Categories' || f.category === categoryFilter;
      const matchesStatus = statusFilter === 'All Status' || f.status === statusFilter;
      const matchesPriority = priorityFilter === 'All Priority' || f.priority === priorityFilter;
      return matchesSearch && matchesProject && matchesCategory && matchesStatus && matchesPriority;
    });
  }, [feedbacks, searchTerm, projectFilter, categoryFilter, statusFilter, priorityFilter]);

  const resetFilters = () => { setSearchTerm(''); setProjectFilter('All Projects'); setCategoryFilter('All Categories'); setStatusFilter('All Status'); setPriorityFilter('All Priority'); setDateFilter('All Dates'); };

  const handleSubmit = () => { setSelectedFeedback(null); setShowFormModal(true); };
  const handleEdit = (f) => { setSelectedFeedback(f); setShowFormModal(true); };
  const handleView = (f) => { setSelectedFeedback(f); setShowDetailsModal(true); };
  const handleAddResponse = (f) => { setSelectedFeedback(f); setShowDetailsModal(true); };
  const handleDelete = (f) => { setSelectedFeedback(f); setShowDeleteModal(true); };
  const confirmDelete = () => { setFeedbacks(feedbacks.filter(f => f.id !== selectedFeedback.id)); setShowDeleteModal(false); showAlert('Feedback deleted!', 'success'); };

  const handleFormSubmit = async (form) => {
    if (selectedFeedback) { showAlert('Editing saved feedback is not available.', 'warning'); return; }
    try {
      const response = await feedbackService.createFeedback({ title: form.title, message: form.message, project_name: form.projectName, category: form.category, priority: form.priority, rating: Number(form.rating) });
      const saved = apiData(response);
      setFeedbacks(current => [{ ...saved, projectName: saved.project_name, submittedDate: saved.submitted_date, lastResponseDate: '-', responseCount: 0, attachmentCount: 0, attachments: [], responses: [], activity: [] }, ...current]);
      showAlert('Feedback saved and sent to Admin. Project Manager is notified when assigned.', 'success');
      setShowFormModal(false); setSelectedFeedback(null);
    } catch (error) { showAlert(error.response?.data?.message || 'Unable to submit feedback.', 'danger'); }
  };

  const handleResponseSubmit = (feedbackId, reply) => {
    setFeedbacks(feedbacks.map(f => f.id === feedbackId ? { ...f, responses: [...(f.responses || []), { id: Date.now(), senderName: 'Rahul Sharma', senderRole: 'Client', message: reply, dateTime: new Date().toISOString().replace('T', ' ').substring(0, 16), statusUpdate: '' }], lastResponseDate: new Date().toISOString().split('T')[0], responseCount: (f.responseCount || 0) + 1 } : f));
    showAlert('Reply sent!', 'success');
  };

  return (
    <ClientLayout>
      <div className="clfb-dashboard">
        <div className="clfb-dash-header">
          <div><h3>Feedback</h3><p>Submit feedback, request changes, track responses, review approvals, and monitor project communication.</p></div>
          <div className="d-flex gap-2">
            <button className="btn btn-primary btn-sm" onClick={handleSubmit}><FiPlus /> Submit Feedback</button>
            <button className="btn btn-outline-primary btn-sm" onClick={() => setViewMode('responses')}><FiMessageSquare /> View Responses</button>
          </div>
        </div>
        {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`}>{alert.message}<button className="btn-close" onClick={() => setAlert(null)}></button></div>}

        <div className="clfb-stats-grid">{feedbackStatsData.map(s => <ClientFeedbackStatsCard key={s.id} stat={s} />)}</div>

        <div className="filter-section"><div className="filter-row">
          <div className="search-box"><FiSearch className="search-icon" /><input type="text" className="form-control search-input" placeholder="Search feedback..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
          <div className="filter-selects">
            <select className="form-select" value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)}><option value="All Projects">All Projects</option>{assignedProjects.map(p => <option key={p} value={p}>{p}</option>)}</select>
            <select className="form-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}><option value="All Categories">All Categories</option>{categories.map(c => <option key={c} value={c}>{c}</option>)}</select>
            <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}><option value="All Status">All Status</option><option>Pending</option><option>In Review</option><option>Approved</option><option>Rejected</option><option>Resolved</option></select>
            <select className="form-select" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}><option value="All Priority">All Priority</option><option>Low</option><option>Medium</option><option>High</option><option>Urgent</option></select>
          </div>
          <button className="btn btn-light reset-btn" onClick={resetFilters}><FiRotateCcw className="me-2" /> Reset</button>
          <div className="view-toggle">
            <button className={`toggle-btn ${viewMode === 'card' ? 'active' : ''}`} onClick={() => setViewMode('card')}><FiGrid /></button>
            <button className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`} onClick={() => setViewMode('table')}><FiList /></button>
            <button className={`toggle-btn ${viewMode === 'rating' ? 'active' : ''}`} onClick={() => setViewMode('rating')}><FiStar /></button>
            <button className={`toggle-btn ${viewMode === 'timeline' ? 'active' : ''}`} onClick={() => setViewMode('timeline')}><FiClock /></button>
          </div>
        </div></div>

        {viewMode === 'card' && <div className="clfb-cards-grid">{filteredFeedbacks.length === 0 ? <p className="text-center text-muted py-5">No feedback found</p> : filteredFeedbacks.map(f => <ClientFeedbackCard key={f.id} feedback={f} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} onAddResponse={handleAddResponse} />)}</div>}
        {viewMode === 'table' && <div className="clfb-table-card"><ClientFeedbackTable feedbacks={filteredFeedbacks} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} onAddResponse={handleAddResponse} /></div>}
        {viewMode === 'rating' && <ClientFeedbackRatingBox />}
        {viewMode === 'responses' && <div className="clfb-table-card"><h5 className="mb-3">Admin & Project Manager Responses</h5>{feedbacks.flatMap(feedback => (feedback.responses || []).map(response => ({ ...response, feedbackTitle: feedback.title, projectName: feedback.projectName }))).length === 0 ? <p className="text-muted text-center py-4">No admin or project-manager responses yet.</p> : feedbacks.flatMap(feedback => (feedback.responses || []).map(response => <div key={response.id} className="border rounded p-3 mb-3 bg-light"><div className="d-flex justify-content-between gap-2"><strong>{response.senderName || 'Admin'}</strong><small className="text-muted">{response.dateTime || ''}</small></div><small className="d-block text-muted mb-2">{response.senderRole || 'Admin'} • {feedback.projectName} • {feedback.title}</small><p className="mb-0">{response.message}</p>{response.statusUpdate && <small className="d-block mt-2"><strong>Status:</strong> {response.statusUpdate}</small>}</div>))}</div>}
        {viewMode === 'timeline' && <ClientFeedbackTimeline />}

        <ClientFeedbackFormModal show={showFormModal} onClose={() => { setShowFormModal(false); setSelectedFeedback(null); }} onSubmit={handleFormSubmit} editFeedback={selectedFeedback} projects={assignedProjects} />
        <ClientFeedbackDetailsModal show={showDetailsModal} onClose={() => { setShowDetailsModal(false); setSelectedFeedback(null); }} feedback={selectedFeedback} onAddResponse={handleResponseSubmit} />

        {showDeleteModal && selectedFeedback && (
          <div className="modal-overlay"><div className="modal-dialog modal-sm"><div className="modal-content">
            <div className="modal-header"><h5 className="modal-title">Delete Feedback</h5><button className="modal-close-btn" onClick={() => setShowDeleteModal(false)}><FiX /></button></div>
            <div className="modal-body"><p>Are you sure you want to delete this feedback?</p><div className="delete-info"><strong>{selectedFeedback.title}</strong></div></div>
            <div className="modal-footer"><button className="btn btn-light" onClick={() => setShowDeleteModal(false)}>Cancel</button><button className="btn btn-danger" onClick={confirmDelete}>Delete</button></div>
          </div></div></div>
        )}
      </div>
    </ClientLayout>
  );
};

export default ClientFeedback;