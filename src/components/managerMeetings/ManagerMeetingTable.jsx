// src/components/managerMeetings/ManagerMeetingTable.jsx
import React from 'react';
import { FiEye, FiEdit2, FiCheck, FiEdit3, FiTrash2 } from 'react-icons/fi';
import MeetingStatusBadge from './MeetingStatusBadge';
import MeetingTypeBadge from './MeetingTypeBadge';

const ManagerMeetingTable = ({ meetings, onView, onEdit, onMarkComplete, onAddNotes, onDelete }) => (
  <div className="table-responsive">
    <table className="table mmt-table">
      <thead><tr><th>Title</th><th>Type</th><th>Project</th><th>Client</th><th>Date</th><th>Time</th><th>Mode</th><th>Participants</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>
        {meetings.length === 0 ? <tr><td colSpan="10" className="text-center py-5"><p className="text-muted">No meetings found</p></td></tr> :
          meetings.map(m => (
            <tr key={m.id}>
              <td><span className="mmt-name">{m.title}</span></td>
              <td><MeetingTypeBadge type={m.type} /></td><td>{m.project}</td><td>{m.client || '-'}</td>
              <td>{m.date}</td><td>{m.startTime} - {m.endTime}</td><td><span className="mmt-mode-tag">{m.mode}</span></td>
              <td>{m.participants.length}</td><td><MeetingStatusBadge status={m.status} /></td>
              <td><div className="action-buttons">
                <button className="action-btn-icon view-btn" onClick={() => onView(m)}><FiEye /></button>
                <button className="action-btn-icon edit-btn" onClick={() => onEdit(m)}><FiEdit2 /></button>
                {m.status !== 'Completed' && <button className="action-btn-icon complete-btn" onClick={() => onMarkComplete(m)}><FiCheck /></button>}
                <button className="action-btn-icon notes-btn" onClick={() => onAddNotes(m)}><FiEdit3 /></button>
                <button className="action-btn-icon delete-btn" onClick={() => onDelete(m)}><FiTrash2 /></button>
              </div></td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
);
export default ManagerMeetingTable;