// src/components/team/DepartmentBadge.jsx
import React from 'react';

const DepartmentBadge = ({ department }) => {
  const getDeptClass = (dept) => {
    const deptMap = {
      'Development': 'dept-development',
      'UI/UX Design': 'dept-design',
      'Digital Marketing': 'dept-marketing',
      'Cyber Security': 'dept-security',
      'HR': 'dept-hr',
      'Accounts': 'dept-accounts'
    };
    return deptMap[dept] || 'dept-default';
  };

  return (
    <span className={`department-badge ${getDeptClass(department)}`}>
      {department}
    </span>
  );
};

export default DepartmentBadge;