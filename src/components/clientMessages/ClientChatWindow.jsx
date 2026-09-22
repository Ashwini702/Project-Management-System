// src/components/clientMessages/ClientChatWindow.jsx
import React, { useState } from 'react';
import { FiSend, FiPaperclip, FiSmile } from 'react-icons/fi';

const ClientChatWindow = ({ conversation, onAlert }) => {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');

  const sendMessage = () => {
    if (newMsg.trim()) {
      setMessages([...messages, { id: Date.now(), conversationId: conversation.id, sender: 'Rahul Sharma', senderRole: 'Client', message: newMsg.trim(), time: new Date().toISOString().replace('T', ' ').substring(0, 16), isOwn: true }]);
      setNewMsg('');
      onAlert('Message sent!', 'success');
    }
  };

  if (!conversation) return <div className="cmsg-chat-empty"><p>Select a conversation to start chatting</p></div>;

  return (
    <div className="cmsg-chat-window">
      <div className="cmsg-chat-header">
        <div className="cmsg-chat-contact">
          <div className="cmsg-chat-avatar">{conversation.contactName.split(' ').map(n => n[0]).join('')}</div>
          <div>
            <strong>{conversation.contactName}</strong>
            <span>{conversation.contactRole} • {conversation.projectName}</span>
          </div>
        </div>
      </div>
      <div className="cmsg-chat-messages">
        {messages.map(m => (
          <div key={m.id} className={`cmsg-chat-bubble ${m.isOwn ? 'own' : ''}`}>
            {!m.isOwn && <div className="cmsg-chat-bubble-avatar">{m.sender.split(' ').map(n => n[0]).join('')}</div>}
            <div className="cmsg-chat-bubble-content">
              <p>{m.message}</p>
              <span className="cmsg-chat-bubble-time">{m.time}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="cmsg-chat-input">
        <button className="cmsg-chat-btn"><FiPaperclip /></button>
        <input type="text" className="form-control" placeholder="Type a message..." value={newMsg} onChange={(e) => setNewMsg(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && sendMessage()} />
        <button className="cmsg-chat-btn"><FiSmile /></button>
        <button className="btn btn-primary btn-sm" onClick={sendMessage}><FiSend /> Send</button>
      </div>
    </div>
  );
};
export default ClientChatWindow;