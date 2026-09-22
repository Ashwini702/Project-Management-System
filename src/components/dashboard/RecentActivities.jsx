// src/components/dashboard/RecentActivities.jsx
import React from 'react';

const RecentActivities = ({ activities }) => {
  const getActivityColor = (color) => {
    const colorMap = {
      primary: { bg: '#EEF2FF', icon: '#159CEF' },
      success: { bg: '#ECFDF5', icon: '#10B981' },
      info: { bg: '#EFF6FF', icon: '#3AACF1' },
      warning: { bg: '#FFFBEB', icon: '#F59E0B' },
      purple: { bg: '#F5F3FF', icon: '#AA7CCE' },
      danger: { bg: '#FEF2F2', icon: '#EF4444' }
    };
    return colorMap[color] || colorMap.primary;
  };

  return (
    <div className="recent-activities-card">
      <div className="card-header-custom">
        <h5 className="card-title-custom">Recent Activities</h5>
        <button className="btn btn-link view-all-btn">View All</button>
      </div>

      <div className="activities-list">
        {activities.map((activity) => {
          const Icon = activity.icon;
          const colors = getActivityColor(activity.color);
          
          return (
            <div key={activity.id} className="activity-item">
              <div 
                className="activity-icon-wrapper"
                style={{ backgroundColor: colors.bg }}
              >
                <Icon style={{ color: colors.icon }} />
              </div>
              <div className="activity-content">
                <h6 className="activity-title">{activity.title}</h6>
                <p className="activity-description">{activity.description}</p>
              </div>
              <span className="activity-time">{activity.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivities;