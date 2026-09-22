// src/components/teamNotifications/TeamNotificationPreferenceBox.jsx
import React from 'react';
const TeamNotificationPreferenceBox = ({ title, children }) => (
  <div className="tn-pref-box"><h6>{title}</h6>{children}</div>
);
export default TeamNotificationPreferenceBox;