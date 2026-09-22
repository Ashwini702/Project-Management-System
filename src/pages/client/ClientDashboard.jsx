// src/pages/client/ClientDashboard.jsx
import React, { useEffect, useMemo, useState } from 'react';
import ClientLayout from '../../layouts/ClientLayout';
import PageHeader from '../../components/common/PageHeader';
import ClientStatsCard from '../../components/clientDashboard/ClientStatsCard';
import ClientProjectCard from '../../components/clientDashboard/ClientProjectCard';
import ClientProjectProgress from '../../components/clientDashboard/ClientProjectProgress';
import ClientDeadlineList from '../../components/clientDashboard/ClientDeadlineList';
import ClientFileList from '../../components/clientDashboard/ClientFileList';
import ClientMessageBox from '../../components/clientDashboard/ClientMessageBox';
import ClientInvoiceBox from '../../components/clientDashboard/ClientInvoiceBox';
import * as projectService from '../../services/projectService';
import { apiData } from '../../services/api';
import '../../styles/clientDashboard.css';

const ClientDashboard = () => {
  const [alert, setAlert] = useState(null);
  const [clientProjects, setClientProjects] = useState([]);

  const showAlert = (message, type = 'info') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 2200);
  };
  useEffect(() => {
    projectService.getProjects()
      .then(response => setClientProjects(apiData(response).map(project => ({
        ...project,
        projectName: project.title || '', manager: project.manager_name || 'Project Manager',
        startDate: project.start_date || '-', endDate: project.end_date || '-', deadline: project.end_date || '-',
        completedTasks: Number(project.completed_tasks_count || 0),
        totalTasks: Number(project.total_tasks_count || project.total_tasks || 0),
        progress: Number(project.progress || 0), recentUpdate: project.description || 'No recent update.',
      }))))
      .catch(error => showAlert(error.response?.data?.message || 'Unable to load your dashboard.', 'danger'));
  }, []);

  const clientStatsData = useMemo(() => [
    { id: 1, title: 'Active Projects', value: clientProjects.filter(p => p.status === 'In Progress').length, icon: 'FiFolder', desc: 'Currently in progress', color: 'primary' },
    { id: 2, title: 'Completed Projects', value: clientProjects.filter(p => p.status === 'Completed').length, icon: 'FiCheckCircle', desc: 'Successfully delivered', color: 'success' },
    { id: 3, title: 'Total Projects', value: clientProjects.length, icon: 'FiMessageSquare', desc: 'Assigned to your account', color: 'warning' },
    { id: 4, title: 'Upcoming Deadlines', value: clientProjects.filter(p => p.endDate && new Date(p.endDate) >= new Date()).length, icon: 'FiClock', desc: 'Future delivery dates', color: 'danger' },
    { id: 5, title: 'Shared Files', value: clientProjects.reduce((sum, p) => sum + Number(p.shared_files_count || 0), 0), icon: 'FiFileText', desc: 'Project documents', color: 'info' },
    { id: 6, title: 'Pending Tasks', value: clientProjects.reduce((sum, p) => sum + Math.max(p.totalTasks - p.completedTasks, 0), 0), icon: 'FiDollarSign', desc: 'Across your projects', color: 'purple' },
  ], [clientProjects]);

  const projectProgressData = useMemo(() => clientProjects.map(p => ({ projectName: p.projectName, overall: p.progress, design: p.progress, development: p.progress, testing: p.status === 'Completed' ? 100 : 0, deployment: p.status === 'Completed' ? 100 : 0, status: p.status })), [clientProjects]);
  const deadlinesData = useMemo(() => clientProjects.filter(p => p.endDate && p.endDate !== '-').map(p => ({ id: p.id, title: `${p.projectName} Delivery`, project: p.projectName, dueDate: p.endDate, daysLeft: Math.ceil((new Date(p.endDate) - new Date()) / 86400000), priority: p.priority, status: p.status === 'Completed' ? 'Completed' : 'Upcoming' })), [clientProjects]);

  const overview = useMemo(() => {
    const activeProjects = clientProjects.filter(project => project.status === 'In Progress');
    const completedTasks = clientProjects.reduce((sum, project) => sum + project.completedTasks, 0);
    const totalTasks = clientProjects.reduce((sum, project) => sum + project.totalTasks, 0);
    const averageProgress = clientProjects.length ? Math.round(clientProjects.reduce((sum, project) => sum + project.progress, 0) / clientProjects.length) : 0;

    return {
      activeCount: activeProjects.length,
      completedTasks,
      totalTasks,
      averageProgress,
    };
  }, []);

  const handleProjectView = (project) => showAlert(`${project.projectName} details are available on the Projects page.`, 'info');
  const handleProjectFeedback = (project) => showAlert(`Feedback option opened for ${project.projectName}.`, 'success');
  const handleProjectFiles = (project) => showAlert(`${project.projectName} files are available in Shared Files.`, 'info');

  return (
    <ClientLayout>
      <PageHeader
        title="Client Dashboard"
        subtitle="Track your projects, feedback, messages, invoices, and profile information."
        showButton={false}
      />

      {alert && (
        <div className={`alert alert-${alert.type} alert-dismissible fade show`}>
          {alert.message}
          <button className="btn-close" onClick={() => setAlert(null)}></button>
        </div>
      )}

      <div className="cl-stats-grid">
        {clientStatsData.map(stat => <ClientStatsCard key={stat.id} stat={stat} />)}
      </div>

      <section className="cl-project-overview mt-4">
        <div className="cl-overview-header">
          <div>
            <h5>Project Overview</h5>
            <p>Your active project updates, documents, communication summaries, progress, and upcoming deadlines.</p>
          </div>
          <div className="cl-overview-summary">
            <div><span>Active</span><strong>{overview.activeCount}</strong></div>
            <div><span>Avg Progress</span><strong>{overview.averageProgress}%</strong></div>
            <div><span>Tasks</span><strong>{overview.completedTasks}/{overview.totalTasks}</strong></div>
          </div>
        </div>

        <div className="cl-projects-grid">
          {clientProjects.map(project => (
            <ClientProjectCard
              key={project.id}
              project={project}
              onView={handleProjectView}
              onFeedback={handleProjectFeedback}
              onFiles={handleProjectFiles}
            />
          ))}
        </div>
      </section>

      <div className="cl-dash-grid-2col mt-4">
        <ClientProjectProgress data={projectProgressData} />
        <ClientDeadlineList deadlines={deadlinesData} />
      </div>

      <div className="cl-dash-grid-2col mt-4">
        <ClientFileList onAlert={showAlert} />
        <ClientMessageBox onAlert={showAlert} />
      </div>

      <div className="mt-4">
        <ClientInvoiceBox onAlert={showAlert} />
      </div>
    </ClientLayout>
  );
};

export default ClientDashboard;

