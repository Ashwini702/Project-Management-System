// src/data/teamTasksData.js
export const taskStatsData = [
  { id: 1, title: 'Total Assigned Tasks', value: 28, icon: 'FiCheckSquare', desc: 'All time tasks', color: 'primary' },
  { id: 2, title: 'Pending Tasks', value: 6, icon: 'FiClock', desc: 'Yet to start', color: 'warning' },
  { id: 3, title: 'In Progress Tasks', value: 9, icon: 'FiTrendingUp', desc: 'Currently working', color: 'info' },
  { id: 4, title: 'Under Review', value: 5, icon: 'FiEye', desc: 'Quality check', color: 'purple' },
  { id: 5, title: 'Completed Tasks', value: 8, icon: 'FiCheckCircle', desc: 'Done this month', color: 'success' },
  { id: 6, title: 'Overdue Tasks', value: 3, icon: 'FiAlertTriangle', desc: 'Past deadline', color: 'danger' }
];

export const projects = ['Website Redesign', 'Mobile App UI', 'CRM Development', 'ERP System', 'Cyber Security Audit', 'E-commerce Platform', 'Healthcare Portal'];

export const teamTasks = [
  { id: 1, taskTitle: 'Homepage UI Development', description: 'Convert homepage design to React components with responsive layout and animations. Ensure cross-browser compatibility.', projectName: 'Website Redesign', assignedBy: 'Priya Sharma', startDate: '2026-06-16', deadline: '2026-06-25', priority: 'High', status: 'In Progress', progress: 65, estimatedHours: 25, timeSpent: 16, checklistCount: 8, completedChecklist: 5, commentsCount: 4, attachmentCount: 2, lastUpdated: '2026-06-24' },
  { id: 2, taskTitle: 'API Payment Integration', description: 'Integrate Stripe payment gateway with error handling and webhook setup.', projectName: 'E-commerce Platform', assignedBy: 'Michael Roberts', startDate: '2026-06-12', deadline: '2026-06-28', priority: 'Urgent', status: 'In Progress', progress: 40, estimatedHours: 30, timeSpent: 12, checklistCount: 6, completedChecklist: 2, commentsCount: 3, attachmentCount: 1, lastUpdated: '2026-06-23' },
  { id: 3, taskTitle: 'User Authentication Module', description: 'Implement login, registration, and password reset with JWT.', projectName: 'CRM Development', assignedBy: 'Patricia Garcia', startDate: '2026-06-02', deadline: '2026-06-20', priority: 'High', status: 'Under Review', progress: 90, estimatedHours: 25, timeSpent: 22, checklistCount: 7, completedChecklist: 6, commentsCount: 5, attachmentCount: 1, lastUpdated: '2026-06-22' },
  { id: 4, taskTitle: 'Mobile Navigation Redesign', description: 'Redesign bottom navigation with gesture controls and smooth transitions.', projectName: 'Mobile App UI', assignedBy: 'Emily Davidson', startDate: '2026-06-11', deadline: '2026-06-22', priority: 'Medium', status: 'In Progress', progress: 75, estimatedHours: 20, timeSpent: 15, checklistCount: 5, completedChecklist: 4, commentsCount: 3, attachmentCount: 2, lastUpdated: '2026-06-23' },
  { id: 5, taskTitle: 'Database Schema Optimization', description: 'Optimize queries and add proper indexing for performance improvement.', projectName: 'Healthcare Portal', assignedBy: 'Michael Roberts', startDate: '2026-06-15', deadline: '2026-06-30', priority: 'Medium', status: 'Blocked', progress: 25, estimatedHours: 20, timeSpent: 5, checklistCount: 4, completedChecklist: 1, commentsCount: 2, attachmentCount: 0, lastUpdated: '2026-06-20' },
  { id: 6, taskTitle: 'Cross-Browser Testing', description: 'Perform comprehensive cross-browser testing for all modules.', projectName: 'Website Redesign', assignedBy: 'Priya Sharma', startDate: '2026-06-19', deadline: '2026-06-26', priority: 'High', status: 'Pending', progress: 0, estimatedHours: 15, timeSpent: 0, checklistCount: 6, completedChecklist: 0, commentsCount: 0, attachmentCount: 0, lastUpdated: '2026-06-19' },
  { id: 7, taskTitle: 'UI Component Library Setup', description: 'Create reusable UI component library with documentation.', projectName: 'E-commerce Platform', assignedBy: 'Michael Roberts', startDate: '2026-06-06', deadline: '2026-06-18', priority: 'High', status: 'Completed', progress: 100, estimatedHours: 30, timeSpent: 28, checklistCount: 10, completedChecklist: 10, commentsCount: 4, attachmentCount: 3, lastUpdated: '2026-06-18' },
  { id: 8, taskTitle: 'SEO Optimization', description: 'Implement on-page SEO improvements across all pages.', projectName: 'Website Redesign', assignedBy: 'Priya Sharma', startDate: '2026-06-19', deadline: '2026-07-01', priority: 'Medium', status: 'Pending', progress: 0, estimatedHours: 20, timeSpent: 0, checklistCount: 5, completedChecklist: 0, commentsCount: 0, attachmentCount: 0, lastUpdated: '2026-06-19' },
  { id: 9, taskTitle: 'Report Generation Module', description: 'Build dynamic report generation with customizable templates.', projectName: 'CRM Development', assignedBy: 'Patricia Garcia', startDate: '2026-06-20', deadline: '2026-07-10', priority: 'Medium', status: 'Pending', progress: 0, estimatedHours: 35, timeSpent: 0, checklistCount: 7, completedChecklist: 0, commentsCount: 1, attachmentCount: 0, lastUpdated: '2026-06-20' },
  { id: 10, taskTitle: 'Inventory Management API', description: 'Build RESTful API for inventory tracking with CRUD operations.', projectName: 'ERP System', assignedBy: 'Priya Sharma', startDate: '2026-06-10', deadline: '2026-07-05', priority: 'Medium', status: 'In Progress', progress: 35, estimatedHours: 45, timeSpent: 16, checklistCount: 8, completedChecklist: 3, commentsCount: 2, attachmentCount: 1, lastUpdated: '2026-06-22' },
  { id: 11, taskTitle: 'Security Vulnerability Patch', description: 'Apply security patches for identified vulnerabilities.', projectName: 'Cyber Security Audit', assignedBy: 'Emily Davidson', startDate: '2026-06-06', deadline: '2026-06-15', priority: 'Urgent', status: 'Overdue', progress: 80, estimatedHours: 20, timeSpent: 16, checklistCount: 5, completedChecklist: 4, commentsCount: 2, attachmentCount: 1, lastUpdated: '2026-06-18' },
  { id: 12, taskTitle: 'Data Migration Script', description: 'Write migration scripts for legacy data to new database.', projectName: 'ERP System', assignedBy: 'Priya Sharma', startDate: '2026-06-14', deadline: '2026-07-02', priority: 'High', status: 'In Progress', progress: 30, estimatedHours: 40, timeSpent: 12, checklistCount: 6, completedChecklist: 2, commentsCount: 2, attachmentCount: 1, lastUpdated: '2026-06-21' },
  { id: 13, taskTitle: 'Email Template Design', description: 'Design responsive HTML email templates for newsletter campaign.', projectName: 'Website Redesign', assignedBy: 'Priya Sharma', startDate: '2026-06-17', deadline: '2026-06-24', priority: 'Low', status: 'In Progress', progress: 50, estimatedHours: 12, timeSpent: 6, checklistCount: 3, completedChecklist: 1, commentsCount: 0, attachmentCount: 0, lastUpdated: '2026-06-23' },
  { id: 14, taskTitle: 'Performance Optimization', description: 'Optimize website performance including image compression and caching.', projectName: 'E-commerce Platform', assignedBy: 'Michael Roberts', startDate: '2026-06-10', deadline: '2026-06-22', priority: 'High', status: 'Completed', progress: 100, estimatedHours: 25, timeSpent: 22, checklistCount: 6, completedChecklist: 6, commentsCount: 1, attachmentCount: 1, lastUpdated: '2026-06-22' },
  { id: 15, taskTitle: 'Content Calendar Setup', description: 'Create and schedule social media content calendar.', projectName: 'Digital Marketing', assignedBy: 'Emily Davidson', startDate: '2026-06-20', deadline: '2026-07-10', priority: 'Low', status: 'Pending', progress: 0, estimatedHours: 15, timeSpent: 0, checklistCount: 4, completedChecklist: 0, commentsCount: 0, attachmentCount: 0, lastUpdated: '2026-06-20' },
  { id: 16, taskTitle: 'Testing Report Generation', description: 'Generate comprehensive testing report with bug tracking.', projectName: 'Website Redesign', assignedBy: 'Priya Sharma', startDate: '2026-06-22', deadline: '2026-06-28', priority: 'Medium', status: 'Pending', progress: 0, estimatedHours: 10, timeSpent: 0, checklistCount: 3, completedChecklist: 0, commentsCount: 0, attachmentCount: 0, lastUpdated: '2026-06-22' },
  { id: 17, taskTitle: 'Client Feedback Integration', description: 'Integrate client feedback into the website redesign.', projectName: 'Website Redesign', assignedBy: 'Priya Sharma', startDate: '2026-06-24', deadline: '2026-07-05', priority: 'High', status: 'Pending', progress: 0, estimatedHours: 20, timeSpent: 0, checklistCount: 5, completedChecklist: 0, commentsCount: 0, attachmentCount: 0, lastUpdated: '2026-06-24' },
  { id: 18, taskTitle: 'Deployment Script Setup', description: 'Set up CI/CD deployment scripts for production.', projectName: 'E-commerce Platform', assignedBy: 'Michael Roberts', startDate: '2026-06-18', deadline: '2026-06-25', priority: 'Medium', status: 'In Progress', progress: 60, estimatedHours: 15, timeSpent: 9, checklistCount: 4, completedChecklist: 2, commentsCount: 1, attachmentCount: 1, lastUpdated: '2026-06-23' }
];

export const checklistItems = [
  { id: 1, taskId: 1, title: 'Research competitor designs', completed: true },
  { id: 2, taskId: 1, title: 'Create wireframes', completed: true },
  { id: 3, taskId: 1, title: 'Design hero section', completed: true },
  { id: 4, taskId: 1, title: 'Implement responsive layout', completed: true },
  { id: 5, taskId: 1, title: 'Add animations', completed: true },
  { id: 6, taskId: 1, title: 'Cross-browser testing', completed: false },
  { id: 7, taskId: 1, title: 'Performance review', completed: false },
  { id: 8, taskId: 1, title: 'Final submission', completed: false }
];

export const discussionItems = [
  { id: 1, taskId: 1, senderName: 'Priya Sharma', senderRole: 'Project Manager', message: 'Please prioritize the responsive layout for mobile devices.', dateTime: '2026-06-18 10:00' },
  { id: 2, taskId: 1, senderName: 'Saurabh Nalode', senderRole: 'Frontend Developer', message: 'Working on it. Mobile layout is 80% complete.', dateTime: '2026-06-18 14:00' },
  { id: 3, taskId: 1, senderName: 'Priya Sharma', senderRole: 'Project Manager', message: 'Great progress! Let me know if you need any design assets.', dateTime: '2026-06-19 09:00' },
  { id: 4, taskId: 1, senderName: 'Saurabh Nalode', senderRole: 'Frontend Developer', message: 'Added all animations. Moving to cross-browser testing.', dateTime: '2026-06-22 16:00' }
];

export const taskTimeline = [
  { id: 1, taskId: 1, title: 'Homepage UI Development', projectName: 'Website Redesign', deadline: '2026-06-25', priority: 'High', status: 'In Progress', note: 'Cross-browser testing in progress', progress: 65 },
  { id: 2, taskId: 2, title: 'API Payment Integration', projectName: 'E-commerce Platform', deadline: '2026-06-28', priority: 'Urgent', status: 'In Progress', note: 'Webhook setup pending', progress: 40 },
  { id: 3, taskId: 3, title: 'User Authentication Module', projectName: 'CRM Development', deadline: '2026-06-20', priority: 'High', status: 'Under Review', note: 'Submitted for review on June 20', progress: 90 },
  { id: 4, taskId: 11, title: 'Security Vulnerability Patch', projectName: 'Cyber Security Audit', deadline: '2026-06-15', priority: 'Urgent', status: 'Overdue', note: 'Delayed due to dependency', progress: 80 }
];
