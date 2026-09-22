// src/pages/team/TeamNotifications.jsx
import React, { useEffect, useState, useMemo } from 'react';
import * as notificationService from '../../services/notificationService';
import { apiData } from '../../services/api';
import TeamLayout from '../../layouts/TeamLayout';
import TeamNotificationStatsCard from '../../components/teamNotifications/TeamNotificationStatsCard';
import TeamNotificationCard from '../../components/teamNotifications/TeamNotificationCard';
import TeamNotificationTable from '../../components/teamNotifications/TeamNotificationTable';
import TeamNotificationDetailsModal from '../../components/teamNotifications/TeamNotificationDetailsModal';
import TeamNotificationSettings from '../../components/teamNotifications/TeamNotificationSettings';
import TeamReminderBox from '../../components/teamNotifications/TeamReminderBox';
import TeamAnnouncementBox from '../../components/teamNotifications/TeamAnnouncementBox';
import { FiSearch, FiRotateCcw, FiGrid, FiList, FiBell, FiVolume2, FiSettings, FiCheck, FiX } from 'react-icons/fi';
import { notificationStatsData, notifications, notificationTypes, projects, reminders, announcements, notificationSettingsData } from '../../data/teamNotificationsData';
import '../../styles/teamNotifications.css';

const TeamNotifications = () => {
  const [notifs, setNotifs] = useState([]);
  const [rems, setRems] = useState(reminders);
  const [settings, setSettings] = useState(notificationSettingsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [priorityFilter, setPriorityFilter] = useState('All Priority');
  const [projectFilter, setProjectFilter] = useState('All Projects');
  const [viewMode, setViewMode] = useState('card');
  const [alert, setAlert] = useState(null);

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedNotif, setSelectedNotif] = useState(null);

  const showAlert = (m, t = 'info') => { setAlert({ message: m, type: t }); setTimeout(() => setAlert(null), 2000); };

  const filteredNotifs = useMemo(() => {
    return notifs.filter(n => {
      const matchesSearch = !searchTerm || n.title.toLowerCase().includes(searchTerm.toLowerCase()) || n.message.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'All Types' || n.type === typeFilter;
      const matchesStatus = statusFilter === 'All Status' || n.status === statusFilter || (statusFilter === 'Read' && n.isRead) || (statusFilter === 'Unread' && !n.isRead);
      const matchesPriority = priorityFilter === 'All Priority' || n.priority === priorityFilter;
      const matchesProject = projectFilter === 'All Projects' || n.relatedProject === projectFilter;
      return matchesSearch && matchesType && matchesStatus && matchesPriority && matchesProject;
    });
  }, [notifs, searchTerm, typeFilter, statusFilter, priorityFilter, projectFilter]);

  const toUiNotification = (item) => ({
    ...item, relatedProject: item.related_project || '', relatedTo: item.related_task || '',
    senderName: item.sender_name || 'Admin', senderRole: item.sender_role || 'Admin',
    isRead: Boolean(item.is_read), createdAt: item.created_at || ''
  });
  useEffect(() => {
    notificationService.getNotifications().then(response => setNotifs(apiData(response).map(toUiNotification)))
      .catch(error => showAlert(error.response?.data?.message || 'Unable to load notifications.', 'danger'));
  }, []);
  const resetFilters = () => { setSearchTerm(''); setTypeFilter('All Types'); setStatusFilter('All Status'); setPriorityFilter('All Priority'); setProjectFilter('All Projects'); };

  const handleMarkAllRead = async () => {
    try {
      await Promise.all(notifs.filter(item => !item.isRead).map(item => notificationService.markNotificationRead(item.id)));
      setNotifs(current => current.map(item => ({ ...item, isRead: true, status: 'Read' })));
      showAlert('All marked as read!', 'success');
    } catch (error) { showAlert(error.response?.data?.message || 'Unable to update notifications.', 'danger'); }
  };
  const handleView = (n) => { setSelectedNotif(n); setShowDetailsModal(true); };
  const handleToggleRead = async (n) => {
    try { await notificationService.markNotificationRead(n.id); setNotifs(current => current.map(item => item.id === n.id ? { ...item, isRead: true, status: 'Read' } : item)); }
    catch (error) { showAlert(error.response?.data?.message || 'Unable to update notification.', 'danger'); }
  };
  const handleToggleImportant = (n) => { setNotifs(notifs.map(nt => nt.id === n.id ? { ...nt, status: nt.status === 'Important' ? 'Read' : 'Important', isRead: true } : nt)); };
  const handleArchive = (n) => { setNotifs(notifs.map(nt => nt.id === n.id ? { ...nt, status: 'Archived', isRead: true } : nt)); showAlert('Archived!', 'success'); };
  const handleDelete = (n) => { setSelectedNotif(n); setShowDeleteModal(true); };
  const confirmDelete = async () => {
    try { await notificationService.deleteNotification(selectedNotif.id); setNotifs(current => current.filter(item => item.id !== selectedNotif.id)); setShowDeleteModal(false); showAlert('Deleted!', 'success'); }
    catch (error) { showAlert(error.response?.data?.message || 'Unable to delete notification.', 'danger'); }
  };

  const handleSendReminder = () => showAlert('Reminder sent!', 'success');
  const handleSnooze = () => showAlert('Reminder snoozed!', 'warning');
  const handleMarkDone = (r) => { setRems(rems.map(rm => rm.id === r.id ? { ...rm, status: 'Completed' } : rm)); showAlert('Marked as done!', 'success'); };
  const handleSaveSettings = (s) => { setSettings(s); showAlert('Preferences saved!', 'success'); };

  return (
    <TeamLayout>
      <div className="tn-dashboard">
        <div className="tn-dash-header">
          <div><h3>Notifications</h3><p>View task alerts, deadline reminders, project updates, attendance alerts, daily report reminders, and announcements.</p></div>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-primary btn-sm" onClick={handleMarkAllRead}><FiCheck /> Mark All Read</button>
            <button className="btn btn-outline-primary btn-sm" onClick={() => setViewMode('settings')}><FiSettings /> Settings</button>
          </div>
        </div>
        {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`}>{alert.message}<button className="btn-close" onClick={() => setAlert(null)}></button></div>}

        <div className="tn-stats-grid">{notificationStatsData.map(s => <TeamNotificationStatsCard key={s.id} stat={s} />)}</div>

        <div className="filter-section"><div className="filter-row">
          <div className="search-box"><FiSearch className="search-icon" /><input type="text" className="form-control search-input" placeholder="Search notifications..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
          <div className="filter-selects">
            <select className="form-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}><option value="All Types">All Types</option>{notificationTypes.map(t => <option key={t} value={t}>{t}</option>)}</select>
            <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}><option value="All Status">All Status</option><option>Read</option><option>Unread</option><option>Important</option><option>Archived</option></select>
            <select className="form-select" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}><option value="All Priority">All Priority</option><option>Low</option><option>Medium</option><option>High</option><option>Urgent</option></select>
            <select className="form-select" value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)}><option value="All Projects">All Projects</option>{projects.map(p => <option key={p} value={p}>{p}</option>)}</select>
          </div>
          <button className="btn btn-light reset-btn" onClick={resetFilters}><FiRotateCcw className="me-2" /> Reset</button>
          <div className="view-toggle">
            <button className={`toggle-btn ${viewMode === 'card' ? 'active' : ''}`} onClick={() => setViewMode('card')}><FiGrid /></button>
            <button className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`} onClick={() => setViewMode('table')}><FiList /></button>
            <button className={`toggle-btn ${viewMode === 'reminders' ? 'active' : ''}`} onClick={() => setViewMode('reminders')}><FiBell /></button>
            <button className={`toggle-btn ${viewMode === 'announcements' ? 'active' : ''}`} onClick={() => setViewMode('announcements')}><FiVolume2 /></button>
            <button className={`toggle-btn ${viewMode === 'settings' ? 'active' : ''}`} onClick={() => setViewMode('settings')}><FiSettings /></button>
          </div>
        </div></div>

        {viewMode === 'card' && <div className="tn-cards-grid">{filteredNotifs.length === 0 ? <p className="text-muted text-center py-5">No notifications found</p> : filteredNotifs.map(n => <TeamNotificationCard key={n.id} notification={n} onView={handleView} onToggleRead={handleToggleRead} onToggleImportant={handleToggleImportant} onArchive={handleArchive} onDelete={handleDelete} />)}</div>}
        {viewMode === 'table' && <div className="tn-table-card"><TeamNotificationTable notifications={filteredNotifs} onView={handleView} onToggleRead={handleToggleRead} onToggleImportant={handleToggleImportant} onArchive={handleArchive} onDelete={handleDelete} /></div>}
        {viewMode === 'reminders' && <TeamReminderBox onSendReminder={handleSendReminder} onSnooze={handleSnooze} onMarkDone={handleMarkDone} />}
        {viewMode === 'announcements' && <TeamAnnouncementBox onAlert={showAlert} />}
        {viewMode === 'settings' && <TeamNotificationSettings onSave={handleSaveSettings} />}

        <TeamNotificationDetailsModal show={showDetailsModal} onClose={() => setShowDetailsModal(false)} notification={selectedNotif} onAlert={showAlert} />

        {showDeleteModal && selectedNotif && (
          <div className="modal-overlay"><div className="modal-dialog modal-sm"><div className="modal-content">
            <div className="modal-header"><h5 className="modal-title">Delete</h5><button className="modal-close-btn" onClick={() => setShowDeleteModal(false)}><FiX /></button></div>
            <div className="modal-body"><p>Are you sure?</p><div className="delete-info"><strong>{selectedNotif.title}</strong></div></div>
            <div className="modal-footer"><button className="btn btn-light" onClick={() => setShowDeleteModal(false)}>Cancel</button><button className="btn btn-danger" onClick={confirmDelete}>Delete</button></div>
          </div></div></div>
        )}
      </div>
    </TeamLayout>
  );
};

export default TeamNotifications;
