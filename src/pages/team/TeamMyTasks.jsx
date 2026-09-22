// src/pages/team/TeamMyTasks.jsx
import React, { useEffect, useState, useMemo } from 'react';
import TeamLayout from '../../layouts/TeamLayout';
import TeamTaskStatsCard from '../../components/teamTasks/TeamTaskStatsCard';
import TeamTaskCard from '../../components/teamTasks/TeamTaskCard';
import TeamTaskTable from '../../components/teamTasks/TeamTaskTable';
import TeamTaskDetailsModal from '../../components/teamTasks/TeamTaskDetailsModal';
import TeamTaskUpdateModal from '../../components/teamTasks/TeamTaskUpdateModal';
import DailyReportForm from '../../components/teamReports/DailyReportForm';
import * as reportService from '../../services/reportService';
import * as taskService from '../../services/taskService';
import { apiData } from '../../services/api';
import TeamTaskKanban from '../../components/teamTasks/TeamTaskKanban';
import TeamTaskTimeline from '../../components/teamTasks/TeamTaskTimeline';
import { FiSearch, FiRotateCcw, FiGrid, FiList, FiColumns, FiClock, FiEdit3, FiEdit2, FiX } from 'react-icons/fi';
import { taskTimeline } from '../../data/teamTasksData';
import '../../styles/teamTasks.css';

const TeamMyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [projectFilter, setProjectFilter] = useState('All Projects');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [priorityFilter, setPriorityFilter] = useState('All Priority');
  const [deadlineFilter, setDeadlineFilter] = useState('All Deadlines');
  const [viewMode, setViewMode] = useState('card');
  const [alert, setAlert] = useState(null);

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const showAlert = (m, t = 'info') => { setAlert({ message: m, type: t }); setTimeout(() => setAlert(null), 2000); };
  const toTeamTask = (task) => ({
    ...task, taskTitle: task.title || '', projectName: task.project_name || '',
    assignedBy: 'Project Manager', assignedDate: task.created_at || '', startDate: task.start_date || '',
    deadline: task.deadline || '', progress: Number(task.progress || 0),
    estimatedHours: Number(task.estimated_hours || 0), timeSpent: Number(task.time_spent || 0),
    checklistCount: 0, completedChecklist: 0, commentsCount: 0, attachmentCount: 0,
    lastUpdated: task.updated_at || task.created_at || '',
  });
  const loadTasks = () => taskService.getTasks()
    .then(response => { const data = apiData(response); setTasks((Array.isArray(data) ? data : []).map(toTeamTask)); })
    .catch(error => showAlert(error.response?.data?.message || 'Unable to load your tasks.', 'danger'));
  useEffect(() => { loadTasks(); }, []);
  const projects = useMemo(() => [...new Set(tasks.map(task => task.projectName).filter(Boolean))], [tasks]);
  const taskStatsData = useMemo(() => [
    { id: 1, title: 'Total Tasks', value: tasks.length, icon: 'FiCheckSquare', desc: 'Assigned to you', color: 'primary' },
    { id: 2, title: 'In Progress', value: tasks.filter(t => t.status === 'In Progress').length, icon: 'FiActivity', desc: 'Currently active', color: 'info' },
    { id: 3, title: 'Completed', value: tasks.filter(t => t.status === 'Completed').length, icon: 'FiCheckCircle', desc: 'Finished tasks', color: 'success' },
    { id: 4, title: 'Pending', value: tasks.filter(t => t.status === 'Pending').length, icon: 'FiClock', desc: 'Not started', color: 'warning' },
    { id: 5, title: 'Under Review', value: tasks.filter(t => t.status === 'Under Review').length, icon: 'FiEye', desc: 'Awaiting review', color: 'purple' },
    { id: 6, title: 'Overdue', value: tasks.filter(t => t.deadline && new Date(t.deadline) < new Date() && t.status !== 'Completed').length, icon: 'FiAlertCircle', desc: 'Past deadline', color: 'danger' },
  ], [tasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter(t => {
      const matchesSearch = !searchTerm || t.taskTitle.toLowerCase().includes(searchTerm.toLowerCase()) || t.projectName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesProject = projectFilter === 'All Projects' || t.projectName === projectFilter;
      const matchesStatus = statusFilter === 'All Status' || t.status === statusFilter;
      const matchesPriority = priorityFilter === 'All Priority' || t.priority === priorityFilter;
      return matchesSearch && matchesProject && matchesStatus && matchesPriority;
    });
  }, [tasks, searchTerm, projectFilter, statusFilter, priorityFilter]);

  const resetFilters = () => { setSearchTerm(''); setProjectFilter('All Projects'); setStatusFilter('All Status'); setPriorityFilter('All Priority'); setDeadlineFilter('All Deadlines'); };

  const handleView = (t) => { setSelectedTask(t); setShowDetailsModal(true); };
  const handleUpdate = (t) => { setSelectedTask(t); setShowUpdateModal(true); };
  const handleUpdateWorkStatus = () => {
    const task = filteredTasks.find(item => item.status !== 'Completed') || filteredTasks[0];
    if (!task) { showAlert('No task is available to update.', 'warning'); return; }
    handleUpdate(task);
  };
  const handleSubmitReport = () => setShowReportModal(true);
  const handleAddNote = (t) => { setSelectedTask(t); setShowDetailsModal(true); };
  const handleSubmitReview = async (t) => { try { const response = await taskService.updateTask(t.id, { status: 'Under Review', progress: Math.max(t.progress, 90) }); const updated = toTeamTask(apiData(response)); setTasks(tasks.map(tk => tk.id === t.id ? updated : tk)); showAlert('Task submitted for review!', 'success'); } catch (error) { showAlert(error.response?.data?.message || 'Unable to update task.', 'danger'); } };
  const handleMarkComplete = async (t) => { if (Number(t.progress) < 100) { showAlert('This task is currently ' + t.progress + '%. Use the edit icon to save the actual progress before marking it completed.', 'warning'); return; } try { const response = await taskService.updateTask(t.id, { status: 'Completed', progress: 100 }); const updated = toTeamTask(apiData(response)); setTasks(tasks.map(tk => tk.id === t.id ? updated : tk)); showAlert('Task marked as completed!', 'success'); } catch (error) { showAlert(error.response?.data?.message || 'Unable to update task.', 'danger'); } };

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
  const handleUpdateSubmit = async (taskId, form) => {
    const progress = Math.min(100, Math.max(0, Number(form.progress) || 0));
    const status = form.status === 'Completed' ? 'Completed' : form.status;
    const finalProgress = status === 'Completed' ? 100 : progress;

    try {
      // Saves to the shared tasks table, so Admin and Manager see this same percentage.
      const response = await taskService.updateTask(taskId, { status, progress: finalProgress });
      const updated = toTeamTask(apiData(response));
      setTasks(current => current.map(task => task.id === taskId ? {
        ...updated,
        timeSpent: Number(form.timeSpent) || task.timeSpent,
        commentsCount: task.commentsCount + 1,
        lastUpdated: new Date().toISOString().split('T')[0],
      } : task));
      setShowUpdateModal(false);
      showAlert(`Progress saved: ${finalProgress}%. Admin can now see this update.`, 'success');
    } catch (error) {
      showAlert(error.response?.data?.message || 'Unable to save task progress.', 'danger');
    }
  };

  return (
    <TeamLayout>
      <div className="tt-dashboard">
        <div className="tt-dash-header">
          <div><h3>My Tasks</h3><p>View assigned tasks, update progress, manage checklists, submit work updates, and track deadlines.</p></div>
          <div className="d-flex gap-2">
            <button className="btn btn-primary btn-sm" onClick={handleUpdateWorkStatus}><FiEdit3 /> Update Work Status</button>
            <button className="btn btn-outline-primary btn-sm" onClick={handleSubmitReport}><FiEdit2 /> Submit Report</button>
          </div>
        </div>
        {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`}>{alert.message}<button className="btn-close" onClick={() => setAlert(null)}></button></div>}

        <div className="tt-stats-grid">{taskStatsData.map(s => <TeamTaskStatsCard key={s.id} stat={s} />)}</div>

        <div className="filter-section"><div className="filter-row">
          <div className="search-box"><FiSearch className="search-icon" /><input type="text" className="form-control search-input" placeholder="Search tasks..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
          <div className="filter-selects">
            <select className="form-select" value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)}><option value="All Projects">All Projects</option>{projects.map(p => <option key={p} value={p}>{p}</option>)}</select>
            <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}><option value="All Status">All Status</option><option>Pending</option><option>In Progress</option><option>Under Review</option><option>Completed</option><option>Blocked</option><option>Overdue</option></select>
            <select className="form-select" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}><option value="All Priority">All Priority</option><option>Low</option><option>Medium</option><option>High</option><option>Urgent</option></select>
          </div>
          <button className="btn btn-light reset-btn" onClick={resetFilters}><FiRotateCcw className="me-2" /> Reset</button>
          <div className="view-toggle">
            <button className={`toggle-btn ${viewMode === 'card' ? 'active' : ''}`} onClick={() => setViewMode('card')}><FiGrid /></button>
            <button className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`} onClick={() => setViewMode('table')}><FiList /></button>
            <button className={`toggle-btn ${viewMode === 'kanban' ? 'active' : ''}`} onClick={() => setViewMode('kanban')}><FiColumns /></button>
            <button className={`toggle-btn ${viewMode === 'timeline' ? 'active' : ''}`} onClick={() => setViewMode('timeline')}><FiClock /></button>
          </div>
        </div></div>

        {viewMode === 'card' && <div className="tt-cards-grid">{filteredTasks.length === 0 ? <p className="text-center text-muted py-5">No tasks found</p> : filteredTasks.map(t => <TeamTaskCard key={t.id} task={t} onView={handleView} onUpdate={handleUpdate} onAddNote={handleAddNote} onSubmitReview={handleSubmitReview} onMarkComplete={handleMarkComplete} />)}</div>}
        {viewMode === 'table' && <div className="tt-table-card"><TeamTaskTable tasks={filteredTasks} onView={handleView} onUpdate={handleUpdate} onAddNote={handleAddNote} onSubmitReview={handleSubmitReview} onMarkComplete={handleMarkComplete} /></div>}
        {viewMode === 'kanban' && <TeamTaskKanban tasks={filteredTasks} />}
        {viewMode === 'timeline' && <TeamTaskTimeline timeline={taskTimeline} />}

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

        <TeamTaskDetailsModal show={showDetailsModal} onClose={() => setShowDetailsModal(false)} task={selectedTask} onAlert={showAlert} />
        <TeamTaskUpdateModal show={showUpdateModal} onClose={() => setShowUpdateModal(false)} task={selectedTask} onSubmit={handleUpdateSubmit} />
      </div>
    </TeamLayout>
  );
};

export default TeamMyTasks;


