// src/components/managerNotifications/ManagerNotificationPreferenceBox.jsx
import React from 'react';
const ManagerNotificationPreferenceBox = ({ title, children }) => (
  <div className="mgn-pref-box">
    <h6>{title}</h6>
    {children}
  </div>
);
export default ManagerNotificationPreferenceBox;