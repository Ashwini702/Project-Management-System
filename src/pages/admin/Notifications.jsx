// src/pages/admin/Notifications.jsx
import usePersistentState from '../../hooks/usePersistentState';
import React, { useEffect, useState, useMemo } from 'react';
import * as notificationService from '../../services/notificationService';
import * as userService from '../../services/userService';
import { apiData } from '../../services/api';
import AdminLayout from '../../layouts/AdminLayout';
import PageHeader from '../../components/common/PageHeader';
import NotificationStatsCard from '../../components/notifications/NotificationStatsCard';
import NotificationCard from '../../components/notifications/NotificationCard';
import NotificationTable from '../../components/notifications/NotificationTable';
import NotificationFormModal from '../../components/notifications/NotificationFormModal';
import NotificationSettings from '../../components/notifications/NotificationSettings';
import AnnouncementBox from '../../components/notifications/AnnouncementBox';
import ReminderList from '../../components/notifications/ReminderList';
import NotificationTypeBadge from '../../components/notifications/NotificationTypeBadge';
import NotificationStatusBadge from '../../components/notifications/NotificationStatusBadge';
import { FiSearch, FiRotateCcw, FiGrid, FiList, FiSettings, FiX, FiCheck, FiPlus, FiCornerUpLeft } from 'react-icons/fi';
import { notificationSettingsData, notificationTypes, priorities, channels } from '../../data/notificationData';
import '../../styles/notifications.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [recipientUsers, setRecipientUsers] = useState([]);
  const [settings, setSettings] = usePersistentState('notification-settings', notificationSettingsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [priorityFilter, setPriorityFilter] = useState('All Priority');
  const [channelFilter, setChannelFilter] = useState('All Channels');
  const [dateFilter, setDateFilter] = useState('All Dates');
  const [viewMode, setViewMode] = useState('card');

  const [showFormModal, setShowFormModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedNotif, setSelectedNotif] = useState(null);
  const [preselectedType, setPreselectedType] = useState('');
  const [composeDefaults, setComposeDefaults] = useState({});
  const [alert, setAlert] = useState(null);
  const notificationStatsData = useMemo(() => [
    { id: 1, title: 'Total Notifications', value: notifications.length, icon: 'FiBell', description: 'Live notifications', color: 'primary' },
    { id: 2, title: 'Unread Notifications', value: notifications.filter(item => !item.isRead).length, icon: 'FiMail', description: 'Awaiting attention', color: 'warning' },
    { id: 3, title: 'Deadline Reminders', value: notifications.filter(item => item.type === 'Deadline Reminder').length, icon: 'FiClock', description: 'Live deadline alerts', color: 'danger' },
    { id: 4, title: 'Task Alerts', value: notifications.filter(item => item.type?.includes('Task')).length, icon: 'FiCheckSquare', description: 'Live task alerts', color: 'info' },
    { id: 5, title: 'Project Updates', value: notifications.filter(item => item.type?.includes('Project')).length, icon: 'FiFolder', description: 'Live project updates', color: 'success' },
    { id: 6, title: 'Announcements', value: notifications.filter(item => item.type === 'Admin Announcement').length, icon: 'FiVolume2', description: 'Live announcements', color: 'purple' },
  ], [notifications]);

  const filteredNotifications = useMemo(() => {
    return notifications.filter(n => {
      const matchesSearch = !searchTerm || n.title.toLowerCase().includes(searchTerm.toLowerCase()) || n.message.toLowerCase().includes(searchTerm.toLowerCase()) || n.recipientUser.toLowerCase().includes(searchTerm.toLowerCase()) || (n.relatedProject || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'All Types' || n.type === typeFilter;
      const matchesStatus = statusFilter === 'All Status' || n.status === statusFilter || (statusFilter === 'Read' && n.isRead) || (statusFilter === 'Unread' && !n.isRead);
      const matchesPriority = priorityFilter === 'All Priority' || n.priority === priorityFilter;
      const matchesChannel = channelFilter === 'All Channels' || n.channels.includes(channelFilter);
      return matchesSearch && matchesType && matchesStatus && matchesPriority && matchesChannel;
    });
  }, [notifications, searchTerm, typeFilter, statusFilter, priorityFilter, channelFilter]);

  const parseChannels = (value) => {
    if (Array.isArray(value)) return value;
    try { return value ? JSON.parse(value) : []; } catch { return []; }
  };
  const toUiNotification = (item) => ({
    ...item, recipientRole: item.recipient_role || item.recipientRole || '',
    recipientUser: item.recipient_user || item.recipientUser || '',
    relatedProject: item.related_project || item.relatedProject || '',
    relatedTask: item.related_task || item.relatedTask || '',
    scheduledAt: item.scheduled_at || item.scheduledAt || '', feedbackId: item.feedback_id || item.feedbackId || (String(item.related_task || '').startsWith('feedback:') ? String(item.related_task).split(':')[1] : ''),
    channels: parseChannels(item.channels), isRead: Boolean(item.is_read),
    createdAt: item.created_at || item.createdAt || '', sentAt: item.created_at || ''
  });
  useEffect(() => {
    Promise.all([notificationService.getNotifications(), userService.getUsers()])
      .then(([notificationsResponse, usersResponse]) => {
        setNotifications(apiData(notificationsResponse).map(toUiNotification));
        setRecipientUsers(apiData(usersResponse));
      })
      .catch(error => showAlert(error.response?.data?.message || 'Unable to load notifications.', 'danger'));
  }, []);
  const resetFilters = () => { setSearchTerm(''); setTypeFilter('All Types'); setStatusFilter('All Status'); setPriorityFilter('All Priority'); setChannelFilter('All Channels'); setDateFilter('All Dates'); };
  const showAlert = (m, t = 'success') => { setAlert({ message: m, type: t }); setTimeout(() => setAlert(null), 3000); };

  const handleCreate = (type = '') => { setSelectedNotif(null); setComposeDefaults({}); setPreselectedType(type); setShowFormModal(true); };
  const handleEdit = (n) => { setComposeDefaults({}); setSelectedNotif(n); setPreselectedType(''); setShowFormModal(true); };
  const clientReplyTarget = (notification) => {
    if (notification.sender_role === 'Client' && notification.sender_name) return notification.sender_name;
    if (notification.recipientRole === 'Client' && notification.recipientUser) return notification.recipientUser;
    return '';
  };
  const handleReply = (notification) => {
    const clientName = clientReplyTarget(notification);
    if (!clientName) {
      showAlert('This notification is not linked to a client account.', 'warning');
      return;
    }
    setSelectedNotif(null);
    setPreselectedType('');
    setComposeDefaults({
      title: 'Re: ' + (notification.title || 'Client message'), message: '', type: 'General Message', feedbackId: notification.feedbackId || '',
      recipientRole: 'Client', recipientUser: clientName,
      relatedProject: notification.relatedProject || '', relatedTask: notification.relatedTask || '',
      channels: ['System'], priority: notification.priority || 'Medium', status: 'Sent'
    });
    setShowViewModal(false);
    setShowFormModal(true);
  };
  const handleView = (n) => { setSelectedNotif(n); setShowViewModal(true); };
  const handleDelete = (n) => { setSelectedNotif(n); setShowDeleteModal(true); };
  const handleToggleRead = (n) => { setNotifications(notifications.map(nt => nt.id === n.id ? { ...nt, isRead: !nt.isRead, status: !nt.isRead ? 'Read' : 'Unread' } : nt)); showAlert(`Notification marked as ${!n.isRead ? 'read' : 'unread'}!`); };
  const handleMarkAllRead = () => { setNotifications(notifications.map(n => ({ ...n, isRead: true, status: 'Read' }))); showAlert('All notifications marked as read!'); };

  const confirmDelete = () => { setNotifications(notifications.filter(n => n.id !== selectedNotif.id)); setShowDeleteModal(false); setSelectedNotif(null); showAlert('Notification deleted!'); };

  const handleFormSubmit = async (fd) => {
    const payload = { title: fd.title, message: fd.message, type: fd.type,
      recipient_role: fd.recipientRole, recipient_user: fd.recipientUser,
      related_project: fd.relatedProject, related_task: fd.relatedTask,
      channels: JSON.stringify(fd.channels || []), priority: fd.priority, status: fd.status,
      scheduled_at: fd.scheduledAt || null, feedback_id: fd.feedbackId || null };
    try {
      const response = selectedNotif
        ? await notificationService.updateNotification(selectedNotif.id, payload)
        : await notificationService.createNotification(payload);
      const saved = toUiNotification(apiData(response));
      setNotifications(current => selectedNotif ? current.map(item => item.id === selectedNotif.id ? saved : item) : [saved, ...current]);
      showAlert(response.data?.message || (selectedNotif ? 'Notification updated!' : 'Notification sent!'));
      setShowFormModal(false); setSelectedNotif(null);
    } catch (error) { showAlert(error.response?.data?.message || 'Unable to send notification.', 'danger'); }
  };

  return (
    <AdminLayout>
      <PageHeader title="Notification Management" subtitle="Manage task alerts, deadline reminders, project updates, announcements, email alerts, and system notifications." showButton={false}>
        <div className="d-flex gap-2">
          <button className="btn btn-primary btn-sm" onClick={() => handleCreate()}><FiPlus /> Create</button>
          <button className="btn btn-outline-primary btn-sm" onClick={handleMarkAllRead}><FiCheck /> Mark All Read</button>
        </div>
      </PageHeader>
      {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`}>{alert.message}<button className="btn-close" onClick={() => setAlert(null)}></button></div>}

      <div className="nt-stats-grid">{notificationStatsData.map(s => <NotificationStatsCard key={s.id} stat={s} />)}</div>

      <div className="filter-section"><div className="filter-row">
        <div className="search-box"><FiSearch className="search-icon" /><input type="text" className="form-control search-input" placeholder="Search notifications..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
        <div className="filter-selects">
          <select className="form-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}><option value="All Types">All Types</option>{notificationTypes.map(t => <option key={t} value={t}>{t}</option>)}</select>
          <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}><option value="All Status">All Status</option>{['Read', 'Unread', 'Sent', 'Pending', 'Failed'].map(s => <option key={s} value={s}>{s}</option>)}</select>
          <select className="form-select" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}><option value="All Priority">All Priority</option>{priorities.map(p => <option key={p} value={p}>{p}</option>)}</select>
          <select className="form-select" value={channelFilter} onChange={(e) => setChannelFilter(e.target.value)}><option value="All Channels">All Channels</option>{channels.map(c => <option key={c} value={c}>{c}</option>)}</select>
        </div>
        <button className="btn btn-light reset-btn" onClick={resetFilters}><FiRotateCcw className="me-2" /> Reset</button>
        <div className="view-toggle">
          <button className={`toggle-btn ${viewMode === 'card' ? 'active' : ''}`} onClick={() => setViewMode('card')}><FiGrid /></button>
          <button className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`} onClick={() => setViewMode('table')}><FiList /></button>
          <button className={`toggle-btn ${viewMode === 'settings' ? 'active' : ''}`} onClick={() => setViewMode('settings')}><FiSettings /></button>
        </div>
      </div></div>

      {viewMode === 'card' && (
        <div>
          <div className="notifications-grid">
            {filteredNotifications.length === 0 ? <div className="no-data"><p className="text-muted">No notifications found</p></div> :
              filteredNotifications.map(n => <NotificationCard key={n.id} notification={n} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} onToggleRead={handleToggleRead} />)
            }
          </div>
          <div className="notif-sidebar-grid mt-4">
            <AnnouncementBox announcements={filteredNotifications.filter(item => item.type === 'Admin Announcement')} onCreate={() => handleCreate('Admin Announcement')} />
            <ReminderList reminders={filteredNotifications.filter(item => item.type === 'Deadline Reminder').map(item => ({ ...item, project: item.relatedProject, task: item.relatedTask, dueDate: item.scheduledAt || item.createdAt, daysLeft: item.scheduledAt ? Math.ceil((new Date(item.scheduledAt) - Date.now()) / 86400000) : 0 }))} />
          </div>
        </div>
      )}

      {viewMode === 'table' && (
        <div className="notif-table-card"><NotificationTable notifications={filteredNotifications} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} onToggleRead={handleToggleRead} /></div>
      )}

      {viewMode === 'settings' && <NotificationSettings settings={settings} onUpdate={setSettings} />}

      <NotificationFormModal show={showFormModal} onClose={() => { setShowFormModal(false); setSelectedNotif(null); setComposeDefaults({}); }} onSubmit={handleFormSubmit} editNotif={selectedNotif} preselectedType={preselectedType} composeDefaults={composeDefaults} users={recipientUsers} />

      {showViewModal && selectedNotif && (
        <div className="modal-overlay notification-view-overlay"><div className="modal-dialog notification-view-modal"><div className="modal-content">
          <div className="modal-header"><h5 className="modal-title">{selectedNotif.title}</h5><button className="modal-close-btn" onClick={() => { setShowViewModal(false); setSelectedNotif(null); }}><FiX /></button></div>
          <div className="modal-body">
            <div className="notif-detail-header"><NotificationTypeBadge type={selectedNotif.type} /><NotificationStatusBadge status={selectedNotif.status} isRead={selectedNotif.isRead} /></div>
            <p className="mt-3">{selectedNotif.message}</p>
            <div className="notif-detail-grid">
              <div><strong>From:</strong> {selectedNotif.sender_name || 'System'} ({selectedNotif.sender_role || 'System'})</div>
              <div><strong>To:</strong> {selectedNotif.recipientUser} ({selectedNotif.recipientRole})</div>
              {selectedNotif.relatedProject && <div><strong>Project:</strong> {selectedNotif.relatedProject}</div>}
              {selectedNotif.relatedTask && <div><strong>Task:</strong> {selectedNotif.relatedTask}</div>}
              <div><strong>Channels:</strong> {selectedNotif.channels.join(', ')}</div>
              <div><strong>Priority:</strong> {selectedNotif.priority}</div>
              <div><strong>Created:</strong> {selectedNotif.createdAt}</div>
              {selectedNotif.sentAt && <div><strong>Sent:</strong> {selectedNotif.sentAt}</div>}
              {selectedNotif.scheduledAt && <div><strong>Scheduled:</strong> {selectedNotif.scheduledAt}</div>}
              {selectedNotif.deliveryNotes && <div><strong>Notes:</strong> {selectedNotif.deliveryNotes}</div>}
            </div>
          </div>
          <div className="modal-footer">{clientReplyTarget(selectedNotif) && <button className="btn btn-primary" onClick={() => handleReply(selectedNotif)}><FiCornerUpLeft /> Reply to Client</button>}<button className="btn btn-light" onClick={() => { setShowViewModal(false); setSelectedNotif(null); }}>Close</button></div>
        </div></div></div>
      )}

      {showDeleteModal && selectedNotif && (
        <div className="modal-overlay"><div className="modal-dialog modal-sm notification-delete-modal"><div className="modal-content">
          <div className="modal-header"><h5 className="modal-title">Delete Notification</h5><button className="modal-close-btn" onClick={() => { setShowDeleteModal(false); setSelectedNotif(null); }}><FiX /></button></div>
          <div className="modal-body"><div className="delete-confirmation"><p>Are you sure you want to delete this notification?</p><div className="delete-info"><strong>{selectedNotif.title}</strong></div></div></div>
          <div className="modal-footer"><button className="btn btn-light" onClick={() => { setShowDeleteModal(false); setSelectedNotif(null); }}>Cancel</button><button className="btn btn-danger" onClick={confirmDelete}>Delete</button></div>
        </div></div></div>
      )}
    </AdminLayout>
  );
};

export default Notifications;



