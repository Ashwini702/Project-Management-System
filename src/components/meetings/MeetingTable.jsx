// src/components/meetings/MeetingTable.jsx
import React from 'react';
import { FiEye, FiEdit2, FiTrash2, FiCheck } from 'react-icons/fi';
import MeetingStatusBadge from './MeetingStatusBadge';
import MeetingTypeBadge from './MeetingTypeBadge';

const MeetingTable = ({ meetings, onView, onEdit, onDelete, onMarkComplete }) => (
  <div className="table-responsive">
    <table className="table meetings-table">
      <thead><tr><th>Meeting Title</th><th>Type</th><th>Project</th><th>Date</th><th>Time</th><th>Mode</th><th>Participants</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>
        {meetings.length === 0 ? <tr><td colSpan="9" className="text-center py-5"><p className="text-muted mb-0">No meetings found</p></td></tr> :
          meetings.map(m => (
            <tr key={m.id}>
              <td><span className="meeting-name-text">{m.title}</span></td>
              <td><MeetingTypeBadge type={m.type} /></td>
              <td>{m.project}</td>
              <td>{m.date}</td>
              <td>{m.startTime} - {m.endTime}</td>
              <td><span className="mode-badge">{m.mode}</span></td>
              <td>{m.participants.length}</td>
              <td><MeetingStatusBadge status={m.status} /></td>
              <td><div className="action-buttons">
                <button className="action-btn-icon view-btn" onClick={() => onView(m)}><FiEye /></button>
                <button className="action-btn-icon edit-btn" onClick={() => onEdit(m)}><FiEdit2 /></button>
                {m.status !== 'Completed' && <button className="action-btn-icon complete-btn" onClick={() => onMarkComplete(m)}><FiCheck /></button>}
                <button className="action-btn-icon delete-btn" onClick={() => onDelete(m)}><FiTrash2 /></button>
              </div></td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
);

export default MeetingTable;