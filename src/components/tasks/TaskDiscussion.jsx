// src/components/tasks/TaskDiscussion.jsx
import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';

const TaskDiscussion = ({ discussions = [], editable = false }) => {
  const [messages, setMessages] = useState(discussions);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: Date.now(),
        user: 'Current User',
        avatar: 'CU',
        message: newMessage.trim(),
        time: 'Just now'
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  return (
    <div className="task-discussion">
      <h6 className="discussion-title">
        Discussion
        <span className="discussion-count">{messages.length}</span>
      </h6>
      <div className="discussion-list">
        {messages.length === 0 ? (
          <p className="text-muted text-center py-3">No comments yet</p>
        ) : (
          messages.map(msg => (
            <div key={msg.id} className="discussion-item">
              <div className="discussion-avatar">{msg.avatar}</div>
              <div className="discussion-content">
                <div className="discussion-header">
                  <strong>{msg.user}</strong>
                  <span className="discussion-time">{msg.time}</span>
                </div>
                <p className="discussion-text">{msg.message}</p>
              </div>
            </div>
          ))
        )}
      </div>
      {editable && (
        <div className="discussion-input">
          <input
            type="text"
            className="form-control"
            placeholder="Write a comment..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button className="btn btn-sm btn-primary" onClick={sendMessage}>
            <FiSend />
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskDiscussion;