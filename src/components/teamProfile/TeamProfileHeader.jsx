// src/components/teamProfile/TeamProfileHeader.jsx
import React from 'react';
import { FiMail, FiPhone, FiMapPin, FiCalendar, FiBriefcase, FiEdit2 } from 'react-icons/fi';
import TeamStatusBadge from './TeamStatusBadge';

const TeamProfileHeader = ({ profile, onEdit }) => (
  <div className="tprof-header-card">
    <div className="tprof-header-top">
      <div className="tprof-avatar-section">
        <div className="tprof-avatar-lg">{profile.profile_image_name ? <img src={`${window.location.origin.replace(/:\\d+$/, ':5000')}/uploads/profiles/${encodeURIComponent(profile.profile_image_name)}`} alt={profile.name} /> : profile.avatar}</div>
        <TeamStatusBadge status={profile.availabilityStatus} />
      </div>
      <div className="tprof-header-info">
        <h3>{profile.name}</h3>
        <span className="tprof-role">{profile.role}</span>
        <span className="tprof-dept">{profile.department} • {profile.workMode}</span>
        <p className="tprof-bio">{profile.bio}</p>
      </div>
      <button className="btn btn-primary btn-sm" onClick={onEdit}><FiEdit2 /> Edit Profile</button>
    </div>
    <div className="tprof-header-meta">
      <span><FiMail /> {profile.email}</span>
      <span><FiPhone /> {profile.phone}</span>
      <span><FiMapPin /> {profile.city}, {profile.country}</span>
      <span><FiCalendar /> Joined: {profile.joiningDate}</span>
      <span><FiBriefcase /> ID: {profile.employeeId}</span>
    </div>
  </div>
);
export default TeamProfileHeader;