// src/pages/admin/ActivityLogs.jsx
import React, { useEffect, useState, useMemo } from 'react';
import * as activityLogService from '../../services/activityLogService';
import { apiData } from '../../services/api';
import AdminLayout from '../../layouts/AdminLayout';
import PageHeader from '../../components/common/PageHeader';
import ActivityStatsCard from '../../components/activityLogs/ActivityStatsCard';
import ActivityLogCard from '../../components/activityLogs/ActivityLogCard';
import ActivityLogTable from '../../components/activityLogs/ActivityLogTable';
import ActivityDetailsModal from '../../components/activityLogs/ActivityDetailsModal';
import AuditTimeline from '../../components/activityLogs/AuditTimeline';
import LoginHistoryTable from '../../components/activityLogs/LoginHistoryTable';
import SystemEventBox from '../../components/activityLogs/SystemEventBox';
import { FiSearch, FiRotateCcw, FiGrid, FiList, FiClock, FiLogIn, FiDownload, FiX } from 'react-icons/fi';
import { activityTypes, modules, statusesForActivity, userRoles } from '../../data/activityLogData';
import '../../styles/activityLogs.css';

const ActivityLogs = () => {
  const [activities, setActivities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [moduleFilter, setModuleFilter] = useState('All Modules');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [dateFilter, setDateFilter] = useState('All Dates');
  const [viewMode, setViewMode] = useState('table');

  const [showViewModal, setShowViewModal] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [alert, setAlert] = useState(null);
  const activityStatsData = useMemo(() => [
    { id: 1, title: 'Total Activities', value: activities.length, icon: 'FiActivity', description: 'Live activity records', color: 'primary' },
    { id: 2, title: 'Today', value: activities.filter(item => String(item.createdAt || '').slice(0, 10) === new Date().toISOString().slice(0, 10)).length, icon: 'FiClock', description: 'Activities today', color: 'info' },
    { id: 3, title: 'Successful', value: activities.filter(item => item.status === 'Success').length, icon: 'FiCheckSquare', description: 'Successful actions', color: 'success' },
    { id: 4, title: 'Failed', value: activities.filter(item => item.status === 'Failed').length, icon: 'FiShield', description: 'Failed actions', color: 'danger' },
  ], [activities]);

  const filteredActivities = useMemo(() => {
    return activities.filter(a => {
      const matchesSearch = !searchTerm || a.title.toLowerCase().includes(searchTerm.toLowerCase()) || a.message.toLowerCase().includes(searchTerm.toLowerCase()) || a.userName.toLowerCase().includes(searchTerm.toLowerCase()) || a.ipAddress.includes(searchTerm);
      const matchesType = typeFilter === 'All Types' || a.activityType === typeFilter;
      const matchesRole = roleFilter === 'All Roles' || a.userRole === roleFilter;
      const matchesModule = moduleFilter === 'All Modules' || a.module === moduleFilter;
      const matchesStatus = statusFilter === 'All Status' || a.status === statusFilter;
      return matchesSearch && matchesType && matchesRole && matchesModule && matchesStatus;
    });
  }, [activities, searchTerm, typeFilter, roleFilter, moduleFilter, statusFilter]);

  const toUiActivity = (item) => ({
    ...item,
    title: `${item.action || 'Activity'}: ${item.module || 'System'}`,
    message: item.description || '',
    userName: item.user_name || 'Unknown User',
    userRole: item.user_role || 'Unknown',
    activityType: item.action || 'Update',
    module: item.module || 'System',
    status: 'Success',
    ipAddress: item.ip_address || '-',
    dateTime: item.created_at || '',
    device: item.device || 'Server',
    browser: item.browser || '-',
    location: item.location || '-'
  });

  useEffect(() => {
    activityLogService.getActivityLogs()
      .then(response => setActivities(apiData(response).map(toUiActivity)))
      .catch(error => showAlert(error.response?.data?.message || 'Unable to load activity logs.', 'danger'));
  }, []);
  const resetFilters = () => { setSearchTerm(''); setTypeFilter('All Types'); setRoleFilter('All Roles'); setModuleFilter('All Modules'); setStatusFilter('All Status'); setDateFilter('All Dates'); };
  const showAlert = (m, t = 'info') => { setAlert({ message: m, type: t }); setTimeout(() => setAlert(null), 3000); };

  const handleView = (a) => { setSelectedActivity(a); setShowViewModal(true); };
  const handleExport = () => showAlert('Export logs feature is frontend demo only.');
  const handleClearLogs = () => { setShowClearModal(true); };
  const confirmClear = () => { setShowClearModal(false); showAlert('Clear logs feature is frontend demo only.'); };

  return (
    <AdminLayout>
      <PageHeader title="Activity Logs" subtitle="Track user actions, login history, project changes, task updates, deleted records, and system security events." showButton={false}>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-primary btn-sm" onClick={handleExport}><FiDownload /> Export Logs</button>
          <button className="btn btn-outline-danger btn-sm" onClick={handleClearLogs}>Clear Filters</button>
        </div>
      </PageHeader>
      {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`}>{alert.message}<button className="btn-close" onClick={() => setAlert(null)}></button></div>}

      <div className="act-stats-grid">{activityStatsData.map(s => <ActivityStatsCard key={s.id} stat={s} />)}</div>

      <div className="filter-section"><div className="filter-row">
        <div className="search-box"><FiSearch className="search-icon" /><input type="text" className="form-control search-input" placeholder="Search by user, action, module, IP..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
        <div className="filter-selects">
          <select className="form-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}><option value="All Types">All Types</option>{activityTypes.map(t => <option key={t} value={t}>{t}</option>)}</select>
          <select className="form-select" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}><option value="All Roles">All Roles</option>{userRoles.map(r => <option key={r} value={r}>{r}</option>)}</select>
          <select className="form-select" value={moduleFilter} onChange={(e) => setModuleFilter(e.target.value)}><option value="All Modules">All Modules</option>{modules.map(m => <option key={m} value={m}>{m}</option>)}</select>
          <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}><option value="All Status">All Status</option>{statusesForActivity.map(s => <option key={s} value={s}>{s}</option>)}</select>
        </div>
        <button className="btn btn-light reset-btn" onClick={resetFilters}><FiRotateCcw className="me-2" /> Reset</button>
        <div className="view-toggle">
          <button className={`toggle-btn ${viewMode === 'card' ? 'active' : ''}`} onClick={() => setViewMode('card')}><FiGrid /></button>
          <button className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`} onClick={() => setViewMode('table')}><FiList /></button>
          <button className={`toggle-btn ${viewMode === 'timeline' ? 'active' : ''}`} onClick={() => setViewMode('timeline')}><FiClock /></button>
          <button className={`toggle-btn ${viewMode === 'login' ? 'active' : ''}`} onClick={() => setViewMode('login')}><FiLogIn /></button>
        </div>
      </div></div>

      {viewMode === 'card' && (
        <div>
          <div className="activities-grid">
            {filteredActivities.length === 0 ? <div className="no-data"><p className="text-muted">No activities found</p></div> :
              filteredActivities.map(a => <ActivityLogCard key={a.id} activity={a} onView={handleView} />)
            }
          </div>

        </div>
      )}

      {viewMode === 'table' && (
        <div className="act-table-card"><ActivityLogTable activities={filteredActivities} onView={handleView} /></div>
      )}

      {viewMode === 'timeline' && <AuditTimeline activities={filteredActivities} />}

      {viewMode === 'login' && (
        <div>
          <div className="act-table-card"><h6 className="mb-3">Login History</h6><LoginHistoryTable logins={loginHistoryData} /></div>

        </div>
      )}

      <ActivityDetailsModal show={showViewModal} onClose={() => { setShowViewModal(false); setSelectedActivity(null); }} activity={selectedActivity} />

      {showClearModal && (
        <div className="modal-overlay"><div className="modal-dialog modal-sm"><div className="modal-content">
          <div className="modal-header"><h5 className="modal-title">Clear Logs</h5><button className="modal-close-btn" onClick={() => setShowClearModal(false)}><FiX /></button></div>
          <div className="modal-body"><p>Are you sure you want to clear selected logs? This action is frontend demo only.</p></div>
          <div className="modal-footer"><button className="btn btn-light" onClick={() => setShowClearModal(false)}>Cancel</button><button className="btn btn-danger" onClick={confirmClear}>Clear Logs</button></div>
        </div></div></div>
      )}
    </AdminLayout>
  );
};

export default ActivityLogs;


