// src/components/managerProfile/ManagerPersonalInfo.jsx
import React from 'react';
import { FiUser, FiMail, FiPhone, FiPhoneCall, FiCalendar, FiMapPin, FiFlag, FiGlobe, FiHome, FiAlertCircle } from 'react-icons/fi';

const ManagerPersonalInfo = ({ profile }) => (
  <div className="mp-info-card">
    <h6>Personal Information</h6>
    <div className="mp-info-grid">
      <div><FiUser /><span>Name:</span><strong>{profile.name}</strong></div>
      <div><FiMail /><span>Email:</span><strong>{profile.email}</strong></div>
      <div><FiPhone /><span>Phone:</span><strong>{profile.phone}</strong></div>
      <div><FiPhoneCall /><span>Alternate:</span><strong>{profile.alternatePhone}</strong></div>
      <div><FiMapPin /><span>City:</span><strong>{profile.city}</strong></div>
      <div><FiFlag /><span>State:</span><strong>{profile.state}</strong></div>
      <div><FiGlobe /><span>Country:</span><strong>{profile.country}</strong></div>
      <div><FiHome /><span>Address:</span><strong>{profile.address}</strong></div>
      <div><FiCalendar /><span>Joined:</span><strong>{profile.joiningDate}</strong></div>
      <div><FiAlertCircle /><span>Emergency:</span><strong>{profile.emergencyContact}</strong></div>
    </div>
  </div>
);
export default ManagerPersonalInfo;