// src/components/teamProfile/TeamProfessionalInfo.jsx
import React from 'react';
import { FiBriefcase, FiUser, FiCalendar, FiClock, FiFolder, FiCheckSquare, FiMail } from 'react-icons/fi';
import TeamStatusBadge from './TeamStatusBadge';

const TeamProfessionalInfo = ({ info }) => (
  <div className="tprof-info-card">
    <h6>Professional Details</h6>
    <div className="tprof-info-grid">
      <div><FiBriefcase /><span>ID:</span><strong>{info.employeeId}</strong></div>
      <div><FiUser /><span>Designation:</span><strong>{info.designation}</strong></div>
      <div><FiFolder /><span>Department:</span><strong>{info.department}</strong></div>
      <div><FiUser /><span>Reports To:</span><strong>{info.reportingManager}</strong></div>
      <div><FiCalendar /><span>Joined:</span><strong>{info.joiningDate}</strong></div>
      <div><FiBriefcase /><span>Experience:</span><strong>{info.experience}</strong></div>
      <div><FiBriefcase /><span>Type:</span><strong>{info.employmentType}</strong></div>
      <div><FiClock /><span>Shift:</span><strong>{info.shiftTiming}</strong></div>
      <div><FiMail /><span>Email:</span><strong>{info.officialEmail}</strong></div>
      <div><span>Mode:</span><strong>{info.workMode}</strong></div>
      <div><span>Status:</span><TeamStatusBadge status={info.availability} /></div>
      <div><span>Projects:</span><strong>{info.activeProjects}</strong></div>
    </div>
  </div>
);
export default TeamProfessionalInfo;