// src/components/projectDetails/ProjectComments.jsx
import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { projectComments } from '../../data/projectDetailsData';

const ProjectComments = () => {
  const [comments, setComments] = useState(projectComments);
  const [newComment, setNewComment] = useState('');

  const addComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { id: Date.now(), user: 'Admin User', role: 'Admin', avatar: 'AU', message: newComment.trim(), dateTime: new Date().toISOString().replace('T', ' ').substring(0, 16) }]);
      setNewComment('');
    }
  };

  return (
    <div className="pd-comments">
      <div className="comments-list">
        {comments.map(c => (
          <div key={c.id} className="comment-item">
            <div className="comment-avatar">{c.avatar}</div>
            <div className="comment-body">
              <div className="comment-header"><strong>{c.user}</strong><span>{c.role}</span><span className="comment-time">{c.dateTime}</span></div>
              <p>{c.message}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="comment-input">
        <textarea className="form-control" rows="2" placeholder="Add a comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)}></textarea>
        <button className="btn btn-primary" onClick={addComment}><FiSend /> Post</button>
      </div>
    </div>
  );
};

export default ProjectComments;