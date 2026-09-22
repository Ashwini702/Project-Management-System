// src/data/managerWorkloadData.js
export const workloadStatsData = [
  { id: 1, title: 'Total Team Members', value: 14, icon: 'FiUsers', desc: 'Across all departments', color: 'primary' },
  { id: 2, title: 'Available Members', value: 6, icon: 'FiUserCheck', desc: 'Ready for tasks', color: 'success' },
  { id: 3, title: 'Busy Members', value: 5, icon: 'FiUser', desc: 'Actively working', color: 'info' },
  { id: 4, title: 'Overloaded Members', value: 3, icon: 'FiAlertTriangle', desc: 'Needs attention', color: 'danger' },
  { id: 5, title: 'Total Assigned Tasks', value: 146, icon: 'FiCheckSquare', desc: 'All active tasks', color: 'warning' },
  { id: 6, title: 'Average Workload', value: '68%', icon: 'FiTrendingUp', desc: 'Team average', color: 'purple' }
];

export const departments = ['Development', 'UI/UX Design', 'Digital Marketing', 'Cyber Security', 'QA Testing'];
export const roles = ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'UI/UX Designer', 'QA Tester', 'Cyber Security Analyst', 'Digital Marketer'];
export const projectsForWorkload = ['Website Redesign', 'Mobile App UI', 'CRM Development', 'ERP System', 'Cyber Security Audit', 'E-commerce Platform', 'Healthcare Portal'];

export const teamMembers = [
  { id: 1, name: 'Saurabh Nalode', email: 'saurabh@example.com', phone: '+91 98765 11111', role: 'Frontend Developer', department: 'Development', skills: ['React', 'JavaScript', 'CSS', 'Tailwind'], availability: 'Busy', assignedProjects: ['Website Redesign', 'CRM Development'], assignedTasks: 10, completedTasks: 6, pendingTasks: 3, overdueTasks: 1, workload: 80, performance: 88, activeProject: 'Website Redesign', recentTasks: ['Homepage UI', 'Auth Module', 'Navigation Fix'], recentActivity: 'Completed homepage hero section' },
  { id: 2, name: 'David Thompson', email: 'david@example.com', phone: '+91 98765 22222', role: 'Full Stack Developer', department: 'Development', skills: ['React', 'Node.js', 'MongoDB', 'AWS'], availability: 'Available', assignedProjects: ['E-commerce Platform'], assignedTasks: 8, completedTasks: 5, pendingTasks: 2, overdueTasks: 0, workload: 45, performance: 92, activeProject: 'E-commerce Platform', recentTasks: ['API Integration', 'Payment Gateway'], recentActivity: 'Completed API integration testing' },
  { id: 3, name: 'Lisa Martinez', email: 'lisa@example.com', phone: '+91 98765 33333', role: 'UI/UX Designer', department: 'UI/UX Design', skills: ['Figma', 'Adobe XD', 'Prototyping'], availability: 'Busy', assignedProjects: ['Mobile App UI', 'Website Redesign'], assignedTasks: 8, completedTasks: 6, pendingTasks: 1, overdueTasks: 0, workload: 65, performance: 90, activeProject: 'Mobile App UI', recentTasks: ['Navigation Design', 'Wireframes'], recentActivity: 'Completed mobile navigation design' },
  { id: 4, name: 'Mike Developer', email: 'mike@example.com', phone: '+91 98765 44444', role: 'Backend Developer', department: 'Development', skills: ['Python', 'Django', 'PostgreSQL'], availability: 'Overloaded', assignedProjects: ['Healthcare Portal', 'CRM Development', 'ERP System'], assignedTasks: 12, completedTasks: 6, pendingTasks: 5, overdueTasks: 2, workload: 95, performance: 85, activeProject: 'Healthcare Portal', recentTasks: ['Database Schema', 'API Development'], recentActivity: 'Working on patient records module' },
  { id: 5, name: 'Amanda Taylor', email: 'amanda@example.com', phone: '+91 98765 55555', role: 'Frontend Developer', department: 'Development', skills: ['React', 'Vue.js', 'SASS'], availability: 'Available', assignedProjects: ['Website Redesign'], assignedTasks: 6, completedTasks: 4, pendingTasks: 1, overdueTasks: 0, workload: 40, performance: 78, activeProject: 'Website Redesign', recentTasks: ['Email Templates', 'Footer Design'], recentActivity: 'Completed email template designs' },
  { id: 6, name: 'Robert Wilson', email: 'robert@example.com', phone: '+91 98765 66666', role: 'Digital Marketer', department: 'Digital Marketing', skills: ['SEO', 'Social Media', 'PPC'], availability: 'Available', assignedProjects: ['Digital Marketing Campaign'], assignedTasks: 5, completedTasks: 3, pendingTasks: 1, overdueTasks: 0, workload: 35, performance: 72, activeProject: 'Digital Marketing', recentTasks: ['SEO Audit', 'Ad Campaign'], recentActivity: 'Started SEO audit for client' },
  { id: 7, name: 'Security Expert', email: 'security@example.com', phone: '+91 98765 77777', role: 'Cyber Security Analyst', department: 'Cyber Security', skills: ['Penetration Testing', 'SIEM', 'Firewall'], availability: 'Busy', assignedProjects: ['Cyber Security Audit'], assignedTasks: 8, completedTasks: 6, pendingTasks: 1, overdueTasks: 1, workload: 70, performance: 89, activeProject: 'Cyber Security Audit', recentTasks: ['Vulnerability Scan', 'Security Report'], recentActivity: 'Generating penetration testing report' },
  { id: 8, name: 'Thomas Wright', email: 'thomas@example.com', phone: '+91 98765 88888', role: 'Backend Developer', department: 'Development', skills: ['Java', 'Spring Boot', 'Oracle'], availability: 'Overloaded', assignedProjects: ['ERP System', 'Healthcare Portal'], assignedTasks: 11, completedTasks: 5, pendingTasks: 4, overdueTasks: 2, workload: 92, performance: 82, activeProject: 'ERP System', recentTasks: ['Inventory API', 'Data Migration'], recentActivity: 'Fixing database optimization issues' },
  { id: 9, name: 'Priya Designer', email: 'priya@example.com', phone: '+91 98765 99999', role: 'UI/UX Designer', department: 'UI/UX Design', skills: ['Figma', 'Illustrator', 'After Effects'], availability: 'Available', assignedProjects: ['E-commerce Platform'], assignedTasks: 4, completedTasks: 3, pendingTasks: 1, overdueTasks: 0, workload: 30, performance: 86, activeProject: 'E-commerce Platform', recentTasks: ['Product Page Design'], recentActivity: 'Completed product page mockups' },
  { id: 10, name: 'QA Engineer', email: 'qa@example.com', phone: '+91 98765 00000', role: 'QA Tester', department: 'QA Testing', skills: ['Selenium', 'JIRA', 'TestRail'], availability: 'Busy', assignedProjects: ['Website Redesign', 'Mobile App UI'], assignedTasks: 9, completedTasks: 4, pendingTasks: 4, overdueTasks: 1, workload: 75, performance: 84, activeProject: 'Website Redesign', recentTasks: ['Cross-browser Testing', 'Bug Reports'], recentActivity: 'Found critical bug in payment flow' },
  { id: 11, name: 'Rahul Marketer', email: 'rahul@example.com', phone: '+91 98765 11112', role: 'Digital Marketer', department: 'Digital Marketing', skills: ['Content Marketing', 'Email Marketing'], availability: 'On Leave', assignedProjects: ['Digital Marketing Campaign'], assignedTasks: 4, completedTasks: 2, pendingTasks: 2, overdueTasks: 0, workload: 25, performance: 68, activeProject: 'Digital Marketing', recentTasks: ['Content Calendar'], recentActivity: 'On leave until June 25' },
  { id: 12, name: 'Network Admin', email: 'network@example.com', phone: '+91 98765 22223', role: 'Cyber Security Analyst', department: 'Cyber Security', skills: ['Networking', 'Cloud Security'], availability: 'Available', assignedProjects: ['Cyber Security Audit'], assignedTasks: 5, completedTasks: 4, pendingTasks: 1, overdueTasks: 0, workload: 38, performance: 80, activeProject: 'Cyber Security Audit', recentTasks: ['Firewall Configuration'], recentActivity: 'Completed firewall setup' },
  { id: 13, name: 'DevOps Engineer', email: 'devops@example.com', phone: '+91 98765 33334', role: 'Backend Developer', department: 'Development', skills: ['Docker', 'Kubernetes', 'CI/CD'], availability: 'Overloaded', assignedProjects: ['E-commerce Platform', 'ERP System', 'Healthcare Portal'], assignedTasks: 14, completedTasks: 7, pendingTasks: 5, overdueTasks: 3, workload: 98, performance: 87, activeProject: 'E-commerce Platform', recentTasks: ['CI/CD Pipeline', 'Docker Setup'], recentActivity: 'Deploying to production server' },
  { id: 14, name: 'Junior Developer', email: 'junior@example.com', phone: '+91 98765 44445', role: 'Frontend Developer', department: 'Development', skills: ['HTML', 'CSS', 'JavaScript'], availability: 'Available', assignedProjects: ['Website Redesign'], assignedTasks: 4, completedTasks: 2, pendingTasks: 2, overdueTasks: 0, workload: 30, performance: 70, activeProject: 'Website Redesign', recentTasks: ['Bug Fixes'], recentActivity: 'Learning React components' }
];

export const departmentData = [
  { id: 1, name: 'Development', totalMembers: 8, availableMembers: 3, busyMembers: 2, overloadedMembers: 3, totalTasks: 70, completedTasks: 40, pendingTasks: 25, averageWorkload: 68, averagePerformance: 84 },
  { id: 2, name: 'UI/UX Design', totalMembers: 2, availableMembers: 1, busyMembers: 1, overloadedMembers: 0, totalTasks: 12, completedTasks: 9, pendingTasks: 3, averageWorkload: 48, averagePerformance: 88 },
  { id: 3, name: 'Digital Marketing', totalMembers: 2, availableMembers: 1, busyMembers: 0, overloadedMembers: 0, totalTasks: 9, completedTasks: 5, pendingTasks: 3, averageWorkload: 30, averagePerformance: 70 },
  { id: 4, name: 'Cyber Security', totalMembers: 2, availableMembers: 1, busyMembers: 1, overloadedMembers: 0, totalTasks: 13, completedTasks: 10, pendingTasks: 2, averageWorkload: 54, averagePerformance: 85 },
  { id: 5, name: 'QA Testing', totalMembers: 1, availableMembers: 0, busyMembers: 1, overloadedMembers: 0, totalTasks: 9, completedTasks: 4, pendingTasks: 4, averageWorkload: 75, averagePerformance: 84 }
];

export const taskDistribution = { pending: 32, inProgress: 48, underReview: 18, completed: 42, blocked: 3, overdue: 6 };

export const projectTaskDistribution = [
  { project: 'Website Redesign', assigned: 35, completed: 22, pending: 10, overdue: 3, progress: 65 },
  { project: 'E-commerce Platform', assigned: 28, completed: 18, pending: 8, overdue: 2, progress: 68 },
  { project: 'Mobile App UI', assigned: 20, completed: 12, pending: 6, overdue: 1, progress: 60 },
  { project: 'CRM Development', assigned: 18, completed: 14, pending: 3, overdue: 0, progress: 80 },
  { project: 'ERP System', assigned: 22, completed: 10, pending: 8, overdue: 4, progress: 45 },
  { project: 'Cyber Security Audit', assigned: 15, completed: 12, pending: 2, overdue: 1, progress: 82 },
  { project: 'Healthcare Portal', assigned: 8, completed: 3, pending: 4, overdue: 1, progress: 38 }
];

export const topPerformers = [
  { name: 'David Thompson', role: 'Full Stack Developer', completed: 5, pending: 2, performance: 92, workload: 45, avatar: 'DT' },
  { name: 'Lisa Martinez', role: 'UI/UX Designer', completed: 6, pending: 1, performance: 90, workload: 65, avatar: 'LM' },
  { name: 'Security Expert', role: 'Cyber Security Analyst', completed: 6, pending: 1, performance: 89, workload: 70, avatar: 'SE' }
];

export const supportNeeded = [
  { name: 'Mike Developer', role: 'Backend Developer', completed: 6, pending: 5, performance: 85, workload: 95, avatar: 'MD' },
  { name: 'DevOps Engineer', role: 'Backend Developer', completed: 7, pending: 5, performance: 87, workload: 98, avatar: 'DE' },
  { name: 'Thomas Wright', role: 'Backend Developer', completed: 5, pending: 4, performance: 82, workload: 92, avatar: 'TW' }
];

export const tasksForReassign = [
  { id: 1, title: 'Database Schema Optimization', project: 'Healthcare Portal', currentAssignee: 'Thomas Wright' },
  { id: 2, title: 'API Development - Inventory', project: 'ERP System', currentAssignee: 'Mike Developer' },
  { id: 3, title: 'Deployment Script Setup', project: 'E-commerce Platform', currentAssignee: 'DevOps Engineer' }
];