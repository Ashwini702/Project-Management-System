// src/components/settings/SettingsSidebar.jsx
import React from 'react';
import { FiUser, FiShield, FiLock, FiSettings, FiBell, FiMonitor, FiLink, FiCpu } from 'react-icons/fi';
const iconMap = { FiUser, FiShield, FiLock, FiSettings, FiBell, FiMonitor, FiLink, FiCpu };

const SettingsSidebar = ({ categories, activeTab, onTabChange }) => (
  <div className="settings-sidebar">
    {categories.map(cat => {
      const Icon = iconMap[cat.icon];
      return (
        <button key={cat.id} className={`settings-nav-item ${activeTab === cat.id ? 'active' : ''}`} onClick={() => onTabChange(cat.id)}>
          <Icon className="sni-icon" />
          <div className="sni-text">
            <span className="sni-label">{cat.label}</span>
            <span className="sni-desc">{cat.desc}</span>
          </div>
        </button>
      );
    })}
  </div>
);
export default SettingsSidebar;