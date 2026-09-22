// src/pages/admin/Reports.jsx
import usePersistentState from '../../hooks/usePersistentState';
import React, { useState, useMemo, useEffect } from 'react';
import api, { apiData } from '../../services/api';
import DailyReportsTable from '../../components/reports/DailyReportsTable';
import LiveProgressOverview from '../../components/reports/LiveProgressOverview';
import AdminLayout from '../../layouts/AdminLayout';
import PageHeader from '../../components/common/PageHeader';
import ReportStatsCard from '../../components/reports/ReportStatsCard';
import ReportFilter from '../../components/reports/ReportFilter';
import ReportChartBox from '../../components/reports/ReportChartBox';
import ExportButtons from '../../components/reports/ExportButtons';
import ProjectReport from '../../components/reports/ProjectReport';
import TaskReport from '../../components/reports/TaskReport';
import EmployeePerformanceReport from '../../components/reports/EmployeePerformanceReport';
import ClientProjectReport from '../../components/reports/ClientProjectReport';
import DeadlineReport from '../../components/reports/DeadlineReport';
import CompletedProjectReport from '../../components/reports/CompletedProjectReport';
import { reportStatsData, overviewAnalytics, projectReports, taskReports, employeeReports, clientReports, deadlineReports, completedProjectReports } from '../../data/reportData';
import '../../styles/reports.css';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [dailyReports, setDailyReports] = useState([]);
  const [liveTasks, setLiveTasks] = useState([]);
  useEffect(() => {
    api.get('/daily-reports').then((response) => setDailyReports(apiData(response))).catch(() => setDailyReports([]));
    api.get('/tasks').then((response) => {
      const tasks = apiData(response);
      setLiveTasks((Array.isArray(tasks) ? tasks : []).map(task => ({
        id: task.id,
        name: task.title || 'Untitled task',
        project: task.project_name || 'Unassigned',
        assignedTo: task.assignee_name || task.assigned_to_name || 'Unassigned',
        deadline: task.deadline || '—',
        priority: task.priority || 'Medium',
        status: task.status || 'Pending',
        progress: Math.min(100, Math.max(0, Number(task.progress) || 0)),
        timeSpent: task.estimated_hours ? String(task.estimated_hours) + 'h estimated' : '—',
        completionDate: task.status === 'Completed' ? (task.updated_at || 'Completed') : '—',
      })));
    }).catch(() => setLiveTasks([]));
  }, []);
  const [alert, setAlert] = useState(null);
  const [filters, setFilters] = usePersistentState('report-filters', { search: '', reportType: 'All Reports', dateRange: 'This Month', project: 'All Projects', department: 'All Departments', status: 'All Status', priority: 'All Priority' });

  const tabs = ['Overview', 'Task Progress', 'Daily Work Reports'];

  const showAlert = (m, t = 'info') => { setAlert({ message: m, type: t }); setTimeout(() => setAlert(null), 2000); };
  const handleExport = (type) => showAlert(`Export ${type} is frontend demo only.`);
  const resetFilters = () => setFilters({ search: '', reportType: 'All Reports', dateRange: 'This Month', project: 'All Projects', department: 'All Departments', status: 'All Status', priority: 'All Priority' });

  const applyFilters = (data) => {
    return data.filter(item => {
      const searchMatch = !filters.search || JSON.stringify(item).toLowerCase().includes(filters.search.toLowerCase());
      const projectMatch = filters.project === 'All Projects' || (item.project === filters.project || item.name?.includes(filters.project));
      const statusMatch = filters.status === 'All Status' || item.status === filters.status;
      const priorityMatch = filters.priority === 'All Priority' || item.priority === filters.priority;
      const deptMatch = filters.department === 'All Departments' || item.department === filters.department;
      return searchMatch && projectMatch && statusMatch && priorityMatch && deptMatch;
    });
  };

  const overviewChartData = [
    { label: 'Active (18)', value: 18, color: 'var(--primary-color)', percentage: 37.5 },
    { label: 'Completed (16)', value: 16, color: 'var(--success-color)', percentage: 33.3 },
    { label: 'Not Started (8)', value: 8, color: 'var(--text-muted)', percentage: 16.7 },
    { label: 'On Hold (4)', value: 4, color: 'var(--warning-color)', percentage: 8.3 },
    { label: 'Delayed (2)', value: 2, color: 'var(--danger-color)', percentage: 4.2 }
  ];

  const taskChartData = [
    { label: 'In Progress (82)', value: 82, color: 'var(--primary-color)', percentage: 34 },
    { label: 'Pending (65)', value: 65, color: 'var(--warning-color)', percentage: 27 },
    { label: 'Completed (55)', value: 55, color: 'var(--success-color)', percentage: 23 },
    { label: 'Under Review (31)', value: 31, color: 'var(--accent-purple)', percentage: 13 },
    { label: 'Reopened (7)', value: 7, color: 'var(--danger-color)', percentage: 3 }
  ];

  const productivityData = [
    { label: 'Development', value: 88, color: 'var(--primary-color)' },
    { label: 'UI/UX Design', value: 85, color: 'var(--accent-purple)' },
    { label: 'Cyber Security', value: 89, color: 'var(--success-color)' },
    { label: 'Digital Marketing', value: 75, color: 'var(--warning-color)' }
  ];

  const clientSatisfactionData = [
    { label: 'Satisfied (15)', value: 15, color: 'var(--success-color)', percentage: 75 },
    { label: 'Neutral (3)', value: 3, color: 'var(--warning-color)', percentage: 15 },
    { label: 'Unsatisfied (2)', value: 2, color: 'var(--danger-color)', percentage: 10 }
  ];

  return (
    <AdminLayout>
      <PageHeader title="Reports & Analytics" subtitle="Analyze project progress, task performance, deadlines, team productivity, clients, and completed work." showButton={false} />
      {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`}>{alert.message}<button className="btn-close" onClick={() => setAlert(null)}></button></div>}
      




      <div className="report-tabs">
        {tabs.map(tab => <button key={tab} className={`rpt-tab-btn ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>{tab}</button>)}
      </div>

      <LiveProgressOverview />`r`n      <div className="report-content">
        {activeTab === 'Overview' && <div className="rpt-chart-box"><h5>Daily Reports Overview</h5><div className="chart-stat-grid"><div className="chart-stat-item"><span className="chart-stat-value text-primary">{dailyReports.length}</span><span>Total Submitted</span></div><div className="chart-stat-item"><span className="chart-stat-value text-warning">{dailyReports.filter(r => ['Pending','Submitted','In Review'].includes(r.status)).length}</span><span>Pending Review</span></div><div className="chart-stat-item"><span className="chart-stat-value text-success">{dailyReports.filter(r => ['Approved','Completed'].includes(r.status)).length}</span><span>Approved</span></div></div><div className="table-responsive mt-3"><table className="table"><thead><tr><th>Project</th><th>Reports</th></tr></thead><tbody>{Object.entries(dailyReports.reduce((acc, r) => { const key = r.project_name || 'Unassigned'; acc[key] = (acc[key] || 0) + 1; return acc; }, {})).map(([project, count]) => <tr key={project}><td>{project}</td><td>{count}</td></tr>)}{dailyReports.length === 0 && <tr><td colSpan="2" className="text-center text-muted">No report data available.</td></tr>}</tbody></table></div></div>}
        {activeTab === 'Overview' && false && (
          <div className="overview-analytics">
            <div className="analytics-grid-2col">
              <ReportChartBox title="Project Progress Overview" data={overviewChartData} type="bar" total={48} subtitle={`Total: ${overviewAnalytics.projectProgress.total} projects`} />
              <ReportChartBox title="Task Status Overview" data={taskChartData} type="bar" total={240} subtitle={`Total: 240 tasks`} />
            </div>
            <div className="analytics-grid-2col">
              <ReportChartBox title="Team Productivity by Department" data={productivityData} type="bar" total={100} subtitle={`Avg: ${overviewAnalytics.teamProductivity.average}%`} />
              <ReportChartBox title="Client Satisfaction" data={clientSatisfactionData} type="bar" total={20} subtitle={`Active clients: ${overviewAnalytics.clientOverview.active}`} />
            </div>
            <div className="analytics-grid-3col">
              <div className="rpt-chart-box"><h6>Team Stats</h6>
                <div className="chart-stat-grid">
                  <div className="chart-stat-item"><span className="chart-stat-value text-primary">{overviewAnalytics.teamProductivity.topDeptScore}%</span><span>Top Dept ({overviewAnalytics.teamProductivity.topDept})</span></div>
                  <div className="chart-stat-item"><span className="chart-stat-value text-warning">{overviewAnalytics.teamProductivity.overloaded}</span><span>Overloaded</span></div>
                  <div className="chart-stat-item"><span className="chart-stat-value text-success">{overviewAnalytics.teamProductivity.lowWorkload}</span><span>Low Workload</span></div>
                </div>
              </div>
              <div className="rpt-chart-box"><h6>Client Overview</h6>
                <div className="chart-stat-grid">
                  <div className="chart-stat-item"><span className="chart-stat-value text-primary">{overviewAnalytics.clientOverview.active}</span><span>Active Clients</span></div>
                  <div className="chart-stat-item"><span className="chart-stat-value text-warning">{overviewAnalytics.clientOverview.pendingPayments}</span><span>Pending Payments</span></div>
                  <div className="chart-stat-item"><span className="chart-stat-value text-success">{overviewAnalytics.clientOverview.totalRevenue}</span><span>Total Revenue</span></div>
                </div>
              </div>
              <div className="rpt-chart-box"><h6>Quick Stats</h6>
                <div className="chart-stat-grid">
                  <div className="chart-stat-item"><span className="chart-stat-value text-success">{overviewAnalytics.clientOverview.completedProjects}</span><span>Completed Projects</span></div>
                  <div className="chart-stat-item"><span className="chart-stat-value text-warning">{overviewAnalytics.clientOverview.pendingFeedback}</span><span>Pending Feedback</span></div>
                  <div className="chart-stat-item"><span className="chart-stat-value text-danger">{overviewAnalytics.projectProgress.delayed}</span><span>Delayed Projects</span></div>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'Project Report' && <ProjectReport data={applyFilters(projectReports)} />}
        {activeTab === 'Task Progress' && <TaskReport data={applyFilters(liveTasks)} />}
        {activeTab === 'Employee Performance' && <EmployeePerformanceReport data={applyFilters(employeeReports)} />}
        {activeTab === 'Client Report' && <ClientProjectReport data={applyFilters(clientReports)} />}
        {activeTab === 'Deadline Report' && <DeadlineReport data={applyFilters(deadlineReports)} />}
        {activeTab === 'Completed Projects' && <CompletedProjectReport data={applyFilters(completedProjectReports)} />} 
        {activeTab === 'Daily Work Reports' && <DailyReportsTable reports={dailyReports} />}
      </div>
    </AdminLayout>
  );
};

export default Reports;
