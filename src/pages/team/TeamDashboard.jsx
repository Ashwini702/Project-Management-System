// src/pages/team/TeamDashboard.jsx
import React, { useEffect, useMemo, useState } from 'react';
import TeamLayout from '../../layouts/TeamLayout';
import TeamDashboardStatsCard from '../../components/teamDashboard/TeamDashboardStatsCard';
import MyTaskCard from '../../components/teamDashboard/MyTaskCard';
import MyProjectCard from '../../components/teamDashboard/MyProjectCard';
import TodayWorkBox from '../../components/teamDashboard/TodayWorkBox';
import DailyWorkReportBox from '../../components/teamDashboard/DailyWorkReportBox';
import DailyReportForm from '../../components/teamReports/DailyReportForm';
import * as reportService from '../../services/reportService';
import * as taskService from '../../services/taskService';
import * as projectService from '../../services/projectService';
import { apiData } from '../../services/api';
import AttendanceBox from '../../components/teamDashboard/AttendanceBox';
import TeamDeadlineList from '../../components/teamDashboard/TeamDeadlineList';
import TeamNotificationList from '../../components/teamDashboard/TeamNotificationList';
import TaskStatusBadge from '../../components/teamDashboard/TaskStatusBadge';
import TaskPriorityBadge from '../../components/teamDashboard/TaskPriorityBadge';
import { FiEdit3, FiUserCheck, FiX } from 'react-icons/fi';

import '../../styles/teamDashboard.css';

const TeamDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [todayTasks, setTodayTasks] = useState([]);
  const [myProjects, setMyProjects] = useState([]);
  const [alert, setAlert] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [statusForm, setStatusForm] = useState({ status: '', progress: 0, note: '' });

  const showAlert = (m, t = 'info') => { setAlert({ message: m, type: t }); setTimeout(() => setAlert(null), 2000); };
  const toDashboardTask = (task) => ({ ...task, title: task.title || '', project: task.project_name || '', assignedBy: 'Project Manager', deadline: task.deadline || '', progress: Number(task.progress || 0), estimatedHours: Number(task.estimated_hours || 0), timeSpent: 0 });
  useEffect(() => {
    taskService.getTasks().then(response => { const rows = apiData(response).map(toDashboardTask); setTasks(rows); setTodayTasks(rows.filter(task => task.status !== 'Completed').slice(0, 5)); }).catch(error => showAlert(error.response?.data?.message || 'Unable to load your tasks.', 'danger'));
    projectService.getProjects().then(response => setMyProjects(apiData(response).map(project => ({ id: project.id, projectName: project.title, status: project.status, progress: Number(project.progress || 0), manager: project.manager_name || 'Project Manager', deadline: project.end_date || '-' })))).catch(error => showAlert(error.response?.data?.message || 'Unable to load your projects.', 'danger'));
  }, []);
  const teamStatsData = useMemo(() => [
    { id: 1, title: 'My Tasks', value: tasks.length, icon: 'FiCheckSquare', desc: 'Assigned to you', color: 'primary' },
    { id: 2, title: 'In Progress', value: tasks.filter(t => t.status === 'In Progress').length, icon: 'FiActivity', desc: 'Active tasks', color: 'info' },
    { id: 3, title: 'Completed', value: tasks.filter(t => t.status === 'Completed').length, icon: 'FiCheckCircle', desc: 'Finished tasks', color: 'success' },
    { id: 4, title: 'Pending', value: tasks.filter(t => t.status === 'Pending').length, icon: 'FiClock', desc: 'Not started', color: 'warning' },
    { id: 5, title: 'My Projects', value: myProjects.length, icon: 'FiFolder', desc: 'Assigned projects', color: 'purple' },
    { id: 6, title: 'Overdue', value: tasks.filter(t => t.deadline && new Date(t.deadline) < new Date() && t.status !== 'Completed').length, icon: 'FiAlertCircle', desc: 'Past deadline', color: 'danger' },
  ], [tasks, myProjects]);

  const handleMarkComplete = (task) => {
    setTasks(tasks.map(t => t.id === task.id ? { ...t, status: 'Completed', progress: 100 } : t));
    setTodayTasks(todayTasks.map(t => t.id === task.id ? { ...t, status: 'Completed' } : t));
    showAlert('Task marked as completed!', 'success');
  };

  const handleTodayComplete = (id) => {
    setTodayTasks(todayTasks.map(t => t.id === id ? { ...t, status: 'Completed' } : t));
    showAlert('Work marked as completed!', 'success');
  };

  const handleViewTask = (task) => { setSelectedTask(task); setShowViewModal(true); };
  const handleUpdateStatus = (task) => { setSelectedTask(task); setStatusForm({ status: task.status, progress: task.progress, note: '' }); setShowStatusModal(true); };

  const saveDailyReport = async (form, status) => {
    const totalHours = Number(form.totalWorkHours || 0);
    const productiveHours = Number(form.productiveHours || 0);
    const score = totalHours ? Math.round((productiveHours / totalHours) * 100) : 0;
    const payload = {
      report_date: form.reportDate, report_title: form.reportTitle,
      project_name: form.projectName, task_name: form.taskName, work_type: form.workType,
      today_tasks: form.workSummary, work_summary: form.workSummary,
      completed_work: form.completedWork, pending_work: form.pendingWork,
      blockers: form.blockers, tomorrow_plan: form.tomorrowPlan,
      start_time: form.startTime || null, end_time: form.endTime || null,
      break_minutes: Number(form.breakTime || 0), work_hours: totalHours,
      productive_hours: productiveHours, overtime_hours: Number(form.overtimeHours || 0),
      task_progress: Number(form.taskProgress || 0), task_status: form.taskStatus,
      productivity_score: score,
      productivity_level: score >= 90 ? 'Excellent' : score >= 70 ? 'Good' : score >= 50 ? 'Average' : 'Low',
      status,
      submitted_at: status === 'Draft' ? null : new Date().toISOString().slice(0, 19).replace('T', ' '),
      attachments: JSON.stringify([])
    };
    try {
      await reportService.createDailyReport(payload);
      setShowReportModal(false);
      showAlert(status === 'Draft' ? 'Report saved as draft!' : 'Daily work report submitted!', 'success');
    } catch (error) {
      showAlert(error.response?.data?.message || 'Unable to save report.', 'danger');
    }
  };

  const handleReportSubmit = (form) => saveDailyReport(form, 'Submitted');
  const handleReportDraft = (form) => saveDailyReport(form, 'Draft');
  const handleStatusSubmit = (e) => {
    e.preventDefault();
    setTasks(tasks.map(t => t.id === selectedTask.id ? { ...t, status: statusForm.status, progress: statusForm.progress } : t));
    setShowStatusModal(false); showAlert('Task status updated!', 'success');
  };

  const handleAttendance = () => document.getElementById('attendance-section')?.scrollIntoView({ behavior: 'smooth' });
  const handleReport = () => setShowReportModal(true);

  return (
    <TeamLayout>
      <div className="team-dashboard">
        <div className="tm-dash-header">
          <div><h3>Team Member Dashboard</h3><p>View your assigned tasks, projects, deadlines, attendance, daily reports, and work progress.</p></div>
          <div className="d-flex gap-2">
            <button className="btn btn-primary btn-sm" onClick={handleReport}><FiEdit3 /> Submit Daily Report</button>
            <button className="btn btn-outline-success btn-sm" onClick={handleAttendance}><FiUserCheck /> Mark Attendance</button>
          </div>
        </div>
        {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`}>{alert.message}<button className="btn-close" onClick={() => setAlert(null)}></button></div>}

        <div className="tm-stats-grid">{teamStatsData.map(s => <TeamDashboardStatsCard key={s.id} stat={s} />)}</div>

        <div className="tm-dash-grid mt-4">
          <div>
            <h5 className="tm-section-title">My Tasks</h5>
            <div className="tm-tasks-grid">{tasks.map(t => <MyTaskCard key={t.id} task={t} onView={handleViewTask} onUpdateStatus={handleUpdateStatus} onMarkComplete={handleMarkComplete} />)}</div>
          </div>
          <div>
            <div id="report-section"><DailyWorkReportBox onAlert={showAlert} /></div>
          </div>
        </div>

        <div className="tm-dash-grid mt-4">
          <TodayWorkBox tasks={todayTasks} onComplete={handleTodayComplete} onAlert={showAlert} />
          <TeamDeadlineList />
        </div>

        <div className="tm-dash-grid mt-4">
          <div id="attendance-section"><AttendanceBox onAlert={showAlert} /></div>
          <TeamNotificationList onAlert={showAlert} />
        </div>

        <h5 className="tm-section-title mt-4">My Projects</h5>
        <div className="tm-projects-grid mt-3">{myProjects.map(p => <MyProjectCard key={p.id} project={p} onView={() => showAlert('View Project is frontend demo.', 'info')} />)}</div>
      </div>

      {showReportModal && (
        <div className="modal-overlay dashboard-form-overlay">
          <div className="modal-dialog dashboard-form-dialog">
            <div className="modal-content dashboard-form-modal">
              <div className="modal-header dashboard-form-header">
                <div><h5 className="modal-title">Submit Daily Work Report</h5><p className="mb-0 mt-2 text-muted">Add today's work details, progress, hours, and blockers.</p></div>
                <button type="button" className="modal-close-btn" onClick={() => setShowReportModal(false)} aria-label="Close"><FiX /></button>
              </div>
              <DailyReportForm onSubmit={handleReportSubmit} onDraft={handleReportDraft} onCancel={() => setShowReportModal(false)} />
            </div>
          </div>
        </div>
      )}

      {showViewModal && selectedTask && (
        <div className="modal-overlay"><div className="modal-dialog"><div className="modal-content">
          <div className="modal-header"><h5 className="modal-title">{selectedTask.title}</h5><button className="modal-close-btn" onClick={() => setShowViewModal(false)}><FiX /></button></div>
          <div className="modal-body">
            <p>{selectedTask.description}</p>
            <div className="tm-detail-grid">
              <div><strong>Project:</strong> {selectedTask.project}</div><div><strong>Assigned By:</strong> {selectedTask.assignedBy}</div>
              <div><strong>Deadline:</strong> {selectedTask.deadline}</div><div><strong>Priority:</strong> <TaskPriorityBadge priority={selectedTask.priority} /></div>
              <div><strong>Status:</strong> <TaskStatusBadge status={selectedTask.status} /></div><div><strong>Progress:</strong> {selectedTask.progress}%</div>
              <div><strong>Time Spent:</strong> {selectedTask.timeSpent}h / {selectedTask.estimatedHours}h</div>
            </div>
          </div>
          <div className="modal-footer"><button className="btn btn-light" onClick={() => setShowViewModal(false)}>Close</button></div>
        </div></div></div>
      )}

      {showStatusModal && selectedTask && (
        <div className="modal-overlay"><div className="modal-dialog"><div className="modal-content">
          <div className="modal-header"><h5 className="modal-title">Update Status: {selectedTask.title}</h5><button className="modal-close-btn" onClick={() => setShowStatusModal(false)}><FiX /></button></div>
          <form onSubmit={handleStatusSubmit}><div className="modal-body">
            <div className="mb-3"><label className="form-label">Status</label><select className="form-select" value={statusForm.status} onChange={(e) => setStatusForm(p => ({ ...p, status: e.target.value }))}><option>Pending</option><option>In Progress</option><option>Under Review</option><option>Completed</option><option>Blocked</option><option>Reopened</option></select></div>
            <div className="mb-3"><label className="form-label">Progress (%)</label><input type="number" className="form-control" min="0" max="100" value={statusForm.progress} onChange={(e) => setStatusForm(p => ({ ...p, progress: Number(e.target.value) }))} /></div>
            <div className="mb-3"><label className="form-label">Note</label><textarea className="form-control" rows="2" value={statusForm.note} onChange={(e) => setStatusForm(p => ({ ...p, note: e.target.value }))}></textarea></div>
          </div>
          <div className="modal-footer"><button type="button" className="btn btn-light" onClick={() => setShowStatusModal(false)}>Cancel</button><button type="submit" className="btn btn-primary">Save</button></div></form>
        </div></div></div>
      )}
    </TeamLayout>
  );
};

export default TeamDashboard;


