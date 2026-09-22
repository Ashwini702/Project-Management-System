import React, { useEffect, useMemo, useState } from 'react';
import { FiCheckCircle, FiClock, FiFileText, FiFolder, FiUsers } from 'react-icons/fi';
import AdminLayout from '../../layouts/AdminLayout';
import StatCard from '../../components/common/StatCard';
import ProjectStatusCard from '../../components/dashboard/ProjectStatusCard';
import TaskProgress from '../../components/dashboard/TaskProgress';
import RecentActivities from '../../components/dashboard/RecentActivities';
import UpcomingDeadlines from '../../components/dashboard/UpcomingDeadlines';
import api, { apiData } from '../../services/api';

const colorByStatus = {
  Pending: 'warning',
  'In Progress': 'primary',
  'Under Review': 'info',
  Completed: 'success',
  Overdue: 'danger',
};

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    Promise.all([
      api.get('/projects'),
      api.get('/tasks'),
      api.get('/users'),
      api.get('/daily-reports'),
    ]).then(([projectResponse, taskResponse, userResponse, reportResponse]) => {
      if (!active) return;
      setProjects(Array.isArray(apiData(projectResponse)) ? apiData(projectResponse) : []);
      setTasks(Array.isArray(apiData(taskResponse)) ? apiData(taskResponse) : []);
      setUsers(Array.isArray(apiData(userResponse)) ? apiData(userResponse) : []);
      setReports(Array.isArray(apiData(reportResponse)) ? apiData(reportResponse) : []);
    }).catch(() => active && setError('Some dashboard data could not be loaded. Please refresh.'));
    return () => { active = false; };
  }, []);

  const statsData = useMemo(() => {
    const overdue = tasks.filter(task => task.deadline && new Date(task.deadline) < new Date() && task.status !== 'Completed').length;
    return [
      { id: 'projects', title: 'Total Projects', value: projects.length, icon: FiFolder, growth: 'Live project count', color: 'primary' },
      { id: 'tasks', title: 'Total Tasks', value: tasks.length, icon: FiCheckCircle, growth: 'Live task count', color: 'info' },
      { id: 'team', title: 'Team Members', value: users.filter(user => user.role === 'Team Member').length, icon: FiUsers, growth: 'Active team accounts', color: 'success' },
      { id: 'overdue', title: 'Overdue Tasks', value: overdue, icon: FiClock, growth: overdue ? 'Needs attention' : 'No overdue tasks', color: overdue ? 'danger' : 'success' },
    ];
  }, [projects, tasks, users]);

  const projectStatusData = useMemo(() => {
    const statuses = ['In Progress', 'Completed', 'Pending', 'On Hold', 'Delayed'];
    return statuses.map((status, index) => {
      const count = projects.filter(project => (project.status || 'Pending') === status).length;
      return { id: index + 1, status, count, percentage: projects.length ? Math.round((count / projects.length) * 100) : 0 };
    }).filter(item => item.count > 0);
  }, [projects]);

  const taskData = useMemo(() => {
    const statuses = ['In Progress', 'Pending', 'Under Review', 'Completed'];
    return {
      total: tasks.length,
      categories: statuses.map((label, index) => {
        const count = tasks.filter(task => (task.status || 'Pending') === label).length;
        return { id: index + 1, label, count, percentage: tasks.length ? Math.round((count / tasks.length) * 100) : 0, color: colorByStatus[label] };
      }).filter(item => item.count > 0),
    };
  }, [tasks]);

  const deadlines = useMemo(() => tasks
    .filter(task => task.deadline && task.status !== 'Completed')
    .map(task => {
      const daysLeft = Math.ceil((new Date(`${String(task.deadline).slice(0, 10)}T23:59:59`) - Date.now()) / 86400000);
      return { id: task.id, project: task.project_name || task.title || 'Untitled task', dueDate: String(task.deadline).slice(0, 10), daysLeft, priority: task.priority || 'Medium', status: daysLeft < 0 ? 'Overdue' : (task.status || 'Pending') };
    })
    .sort((first, second) => first.daysLeft - second.daysLeft)
    .slice(0, 5), [tasks]);

  const activities = useMemo(() => [
    ...reports.slice(0, 3).map(report => ({ id: `report-${report.id}`, title: 'Daily report submitted', description: `${report.report_title || report.task_name || 'Work update'}${report.project_name ? ` • ${report.project_name}` : ''}`, time: String(report.submitted_at || report.report_date || '').slice(0, 10) || 'Recently', icon: FiFileText, color: 'primary' })),
    ...tasks.slice(0, 3).map(task => ({ id: `task-${task.id}`, title: 'Task progress updated', description: `${task.title || 'Task'} is ${Number(task.progress) || 0}% complete`, time: String(task.updated_at || task.created_at || '').slice(0, 10) || 'Recently', icon: FiCheckCircle, color: colorByStatus[task.status] || 'info' })),
  ].slice(0, 5), [reports, tasks]);

  const getPriorityBadge = priority => ({ Urgent: 'badge-urgent', High: 'badge-high', Medium: 'badge-medium', Low: 'badge-low' }[priority] || 'badge-medium');
  const getStatusBadge = status => ({ 'Not Started': 'badge-pending', 'In Progress': 'badge-in-progress', 'On Hold': 'badge-on-hold', Completed: 'badge-completed', Pending: 'badge-pending', Delayed: 'badge-on-hold' }[status] || 'badge-pending');

  return (
    <AdminLayout>
      <div className="page-header"><div className="header-content"><div><h1 className="header-title">Admin Dashboard</h1><p className="header-subtitle">Live overview of projects, tasks, team activity, deadlines, and system performance.</p></div></div></div>
      {error && <div className="alert alert-warning">{error}</div>}
      <div className="stats-grid">{statsData.map(stat => <StatCard key={stat.id} stat={stat} />)}</div>
      <div className="dashboard-grid-2col"><ProjectStatusCard projectStatus={projectStatusData} total={projects.length} /><TaskProgress taskData={taskData} /></div>
      <div className="dashboard-grid-2col"><RecentActivities activities={activities} /><UpcomingDeadlines deadlines={deadlines} /></div>
      <div className="recent-projects-card">
        <div className="card-header-custom"><h5 className="card-title-custom">Recent Projects</h5><span className="text-muted">Live data</span></div>
        <div className="table-responsive"><table className="table projects-table"><thead><tr><th>Project</th><th>Client</th><th>Manager</th><th>Start Date</th><th>End Date</th><th>Priority</th><th>Status</th><th>Progress</th></tr></thead><tbody>
          {projects.slice(0, 8).map(project => <tr key={project.id}><td><div className="project-name-cell"><span className="project-avatar">{(project.title || 'P').split(' ').map(word => word.charAt(0)).join('').slice(0, 2)}</span><span className="project-name">{project.title || 'Untitled project'}</span></div></td><td>{project.client_name || '—'}</td><td>{project.manager_name || '—'}</td><td>{String(project.start_date || '—').slice(0, 10)}</td><td>{String(project.end_date || '—').slice(0, 10)}</td><td><span className={`priority-badge ${getPriorityBadge(project.priority)}`}>{project.priority || 'Medium'}</span></td><td><span className={`status-badge ${getStatusBadge(project.status)}`}>{project.status || 'Pending'}</span></td><td><div className="table-progress-wrapper"><div className="progress"><div className="progress-bar" role="progressbar" style={{ width: `${Math.min(100, Math.max(0, Number(project.progress) || 0))}%` }} /></div><span className="progress-text">{Math.min(100, Math.max(0, Number(project.progress) || 0))}%</span></div></td></tr>)}
          {!projects.length && <tr><td colSpan="8" className="text-center text-muted py-4">No projects available.</td></tr>}
        </tbody></table></div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;