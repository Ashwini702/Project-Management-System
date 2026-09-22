import React, { useState } from 'react';

const ManagerNotificationPreferences = ({ onSave }) => {
  const [preferences, setPreferences] = useState({
    taskUpdates: true,
    deadlineAlerts: true,
    meetingReminders: true,
    clientFeedback: false,
    weeklySummary: true
  });

  const togglePreference = (key) => {
    setPreferences((current) => ({ ...current, [key]: !current[key] }));
  };

  return (
    <div className="mp-card">
      <div className="mp-card-header">
        <h5>Notification Preferences</h5>
      </div>
      <div className="mp-preferences-list">
        {Object.entries(preferences).map(([key, enabled]) => (
          <label className="mp-preference-row" key={key}>
            <span>{key.replace(/([A-Z])/g, ' $1').replace(/^./, (char) => char.toUpperCase())}</span>
            <input type="checkbox" checked={enabled} onChange={() => togglePreference(key)} />
          </label>
        ))}
      </div>
      <button className="btn btn-primary btn-sm mt-3" onClick={onSave}>
        Save Preferences
      </button>
    </div>
  );
};

export default ManagerNotificationPreferences;
