// src/pages/manager/ManagerNotifications.jsx
import React, { useEffect, useState, useMemo } from 'react';
import ManagerLayout from '../../layouts/ManagerLayout';
import ManagerNotificationStatsCard from '../../components/managerNotifications/ManagerNotificationStatsCard';
import ManagerNotificationCard from '../../components/managerNotifications/ManagerNotificationCard';
import ManagerNotificationTable from '../../components/managerNotifications/ManagerNotificationTable';
import ManagerNotificationDetailsModal from '../../components/managerNotifications/ManagerNotificationDetailsModal';
import ManagerNotificationSettings from '../../components/managerNotifications/ManagerNotificationSettings';
import ManagerReminderBox from '../../components/managerNotifications/ManagerReminderBox';
import ManagerAnnouncementBox from '../../components/managerNotifications/ManagerAnnouncementBox';
import { FiSearch, FiRotateCcw, FiGrid, FiList, FiBell, FiSettings, FiCheck, FiX } from 'react-icons/fi';
import { notificationStatsData, notificationTypes, projectsForNotif, remindersData, announcementsData, notificationSettingsData } from '../../data/managerNotificationsData';
import * as notificationService from '../../services/notificationService';
import { apiData } from '../../services/api';
import '../../styles/managerNotifications.css';

const ManagerNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [reminders, setReminders] = useState(remindersData);
  const [settings, setSettings] = useState(notificationSettingsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [priorityFilter, setPriorityFilter] = useState('All Priority');
  const [projectFilter, setProjectFilter] = useState('All Projects');
  const [dateFilter, setDateFilter] = useState('All Dates');
  const [viewMode, setViewMode] = useState('card');
  const [alert, setAlert] = useState(null);

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedNotif, setSelectedNotif] = useState(null);

const showAlert = (m, t = 'info') => { setAlert({ message: m, type: t }); setTimeout(() => setAlert(null), 2500); };
  const toNotification = (item) => ({ ...item, relatedProject: item.related_project || '', relatedTask: item.related_task || '', senderName: item.sender_name || 'System', senderRole: item.sender_role || 'System', isRead: Boolean(item.is_read), createdAt: item.created_at, dateTime: item.created_at });
  const loadNotifications = async () => { try { const response = await notificationService.getNotifications(); setNotifications(apiData(response).map(toNotification)); } catch (error) { showAlert(error.response?.data?.message || 'Unable to load messages from the database.', 'danger'); } };
  useEffect(() => { loadNotifications(); }, []);

  const filteredNotifications = useMemo(() => {
    return notifications.filter(n => {
      const matchesSearch = !searchTerm || n.title.toLowerCase().includes(searchTerm.toLowerCase()) || n.message.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'All Types' || n.type === typeFilter;
      const matchesStatus = statusFilter === 'All Status' || n.status === statusFilter || (statusFilter === 'Read' && n.isRead) || (statusFilter === 'Unread' && !n.isRead);
      const matchesPriority = priorityFilter === 'All Priority' || n.priority === priorityFilter;
      const matchesProject = projectFilter === 'All Projects' || n.relatedProject === projectFilter;
      return matchesSearch && matchesType && matchesStatus && matchesPriority && matchesProject;
    });
  }, [notifications, searchTerm, typeFilter, statusFilter, priorityFilter, projectFilter]);

  const resetFilters = () => { setSearchTerm(''); setTypeFilter('All Types'); setStatusFilter('All Status'); setPriorityFilter('All Priority'); setProjectFilter('All Projects'); setDateFilter('All Dates'); };

  const handleMarkAllRead = () => { setNotifications(notifications.map(n => ({ ...n, isRead: true, status: 'Read' }))); showAlert('All notifications marked as read!', 'success'); };
  const handleView = (n) => { setSelectedNotif(n); setShowDetailsModal(true); };
  const handleToggleRead = (n) => {
    setNotifications(notifications.map(nt => nt.id === n.id ? { ...nt, isRead: !nt.isRead, status: !nt.isRead ? 'Read' : 'Unread' } : nt));
    showAlert(`Notification marked as ${!n.isRead ? 'read' : 'unread'}!`, 'success');
  };
  const handleToggleImportant = (n) => {
    setNotifications(notifications.map(nt => nt.id === n.id ? { ...nt, status: nt.status === 'Important' ? 'Read' : 'Important', isRead: true } : nt));
    showAlert('Notification marked as important!', 'success');
  };
  const handleArchive = (n) => { setNotifications(notifications.map(nt => nt.id === n.id ? { ...nt, status: 'Archived', isRead: true } : nt)); showAlert('Notification archived!', 'success'); };
  const handleDelete = (n) => { setSelectedNotif(n); setShowDeleteModal(true); };
  const confirmDelete = () => { setNotifications(notifications.filter(n => n.id !== selectedNotif.id)); setShowDeleteModal(false); showAlert('Notification deleted!', 'success'); };

  const handleSendReminder = (r) => showAlert('Reminder sent successfully!', 'success');
  const handleSnooze = (r) => showAlert('Reminder snoozed!', 'warning');
  const handleMarkDone = (r) => { setReminders(reminders.map(rm => rm.id === r.id ? { ...rm, status: 'Completed' } : rm)); showAlert('Reminder marked as done!', 'success'); };
  const handleSaveSettings = (s) => { setSettings(s); showAlert('Notification preferences saved!', 'success'); };

  return (
    <ManagerLayout>
      <div className="mgn-dashboard">
        <div className="mgn-dash-header">
          <div><h3>Notifications</h3><p>View task alerts, project updates, deadline reminders, meeting notifications, feedback alerts, and team activity updates.</p></div>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-primary btn-sm" onClick={handleMarkAllRead}><FiCheck /> Mark All Read</button>
            <button className="btn btn-outline-primary btn-sm" onClick={() => setViewMode('settings')}><FiSettings /> Settings</button>
          </div>
        </div>
        {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`}>{alert.message}<button className="btn-close" onClick={() => setAlert(null)}></button></div>}

        <div className="mgn-stats-grid">{notificationStatsData.map(s => <ManagerNotificationStatsCard key={s.id} stat={s} />)}</div>

        <div className="filter-section"><div className="filter-row">
          <div className="search-box"><FiSearch className="search-icon" /><input type="text" className="form-control search-input" placeholder="Search notifications..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
          <div className="filter-selects">
            <select className="form-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}><option value="All Types">All Types</option>{notificationTypes.map(t => <option key={t} value={t}>{t}</option>)}</select>
            <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}><option value="All Status">All Status</option><option>Read</option><option>Unread</option><option>Important</option><option>Archived</option></select>
            <select className="form-select" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}><option value="All Priority">All Priority</option><option>Low</option><option>Medium</option><option>High</option><option>Urgent</option></select>
            <select className="form-select" value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)}><option value="All Projects">All Projects</option>{projectsForNotif.map(p => <option key={p} value={p}>{p}</option>)}</select>
          </div>
          <button className="btn btn-light reset-btn" onClick={resetFilters}><FiRotateCcw className="me-2" /> Reset</button>
          <div className="view-toggle">
            <button className={`toggle-btn ${viewMode === 'card' ? 'active' : ''}`} onClick={() => setViewMode('card')}><FiGrid /></button>
            <button className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`} onClick={() => setViewMode('table')}><FiList /></button>
            <button className={`toggle-btn ${viewMode === 'reminders' ? 'active' : ''}`} onClick={() => setViewMode('reminders')}><FiBell /></button>
            <button className={`toggle-btn ${viewMode === 'settings' ? 'active' : ''}`} onClick={() => setViewMode('settings')}><FiSettings /></button>
          </div>
        </div></div>

        {viewMode === 'card' && (
          <div>
            <div className="mgn-cards-grid">{filteredNotifications.length === 0 ? <p className="text-center text-muted py-5">No notifications found</p> : filteredNotifications.map(n => <ManagerNotificationCard key={n.id} notification={n} onView={handleView} onToggleRead={handleToggleRead} onToggleImportant={handleToggleImportant} onArchive={handleArchive} onDelete={handleDelete} />)}</div>
            <div className="mgn-side-grid mt-4">
              <ManagerReminderBox reminders={reminders} onSendReminder={handleSendReminder} onSnooze={handleSnooze} onMarkDone={handleMarkDone} />
              <ManagerAnnouncementBox announcements={announcementsData} onAlert={showAlert} />
            </div>
          </div>
        )}
        {viewMode === 'table' && <div className="mgn-table-card"><ManagerNotificationTable notifications={filteredNotifications} onView={handleView} onToggleRead={handleToggleRead} onToggleImportant={handleToggleImportant} onArchive={handleArchive} onDelete={handleDelete} /></div>}
        {viewMode === 'reminders' && <ManagerReminderBox reminders={reminders} onSendReminder={handleSendReminder} onSnooze={handleSnooze} onMarkDone={handleMarkDone} />}
        {viewMode === 'settings' && <ManagerNotificationSettings settings={settings} onSave={handleSaveSettings} />}

        <ManagerNotificationDetailsModal show={showDetailsModal} onClose={() => setShowDetailsModal(false)} notification={selectedNotif} onAlert={showAlert} />

        {showDeleteModal && selectedNotif && (
          <div className="modal-overlay"><div className="modal-dialog modal-sm"><div className="modal-content">
            <div className="modal-header"><h5 className="modal-title">Delete Notification</h5><button className="modal-close-btn" onClick={() => setShowDeleteModal(false)}><FiX /></button></div>
            <div className="modal-body"><p>Are you sure you want to delete this notification?</p><div className="delete-info"><strong>{selectedNotif.title}</strong></div></div>
            <div className="modal-footer"><button className="btn btn-light" onClick={() => setShowDeleteModal(false)}>Cancel</button><button className="btn btn-danger" onClick={confirmDelete}>Delete</button></div>
          </div></div></div>
        )}
      </div>
    </ManagerLayout>
  );
};

export default ManagerNotifications;