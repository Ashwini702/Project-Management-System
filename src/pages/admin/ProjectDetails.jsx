// src/pages/admin/ProjectDetails.jsx
import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import PageHeader from '../../components/common/PageHeader';
import ProjectOverviewCard from '../../components/projectDetails/ProjectOverviewCard';
import ProjectInfoBox from '../../components/projectDetails/ProjectInfoBox';
import ProjectProgressSummary from '../../components/projectDetails/ProjectProgressSummary';
import ProjectTaskList from '../../components/projectDetails/ProjectTaskList';
import ProjectTeamList from '../../components/projectDetails/ProjectTeamList';
import ProjectMilestones from '../../components/projectDetails/ProjectMilestones';
import ProjectDocuments from '../../components/projectDetails/ProjectDocuments';
import ProjectComments from '../../components/projectDetails/ProjectComments';
import ProjectActivityTimeline from '../../components/projectDetails/ProjectActivityTimeline';
import ProjectBudgetSummary from '../../components/projectDetails/ProjectBudgetSummary';
import { FiEdit2, FiArrowLeft, FiFolder, FiCheckCircle, FiClock, FiEye, FiUsers, FiFileText } from 'react-icons/fi';
import { projectData, projectStatsData, projectTasks, projectTeam, projectMilestones, projectDocuments, projectActivities, projectBudgetData, projectExpenses } from '../../data/projectDetailsData';
import '../../styles/projectDetails.css';

const ProjectDetails = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [tasks, setTasks] = useState(projectTasks);
  const [alert, setAlert] = useState(null);

  const tabs = [
    { key: 'overview', label: 'Overview', icon: FiFolder },
    { key: 'tasks', label: 'Tasks', icon: FiCheckCircle },
    { key: 'team', label: 'Team', icon: FiUsers },
    { key: 'milestones', label: 'Milestones', icon: FiClock },
    { key: 'documents', label: 'Documents', icon: FiFileText },
    { key: 'comments', label: 'Comments', icon: FiMessageSquare },
    { key: 'activity', label: 'Activity', icon: FiEye },
    { key: 'budget', label: 'Budget', icon: FiDollarSign }
  ];

  const showAlert = (m, t = 'info') => { setAlert({ message: m, type: t }); setTimeout(() => setAlert(null), 2000); };

  const handleMarkComplete = (taskId) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: 'Completed', progress: 100 } : t));
    showAlert('Task marked as completed!', 'success');
  };

  return (
    <AdminLayout>
      <PageHeader title="Project Details" subtitle="View complete project progress, assigned team, tasks, documents, milestones, comments, and budget summary." showButton={false}>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-primary btn-sm"><FiArrowLeft /> Back</button>
          <button className="btn btn-primary btn-sm"><FiEdit2 /> Edit Project</button>
        </div>
      </PageHeader>
      {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`}>{alert.message}<button className="btn-close" onClick={() => setAlert(null)}></button></div>}

      <ProjectOverviewCard project={projectData} />

      <div className="pd-stats-grid mt-4">
        {projectStatsData.map(s => {
          const icons = { FiCheckSquare, FiCheckCircle, FiClock, FiEye, FiUsers, FiFileText };
          const Icon = icons[s.icon];
          return (
            <div key={s.id} className={`pd-stat-card pd-stat-${s.color}`}>
              <div className="pd-stat-content">
                <div className="pd-stat-icon-wrapper"><Icon className="pd-stat-icon" /></div>
                <div className="pd-stat-info"><h3>{s.value}</h3><p>{s.title}</p><span>{s.desc}</span></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pd-tabs mt-4">
        {tabs.map(t => (
          <button key={t.key} className={`pd-tab-btn ${activeTab === t.key ? 'active' : ''}`} onClick={() => setActiveTab(t.key)}>
            <t.icon className="me-1" /> {t.label}
          </button>
        ))}
      </div>

      <div className="pd-tab-content mt-3">
        {activeTab === 'overview' && (
          <div className="row">
            <div className="col-lg-8">
              <ProjectInfoBox project={projectData} />
              <div className="mt-3"><ProjectProgressSummary /></div>
            </div>
            <div className="col-lg-4">
              <div className="pd-side-card"><h6>Recent Activities</h6><ProjectActivityTimeline activities={projectActivities.slice(0, 4)} /></div>
            </div>
          </div>
        )}
        {activeTab === 'tasks' && <ProjectTaskList tasks={tasks} onMarkComplete={handleMarkComplete} />}
        {activeTab === 'team' && <ProjectTeamList team={projectTeam} />}
        {activeTab === 'milestones' && <ProjectMilestones milestones={projectMilestones} />}
        {activeTab === 'documents' && <ProjectDocuments documents={projectDocuments} onUpload={() => showAlert('Upload is frontend demo only.')} />}
        {activeTab === 'comments' && <ProjectComments />}
        {activeTab === 'activity' && <ProjectActivityTimeline activities={projectActivities} />}
        {activeTab === 'budget' && <ProjectBudgetSummary budget={projectBudgetData} expenses={projectExpenses} />}
      </div>
    </AdminLayout>
  );
};

export default ProjectDetails;