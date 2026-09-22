// src/components/activityLogs/ActivityLogCard.jsx
import React from 'react';
import { FiEye, FiClock, FiUser, FiMonitor } from 'react-icons/fi';
import ActivityTypeBadge from './ActivityTypeBadge';
import ActivityStatusBadge from './ActivityStatusBadge';

const ActivityLogCard = ({ activity, onView }) => (
  <div className={`activity-log-card ${activity.status === 'Critical' ? 'critical' : activity.status === 'Failed' ? 'failed' : ''}`}>
    <div className="alc-header">
      <ActivityTypeBadge type={activity.activityType} />
      <ActivityStatusBadge status={activity.status} />
    </div>
    <h6 className="alc-title">{activity.title}</h6>
    <p className="alc-message">{activity.message}</p>
    <div className="alc-meta">
      <span><FiUser /> {activity.userName} ({activity.userRole})</span>
      <span><FiMonitor /> {activity.module}</span>
    </div>
    <div className="alc-footer">
      <span className="alc-time"><FiClock /> {activity.dateTime}</span>
      <span className="alc-ip">{activity.ipAddress}</span>
      <button className="alc-view-btn" onClick={() => onView(activity)}><FiEye /> Details</button>
    </div>
  </div>
);

export default ActivityLogCard;