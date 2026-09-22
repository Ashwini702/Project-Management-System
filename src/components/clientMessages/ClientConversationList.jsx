// src/components/clientMessages/ClientConversationList.jsx
import React from 'react';

const ClientConversationList = ({ conversations, selectedId, onSelect }) => (
  <div className="cmsg-conv-list">
    {conversations.map(c => (
      <div key={c.id} className={`cmsg-conv-item ${selectedId === c.id ? 'active' : ''} ${c.unreadCount > 0 ? 'unread' : ''}`} onClick={() => onSelect(c.id)}>
        <div className="cmsg-conv-avatar">
          {c.contactName.split(' ').map(n => n[0]).join('')}
          <span className={`cmsg-online-dot ${c.isOnline ? 'online' : ''}`}></span>
        </div>
        <div className="cmsg-conv-info">
          <div className="cmsg-conv-header">
            <strong>{c.contactName}</strong>
            <span className="cmsg-conv-time">{c.lastMessageTime.split(' ')[0]}</span>
          </div>
          <span className="cmsg-conv-role">{c.contactRole} • {c.projectName}</span>
          <p className="cmsg-conv-msg">{c.lastMessage}</p>
        </div>
        {c.unreadCount > 0 && <span className="cmsg-conv-badge">{c.unreadCount}</span>}
      </div>
    ))}
  </div>
);
export default ClientConversationList;