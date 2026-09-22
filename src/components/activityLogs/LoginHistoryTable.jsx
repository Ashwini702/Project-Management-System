// src/components/activityLogs/LoginHistoryTable.jsx
import React from 'react';
import ActivityStatusBadge from './ActivityStatusBadge';

const LoginHistoryTable = ({ logins }) => (
  <div className="table-responsive">
    <table className="table act-table">
      <thead><tr><th>User</th><th>Role</th><th>Email</th><th>Login Time</th><th>Logout Time</th><th>IP Address</th><th>Device</th><th>Browser</th><th>Location</th><th>Status</th></tr></thead>
      <tbody>
        {logins.length === 0 ? <tr><td colSpan="10" className="text-center py-5"><p className="text-muted">No login records found</p></td></tr> :
          logins.map(l => (
            <tr key={l.id} className={l.status === 'Failed' || l.status === 'Suspicious' ? 'row-failed' : ''}>
              <td><span className="act-name">{l.userName}</span></td><td>{l.role}</td><td>{l.email}</td>
              <td>{l.loginTime}</td><td className={l.logoutTime === 'Active' ? 'text-success fw-bold' : ''}>{l.logoutTime}</td>
              <td><code className="ip-code">{l.ipAddress}</code></td><td>{l.device}</td><td>{l.browser}</td><td>{l.location}</td>
              <td><ActivityStatusBadge status={l.status} /></td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
);

export default LoginHistoryTable;