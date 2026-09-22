// src/components/taskDetails/TaskDiscussionBox.jsx
import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { discussionComments } from '../../data/taskDetailsData';

const TaskDiscussionBox = () => {
  const [comments, setComments] = useState(discussionComments);
  const [newComment, setNewComment] = useState('');

  const addComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { id: Date.now(), user: 'Current User', role: 'Team Member', avatar: 'CU', message: newComment.trim(), dateTime: new Date().toISOString().replace('T', ' ').substring(0, 16) }]);
      setNewComment('');
    }
  };

  return (
    <div className="td-discussion">
      <div className="discussion-list">
        {comments.map(c => (
          <div key={c.id} className="discussion-item">
            <div className="discussion-avatar">{c.avatar}</div>
            <div className="discussion-body">
              <div className="discussion-header"><strong>{c.user}</strong><span>{c.role}</span><span className="discussion-time">{c.dateTime}</span></div>
              <p>{c.message}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="discussion-input">
        <textarea className="form-control" rows="2" placeholder="Add a comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)}></textarea>
        <button className="btn btn-primary" onClick={addComment}><FiSend /> Post</button>
      </div>
    </div>
  );
};

export default TaskDiscussionBox;