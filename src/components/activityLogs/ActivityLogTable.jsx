// src/components/activityLogs/ActivityLogTable.jsx
import React from 'react';
import { FiEye } from 'react-icons/fi';
import ActivityTypeBadge from './ActivityTypeBadge';
import ActivityStatusBadge from './ActivityStatusBadge';

const ActivityLogTable = ({ activities, onView }) => (
  <div className="table-responsive">
    <table className="table act-table">
      <thead><tr><th>Activity</th><th>User</th><th>Role</th><th>Module</th><th>Type</th><th>Status</th><th>IP Address</th><th>Date & Time</th><th>Action</th></tr></thead>
      <tbody>
        {activities.length === 0 ? <tr><td colSpan="9" className="text-center py-5"><p className="text-muted">No activities found</p></td></tr> :
          activities.map(a => (
            <tr key={a.id} className={a.status === 'Critical' ? 'row-critical' : a.status === 'Failed' ? 'row-failed' : ''}>
              <td><div><span className="act-name">{a.title}</span><small className="d-block text-muted">{a.message.substring(0, 60)}...</small></div></td>
              <td>{a.userName}</td><td>{a.userRole}</td><td>{a.module}</td>
              <td><ActivityTypeBadge type={a.activityType} /></td><td><ActivityStatusBadge status={a.status} /></td>
              <td><code className="ip-code">{a.ipAddress}</code></td><td>{a.dateTime}</td>
              <td><button className="action-btn-icon view-btn" onClick={() => onView(a)}><FiEye /></button></td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
);

export default ActivityLogTable;