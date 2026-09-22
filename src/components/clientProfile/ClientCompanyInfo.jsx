// src/components/clientProfile/ClientCompanyInfo.jsx
import React from 'react';
import { FiBriefcase, FiGlobe, FiPhone, FiMail, FiMapPin, FiFlag, FiUsers, FiFileText, FiHome } from 'react-icons/fi';

const ClientCompanyInfo = ({ company }) => (
  <div className="cprof-info-card">
    <h6>Company Information</h6>
    <div className="cprof-info-grid">
      <div><FiBriefcase /><span>Name:</span><strong>{company.companyName}</strong></div>
      <div><FiBriefcase /><span>Type:</span><strong>{company.businessType}</strong></div>
      <div><FiGlobe /><span>Industry:</span><strong>{company.industry}</strong></div>
      <div><FiFileText /><span>GST:</span><strong>{company.gstNumber}</strong></div>
      <div><FiMail /><span>Email:</span><strong>{company.companyEmail}</strong></div>
      <div><FiPhone /><span>Phone:</span><strong>{company.companyPhone}</strong></div>
      <div><FiGlobe /><span>Website:</span><strong>{company.website}</strong></div>
      <div><FiUsers /><span>Size:</span><strong>{company.companySize}</strong></div>
      <div><FiMapPin /><span>City:</span><strong>{company.city}</strong></div>
      <div><FiFlag /><span>State:</span><strong>{company.state}</strong></div>
      <div><FiGlobe /><span>Country:</span><strong>{company.country}</strong></div>
      <div><FiHome /><span>Address:</span><strong>{company.companyAddress}</strong></div>
    </div>
    <p className="mt-3"><strong>Description:</strong> {company.description}</p>
  </div>
);
export default ClientCompanyInfo;
