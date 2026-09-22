// src/components/managerProfile/ManagerProfileHeader.jsx
import React from 'react';
import { FiMail, FiPhone, FiMapPin, FiCalendar, FiBriefcase, FiEdit2 } from 'react-icons/fi';
import ManagerStatusBadge from './ManagerStatusBadge';

const ManagerProfileHeader = ({ profile, onEdit }) => (
  <div className="mp-header-card">
    <div className="mp-header-top">
      <div className="mp-avatar-section">
        <div className="mp-avatar-lg">{profile.profilePhotoUrl ? <img src={profile.profilePhotoUrl} alt={profile.name} /> : profile.avatar}</div>
        <ManagerStatusBadge status={profile.status} />
      </div>
      <div className="mp-header-info">
        <h3>{profile.name}</h3>
        <span className="mp-role">{profile.role}</span>
        <span className="mp-dept">{profile.department}</span>
        <p className="mp-bio">{profile.bio}</p>
      </div>
      <button className="btn btn-primary btn-sm" onClick={onEdit}><FiEdit2 /> Edit Profile</button>
    </div>
    <div className="mp-header-meta">
      <span><FiMail /> {profile.email}</span>
      <span><FiPhone /> {profile.phone}</span>
      <span><FiMapPin /> {profile.city}, {profile.country}</span>
      <span><FiCalendar /> Joined: {profile.joiningDate}</span>
      <span><FiBriefcase /> ID: {profile.employeeId}</span>
    </div>
  </div>
);
export default ManagerProfileHeader;