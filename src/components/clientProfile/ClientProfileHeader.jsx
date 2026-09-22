// src/components/clientProfile/ClientProfileHeader.jsx
import React from 'react';
import { FiMail, FiPhone, FiMapPin, FiCalendar, FiBriefcase, FiEdit2 } from 'react-icons/fi';
import ClientStatusBadge from './ClientStatusBadge';

const ClientProfileHeader = ({ profile, companyName, onEdit }) => (
  <div className="cprof-header-card">
    <div className="cprof-header-top">
      <div className="cprof-avatar-section">
        <div className="cprof-avatar-lg">{profile.profilePhotoUrl ? <img src={profile.profilePhotoUrl} alt={profile.name} /> : profile.avatar}</div>
        <ClientStatusBadge status={profile.status} />
      </div>
      <div className="cprof-header-info">
        <h3>{profile.name}</h3>
        <span className="cprof-company">{companyName}</span>
        <span className="cprof-role">{profile.designation}</span>
        <p className="cprof-bio">{profile.bio}</p>
      </div>
      <button className="btn btn-primary btn-sm" onClick={onEdit}><FiEdit2 /> Edit Profile</button>
    </div>
    <div className="cprof-header-meta">
      <span><FiMail /> {profile.email}</span>
      <span><FiPhone /> {profile.phone}</span>
      <span><FiMapPin /> {profile.city}, {profile.country}</span>
      <span><FiCalendar /> Client since: {profile.accountCreatedDate}</span>
      <span><FiBriefcase /> ID: {profile.clientId}</span>
    </div>
  </div>
);
export default ClientProfileHeader;