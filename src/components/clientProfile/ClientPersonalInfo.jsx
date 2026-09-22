// src/components/clientProfile/ClientPersonalInfo.jsx
import React from 'react';
import { FiUser, FiMail, FiPhone, FiPhoneCall, FiMapPin, FiFlag, FiGlobe, FiHome, FiAlertCircle, FiMessageCircle, FiBriefcase, FiCalendar } from 'react-icons/fi';

const ClientPersonalInfo = ({ profile }) => (
  <div className="cprof-info-card">
    <h6>Personal Information</h6>
    <div className="cprof-info-grid">
      <div><FiUser /><span>Name:</span><strong>{profile.name}</strong></div>
      <div><FiMail /><span>Email:</span><strong>{profile.email}</strong></div>
      <div><FiPhone /><span>Phone:</span><strong>{profile.phone}</strong></div>
      <div><FiPhoneCall /><span>Alternate:</span><strong>{profile.alternatePhone}</strong></div>
      <div><FiBriefcase /><span>Designation:</span><strong>{profile.designation}</strong></div>
      <div><FiMapPin /><span>City:</span><strong>{profile.city}</strong></div>
      <div><FiFlag /><span>State:</span><strong>{profile.state}</strong></div>
      <div><FiGlobe /><span>Country:</span><strong>{profile.country}</strong></div>
      <div><FiHome /><span>Address:</span><strong>{profile.address}</strong></div>
      <div><FiMessageCircle /><span>Contact:</span><strong>{profile.preferredContactMethod}</strong></div>
      <div><FiCalendar /><span>Client Since:</span><strong>{profile.accountCreatedDate}</strong></div>
      <div><FiAlertCircle /><span>Emergency:</span><strong>{profile.emergencyContact}</strong></div>
    </div>
  </div>
);
export default ClientPersonalInfo;
