// src/data/calendarData.js
export const calendarStatsData = [
  { id: 1, title: "Today's Events", value: 6, icon: 'FiCalendar', description: 'Scheduled for today', color: 'primary' },
  { id: 2, title: 'Upcoming Deadlines', value: 12, icon: 'FiClock', description: 'Next 7 days', color: 'warning' },
  { id: 3, title: 'Meetings This Week', value: 8, icon: 'FiVideo', description: 'Scheduled meetings', color: 'info' },
  { id: 4, title: 'Project Milestones', value: 10, icon: 'FiFlag', description: 'Key achievements', color: 'purple' },
  { id: 5, title: 'Overdue Tasks', value: 4, icon: 'FiAlertTriangle', description: 'Past deadline', color: 'danger' },
  { id: 6, title: 'Completed Events', value: 22, icon: 'FiCheckCircle', description: 'This month', color: 'success' }
];

export const projectsForCalendar = [
  'E-commerce Platform', 'Mobile Banking App', 'CRM System', 'Healthcare Portal',
  'ERP System', 'Digital Marketing Campaign', 'UI/UX Redesign', 'Cyber Security Assessment'
];

export const tasksForCalendar = [
  'Homepage Design', 'API Integration', 'Database Schema', 'User Authentication',
  'Payment Gateway', 'Security Audit', 'Performance Testing', 'Content Creation'
];

export const assigneesForCalendar = [
  'David Thompson', 'Lisa Martinez', 'Robert Wilson', 'Amanda Taylor',
  'Thomas Wright', 'Michael Roberts', 'Emily Davidson', 'Security Expert'
];

export const eventsData = [
  { id: 1, title: 'E-commerce Platform Deadline', description: 'Final delivery of the e-commerce platform redesign project.', type: 'Project Deadline', project: 'E-commerce Platform', relatedTask: 'Homepage Design', assignedTo: 'David Thompson', date: '2026-06-20', startTime: '09:00', endTime: '18:00', priority: 'High', status: 'Upcoming', reminder: '1 Day Before', notes: 'Client expects final delivery with all features.', createdDate: '2026-06-01' },
  { id: 2, title: 'Weekly Sprint Planning', description: 'Weekly sprint planning meeting with development team.', type: 'Meeting', project: 'Mobile Banking App', relatedTask: '', assignedTo: 'Michael Roberts', date: '2026-06-19', startTime: '10:00', endTime: '11:30', priority: 'Medium', status: 'Upcoming', reminder: '30 Minutes Before', notes: 'Review sprint backlog and assign tasks.', createdDate: '2026-06-15' },
  { id: 3, title: 'CRM Module Completion', description: 'Customer management module final review and sign-off.', type: 'Milestone', project: 'CRM System', relatedTask: 'Database Schema', assignedTo: 'Thomas Wright', date: '2026-06-22', startTime: '14:00', endTime: '15:00', priority: 'High', status: 'Upcoming', reminder: '1 Hour Before', notes: 'Stakeholder approval required.', createdDate: '2026-06-10' },
  { id: 4, title: 'Security Audit Review', description: 'Review security audit findings and plan remediation.', type: 'Review', project: 'Cyber Security Assessment', relatedTask: 'Security Audit', assignedTo: 'Security Expert', date: '2026-06-19', startTime: '15:00', endTime: '16:30', priority: 'Urgent', status: 'Upcoming', reminder: '1 Hour Before', notes: 'Critical vulnerabilities need immediate attention.', createdDate: '2026-06-17' },
  { id: 5, title: 'UI Design Submission', description: 'Submit final UI designs for healthcare portal.', type: 'Task Deadline', project: 'Healthcare Portal', relatedTask: 'Homepage Design', assignedTo: 'Lisa Martinez', date: '2026-06-21', startTime: '17:00', endTime: '18:00', priority: 'High', status: 'Upcoming', reminder: '1 Day Before', notes: 'Include all screen designs and prototypes.', createdDate: '2026-06-14' },
  { id: 6, title: 'Marketing Campaign Launch', description: 'Launch digital marketing campaign for new product.', type: 'Milestone', project: 'Digital Marketing Campaign', relatedTask: 'Content Creation', assignedTo: 'Robert Wilson', date: '2026-06-25', startTime: '08:00', endTime: '17:00', priority: 'Medium', status: 'Upcoming', reminder: '1 Day Before', notes: 'Coordinate with social media team.', createdDate: '2026-06-12' },
  { id: 7, title: 'API Integration Testing', description: 'Complete API integration testing for payment gateway.', type: 'Task Deadline', project: 'E-commerce Platform', relatedTask: 'API Integration', assignedTo: 'David Thompson', date: '2026-06-15', startTime: '09:00', endTime: '17:00', priority: 'Urgent', status: 'Overdue', reminder: '1 Hour Before', notes: 'This is now overdue. Expedite immediately.', createdDate: '2026-06-05' },
  { id: 8, title: 'Database Performance Review', description: 'Review database performance and optimize queries.', type: 'Review', project: 'ERP System', relatedTask: 'Performance Testing', assignedTo: 'Thomas Wright', date: '2026-06-23', startTime: '11:00', endTime: '12:30', priority: 'Medium', status: 'Upcoming', reminder: '30 Minutes Before', notes: 'Focus on slow queries identified last week.', createdDate: '2026-06-16' },
  { id: 9, title: 'Client Presentation Prep', description: 'Prepare presentation for client project status update.', type: 'Reminder', project: 'Healthcare Portal', relatedTask: '', assignedTo: 'Emily Davidson', date: '2026-06-24', startTime: '09:00', endTime: '10:00', priority: 'High', status: 'Upcoming', reminder: '1 Day Before', notes: 'Include progress charts and milestone updates.', createdDate: '2026-06-18' },
  { id: 10, title: 'Team Retrospective', description: 'Monthly team retrospective meeting.', type: 'Meeting', project: 'Mobile Banking App', relatedTask: '', assignedTo: 'Michael Roberts', date: '2026-06-26', startTime: '14:00', endTime: '15:30', priority: 'Low', status: 'Upcoming', reminder: '30 Minutes Before', notes: 'Discuss what went well and areas for improvement.', createdDate: '2026-06-19' },
  { id: 11, title: 'User Acceptance Testing', description: 'Conduct UAT for CRM system with client stakeholders.', type: 'Milestone', project: 'CRM System', relatedTask: 'User Authentication', assignedTo: 'Patricia Garcia', date: '2026-06-28', startTime: '10:00', endTime: '16:00', priority: 'High', status: 'Upcoming', reminder: '1 Day Before', notes: 'All key stakeholders must attend.', createdDate: '2026-06-15' },
  { id: 12, title: 'Code Review Session', description: 'Peer code review for payment gateway module.', type: 'Review', project: 'E-commerce Platform', relatedTask: 'Payment Gateway', assignedTo: 'Amanda Taylor', date: '2026-06-19', startTime: '16:00', endTime: '17:30', priority: 'Medium', status: 'Completed', reminder: 'No Reminder', notes: 'Completed successfully.', createdDate: '2026-06-16' },
  { id: 13, title: 'Design System Update', description: 'Update design system components for consistency.', type: 'Task Deadline', project: 'UI/UX Redesign', relatedTask: 'Homepage Design', assignedTo: 'Lisa Martinez', date: '2026-06-18', startTime: '09:00', endTime: '17:00', priority: 'Medium', status: 'Completed', reminder: '1 Day Before', notes: 'All components updated and documented.', createdDate: '2026-06-10' },
  { id: 14, title: 'Sprint Demo', description: 'Demo completed sprint features to stakeholders.', type: 'Meeting', project: 'Mobile Banking App', relatedTask: '', assignedTo: 'Emily Davidson', date: '2026-06-27', startTime: '15:00', endTime: '16:00', priority: 'Medium', status: 'Upcoming', reminder: '1 Hour Before', notes: 'Showcase new features and gather feedback.', createdDate: '2026-06-19' },
  { id: 15, title: 'Vulnerability Patch Deadline', description: 'Apply critical security patches to production systems.', type: 'Project Deadline', project: 'Cyber Security Assessment', relatedTask: 'Security Audit', assignedTo: 'Security Expert', date: '2026-06-15', startTime: '08:00', endTime: '17:00', priority: 'Urgent', status: 'Overdue', reminder: '10 Minutes Before', notes: 'Urgent: Patches must be applied immediately.', createdDate: '2026-06-10' },
  { id: 16, title: 'Monthly Report Generation', description: 'Generate monthly progress reports for all active projects.', type: 'Reminder', project: 'ERP System', relatedTask: '', assignedTo: 'Amanda Taylor', date: '2026-06-30', startTime: '09:00', endTime: '12:00', priority: 'Low', status: 'Upcoming', reminder: '1 Day Before', notes: 'Include budget, timeline, and milestone updates.', createdDate: '2026-06-19' }
];

export const deadlinesData = [
  { id: 1, title: 'E-commerce Platform Final Delivery', project: 'E-commerce Platform', dueDate: '2026-06-20', daysLeft: 1, priority: 'High', status: 'Upcoming' },
  { id: 2, title: 'API Integration Testing', project: 'E-commerce Platform', dueDate: '2026-06-15', daysLeft: -4, priority: 'Urgent', status: 'Overdue' },
  { id: 3, title: 'UI Design Submission', project: 'Healthcare Portal', dueDate: '2026-06-21', daysLeft: 2, priority: 'High', status: 'Upcoming' },
  { id: 4, title: 'Vulnerability Patch', project: 'Cyber Security Assessment', dueDate: '2026-06-15', daysLeft: -4, priority: 'Urgent', status: 'Overdue' },
  { id: 5, title: 'Design System Update', project: 'UI/UX Redesign', dueDate: '2026-06-18', daysLeft: -1, priority: 'Medium', status: 'Completed' },
  { id: 6, title: 'Marketing Campaign Launch', project: 'Digital Marketing Campaign', dueDate: '2026-06-25', daysLeft: 6, priority: 'Medium', status: 'Upcoming' }
];

export const milestonesData = [
  { id: 1, title: 'CRM Module Completion', project: 'CRM System', date: '2026-06-22', progress: 85, status: 'In Progress' },
  { id: 2, title: 'Marketing Campaign Launch', project: 'Digital Marketing Campaign', date: '2026-06-25', progress: 60, status: 'In Progress' },
  { id: 3, title: 'User Acceptance Testing', project: 'CRM System', date: '2026-06-28', progress: 40, status: 'Pending' },
  { id: 4, title: 'Sprint Demo', project: 'Mobile Banking App', date: '2026-06-27', progress: 75, status: 'In Progress' },
  { id: 5, title: 'Monthly Report', project: 'ERP System', date: '2026-06-30', progress: 10, status: 'Pending' }
];

export const eventTypes = ['Project Deadline', 'Task Deadline', 'Meeting', 'Milestone', 'Reminder', 'Review'];
export const priorities = ['Low', 'Medium', 'High', 'Urgent'];
export const statuses = ['Upcoming', 'Completed', 'Overdue', 'Cancelled'];
export const reminders = ['No Reminder', '10 Minutes Before', '30 Minutes Before', '1 Hour Before', '1 Day Before'];

export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];