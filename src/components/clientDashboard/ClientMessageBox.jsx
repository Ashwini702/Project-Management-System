// src/components/clientDashboard/ClientMessageBox.jsx
import React, { useEffect, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import * as notificationService from '../../services/notificationService';
import { apiData } from '../../services/api';

const avatarFor = (name = '') => name.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase() || 'PMS';

const ClientMessageBox = ({ onAlert }) => {
  const { user } = useAuth();
  const [msgs, setMsgs] = useState([]);
  const [newMsg, setNewMsg] = useState('');
  const [recipientRole, setRecipientRole] = useState('Project Manager');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    notificationService.getNotifications()
      .then((response) => setMsgs(apiData(response)))
      .catch((error) => onAlert(error.response?.data?.message || 'Unable to load messages.', 'danger'))
      .finally(() => setLoading(false));
  }, []);

  const sendMsg = async () => {
    const message = newMsg.trim();
    if (!message) return;
    try {
      const response = await notificationService.createNotification({
        title: 'Client message',
        message,
        type: 'General Message',
        recipient_role: recipientRole,
        recipient_user: 'All',
        priority: 'Medium',
        status: 'Sent'
      });
      const sent = apiData(response);
      setMsgs((current) => [sent, ...current]);
      setNewMsg('');
      onAlert(`Message sent to ${recipientRole} and saved in the database.`, 'success');
    } catch (error) {
      onAlert(error.response?.data?.message || 'Unable to send message.', 'danger');
    }
  };

  return (
    <div className="cl-message-box">
      <h6>Messages</h6>
      <div className="cl-messages-list">
        {loading ? <p className="text-muted small">Loading messages…</p> : msgs.length === 0 ? <p className="text-muted small">No messages yet.</p> : msgs.map((message) => {
          const isSent = Number(message.sender_id) === Number(user?.id);
          const sender = message.sender_name || (isSent ? user?.name : 'System');
          const recipient = message.recipient_user || message.recipient_role || 'User';
          return (
            <div key={message.id} className={`cl-message-item ${isSent ? 'sent' : ''}`}>
              <div className="cl-msg-avatar">{avatarFor(sender)}</div>
              <div className="cl-msg-body">
                <div className="cl-msg-header">
                  <strong>{isSent ? 'You' : sender}</strong>
                  <span>{isSent ? `To: ${recipient}` : message.sender_role || 'Message'}</span>
                  <span className="cl-msg-time">{String(message.created_at || message.sent_at || '').replace('T', ' ').slice(0, 16)}</span>
                </div>
                <p>{message.message}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="cl-msg-recipient">
        <label htmlFor="dashboard-message-recipient">Send to</label>
        <select id="dashboard-message-recipient" className="form-select form-select-sm" value={recipientRole} onChange={(event) => setRecipientRole(event.target.value)}>
          <option value="Project Manager">Project Manager</option>
          <option value="Admin">Admin</option>
          <option value="Team Member">Team Member</option>
        </select>
      </div>
      <div className="cl-msg-input">
        <textarea className="form-control" rows="2" placeholder={`Message to ${recipientRole}...`} value={newMsg} onChange={(event) => setNewMsg(event.target.value)}></textarea>
        <button type="button" className="btn btn-primary" onClick={sendMsg}><FiSend /> Send</button>
      </div>
    </div>
  );
};

export default ClientMessageBox;