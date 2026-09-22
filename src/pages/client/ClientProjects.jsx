// src/pages/client/ClientProjects.jsx
import React, { useEffect, useState, useMemo } from 'react';
import ClientLayout from '../../layouts/ClientLayout';
import ClientProjectStatsCard from '../../components/clientProjects/ClientProjectStatsCard';
import ClientProjectCard from '../../components/clientProjects/ClientProjectCard';
import ClientProjectTable from '../../components/clientProjects/ClientProjectTable';
import ClientProjectDetailsModal from '../../components/clientProjects/ClientProjectDetailsModal';
import ClientProjectProgressBox from '../../components/clientProjects/ClientProjectProgressBox';
import ClientProjectTimeline from '../../components/clientProjects/ClientProjectTimeline';
import { FiSearch, FiRotateCcw, FiGrid, FiList, FiBarChart2, FiClock, FiMessageSquare, FiFileText, FiDownload, FiEye, FiX, FiSend } from 'react-icons/fi';
import { categories } from '../../data/clientProjectsData';
import * as projectService from '../../services/projectService';
import * as feedbackService from '../../services/feedbackService';
import * as documentService from '../../services/documentService';
import { apiData } from '../../services/api';
import '../../styles/clientProjects.css';

const ClientProjects = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [priorityFilter, setPriorityFilter] = useState('All Priority');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [deadlineFilter, setDeadlineFilter] = useState('All Deadlines');
  const [viewMode, setViewMode] = useState('card');
  const [alert, setAlert] = useState(null);

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showFilesModal, setShowFilesModal] = useState(false);
  const [projectFiles, setProjectFiles] = useState([]);
  const [filesLoading, setFilesLoading] = useState(false);
  const [fileBusyId, setFileBusyId] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [feedbackForm, setFeedbackForm] = useState({ title: '', message: '', rating: 5 });
  const [messageForm, setMessageForm] = useState({ subject: '', message: '' });

  const showAlert = (m, t = 'info') => { setAlert({ message: m, type: t }); setTimeout(() => setAlert(null), 2000); };
  const toClientProject = (project) => ({
    ...project,
    projectName: project.title || '',
    managerName: project.manager_name || 'Project Manager',
    managerEmail: '', managerPhone: '',
    startDate: project.start_date || '-', endDate: project.end_date || '-', deadline: project.end_date || '-',
    progress: Number(project.progress || 0),
    currentPhase: project.status === 'Completed' ? 'Completed' : project.status === 'Not Started' ? 'Planning Phase' : 'Development Phase',
    completedTasks: Number(project.completed_tasks_count || 0),
    pendingTasks: Math.max(Number(project.total_tasks_count || project.total_tasks || 0) - Number(project.completed_tasks_count || 0), 0),
    totalTasks: Number(project.total_tasks_count || project.total_tasks || 0),
    sharedFiles: Number(project.shared_files_count || 0),
    recentUpdate: project.description || 'No recent update.',
    lastUpdated: project.updated_at || project.created_at || '',
  });

  useEffect(() => {
    projectService.getProjects()
      .then(response => setProjects(apiData(response).map(toClientProject)))
      .catch(error => showAlert(error.response?.data?.message || 'Unable to load your projects.', 'danger'));
  }, []);

  const clientProjectStatsData = useMemo(() => [
    { id: 1, title: 'Total Projects', value: projects.length, icon: 'FiFolder', desc: 'Your assigned projects', color: 'primary' },
    { id: 2, title: 'Active Projects', value: projects.filter(p => p.status === 'In Progress').length, icon: 'FiTrendingUp', desc: 'Currently in progress', color: 'info' },
    { id: 3, title: 'Completed Projects', value: projects.filter(p => p.status === 'Completed').length, icon: 'FiCheckCircle', desc: 'Successfully delivered', color: 'success' },
    { id: 4, title: 'Pending Projects', value: projects.filter(p => p.status === 'Not Started' || p.status === 'On Hold').length, icon: 'FiClock', desc: 'Pending or on hold', color: 'warning' },
    { id: 5, title: 'Upcoming Deadlines', value: projects.filter(p => p.endDate && new Date(p.endDate) >= new Date()).length, icon: 'FiAlertCircle', desc: 'Upcoming delivery dates', color: 'danger' },
    { id: 6, title: 'Shared Files', value: projects.reduce((sum, p) => sum + p.sharedFiles, 0), icon: 'FiFileText', desc: 'Project documents', color: 'purple' },
  ], [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesSearch = !searchTerm || p.projectName.toLowerCase().includes(searchTerm.toLowerCase()) || p.category.toLowerCase().includes(searchTerm.toLowerCase()) || p.managerName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All Status' || p.status === statusFilter;
      const matchesPriority = priorityFilter === 'All Priority' || p.priority === priorityFilter;
      const matchesCategory = categoryFilter === 'All Categories' || p.category === categoryFilter;
      return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
    });
  }, [projects, searchTerm, statusFilter, priorityFilter, categoryFilter]);

  const resetFilters = () => { setSearchTerm(''); setStatusFilter('All Status'); setPriorityFilter('All Priority'); setCategoryFilter('All Categories'); setDeadlineFilter('All Deadlines'); };

  const handleView = (p) => { setSelectedProject(p); setShowDetailsModal(true); };
  const handleFiles = async (project) => {
    const targetProject = project?.id ? project : projects[0];
    if (!targetProject) return showAlert('No project is available to view files.', 'warning');
    setSelectedProject(targetProject);
    setShowFilesModal(true);
    setFilesLoading(true);
    try {
      const response = await documentService.getDocuments();
      setProjectFiles(apiData(response).filter((file) => Number(file.project_id) === Number(targetProject.id)));
    } catch (error) {
      setProjectFiles([]);
      showAlert(error.response?.data?.message || 'Unable to load project files.', 'danger');
    } finally {
      setFilesLoading(false);
    }
  };

  const openProjectFile = async (file, download) => {
    setFileBusyId(file.id);
    const previewWindow = download ? null : window.open('', '_blank');
    try {
      const response = await documentService.getDocumentFile(file.id, download);
      const url = URL.createObjectURL(response.data);
      if (download) {
        const link = document.createElement('a');
        link.href = url; link.download = file.file_name || 'document';
        document.body.appendChild(link); link.click(); link.remove();
      } else if (previewWindow) previewWindow.location.href = url;
      else window.open(url, '_blank');
      setTimeout(() => URL.revokeObjectURL(url), 60000);
    } catch (error) {
      previewWindow?.close();
      showAlert(error.response?.data?.message || 'Unable to access this file.', 'danger');
    } finally {
      setFileBusyId(null);
    }
  };
  const handleFeedback = (p) => { setSelectedProject(p); setFeedbackForm({ title: '', message: '', rating: 5 }); setShowFeedbackModal(true); };
  const handleMessage = (p) => { setSelectedProject(p); setMessageForm({ subject: '', message: '' }); setShowMessageModal(true); };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!feedbackForm.title.trim() || !feedbackForm.message.trim()) return showAlert('All fields are required.', 'danger');
    try {
      const response = await feedbackService.createFeedback({
        title: feedbackForm.title.trim(), message: feedbackForm.message.trim(), rating: Number(feedbackForm.rating),
        priority: 'Medium', category: 'General Feedback', project_name: selectedProject.projectName
      });
      setShowFeedbackModal(false);
      showAlert(`Feedback #${apiData(response).id} saved and sent to Admin.`, 'success');
    } catch (error) {
      showAlert(error.response?.data?.message || 'Unable to submit feedback.', 'danger');
    }
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (!messageForm.subject.trim() || !messageForm.message.trim()) return showAlert('All fields are required.', 'danger');
    setShowMessageModal(false); showAlert('Message sent successfully!', 'success');
  };

  return (
    <ClientLayout>
      <div className="clp-dashboard">
        <div className="clp-dash-header">
          <div><h3>My Projects</h3><p>View your assigned projects, track progress, check deadlines, view updates, and monitor delivery status.</p></div>
          <div className="d-flex gap-2">
            <button className="btn btn-primary btn-sm" onClick={() => handleFeedback(projects[0])} disabled={projects.length === 0}><FiMessageSquare /> Give Feedback</button>
            <button className="btn btn-outline-primary btn-sm" onClick={() => handleFiles(projects[0])} disabled={projects.length === 0}><FiFileText /> View Files</button>
          </div>
        </div>
        {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`}>{alert.message}<button className="btn-close" onClick={() => setAlert(null)}></button></div>}

        <div className="clp-stats-grid">{clientProjectStatsData.map(s => <ClientProjectStatsCard key={s.id} stat={s} />)}</div>

        <div className="filter-section"><div className="filter-row">
          <div className="search-box"><FiSearch className="search-icon" /><input type="text" className="form-control search-input" placeholder="Search projects..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
          <div className="filter-selects">
            <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}><option value="All Status">All Status</option><option>Not Started</option><option>In Progress</option><option>On Hold</option><option>Completed</option><option>Delayed</option></select>
            <select className="form-select" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}><option value="All Priority">All Priority</option><option>Low</option><option>Medium</option><option>High</option><option>Urgent</option></select>
            <select className="form-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}><option value="All Categories">All Categories</option>{categories.map(c => <option key={c} value={c}>{c}</option>)}</select>
          </div>
          <button className="btn btn-light reset-btn" onClick={resetFilters}><FiRotateCcw className="me-2" /> Reset</button>
          <div className="view-toggle">
            <button className={`toggle-btn ${viewMode === 'card' ? 'active' : ''}`} onClick={() => setViewMode('card')}><FiGrid /></button>
            <button className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`} onClick={() => setViewMode('table')}><FiList /></button>
            <button className={`toggle-btn ${viewMode === 'progress' ? 'active' : ''}`} onClick={() => setViewMode('progress')}><FiBarChart2 /></button>
            <button className={`toggle-btn ${viewMode === 'timeline' ? 'active' : ''}`} onClick={() => setViewMode('timeline')}><FiClock /></button>
          </div>
        </div></div>

        {viewMode === 'card' && <div className="clp-cards-grid">{filteredProjects.length === 0 ? <p className="text-center text-muted py-5">No projects found</p> : filteredProjects.map(p => <ClientProjectCard key={p.id} project={p} onView={handleView} onFiles={handleFiles} onFeedback={handleFeedback} onMessage={handleMessage} />)}</div>}
        {viewMode === 'table' && <div className="clp-table-card"><ClientProjectTable projects={filteredProjects} onView={handleView} onFiles={handleFiles} onFeedback={handleFeedback} onMessage={handleMessage} /></div>}
        {viewMode === 'progress' && (
          <div className="clp-progress-grid">
            {filteredProjects.filter(p => p.status === 'In Progress').map(p => <ClientProjectProgressBox key={p.id} projectName={p.projectName} />)}
            {filteredProjects.filter(p => p.status === 'In Progress').length === 0 && <p className="text-muted text-center py-5">No active projects with progress data.</p>}
          </div>
        )}
        {viewMode === 'timeline' && (
          <div>
            {filteredProjects.filter(p => p.status === 'In Progress').map(p => <ClientProjectTimeline key={p.id} projectId={p.id} />)}
            {filteredProjects.filter(p => p.status === 'In Progress').length === 0 && <p className="text-muted text-center py-5">No active projects with timeline data.</p>}
          </div>
        )}

        <ClientProjectDetailsModal show={showDetailsModal} onClose={() => setShowDetailsModal(false)} project={selectedProject} />

        {showFilesModal && selectedProject && (
          <div className="modal-overlay client-project-files-overlay"><div className="modal-dialog client-project-files-modal"><div className="modal-content">
            <div className="modal-header"><h5 className="modal-title">Project Files - {selectedProject.projectName}</h5><button type="button" className="modal-close-btn" onClick={() => setShowFilesModal(false)}><FiX /></button></div>
            <div className="modal-body">
              {filesLoading ? <p className="text-muted">Loading files…</p> : projectFiles.length === 0 ? <p className="text-muted">No files have been shared for this project yet.</p> : projectFiles.map((file) => (
                <div key={file.id} className="d-flex align-items-center justify-content-between gap-3 border rounded p-3 mb-2 bg-light">
                  <div><strong className="d-block">{file.file_name}</strong><small className="text-muted">{file.file_type || 'Document'} • {String(file.created_at || '').slice(0, 10)}</small></div>
                  <div className="d-flex gap-2"><button type="button" className="btn btn-outline-primary btn-sm" disabled={fileBusyId === file.id} onClick={() => openProjectFile(file, false)}><FiEye /> View</button><button type="button" className="btn btn-primary btn-sm" disabled={fileBusyId === file.id} onClick={() => openProjectFile(file, true)}><FiDownload /> Download</button></div>
                </div>
              ))}
            </div>
            <div className="modal-footer"><button type="button" className="btn btn-light" onClick={() => setShowFilesModal(false)}>Close</button></div>
          </div></div></div>
        )}

        {showFeedbackModal && selectedProject && (
          <div className="modal-overlay"><div className="modal-dialog"><div className="modal-content">
            <div className="modal-header"><h5 className="modal-title">Give Feedback - {selectedProject.projectName}</h5><button className="modal-close-btn" onClick={() => setShowFeedbackModal(false)}><FiX /></button></div>
            <form onSubmit={handleFeedbackSubmit}><div className="modal-body">
              <div className="mb-3"><label className="form-label">Feedback Title *</label><input type="text" className="form-control" value={feedbackForm.title} onChange={(e) => setFeedbackForm(p => ({ ...p, title: e.target.value }))} /></div>
              <div className="mb-3"><label className="form-label">Message *</label><textarea className="form-control" rows="3" value={feedbackForm.message} onChange={(e) => setFeedbackForm(p => ({ ...p, message: e.target.value }))}></textarea></div>
              <div className="mb-3"><label className="form-label">Rating</label><select className="form-select" value={feedbackForm.rating} onChange={(e) => setFeedbackForm(p => ({ ...p, rating: Number(e.target.value) }))}><option value="5">5 - Excellent</option><option value="4">4 - Good</option><option value="3">3 - Average</option><option value="2">2 - Poor</option><option value="1">1 - Bad</option></select></div>
            </div>
            <div className="modal-footer"><button type="button" className="btn btn-light" onClick={() => setShowFeedbackModal(false)}>Cancel</button><button type="submit" className="btn btn-primary">Submit</button></div></form>
          </div></div></div>
        )}

        {showMessageModal && selectedProject && (
          <div className="modal-overlay"><div className="modal-dialog"><div className="modal-content">
            <div className="modal-header"><h5 className="modal-title">Send Message - {selectedProject.projectName}</h5><button className="modal-close-btn" onClick={() => setShowMessageModal(false)}><FiX /></button></div>
            <form onSubmit={handleMessageSubmit}><div className="modal-body">
              <div className="mb-3"><label className="form-label">Subject *</label><input type="text" className="form-control" value={messageForm.subject} onChange={(e) => setMessageForm(p => ({ ...p, subject: e.target.value }))} /></div>
              <div className="mb-3"><label className="form-label">Message *</label><textarea className="form-control" rows="3" value={messageForm.message} onChange={(e) => setMessageForm(p => ({ ...p, message: e.target.value }))}></textarea></div>
            </div>
            <div className="modal-footer"><button type="button" className="btn btn-light" onClick={() => setShowMessageModal(false)}>Cancel</button><button type="submit" className="btn btn-primary"><FiSend /> Send</button></div></form>
          </div></div></div>
        )}
      </div>
    </ClientLayout>
  );
};

export default ClientProjects;
