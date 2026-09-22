// src/pages/admin/TaskDetails.jsx
import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import PageHeader from '../../components/common/PageHeader';
import TaskOverviewCard from '../../components/taskDetails/TaskOverviewCard';
import TaskInfoBox from '../../components/taskDetails/TaskInfoBox';
import TaskProgressSummary from '../../components/taskDetails/TaskProgressSummary';
import TaskChecklistBox from '../../components/taskDetails/TaskChecklistBox';
import TaskDiscussionBox from '../../components/taskDetails/TaskDiscussionBox';
import TaskDocumentsBox from '../../components/taskDetails/TaskDocumentsBox';
import TaskTimeTrackingBox from '../../components/taskDetails/TaskTimeTrackingBox';
import TaskActivityTimeline from '../../components/taskDetails/TaskActivityTimeline';
import TaskRelatedProjectBox from '../../components/taskDetails/TaskRelatedProjectBox';
import { FiEdit2, FiCheck, FiArrowLeft, FiTrendingUp, FiCheckSquare, FiMessageSquare, FiFileText, FiClock, FiAlertCircle, FiX } from 'react-icons/fi';
import { taskData, taskStatsData, taskActivities, relatedProject } from '../../data/taskDetailsData';
import '../../styles/taskDetails.css';

const TaskDetails = () => {
  const [task, setTask] = useState(taskData);
  const [activeTab, setActiveTab] = useState('overview');
  const [alert, setAlert] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({ ...taskData });

  const tabs = [
    { key: 'overview', label: 'Overview', icon: FiTrendingUp },
    { key: 'checklist', label: 'Checklist', icon: FiCheckSquare },
    { key: 'discussion', label: 'Discussion', icon: FiMessageSquare },
    { key: 'documents', label: 'Documents', icon: FiFileText },
    { key: 'timetracking', label: 'Time Tracking', icon: FiClock },
    { key: 'activity', label: 'Activity', icon: FiAlertCircle }
  ];

  const showAlert = (m, t = 'info') => { setAlert({ message: m, type: t }); setTimeout(() => setAlert(null), 2000); };

  const handleMarkComplete = () => { setTask(p => ({ ...p, status: 'Completed', progress: 100 })); showAlert('Task marked as completed!', 'success'); };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editForm.title.trim()) return showAlert('Task title is required.', 'danger');
    setTask({ ...task, ...editForm, lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 16) });
    setShowEditModal(false);
    showAlert('Task updated successfully!', 'success');
  };

  return (
    <AdminLayout>
      <PageHeader title="Task Details" subtitle="View task progress, checklist, assigned member, deadline, documents, discussion, and activity history." showButton={false}>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-primary btn-sm"><FiArrowLeft /> Back</button>
          <button className="btn btn-primary btn-sm" onClick={() => { setEditForm({ ...task }); setShowEditModal(true); }}><FiEdit2 /> Edit Task</button>
          {task.status !== 'Completed' && <button className="btn btn-success btn-sm" onClick={handleMarkComplete}><FiCheck /> Mark Complete</button>}
        </div>
      </PageHeader>
      {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`}>{alert.message}<button className="btn-close" onClick={() => setAlert(null)}></button></div>}

      <TaskOverviewCard task={task} />

      <div className="td-stats-grid mt-4">
        {taskStatsData.map(s => {
          const icons = { FiTrendingUp, FiCheckSquare, FiMessageSquare, FiFileText, FiClock, FiAlertCircle };
          const Icon = icons[s.icon];
          return (
            <div key={s.id} className={`td-stat-card td-stat-${s.color}`}>
              <div className="td-stat-content">
                <div className="td-stat-icon-wrapper"><Icon className="td-stat-icon" /></div>
                <div className="td-stat-info"><h3>{s.value}</h3><p>{s.title}</p><span>{s.desc}</span></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="td-tabs mt-4">
        {tabs.map(t => <button key={t.key} className={`td-tab-btn ${activeTab === t.key ? 'active' : ''}`} onClick={() => setActiveTab(t.key)}><t.icon className="me-1" /> {t.label}</button>)}
        <button className={`td-tab-btn ${activeTab === 'related' ? 'active' : ''}`} onClick={() => setActiveTab('related')}>Related Project</button>
      </div>

      <div className="td-tab-content mt-3">
        {activeTab === 'overview' && (
          <div className="row">
            <div className="col-lg-8"><TaskInfoBox task={task} /><div className="mt-3"><TaskProgressSummary /></div></div>
            <div className="col-lg-4"><div className="td-side-card"><h6>Recent Activity</h6><TaskActivityTimeline activities={taskActivities.slice(-4)} /></div></div>
          </div>
        )}
        {activeTab === 'checklist' && <TaskChecklistBox />}
        {activeTab === 'discussion' && <TaskDiscussionBox />}
        {activeTab === 'documents' && <TaskDocumentsBox onAlert={showAlert} />}
        {activeTab === 'timetracking' && <TaskTimeTrackingBox onAlert={showAlert} />}
        {activeTab === 'activity' && <TaskActivityTimeline activities={taskActivities} />}
        {activeTab === 'related' && <TaskRelatedProjectBox project={relatedProject} onAlert={showAlert} />}
      </div>

      {showEditModal && (
        <div className="modal-overlay"><div className="modal-dialog modal-lg"><div className="modal-content">
          <div className="modal-header"><h5 className="modal-title">Edit Task</h5><button className="modal-close-btn" onClick={() => setShowEditModal(false)}><FiX /></button></div>
          <form onSubmit={handleEditSubmit}><div className="modal-body"><div className="row">
            <div className="col-md-12 mb-3"><label className="form-label">Task Title *</label><input type="text" className="form-control" value={editForm.title} onChange={(e) => setEditForm(p => ({ ...p, title: e.target.value }))} /></div>
            <div className="col-md-12 mb-3"><label className="form-label">Description</label><textarea className="form-control" rows="3" value={editForm.description} onChange={(e) => setEditForm(p => ({ ...p, description: e.target.value }))}></textarea></div>
            <div className="col-md-6 mb-3"><label className="form-label">Project</label><input type="text" className="form-control" value={editForm.project} onChange={(e) => setEditForm(p => ({ ...p, project: e.target.value }))} /></div>
            <div className="col-md-6 mb-3"><label className="form-label">Assigned To</label><input type="text" className="form-control" value={editForm.assignedTo} onChange={(e) => setEditForm(p => ({ ...p, assignedTo: e.target.value }))} /></div>
            <div className="col-md-4 mb-3"><label className="form-label">Start Date</label><input type="date" className="form-control" value={editForm.startDate} onChange={(e) => setEditForm(p => ({ ...p, startDate: e.target.value }))} /></div>
            <div className="col-md-4 mb-3"><label className="form-label">Deadline</label><input type="date" className="form-control" value={editForm.deadline} onChange={(e) => setEditForm(p => ({ ...p, deadline: e.target.value }))} /></div>
            <div className="col-md-4 mb-3"><label className="form-label">Priority</label><select className="form-select" value={editForm.priority} onChange={(e) => setEditForm(p => ({ ...p, priority: e.target.value }))}><option>Low</option><option>Medium</option><option>High</option><option>Urgent</option></select></div>
            <div className="col-md-4 mb-3"><label className="form-label">Status</label><select className="form-select" value={editForm.status} onChange={(e) => setEditForm(p => ({ ...p, status: e.target.value }))}><option>Pending</option><option>In Progress</option><option>Under Review</option><option>Completed</option></select></div>
            <div className="col-md-4 mb-3"><label className="form-label">Progress (%)</label><input type="number" className="form-control" min="0" max="100" value={editForm.progress} onChange={(e) => setEditForm(p => ({ ...p, progress: Number(e.target.value) }))} /></div>
            <div className="col-md-4 mb-3"><label className="form-label">Estimated Hours</label><input type="number" className="form-control" value={editForm.estimatedHours} onChange={(e) => setEditForm(p => ({ ...p, estimatedHours: Number(e.target.value) }))} /></div>
          </div></div>
          <div className="modal-footer"><button type="button" className="btn btn-light" onClick={() => setShowEditModal(false)}>Cancel</button><button type="submit" className="btn btn-primary">Save Changes</button></div></form>
        </div></div></div>
      )}
    </AdminLayout>
  );
};

export default TaskDetails;