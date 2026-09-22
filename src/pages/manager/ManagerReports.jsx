// src/pages/manager/ManagerReports.jsx
import React, { useState, useMemo, useEffect } from 'react';
import api, { apiData } from '../../services/api';
import DailyReportsTable from '../../components/reports/DailyReportsTable';
import ManagerLayout from '../../layouts/ManagerLayout';
import ManagerReportStatsCard from '../../components/managerReports/ManagerReportStatsCard';
import ManagerReportFilter from '../../components/managerReports/ManagerReportFilter';
import ManagerReportChartBox from '../../components/managerReports/ManagerReportChartBox';
import ManagerExportButtons from '../../components/managerReports/ManagerExportButtons';
import ManagerProjectReport from '../../components/managerReports/ManagerProjectReport';
import ManagerTaskReport from '../../components/managerReports/ManagerTaskReport';
import ManagerTeamPerformanceReport from '../../components/managerReports/ManagerTeamPerformanceReport';
import ManagerDeadlineReport from '../../components/managerReports/ManagerDeadlineReport';
import ManagerClientFeedbackReport from '../../components/managerReports/ManagerClientFeedbackReport';
import { managerReportStatsData, overviewAnalytics, projectReports, taskReports, teamPerformanceReports, deadlineReports, clientFeedbackReports } from '../../data/managerReportsData';
import '../../styles/managerReports.css';

const ManagerReports = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [dailyReports, setDailyReports] = useState([]);
  const [liveProjectReports, setLiveProjectReports] = useState([]);
  const [liveTaskReports, setLiveTaskReports] = useState([]);
  const [liveTeamPerformance, setLiveTeamPerformance] = useState([]);
  const [liveDeadlineReports, setLiveDeadlineReports] = useState([]);
  const [liveClientFeedback, setLiveClientFeedback] = useState([]);
  useEffect(() => {
    Promise.all([api.get('/daily-reports'), api.get('/projects'), api.get('/tasks'), api.get('/users'), api.get('/feedback')]).then(([reportsResponse, projectsResponse, tasksResponse, usersResponse, feedbackResponse]) => {
      setDailyReports(apiData(reportsResponse) || []);
      const projects = apiData(projectsResponse) || [];
      const tasks = apiData(tasksResponse) || [];
      const users = (apiData(usersResponse) || []).filter(user => user.role === 'Team Member');
      const feedback = apiData(feedbackResponse) || [];
      setLiveClientFeedback(feedback.map(item => ({ id: item.id, title: item.title || 'Client feedback', clientName: item.client_name || item.clientName || '—', companyName: item.company_name || '—', projectName: item.project_name || '—', category: item.category || 'General Feedback', priority: item.priority || 'Medium', status: item.status || 'Pending', rating: Number(item.rating) || 0, submittedDate: String(item.submitted_date || item.created_at || '—').slice(0, 10), resolvedDate: item.last_response_date || '—' })));
      setLiveDeadlineReports(tasks.filter(task => task.deadline).map(task => { const daysRemaining = Math.ceil((new Date(`${String(task.deadline).slice(0, 10)}T23:59:59`) - Date.now()) / 86400000); return { id: task.id, title: task.title || 'Untitled task', type: 'Task Deadline', projectName: task.project_name || 'Unassigned', assignedTo: task.assignee_name || task.assigned_to_name || 'Unassigned', dueDate: String(task.deadline).slice(0, 10), daysRemaining, priority: task.priority || 'Medium', status: task.status === 'Completed' ? 'Completed' : daysRemaining < 0 ? 'Overdue' : 'Upcoming', progress: Math.min(100, Math.max(0, Number(task.progress) || 0)) }; }));      setLiveTaskReports(tasks.map(task => ({ id: task.id, taskName: task.title || 'Untitled task', projectName: task.project_name || 'Unassigned', assignedTo: task.assignee_name || task.assigned_to_name || 'Unassigned', deadline: String(task.deadline || '—').slice(0, 10), priority: task.priority || 'Medium', status: task.status || 'Pending', progress: Math.min(100, Math.max(0, Number(task.progress) || 0)), estimatedHours: Number(task.estimated_hours) || 0, timeSpent: Number(task.time_spent) || 0, completionRate: Math.min(100, Math.max(0, Number(task.progress) || 0)) })));
      setLiveTeamPerformance(users.map(user => { const assigned = tasks.filter(task => Number(task.assigned_to) === Number(user.id)); const completed = assigned.filter(task => task.status === 'Completed').length; const overdue = assigned.filter(task => task.deadline && new Date(task.deadline) < new Date() && task.status !== 'Completed').length; const pending = Math.max(assigned.length - completed, 0); const workload = Math.min(100, assigned.length ? Math.round((pending / assigned.length) * 100) : 0); const productivity = assigned.length ? Math.round(assigned.reduce((sum, task) => sum + Math.min(100, Math.max(0, Number(task.progress) || 0)), 0) / assigned.length) : 0; return { id: user.id, memberName: user.name || user.email, role: user.designation || user.role, department: user.department || '—', assignedTasks: assigned.length, completedTasks: completed, pendingTasks: pending, overdueTasks: overdue, workload, productivity, performanceGrade: productivity >= 90 ? 'Excellent' : productivity >= 70 ? 'Good' : 'Average' }; }));
      setLiveProjectReports(projects.map(project => { const projectTasks = tasks.filter(task => Number(task.project_id) === Number(project.id)); return { id: project.id, projectName: project.title || 'Untitled project', clientName: project.client_name || '—', category: project.category || '—', startDate: String(project.start_date || '—').slice(0, 10), endDate: String(project.end_date || '—').slice(0, 10), status: project.status || 'Pending', priority: project.priority || 'Medium', progress: Math.min(100, Math.max(0, Number(project.progress) || 0)), totalTasks: projectTasks.length, completedTasks: projectTasks.filter(task => task.status === 'Completed').length }; }));
    }).catch(() => { setDailyReports([]); setLiveProjectReports([]); setLiveTaskReports([]); setLiveTeamPerformance([]); setLiveDeadlineReports([]); setLiveClientFeedback([]); });
  }, []);
  const [alert, setAlert] = useState(null);
  const [filters, setFilters] = useState({ search: '', reportType: 'All Reports', project: 'All Projects', teamMember: 'All Team Members', status: 'All Status', priority: 'All Priority' });

  const tabs = ['Overview', 'Project Report', 'Task Report', 'Team Performance', 'Deadline Report', 'Client Feedback', 'Daily Work Reports'];

  const showAlert = (m, t = 'info') => { setAlert({ message: m, type: t }); setTimeout(() => setAlert(null), 2000); };
const reportData = () => {
    if (activeTab === 'Project Report') return applyFilters(projectReports);
    if (activeTab === 'Task Report') return applyFilters(taskReports);
    if (activeTab === 'Team Performance') return applyFilters(teamPerformanceReports);
    if (activeTab === 'Deadline Report') return applyFilters(deadlineReports);
    if (activeTab === 'Client Feedback') return applyFilters(clientFeedbackReports);
    return [{ report: 'Overview', inProgressTasks: overviewAnalytics.taskStatus.inProgress, completedTasks: overviewAnalytics.taskStatus.completed, averageProductivity: overviewAnalytics.teamProductivity.average }];
  };
  const handleExport = (type) => {
    if (type === 'Print') { window.print(); return; }
    if (type === 'PDF') { window.print(); showAlert('Choose Save as PDF in the print dialog to download the PDF.', 'info'); return; }
    const rows = reportData();
    if (!rows.length) { showAlert('There is no report data matching the current filters.', 'warning'); return; }
    const columns = [...new Set(rows.flatMap(row => Object.keys(row)))];
    const csvValue = (value) => `"${(typeof value === 'object' ? JSON.stringify(value) : String(value ?? '')).replace(/"/g, '""')}"`;
    const csv = [columns, ...rows.map(row => columns.map(column => row[column]))].map(row => row.map(csvValue).join(',')).join('\r\n');
    const url = URL.createObjectURL(new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' }));
    const link = document.createElement('a'); link.href = url; link.download = `manager-${activeTab.toLowerCase().replace(/\s+/g, '-')}-report-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link); link.click(); link.remove(); URL.revokeObjectURL(url);
    showAlert(`${rows.length} report row(s) exported for Excel.`, 'success');
  };
  const resetFilters = () => setFilters({ search: '', reportType: 'All Reports', project: 'All Projects', teamMember: 'All Team Members', status: 'All Status', priority: 'All Priority' });

  const applyFilters = (data) => {
    return data.filter(item => {
      const searchMatch = !filters.search || JSON.stringify(item).toLowerCase().includes(filters.search.toLowerCase());
      const projectMatch = filters.project === 'All Projects' || (item.projectName === filters.project || item.project === filters.project);
      const statusMatch = filters.status === 'All Status' || item.status === filters.status;
      const priorityMatch = filters.priority === 'All Priority' || item.priority === filters.priority;
      const memberMatch = filters.teamMember === 'All Team Members' || item.assignedTo === filters.teamMember || item.memberName === filters.teamMember;
      return searchMatch && projectMatch && statusMatch && priorityMatch && memberMatch;
    });
  };

  const projectChartData = [
    { label: 'Active (5)', value: overviewAnalytics.projectProgress.active, color: 'var(--primary-color)', percentage: 62.5 },
    { label: 'Completed (2)', value: overviewAnalytics.projectProgress.completed, color: 'var(--success-color)', percentage: 25 },
    { label: 'Delayed (1)', value: overviewAnalytics.projectProgress.delayed, color: 'var(--danger-color)', percentage: 12.5 }
  ];

  const taskChartData = [
    { label: 'In Progress (18)', value: overviewAnalytics.taskStatus.inProgress, color: 'var(--primary-color)', percentage: 39 },
    { label: 'Pending (12)', value: overviewAnalytics.taskStatus.pending, color: 'var(--warning-color)', percentage: 26 },
    { label: 'Completed (46)', value: overviewAnalytics.taskStatus.completed, color: 'var(--success-color)', percentage: 100, suffix: '' },
    { label: 'Under Review (8)', value: overviewAnalytics.taskStatus.underReview, color: 'var(--accent-purple)', percentage: 17 },
    { label: 'Blocked (3)', value: overviewAnalytics.taskStatus.blocked, color: 'var(--danger-color)', percentage: 7 }
  ];

  return (
    <ManagerLayout>
      <div className="mrpt-dashboard">
        <div className="mrpt-dash-header">
          <div><h3>Manager Reports</h3><p>Analyze assigned projects, task progress, team productivity, deadlines, feedback, and overall project performance.</p></div>
          <ManagerExportButtons onExport={handleExport} />
        </div>
        {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`}>{alert.message}<button className="btn-close" onClick={() => setAlert(null)}></button></div>}

        <div className="mrpt-stats-grid">{managerReportStatsData.map(s => <ManagerReportStatsCard key={s.id} stat={s} />)}</div>
        <ManagerReportFilter filters={filters} setFilters={setFilters} onReset={resetFilters} />

        <div className="report-tabs">
          {tabs.map(tab => <button key={tab} className={`mrpt-tab-btn ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>{tab}</button>)}
        </div>

        <div className="report-content mt-3">
          {activeTab === 'Overview' && (
            <div>
              <div className="mrpt-analytics-grid">
                <ManagerReportChartBox title="Project Progress" data={projectChartData} type="bar" total={8} subtitle="8 assigned projects" />
                <ManagerReportChartBox title="Task Status" data={taskChartData} type="bar" total={46} subtitle="46 active tasks" />
              </div>
              <div className="mrpt-analytics-grid mt-3">
                <div className="mrpt-chart-box">
                  <h6>Team Productivity</h6>
                  <div className="chart-stat-grid">
                    <div className="chart-stat-item"><span className="chart-stat-value text-primary">{overviewAnalytics.teamProductivity.average}%</span><span>Average Score</span></div>
                    <div className="chart-stat-item"><span className="chart-stat-value text-success">{overviewAnalytics.teamProductivity.topPerformer}</span><span>Top Performer ({overviewAnalytics.teamProductivity.topScore}%)</span></div>
                    <div className="chart-stat-item"><span className="chart-stat-value text-danger">{overviewAnalytics.teamProductivity.overloaded}</span><span>Overloaded</span></div>
                    <div className="chart-stat-item"><span className="chart-stat-value text-success">{overviewAnalytics.teamProductivity.available}</span><span>Available</span></div>
                  </div>
                </div>
                <div className="mrpt-chart-box">
                  <h6>Client Feedback</h6>
                  <div className="chart-stat-grid">
                    <div className="chart-stat-item"><span className="chart-stat-value text-primary">{overviewAnalytics.clientFeedback.total}</span><span>Total Feedback</span></div>
                    <div className="chart-stat-item"><span className="chart-stat-value text-warning">{overviewAnalytics.clientFeedback.pending}</span><span>Pending</span></div>
                    <div className="chart-stat-item"><span className="chart-stat-value text-success">{overviewAnalytics.clientFeedback.resolved}</span><span>Resolved</span></div>
                    <div className="chart-stat-item"><span className="chart-stat-value text-purple">{overviewAnalytics.clientFeedback.avgSatisfaction}%</span><span>Satisfaction</span></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'Project Report' && <ManagerProjectReport data={applyFilters(liveProjectReports)} />}
          {activeTab === 'Task Report' && <ManagerTaskReport data={applyFilters(liveTaskReports)} />}
          {activeTab === 'Team Performance' && <ManagerTeamPerformanceReport data={applyFilters(liveTeamPerformance)} />}
          {activeTab === 'Deadline Report' && <ManagerDeadlineReport data={applyFilters(liveDeadlineReports)} />}
          {activeTab === 'Client Feedback' && <ManagerClientFeedbackReport data={applyFilters(liveClientFeedback)} />} 
          {activeTab === 'Daily Work Reports' && <DailyReportsTable reports={dailyReports} />}
        </div>
      </div>
    </ManagerLayout>
  );
};

export default ManagerReports;