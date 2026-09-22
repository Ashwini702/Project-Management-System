// src/pages/client/ClientMessages.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import * as notificationService from '../../services/notificationService';
import { apiData } from '../../services/api';
import ClientLayout from '../../layouts/ClientLayout';
import ClientMessageStatsCard from '../../components/clientMessages/ClientMessageStatsCard';
import ClientMessageCard from '../../components/clientMessages/ClientMessageCard';
import ClientConversationList from '../../components/clientMessages/ClientConversationList';
import ClientChatWindow from '../../components/clientMessages/ClientChatWindow';
import ClientMessageDetailsModal from '../../components/clientMessages/ClientMessageDetailsModal';
import ClientComposeMessageModal from '../../components/clientMessages/ClientComposeMessageModal';
import ClientSupportBox from '../../components/clientMessages/ClientSupportBox';
import ClientMessageAttachmentBox from '../../components/clientMessages/ClientMessageAttachmentBox';
import { FiSearch, FiRotateCcw, FiInbox, FiMessageCircle, FiHelpCircle, FiArchive, FiPlus, FiCheck, FiX } from 'react-icons/fi';
import { messageTypes } from '../../data/clientMessagesData';
import '../../styles/clientMessages.css';

const ClientMessages = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [projectFilter, setProjectFilter] = useState('All Projects');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [senderFilter, setSenderFilter] = useState('All Senders');
  const [dateFilter, setDateFilter] = useState('All Dates');
  const [viewMode, setViewMode] = useState('inbox');
  const [selectedConv, setSelectedConv] = useState(null);
  const [alert, setAlert] = useState(null);

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const showAlert = (m, t = 'info') => { setAlert({ message: m, type: t }); setTimeout(() => setAlert(null), 2000); };
  useEffect(() => {
    notificationService.getNotifications().then((response) => {
      const currentUserId = Number(user?.id);
      setMessages(apiData(response).map((item) => ({
        id: item.id, senderName: item.sender_name || 'System', senderRole: item.sender_role || 'System', senderEmail: '',
        subject: item.title || 'Message', message: item.message || '', projectName: item.related_project || '',
        type: item.type || 'General Message', status: item.status || (item.is_read ? 'Read' : 'Unread'), priority: item.priority || 'Medium',
        sentAt: item.created_at || '', attachmentCount: 0, isRead: Boolean(item.is_read), replies: [],
        isOwn: Number(item.sender_id) === currentUserId
      })));
    }).catch(() => showAlert('Unable to load messages from the database.', 'danger'));
  }, [user?.id]);
  const projects = useMemo(() => [...new Set(messages.map((message) => message.projectName).filter(Boolean))], [messages]);
  const senders = useMemo(() => [...new Set(messages.map((message) => message.senderRole).filter(Boolean))], [messages]);
  const messageStats = useMemo(() => ([
    { id: 'total', title: 'Total Messages', desc: 'Saved messages', value: messages.length, color: 'primary', icon: 'FiMail' },
    { id: 'unread', title: 'Unread', desc: 'Awaiting review', value: messages.filter((message) => !message.isRead).length, color: 'warning', icon: 'FiMessageCircle' },
    { id: 'sent', title: 'Sent', desc: 'Messages you sent', value: messages.filter((message) => message.isOwn).length, color: 'success', icon: 'FiMessageSquare' }
  ]), [messages]);
  const conversations = useMemo(() => [], []);

  const filteredMessages = useMemo(() => {
    return messages.filter(m => {
      const matchesSearch = !searchTerm || m.subject.toLowerCase().includes(searchTerm.toLowerCase()) || m.message.toLowerCase().includes(searchTerm.toLowerCase()) || m.senderName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesProject = projectFilter === 'All Projects' || m.projectName === projectFilter;
      const matchesType = typeFilter === 'All Types' || m.type === typeFilter;
      const matchesStatus = statusFilter === 'All Status' || m.status === statusFilter || (statusFilter === 'Read' && m.isRead) || (statusFilter === 'Unread' && !m.isRead);
      const matchesSender = senderFilter === 'All Senders' || m.senderRole === senderFilter;
      return matchesSearch && matchesProject && matchesType && matchesStatus && matchesSender;
    });
  }, [messages, searchTerm, projectFilter, typeFilter, statusFilter, senderFilter]);

  const resetFilters = () => { setSearchTerm(''); setProjectFilter('All Projects'); setTypeFilter('All Types'); setStatusFilter('All Status'); setSenderFilter('All Senders'); setDateFilter('All Dates'); };

  const handleMarkAllRead = () => { setMessages(messages.map(m => ({ ...m, isRead: true, status: 'Read' }))); showAlert('All messages marked as read!', 'success'); };
  const handleView = (m) => { setSelectedMessage(m); setShowDetailsModal(true); };
  const handleToggleRead = (m) => { setMessages(messages.map(msg => msg.id === m.id ? { ...msg, isRead: !msg.isRead, status: !msg.isRead ? 'Read' : 'Unread' } : msg)); };
  const handleToggleImportant = (m) => { setMessages(messages.map(msg => msg.id === m.id ? { ...msg, status: msg.status === 'Important' ? 'Read' : 'Important', isRead: true } : msg)); };
  const handleArchive = (m) => { setMessages(messages.map(msg => msg.id === m.id ? { ...msg, status: 'Archived', isRead: true } : msg)); showAlert('Message archived!', 'success'); };
  const handleDelete = (m) => { setSelectedMessage(m); setShowDeleteModal(true); };
  const confirmDelete = () => { setMessages(messages.filter(m => m.id !== selectedMessage.id)); setShowDeleteModal(false); showAlert('Message deleted!', 'success'); };

const handleComposeSubmit = async (form) => {
    try {
      await notificationService.createNotification({ title: form.subject, message: form.message, type: form.type, recipient_role: form.sendTo, recipient_user: 'All', related_project: form.projectName, priority: form.priority, status: 'Sent' });
      setMessages([{ id: Date.now(), senderName: user?.name || 'Client', senderRole: 'Client', senderEmail: user?.email || '', subject: form.subject, message: form.message, projectName: form.projectName, type: form.type, status: 'Read', priority: form.priority, sentAt: new Date().toISOString().replace('T', ' ').substring(0, 16), attachmentCount: 0, isRead: true, replies: [] }, ...messages]);
      setShowComposeModal(false); showAlert(`Message sent to ${form.sendTo} and saved in database!`, 'success');
    } catch (error) { showAlert(error.response?.data?.message || 'Unable to send message.', 'danger'); }
  };

  const handleCloseTicket = (t) => { setTickets(tickets.map(tk => tk.id === t.id ? { ...tk, status: 'Closed' } : tk)); showAlert('Ticket closed!', 'success'); };

  return (
    <ClientLayout>
      <div className="cmsg-dashboard">
        <div className="cmsg-dash-header">
          <div><h3>Messages</h3><p>Communicate with your project manager, team, and support regarding projects, files, feedback, and updates.</p></div>
          <div className="d-flex gap-2">
            <button className="btn btn-primary btn-sm" onClick={() => setShowComposeModal(true)}><FiPlus /> Compose</button>
            <button className="btn btn-outline-primary btn-sm" onClick={handleMarkAllRead}><FiCheck /> Mark All Read</button>
          </div>
        </div>
        {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`}>{alert.message}<button className="btn-close" onClick={() => setAlert(null)}></button></div>}

        <div className="cmsg-stats-grid">{messageStats.map(s => <ClientMessageStatsCard key={s.id} stat={s} />)}</div>

        <div className="filter-section"><div className="filter-row">
          <div className="search-box"><FiSearch className="search-icon" /><input type="text" className="form-control search-input" placeholder="Search messages..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
          <div className="filter-selects">
            <select className="form-select" value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)}><option value="All Projects">All Projects</option>{projects.map(p => <option key={p} value={p}>{p}</option>)}</select>
            <select className="form-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}><option value="All Types">All Types</option>{messageTypes.map(t => <option key={t} value={t}>{t}</option>)}</select>
            <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}><option value="All Status">All Status</option><option>Read</option><option>Unread</option><option>Important</option><option>Archived</option></select>
            <select className="form-select" value={senderFilter} onChange={(e) => setSenderFilter(e.target.value)}><option value="All Senders">All Senders</option>{senders.map(s => <option key={s} value={s}>{s}</option>)}</select>
          </div>
          <button className="btn btn-light reset-btn" onClick={resetFilters}><FiRotateCcw className="me-2" /> Reset</button>
          <div className="view-toggle">
            <button className={`toggle-btn ${viewMode === 'inbox' ? 'active' : ''}`} onClick={() => setViewMode('inbox')}><FiInbox /></button>
            <button className={`toggle-btn ${viewMode === 'chat' ? 'active' : ''}`} onClick={() => setViewMode('chat')}><FiMessageCircle /></button>
            <button className={`toggle-btn ${viewMode === 'support' ? 'active' : ''}`} onClick={() => setViewMode('support')}><FiHelpCircle /></button>
            <button className={`toggle-btn ${viewMode === 'archived' ? 'active' : ''}`} onClick={() => setViewMode('archived')}><FiArchive /></button>
          </div>
        </div></div>

        {viewMode === 'inbox' && (
          <div>
            <div className="cmsg-inbox-list">{filteredMessages.filter(m => m.status !== 'Archived').length === 0 ? <p className="text-center text-muted py-5">No messages found</p> : filteredMessages.filter(m => m.status !== 'Archived').map(m => <ClientMessageCard key={m.id} message={m} onView={handleView} onReply={() => setShowComposeModal(true)} onToggleRead={handleToggleRead} onToggleImportant={handleToggleImportant} onArchive={handleArchive} onDelete={handleDelete} />)}</div>

          </div>
        )}
        {viewMode === 'chat' && (
          <div className="cmsg-chat-layout">
            <ClientConversationList conversations={conversations} selectedId={selectedConv} onSelect={setSelectedConv} />
            <ClientChatWindow conversation={conversations.find(c => c.id === selectedConv)} onAlert={showAlert} />
          </div>
        )}
        {viewMode === 'support' && <div className="cmsg-inbox-list"><p className="text-center text-muted py-5">No support tickets found.</p></div>}
        {viewMode === 'archived' && <div className="cmsg-inbox-list">{filteredMessages.filter(m => m.status === 'Archived').length === 0 ? <p className="text-muted text-center py-5">No archived messages</p> : filteredMessages.filter(m => m.status === 'Archived').map(m => <ClientMessageCard key={m.id} message={m} onView={handleView} onReply={() => setShowComposeModal(true)} onToggleRead={handleToggleRead} onToggleImportant={handleToggleImportant} onArchive={handleArchive} onDelete={handleDelete} />)}</div>}

        <ClientMessageDetailsModal show={showDetailsModal} onClose={() => setShowDetailsModal(false)} message={selectedMessage} />
        <ClientComposeMessageModal show={showComposeModal} onClose={() => setShowComposeModal(false)} onSubmit={handleComposeSubmit} />

        {showDeleteModal && selectedMessage && (
          <div className="modal-overlay"><div className="modal-dialog modal-sm"><div className="modal-content">
            <div className="modal-header"><h5 className="modal-title">Delete Message</h5><button className="modal-close-btn" onClick={() => setShowDeleteModal(false)}><FiX /></button></div>
            <div className="modal-body"><p>Are you sure?</p><div className="delete-info"><strong>{selectedMessage.subject}</strong></div></div>
            <div className="modal-footer"><button className="btn btn-light" onClick={() => setShowDeleteModal(false)}>Cancel</button><button className="btn btn-danger" onClick={confirmDelete}>Delete</button></div>
          </div></div></div>
        )}
      </div>
    </ClientLayout>
  );
};

export default ClientMessages;
