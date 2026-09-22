// src/pages/manager/ManagerDashboard.jsx
import React, { useEffect, useMemo, useState } from 'react';
import api, { apiData } from '../../services/api';
import ManagerLayout from '../../layouts/ManagerLayout';
import ManagerStatsCard from '../../components/managerDashboard/ManagerStatsCard';
import ManagerProjectCard from '../../components/managerDashboard/ManagerProjectCard';
import ManagerTaskOverview from '../../components/managerDashboard/ManagerTaskOverview';
import TeamWorkloadOverview from '../../components/managerDashboard/TeamWorkloadOverview';
import ManagerDeadlineList from '../../components/managerDashboard/ManagerDeadlineList';
import ManagerMeetingList from '../../components/managerDashboard/ManagerMeetingList';
import ManagerActivityTimeline from '../../components/managerDashboard/ManagerActivityTimeline';
import ManagerClientFeedback from '../../components/managerDashboard/ManagerClientFeedback';
import ProjectStatusBadge from '../../components/managerDashboard/ProjectStatusBadge';
import TaskPriorityBadge from '../../components/managerDashboard/TaskPriorityBadge';
import { FiPlus, FiVideo, FiX } from 'react-icons/fi';
import { FiFolder, FiCheckSquare, FiCheckCircle, FiUsers, FiClock, FiMessageSquare } from 'react-icons/fi';
import '../../styles/managerDashboard.css';

const ManagerDashboard = () => {
  const [projectsData, setProjectsData] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([api.get('/projects'), api.get('/tasks'), api.get('/users'), api.get('/feedback'), api.get('/meetings')])
      .then(([projectResponse, taskResponse, usersResponse, feedbackResponse, meetingResponse]) => {
        const rawProjects = apiData(projectResponse) || [];
        const rawTasks = apiData(taskResponse) || [];
        const users = apiData(usersResponse) || [];
        setProjectsData(rawProjects.map(project => ({ ...project, projectName: project.title || project.project_name || '', clientName: project.client_name || '', startDate: project.start_date || '', endDate: project.end_date || '', progress: Number(project.progress) || 0, totalTasks: rawTasks.filter(task => task.project_id === project.id).length, completedTasks: rawTasks.filter(task => task.project_id === project.id && task.status === 'Completed').length })));
        setTasks(rawTasks.map(task => ({ ...task, title: task.title || '', project: task.project_name || '', assignedTo: task.assignee_name || task.assigned_to_name || '', deadline: task.deadline || '', progress: Number(task.progress) || 0 })));
        setTeamMembers(users.filter(user => user.role === 'Team Member'));
        setFeedback(apiData(feedbackResponse) || []);
        setMeetings(apiData(meetingResponse) || []);
      }).catch(() => showAlert('Unable to load live manager dashboard data.', 'danger')).finally(() => setLoading(false));
  }, []);

  const managerStatsData = useMemo(() => [
    { id: 1, title: 'Assigned Projects', value: projectsData.length, icon: 'FiFolder', desc: 'Live projects', color: 'primary' },
    { id: 2, title: 'Active Tasks', value: tasks.filter(task => task.status === 'In Progress').length, icon: 'FiCheckSquare', desc: 'Currently active', color: 'info' },
    { id: 3, title: 'Completed Tasks', value: tasks.filter(task => task.status === 'Completed').length, icon: 'FiCheckCircle', desc: 'Completed tasks', color: 'success' },
    { id: 4, title: 'Team Members', value: teamMembers.length, icon: 'FiUsers', desc: 'Live team accounts', color: 'warning' },
    { id: 5, title: 'Upcoming Deadlines', value: tasks.filter(task => task.deadline && task.status !== 'Completed').length, icon: 'FiClock', desc: 'Pending deadlines', color: 'danger' },
    { id: 6, title: 'Pending Client Feedback', value: feedback.filter(item => item.status === 'Pending').length, icon: 'FiMessageSquare', desc: 'Needs response', color: 'purple' },
  ], [projectsData, tasks, teamMembers, feedback]);
  const taskOverview = useMemo(() => ({ pending: tasks.filter(t => t.status === 'Pending').length, inProgress: tasks.filter(t => t.status === 'In Progress').length, underReview: tasks.filter(t => t.status === 'Under Review').length, completed: tasks.filter(t => t.status === 'Completed').length, reopened: tasks.filter(t => t.status === 'Reopened').length, blocked: tasks.filter(t => t.status === 'Blocked').length }), [tasks]);
  const deadlines = useMemo(() => tasks.filter(t => t.deadline && t.status !== 'Completed').slice(0, 6).map(t => ({ ...t, project: t.project, assignedTo: t.assignedTo, dueDate: String(t.deadline).slice(0, 10), daysLeft: Math.ceil((new Date(`${String(t.deadline).slice(0,10)}T23:59:59`) - Date.now()) / 86400000), title: t.title, status: new Date(t.deadline) < new Date() ? 'Overdue' : 'Upcoming' })), [tasks]);
  const teamWorkload = useMemo(() => teamMembers.map(member => { const assigned = tasks.filter(task => Number(task.assigned_to) === Number(member.id) || task.assignee_name === member.name); const completed = assigned.filter(task => task.status === 'Completed').length; return { id: member.id, name: member.name, role: member.designation || member.role, department: member.department || '—', assignedProjects: new Set(assigned.map(task => task.project_id).filter(Boolean)).size, assignedTasks: assigned.length, completedTasks: completed, pendingTasks: assigned.length - completed, workload: assigned.length ? Math.round((assigned.length - completed) / assigned.length * 100) : 0, availability: assigned.length ? 'Active' : 'Available', avatar: member.avatar || member.name?.split(' ').map(part => part[0]).join('').slice(0, 2) }; }), [teamMembers, tasks]);
  const projectOptions = projectsData.map(project => project.projectName).filter(Boolean);
  const teamMembersList = teamMembers.map(member => member.name).filter(Boolean);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showViewTaskModal, setShowViewTaskModal] = useState(false);
  const [showViewFeedbackModal, setShowViewFeedbackModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [taskForm, setTaskForm] = useState({ title: '', description: '', project: '', assignedTo: '', startDate: '', deadline: '', priority: 'Medium', status: 'Pending', estimatedHours: '' });
  const [statusForm, setStatusForm] = useState({ status: '', progress: 0, note: '' });

  const showAlert = (m, t = 'info') => { setAlert({ message: m, type: t }); setTimeout(() => setAlert(null), 2000); };

  const handleAssignTask = (project) => { setSelectedProject(project); setTaskForm({ title: '', description: '', project: project.projectName, assignedTo: '', startDate: '', deadline: '', priority: 'Medium', status: 'Pending', estimatedHours: '' }); setShowTaskModal(true); };
  const handleCreateTask = () => { setSelectedProject(null); setTaskForm({ title: '', description: '', project: '', assignedTo: '', startDate: '', deadline: '', priority: 'Medium', status: 'Pending', estimatedHours: '' }); setShowTaskModal(true); };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (!taskForm.title.trim() || !taskForm.project || !taskForm.assignedTo || !taskForm.deadline) return showAlert('Please fill all required fields.', 'danger');
    setTasks([{ id: tasks.length + 1, ...taskForm, progress: 0 }, ...tasks]);
    setShowTaskModal(false); showAlert('Task created successfully!', 'success');
  };

  const handleUpdateStatus = (project) => { setSelectedProject(project); setStatusForm({ status: project.status, progress: project.progress, note: '' }); setShowStatusModal(true); };
  const handleStatusSubmit = (e) => {
    e.preventDefault();
    setProjectsData(projectsData.map(p => p.id === selectedProject.id ? { ...p, status: statusForm.status, progress: statusForm.progress } : p));
    setShowStatusModal(false); showAlert('Project status updated!', 'success');
  };

  const handleMarkComplete = (task) => { setTasks(tasks.map(t => t.id === task.id ? { ...t, status: 'Completed', progress: 100 } : t)); showAlert('Task marked as completed!', 'success'); };

  const handleViewTask = (task) => { setSelectedTask(task); setShowViewTaskModal(true); };
  const handleViewFeedback = (fb) => { setSelectedFeedback(fb); setShowViewFeedbackModal(true); };
  const handleResolveFeedback = (fb) => { setFeedback(feedback.map(f => f.id === fb.id ? { ...f, status: 'Resolved' } : f)); showAlert('Feedback resolved!', 'success'); };
  const handleViewProject = (project) => { setSelectedProject(project); showAlert(`Viewing ${project.projectName} - frontend demo.`, 'info'); };

  return (
    <ManagerLayout>
      <div className="mgr-dashboard">
        <div className="mgr-dash-header">
          <div><h3>Project Manager Dashboard</h3><p>Monitor assigned projects, team workload, task progress, deadlines, meetings, and client feedback.</p></div>
          <div className="d-flex gap-2">
            <button className="btn btn-primary btn-sm" onClick={handleCreateTask}><FiPlus /> Create Task</button>
            <button className="btn btn-outline-primary btn-sm" onClick={() => showAlert('Meeting feature is frontend demo.', 'info')}><FiVideo /> Schedule Meeting</button>
          </div>
        </div>
        {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`}>{alert.message}<button className="btn-close" onClick={() => setAlert(null)}></button></div>}

        <div className="mgr-stats-grid">{managerStatsData.map(s => <ManagerStatsCard key={s.id} stat={s} />)}</div>

        <h5 className="mgr-section-title mt-4">Assigned Projects</h5>
        <div className="mgr-projects-grid">{projectsData.map(p => <ManagerProjectCard key={p.id} project={p} onView={handleViewProject} onAssignTask={handleAssignTask} onUpdateStatus={handleUpdateStatus} />)}</div>

        <div className="mgr-dash-grid mt-4">
          <ManagerTaskOverview taskOverview={taskOverview} recentTasks={tasks} onMarkComplete={handleMarkComplete} onViewTask={handleViewTask} onUpdateTask={handleViewTask} />
          <TeamWorkloadOverview team={teamWorkload} />
        </div>

        <div className="mgr-dash-grid mt-4">
          <ManagerDeadlineList deadlines={deadlines} />
          <ManagerMeetingList meetings={meetings} onAlert={showAlert} />
        </div>

        <div className="mgr-dash-grid mt-4">
          <ManagerActivityTimeline activities={[]} />
          <ManagerClientFeedback feedback={feedback} onView={handleViewFeedback} onResolve={handleResolveFeedback} />
        </div>
      </div>

      {showTaskModal && (
        <div className="modal-overlay"><div className="modal-dialog modal-lg"><div className="modal-content">
          <div className="modal-header"><h5 className="modal-title">Create Task</h5><button className="modal-close-btn" onClick={() => setShowTaskModal(false)}><FiX /></button></div>
          <form onSubmit={handleTaskSubmit}><div className="modal-body"><div className="row">
            <div className="col-md-12 mb-3"><label className="form-label">Task Title *</label><input type="text" className="form-control" value={taskForm.title} onChange={(e) => setTaskForm(p => ({ ...p, title: e.target.value }))} /></div>
            <div className="col-md-12 mb-3"><label className="form-label">Description</label><textarea className="form-control" rows="2" value={taskForm.description} onChange={(e) => setTaskForm(p => ({ ...p, description: e.target.value }))}></textarea></div>
            <div className="col-md-6 mb-3"><label className="form-label">Project *</label><select className="form-select" value={taskForm.project} onChange={(e) => setTaskForm(p => ({ ...p, project: e.target.value }))}><option value="">Select</option>{projectOptions.map(p => <option key={p} value={p}>{p}</option>)}</select></div>
            <div className="col-md-6 mb-3"><label className="form-label">Assign To *</label><select className="form-select" value={taskForm.assignedTo} onChange={(e) => setTaskForm(p => ({ ...p, assignedTo: e.target.value }))}><option value="">Select</option>{teamMembersList.map(m => <option key={m} value={m}>{m}</option>)}</select></div>
            <div className="col-md-4 mb-3"><label className="form-label">Start Date</label><input type="date" className="form-control" value={taskForm.startDate} onChange={(e) => setTaskForm(p => ({ ...p, startDate: e.target.value }))} /></div>
            <div className="col-md-4 mb-3"><label className="form-label">Deadline *</label><input type="date" className="form-control" value={taskForm.deadline} onChange={(e) => setTaskForm(p => ({ ...p, deadline: e.target.value }))} /></div>
            <div className="col-md-6 mb-3"><label className="form-label">Est. Hours</label><input type="number" className="form-control" value={taskForm.estimatedHours} onChange={(e) => setTaskForm(p => ({ ...p, estimatedHours: e.target.value }))} /></div>
          </div></div>
          <div className="modal-footer"><button type="button" className="btn btn-light" onClick={() => setShowTaskModal(false)}>Cancel</button><button type="submit" className="btn btn-primary">Create Task</button></div></form>
        </div></div></div>
      )}

      {showStatusModal && selectedProject && (
        <div className="modal-overlay"><div className="modal-dialog"><div className="modal-content">
          <div className="modal-header"><h5 className="modal-title">Update Status: {selectedProject.projectName}</h5><button className="modal-close-btn" onClick={() => setShowStatusModal(false)}><FiX /></button></div>
          <form onSubmit={handleStatusSubmit}><div className="modal-body">
            <div className="mb-3"><label className="form-label">Status</label><select className="form-select" value={statusForm.status} onChange={(e) => setStatusForm(p => ({ ...p, status: e.target.value }))}><option>Not Started</option><option>In Progress</option><option>On Hold</option><option>Completed</option><option>Delayed</option></select></div>
            <div className="mb-3"><label className="form-label">Progress (%)</label><input type="number" className="form-control" min="0" max="100" value={statusForm.progress} onChange={(e) => setStatusForm(p => ({ ...p, progress: Number(e.target.value) }))} /></div>
            <div className="mb-3"><label className="form-label">Note</label><textarea className="form-control" rows="2" value={statusForm.note} onChange={(e) => setStatusForm(p => ({ ...p, note: e.target.value }))}></textarea></div>
          </div>
          <div className="modal-footer"><button type="button" className="btn btn-light" onClick={() => setShowStatusModal(false)}>Cancel</button><button type="submit" className="btn btn-primary">Save</button></div></form>
        </div></div></div>
      )}

      {showViewTaskModal && selectedTask && (
        <div className="modal-overlay"><div className="modal-dialog"><div className="modal-content">
          <div className="modal-header"><h5 className="modal-title">{selectedTask.title}</h5><button className="modal-close-btn" onClick={() => setShowViewTaskModal(false)}><FiX /></button></div>
          <div className="modal-body">
            <div className="mgr-detail-grid">
              <div><strong>Project:</strong> {selectedTask.project}</div><div><strong>Assignee:</strong> {selectedTask.assignedTo}</div>
              <div><strong>Deadline:</strong> {selectedTask.deadline}</div><div><strong>Priority:</strong> <TaskPriorityBadge priority={selectedTask.priority} /></div>
              <div><strong>Status:</strong> {selectedTask.status}</div><div><strong>Progress:</strong> {selectedTask.progress}%</div>
            </div>
          </div>
          <div className="modal-footer"><button className="btn btn-light" onClick={() => setShowViewTaskModal(false)}>Close</button></div>
        </div></div></div>
      )}

      {showViewFeedbackModal && selectedFeedback && (
        <div className="modal-overlay"><div className="modal-dialog"><div className="modal-content">
          <div className="modal-header"><h5 className="modal-title">Feedback from {selectedFeedback.clientName}</h5><button className="modal-close-btn" onClick={() => setShowViewFeedbackModal(false)}><FiX /></button></div>
          <div className="modal-body">
            <p><strong>Company:</strong> {selectedFeedback.company}</p><p><strong>Project:</strong> {selectedFeedback.project}</p>
            <p><strong>Message:</strong> {selectedFeedback.message}</p><p><strong>Date:</strong> {selectedFeedback.date}</p><p><strong>Status:</strong> {selectedFeedback.status}</p>
          </div>
          <div className="modal-footer"><button className="btn btn-light" onClick={() => setShowViewFeedbackModal(false)}>Close</button></div>
        </div></div></div>
      )}
    </ManagerLayout>
  );
};

export default ManagerDashboard;