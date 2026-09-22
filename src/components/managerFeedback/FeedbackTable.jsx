// src/components/managerFeedback/FeedbackTable.jsx
import React from 'react';
import { FiEye, FiEdit3, FiCheck, FiThumbsUp, FiThumbsDown, FiTrash2, FiStar } from 'react-icons/fi';
import FeedbackStatusBadge from './FeedbackStatusBadge';
import FeedbackPriorityBadge from './FeedbackPriorityBadge';

const FeedbackTable = ({ feedbacks, onView, onRespond, onResolve, onApprove, onReject, onDelete }) => (
  <div className="table-responsive">
    <table className="table mfb-table">
      <thead><tr><th>Feedback</th><th>Client</th><th>Company</th><th>Project</th><th>Category</th><th>Priority</th><th>Status</th><th>Rating</th><th>Date</th><th>Actions</th></tr></thead>
      <tbody>
        {feedbacks.length === 0 ? <tr><td colSpan="10" className="text-center py-5"><p className="text-muted">No feedback found</p></td></tr> :
          feedbacks.map(f => (
            <tr key={f.id}>
              <td><div><span className="mfb-name">{f.title}</span><small className="d-block text-muted">{f.message.substring(0, 50)}...</small></div></td>
              <td>{f.clientName}</td><td>{f.companyName}</td><td>{f.projectName}</td>
              <td><span className="mfb-cat-tag">{f.category}</span></td>
              <td><FeedbackPriorityBadge priority={f.priority} /></td><td><FeedbackStatusBadge status={f.status} /></td>
              <td><span className="mfb-rating-sm">{[...Array(5)].map((_, i) => <FiStar key={i} className={i < f.rating ? 'filled' : ''} />)}</span></td>
              <td>{f.submittedDate}</td>
              <td><div className="action-buttons">
                <button className="action-btn-icon view-btn" onClick={() => onView(f)}><FiEye /></button>
                <button className="action-btn-icon respond-btn" onClick={() => onRespond(f)}><FiEdit3 /></button>
                {f.status !== 'Resolved' && <button className="action-btn-icon resolve-btn" onClick={() => onResolve(f)}><FiCheck /></button>}
                <button className="action-btn-icon approve-btn" onClick={() => onApprove(f)}><FiThumbsUp /></button>
                <button className="action-btn-icon reject-btn" onClick={() => onReject(f)}><FiThumbsDown /></button>
                <button className="action-btn-icon delete-btn" onClick={() => onDelete(f)}><FiTrash2 /></button>
              </div></td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
);
export default FeedbackTable;