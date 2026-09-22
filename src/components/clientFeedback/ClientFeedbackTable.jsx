// src/components/clientFeedback/ClientFeedbackTable.jsx
import React from 'react';
import { FiEye, FiEdit2, FiTrash2, FiMessageSquare, FiStar } from 'react-icons/fi';
import ClientFeedbackStatusBadge from './ClientFeedbackStatusBadge';
import ClientFeedbackPriorityBadge from './ClientFeedbackPriorityBadge';

const ClientFeedbackTable = ({ feedbacks, onView, onEdit, onDelete, onAddResponse }) => (
  <div className="table-responsive">
    <table className="table clfb-table">
      <thead><tr><th>Feedback</th><th>Project</th><th>Category</th><th>Priority</th><th>Status</th><th>Rating</th><th>Submitted</th><th>Response</th><th>Actions</th></tr></thead>
      <tbody>
        {feedbacks.length === 0 ? <tr><td colSpan="9" className="text-center py-5"><p className="text-muted">No feedback found</p></td></tr> :
          feedbacks.map(f => (
            <tr key={f.id}>
              <td><div><span className="clfb-name">{f.title}</span><small className="d-block text-muted">{f.message.substring(0, 40)}...</small></div></td>
              <td>{f.projectName}</td>
              <td><span className="clfb-cat-tag">{f.category}</span></td>
              <td><ClientFeedbackPriorityBadge priority={f.priority} /></td>
              <td><ClientFeedbackStatusBadge status={f.status} /></td>
              <td><span className="clfb-rating-sm">{[...Array(5)].map((_, i) => <FiStar key={i} className={i < f.rating ? 'filled' : ''} />)}</span></td>
              <td>{f.submittedDate}</td><td>{f.lastResponseDate}</td>
              <td><div className="action-buttons">
                <button className="action-btn-icon view-btn" onClick={() => onView(f)}><FiEye /></button>
                <button className="action-btn-icon edit-btn" onClick={() => onEdit(f)}><FiEdit2 /></button>
                <button className="action-btn-icon resp-btn" onClick={() => onAddResponse(f)}><FiMessageSquare /></button>
                <button className="action-btn-icon delete-btn" onClick={() => onDelete(f)}><FiTrash2 /></button>
              </div></td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
);
export default ClientFeedbackTable;