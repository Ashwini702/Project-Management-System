// src/components/managerProfile/ManagerProfessionalInfo.jsx
import React from 'react';
import { FiBriefcase, FiUser, FiCalendar, FiAward, FiStar, FiUsers, FiFolder } from 'react-icons/fi';
import ManagerStatusBadge from './ManagerStatusBadge';

const ManagerProfessionalInfo = ({ profile }) => (
  <div>
    <div className="mp-info-card mb-3">
      <h6>Professional Details</h6>
      <div className="mp-info-grid">
        <div><FiBriefcase /><span>Employee ID:</span><strong>{profile.employeeId}</strong></div>
        <div><FiUser /><span>Designation:</span><strong>{profile.role}</strong></div>
        <div><FiFolder /><span>Department:</span><strong>{profile.department}</strong></div>
        <div><FiUser /><span>Reports To:</span><strong>{profile.reportingManager}</strong></div>
        <div><FiCalendar /><span>Joined:</span><strong>{profile.joiningDate}</strong></div>
        <div><FiAward /><span>Experience:</span><strong>{profile.workExperience}</strong></div>
        <div><FiStar /><span>Work Mode:</span><strong>{profile.workMode}</strong></div>
        <div><FiUsers /><span>Status:</span><ManagerStatusBadge status={profile.status} /></div>
      </div>
    </div>
    <div className="mp-info-card mb-3">
      <h6>Skills</h6>
      <div className="mp-skills">{profile.skills.map(s => <span key={s} className="mp-skill-tag">{s}</span>)}</div>
    </div>
    <div className="mp-info-card">
      <h6>Certifications</h6>
      <div className="mp-certs">{profile.certifications.map(c => <span key={c} className="mp-cert-tag">{c}</span>)}</div>
    </div>
  </div>
);
export default ManagerProfessionalInfo;