// src/pages/team/TeamDailyReport.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import * as reportService from '../../services/reportService';
import { apiData } from '../../services/api';
import TeamLayout from '../../layouts/TeamLayout';
import DailyReportStatsCard from '../../components/teamReports/DailyReportStatsCard';
import DailyReportForm from '../../components/teamReports/DailyReportForm';
import DailyReportCard from '../../components/teamReports/DailyReportCard';
import DailyReportTable from '../../components/teamReports/DailyReportTable';
import DailyReportDetailsModal from '../../components/teamReports/DailyReportDetailsModal';
import DailyReportEditModal from '../../components/teamReports/DailyReportEditModal';
import WorkHoursBox from '../../components/teamReports/WorkHoursBox';
import TaskWorkSummary from '../../components/teamReports/TaskWorkSummary';
import ReportTimeline from '../../components/teamReports/ReportTimeline';
import { FiSearch, FiRotateCcw, FiEdit3, FiGrid, FiList, FiClock, FiDownload, FiX } from 'react-icons/fi';
import { reportStatsData, projects, reportTimeline } from '../../data/teamDailyReportData';
import '../../styles/teamDailyReport.css';

const TeamDailyReport = () => {
  const [searchParams] = useSearchParams();
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [projectFilter, setProjectFilter] = useState('All Projects');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [prodFilter, setProdFilter] = useState('All Productivity');
  const [dateFilter, setDateFilter] = useState('All Dates');
  const [viewMode, setViewMode] = useState('card');
  const [showSubmitModal, setShowSubmitModal] = useState(() => searchParams.get('new') === '1');
  const [alert, setAlert] = useState(null);

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const showAlert = (m, t = 'info') => { setAlert({ message: m, type: t }); setTimeout(() => setAlert(null), 2000); };

  const parseJsonList = (value) => {
    if (Array.isArray(value)) return value;
    if (!value) return [];
    try { return JSON.parse(value); } catch { return []; }
  };

  const toUiReport = (report) => ({
    ...report,
    reportDate: report.report_date || report.reportDate || '',
    reportTitle: report.report_title || report.reportTitle || '',
    projectName: report.project_name || report.projectName || '',
    taskName: report.task_name || report.taskName || '',
    workType: report.work_type || report.workType || 'Development',
    workSummary: report.work_summary || report.today_tasks || report.workSummary || '',
    completedWork: report.completed_work || report.completedWork || '',
    pendingWork: report.pending_work || report.pendingWork || '',
    tomorrowPlan: report.tomorrow_plan || report.tomorrowPlan || '',
    startTime: report.start_time ? String(report.start_time).slice(0, 5) : '',
    endTime: report.end_time ? String(report.end_time).slice(0, 5) : '',
    breakTime: Number(report.break_minutes || 0),
    totalWorkHours: Number(report.work_hours || 0),
    productiveHours: Number(report.productive_hours || 0),
    overtimeHours: Number(report.overtime_hours || 0),
    taskProgress: Number(report.task_progress || 0),
    taskStatus: report.task_status || 'In Progress',
    productivityScore: Number(report.productivity_score || 0),
    productivityLevel: report.productivity_level || 'Average',
    submittedTime: report.submitted_at || '',
    reviewedBy: report.reviewed_by || '',
    reviewerComment: report.reviewer_comment || '',
    attachments: parseJsonList(report.attachments),
    lastUpdated: report.updated_at ? String(report.updated_at).slice(0, 10) : report.report_date
  });

  const toPayload = (form, status) => {
    const totalHours = Number(form.totalWorkHours || 0);
    const productiveHours = Number(form.productiveHours || 0);
    const score = totalHours ? Math.round((productiveHours / totalHours) * 100) : 0;
    return {
      report_date: form.reportDate, report_title: form.reportTitle,
      project_name: form.projectName, task_name: form.taskName, work_type: form.workType,
      today_tasks: form.workSummary, work_summary: form.workSummary,
      completed_work: form.completedWork, pending_work: form.pendingWork,
      blockers: form.blockers, tomorrow_plan: form.tomorrowPlan,
      start_time: form.startTime || null, end_time: form.endTime || null,
      break_minutes: Number(form.breakTime || 0), work_hours: totalHours,
      productive_hours: productiveHours, overtime_hours: Number(form.overtimeHours || 0),
      task_progress: Number(form.taskProgress || 0), task_status: form.taskStatus,
      productivity_score: score, productivity_level: score >= 90 ? 'Excellent' : score >= 70 ? 'Good' : score >= 50 ? 'Average' : 'Low',
      status, submitted_at: status === 'Draft' ? null : new Date().toISOString().slice(0, 19).replace('T', ' '),
      attachments: JSON.stringify(form.attachments || [])
    };
  };

  useEffect(() => {
    reportService.getDailyReports()
      .then(response => setReports(apiData(response).map(toUiReport)))
      .catch(error => showAlert(error.response?.data?.message || 'Unable to load reports.', 'danger'));
  }, []);
  const filteredReports = useMemo(() => {
    return reports.filter(r => {
      const matchesSearch = !searchTerm || r.reportTitle.toLowerCase().includes(searchTerm.toLowerCase()) || r.projectName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesProject = projectFilter === 'All Projects' || r.projectName === projectFilter;
      const matchesStatus = statusFilter === 'All Status' || r.status === statusFilter;
      return matchesSearch && matchesProject && matchesStatus;
    });
  }, [reports, searchTerm, projectFilter, statusFilter]);

  const resetFilters = () => { setSearchTerm(''); setProjectFilter('All Projects'); setStatusFilter('All Status'); setProdFilter('All Productivity'); setDateFilter('All Dates'); };

  const openSubmitForm = () => setShowSubmitModal(true);

  const saveNewReport = async (form, status) => {
    try {
      const response = await reportService.createDailyReport(toPayload(form, status));
      setReports(current => [toUiReport(apiData(response)), ...current]);
      showAlert(status === 'Draft' ? 'Report saved as draft!' : 'Daily work report submitted!', 'success');
      setShowSubmitModal(false);
    } catch (error) { showAlert(error.response?.data?.message || 'Unable to save report.', 'danger'); }
  };

  const handleSubmitReport = (form) => saveNewReport(form, 'Submitted');
  const handleDraft = (form) => saveNewReport(form, 'Draft');

  const handleExport = () => {
    if (!filteredReports.length) { showAlert('No daily reports available to export.', 'warning'); return; }
    const csvValue = value => '"' + String(value ?? '').replace(/"/g, '""') + '"';
    const headers = ['Date', 'Title', 'Project', 'Task', 'Work Summary', 'Completed Work', 'Pending Work', 'Hours', 'Progress', 'Status'];
    const rows = filteredReports.map(report => [
      report.reportDate, report.reportTitle, report.projectName, report.taskName,
      report.workSummary, report.completedWork, report.pendingWork, report.workHours,
      report.taskProgress, report.status
    ].map(csvValue).join(','));
    const csv = [headers.map(csvValue).join(','), ...rows].join(String.fromCharCode(13, 10));
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'daily-work-reports-' + new Date().toISOString().slice(0, 10) + '.csv';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showAlert('Daily reports exported successfully.', 'success');
  };

  const handleView = (r) => { setSelectedReport(r); setShowDetailsModal(true); };
  const handleEdit = (r) => { setSelectedReport(r); setShowEditModal(true); };
  const handleDelete = (r) => { setSelectedReport(r); setShowDeleteModal(true); };
  const confirmDelete = async () => {
    try {
      await reportService.deleteDailyReport(selectedReport.id);
      setReports(current => current.filter(r => r.id !== selectedReport.id));
      setShowDeleteModal(false); setSelectedReport(null); showAlert('Daily report deleted!', 'success');
    } catch (error) { showAlert(error.response?.data?.message || 'Unable to delete report.', 'danger'); }
  };

  const handleEditSubmit = async (id, form) => {
    try {
      const response = await reportService.updateDailyReport(id, toPayload(form, form.status || 'Submitted'));
      const saved = toUiReport(apiData(response));
      setReports(current => current.map(r => r.id === id ? saved : r));
      setShowEditModal(false); showAlert('Daily report updated!', 'success');
    } catch (error) { showAlert(error.response?.data?.message || 'Unable to update report.', 'danger'); }
  };

  return (
    <TeamLayout>
      <div className="tdr-dashboard">
        <div className="tdr-dash-header">
          <div><h3>Daily Work Report</h3><p>Submit your daily work update, track completed tasks, report blockers, and review previous work reports.</p></div>
          <div className="d-flex gap-2">
            <button className="btn btn-primary btn-sm" onClick={openSubmitForm}><FiEdit3 /> Submit New Report</button>
            <button className="btn btn-outline-primary btn-sm" onClick={handleExport}><FiDownload /> Export</button>
          </div>
        </div>
        {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`}>{alert.message}<button className="btn-close" onClick={() => setAlert(null)}></button></div>}

        <div className="tdr-stats-grid">{reportStatsData.map(s => <DailyReportStatsCard key={s.id} stat={s} />)}</div>

        <div className="filter-section"><div className="filter-row">
          <div className="search-box"><FiSearch className="search-icon" /><input type="text" className="form-control search-input" placeholder="Search reports..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
          <div className="filter-selects">
            <select className="form-select" value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)}><option value="All Projects">All Projects</option>{projects.map(p => <option key={p} value={p}>{p}</option>)}</select>
            <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}><option value="All Status">All Status</option><option>Draft</option><option>Submitted</option><option>Under Review</option><option>Approved</option><option>Rejected</option></select>
          </div>
          <button className="btn btn-light reset-btn" onClick={resetFilters}><FiRotateCcw className="me-2" /> Reset</button>
          <div className="view-toggle">
            <button className="toggle-btn" onClick={openSubmitForm} title="Submit New Report"><FiEdit3 /></button>
            <button className={`toggle-btn ${viewMode === 'card' ? 'active' : ''}`} onClick={() => setViewMode('card')}><FiGrid /></button>
            <button className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`} onClick={() => setViewMode('table')}><FiList /></button>
            <button className={`toggle-btn ${viewMode === 'timeline' ? 'active' : ''}`} onClick={() => setViewMode('timeline')}><FiClock /></button>
          </div>
        </div></div>
        {viewMode === 'card' && <div className="tdr-cards-grid">{filteredReports.length === 0 ? <p className="text-muted text-center py-5">No reports found</p> : filteredReports.map(r => <DailyReportCard key={r.id} report={r} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />)}</div>}
        {viewMode === 'table' && <div className="tdr-table-card"><DailyReportTable reports={filteredReports} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} /></div>}
        {viewMode === 'timeline' && <ReportTimeline timeline={reportTimeline} />}

        {showSubmitModal && (
          <div className="modal-overlay dashboard-form-overlay">
            <div className="modal-dialog dashboard-form-dialog">
              <div className="modal-content dashboard-form-modal">
                <div className="modal-header dashboard-form-header">
                  <div><h5 className="modal-title">Submit Daily Work Report</h5><p className="mb-0 mt-2 text-muted">Add today's work details, progress, hours, and blockers.</p></div>
                  <button type="button" className="modal-close-btn" onClick={() => setShowSubmitModal(false)} aria-label="Close"><FiX /></button>
                </div>
                <DailyReportForm onSubmit={handleSubmitReport} onDraft={handleDraft} onCancel={() => setShowSubmitModal(false)} />
              </div>
            </div>
          </div>
        )}

        <DailyReportDetailsModal show={showDetailsModal} onClose={() => setShowDetailsModal(false)} report={selectedReport} />
        <DailyReportEditModal show={showEditModal} onClose={() => setShowEditModal(false)} report={selectedReport} onSubmit={handleEditSubmit} />

        {showDeleteModal && selectedReport && (
          <div className="modal-overlay"><div className="modal-dialog modal-sm"><div className="modal-content">
            <div className="modal-header"><h5 className="modal-title">Delete Report</h5><button className="modal-close-btn" onClick={() => setShowDeleteModal(false)}><FiX /></button></div>
            <div className="modal-body"><p>Are you sure you want to delete this daily work report?</p><div className="delete-info"><strong>{selectedReport.reportTitle}</strong></div></div>
            <div className="modal-footer"><button className="btn btn-light" onClick={() => setShowDeleteModal(false)}>Cancel</button><button className="btn btn-danger" onClick={confirmDelete}>Delete</button></div>
          </div></div></div>
        )}
      </div>
    </TeamLayout>
  );
};

export default TeamDailyReport;




