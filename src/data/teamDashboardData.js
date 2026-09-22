// src/data/teamDashboardData.js
export const teamStatsData = [
  { id: 1, title: 'My Tasks', value: 18, icon: 'FiCheckSquare', desc: 'Total assigned', color: 'primary' },
  { id: 2, title: 'Pending Tasks', value: 6, icon: 'FiClock', desc: 'Awaiting action', color: 'warning' },
  { id: 3, title: 'In Progress', value: 7, icon: 'FiTrendingUp', desc: 'Currently working', color: 'info' },
  { id: 4, title: 'Completed Tasks', value: 5, icon: 'FiCheckCircle', desc: 'This month', color: 'success' },
  { id: 5, title: "Today's Deadlines", value: 3, icon: 'FiAlertCircle', desc: 'Due today', color: 'danger' },
  { id: 6, title: 'Attendance', value: 'Present', icon: 'FiUserCheck', desc: 'Checked in at 09:00', color: 'purple' }
];

export const myTasks = [
  { id: 1, title: 'Homepage UI Development', description: 'Convert homepage design to React components with responsive layout and animations.', project: 'E-commerce Platform', assignedBy: 'Michael Roberts', assignedDate: '2026-06-15', startDate: '2026-06-16', deadline: '2026-06-25', priority: 'High', status: 'In Progress', progress: 65, checklistCount: 8, completedChecklist: 5, commentsCount: 4, timeSpent: 16, estimatedHours: 25 },
  { id: 2, title: 'API Integration - Payment Gateway', description: 'Integrate Stripe payment gateway with error handling and webhook setup.', project: 'E-commerce Platform', assignedBy: 'Michael Roberts', assignedDate: '2026-06-10', startDate: '2026-06-12', deadline: '2026-06-28', priority: 'Urgent', status: 'In Progress', progress: 40, checklistCount: 6, completedChecklist: 2, commentsCount: 3, timeSpent: 12, estimatedHours: 30 },
  { id: 3, title: 'Responsive Navigation Menu', description: 'Build responsive navigation with dropdown menus and mobile hamburger.', project: 'Mobile Banking App', assignedBy: 'Emily Davidson', assignedDate: '2026-06-14', startDate: '2026-06-15', deadline: '2026-06-22', priority: 'Medium', status: 'In Progress', progress: 80, checklistCount: 5, completedChecklist: 4, commentsCount: 2, timeSpent: 10, estimatedHours: 15 },
  { id: 4, title: 'User Authentication Module', description: 'Implement login, registration, and password reset functionality.', project: 'CRM System', assignedBy: 'Patricia Garcia', assignedDate: '2026-06-01', startDate: '2026-06-02', deadline: '2026-06-20', priority: 'High', status: 'Under Review', progress: 90, checklistCount: 7, completedChecklist: 6, commentsCount: 5, timeSpent: 22, estimatedHours: 25 },
  { id: 5, title: 'Database Schema Optimization', description: 'Optimize database queries and add proper indexing for performance.', project: 'Healthcare Portal', assignedBy: 'Michael Roberts', assignedDate: '2026-06-12', startDate: '2026-06-13', deadline: '2026-06-30', priority: 'Medium', status: 'Pending', progress: 0, checklistCount: 4, completedChecklist: 0, commentsCount: 1, timeSpent: 0, estimatedHours: 20 },
  { id: 6, title: 'Unit Testing - Auth Module', description: 'Write comprehensive unit tests for authentication module.', project: 'CRM System', assignedBy: 'Patricia Garcia', assignedDate: '2026-06-18', startDate: '2026-06-19', deadline: '2026-06-26', priority: 'Low', status: 'Pending', progress: 0, checklistCount: 3, completedChecklist: 0, commentsCount: 0, timeSpent: 0, estimatedHours: 12 }
];

export const myProjects = [
  { id: 1, projectName: 'E-commerce Platform', clientName: 'TechCorp India', manager: 'Michael Roberts', category: 'Web Development', startDate: '2026-01-15', endDate: '2026-07-30', status: 'In Progress', progress: 68, assignedTasks: 8, completedTasks: 5, pendingTasks: 3 },
  { id: 2, projectName: 'Mobile Banking App', clientName: 'FinanceHub', manager: 'Emily Davidson', category: 'Mobile App', startDate: '2026-02-01', endDate: '2026-08-15', status: 'In Progress', progress: 45, assignedTasks: 5, completedTasks: 2, pendingTasks: 3 },
  { id: 3, projectName: 'CRM System', clientName: 'SalesPro Ltd', manager: 'Patricia Garcia', category: 'CRM', startDate: '2026-01-10', endDate: '2026-05-20', status: 'Completed', progress: 100, assignedTasks: 3, completedTasks: 3, pendingTasks: 0 },
  { id: 4, projectName: 'Healthcare Portal', clientName: 'MediCare Group', manager: 'Michael Roberts', category: 'Web Development', startDate: '2026-03-01', endDate: '2026-09-30', status: 'In Progress', progress: 35, assignedTasks: 2, completedTasks: 0, pendingTasks: 2 }
];

export const todayWork = [
  { id: 1, title: 'Complete homepage hero section', project: 'E-commerce Platform', priority: 'High', deadline: 'Today 18:00', status: 'In Progress', estimatedHours: 4 },
  { id: 2, title: 'Fix navigation menu bugs', project: 'Mobile Banking App', priority: 'Medium', deadline: 'Today 14:00', status: 'Pending', estimatedHours: 2 },
  { id: 3, title: 'Review authentication PR', project: 'CRM System', priority: 'High', deadline: 'Today 17:00', status: 'Pending', estimatedHours: 1 }
];

export const dailyReports = [
  { id: 1, date: '2026-06-19', project: 'E-commerce Platform', task: 'Homepage UI Development', hours: 8, status: 'In Progress', description: 'Completed hero section and started features grid.' },
  { id: 2, date: '2026-06-18', project: 'Mobile Banking App', task: 'Responsive Navigation', hours: 7, status: 'Completed', description: 'Finished responsive navigation. Fixed mobile menu issues.' },
  { id: 3, date: '2026-06-17', project: 'CRM System', task: 'User Authentication', hours: 8, status: 'Completed', description: 'Completed login and registration modules. Submitted for review.' }
];

export const attendanceData = {
  todayStatus: 'Present',
  checkInTime: '09:00 AM',
  checkOutTime: '-',
  totalHours: '5h 30m',
  breakTime: '30m'
};

export const attendanceHistory = [
  { date: '2026-06-19', checkIn: '09:00 AM', checkOut: '-', status: 'Present', hours: '-' },
  { date: '2026-06-18', checkIn: '09:15 AM', checkOut: '06:00 PM', status: 'Present', hours: '8h 45m' },
  { date: '2026-06-17', checkIn: '08:45 AM', checkOut: '05:30 PM', status: 'Present', hours: '8h 45m' },
  { date: '2026-06-16', checkIn: '09:00 AM', checkOut: '06:30 PM', status: 'Present', hours: '9h 30m' },
  { date: '2026-06-15', checkIn: '-', checkOut: '-', status: 'Weekend', hours: '-' }
];

export const teamDeadlines = [
  { id: 1, title: 'Homepage UI Development', project: 'E-commerce Platform', dueDate: '2026-06-25', daysLeft: 6, priority: 'High', status: 'Upcoming' },
  { id: 2, title: 'API Payment Integration', project: 'E-commerce Platform', dueDate: '2026-06-28', daysLeft: 9, priority: 'Urgent', status: 'Upcoming' },
  { id: 3, title: 'Responsive Navigation', project: 'Mobile Banking App', dueDate: '2026-06-22', daysLeft: 3, priority: 'Medium', status: 'Upcoming' },
  { id: 4, title: 'User Auth Module', project: 'CRM System', dueDate: '2026-06-20', daysLeft: 1, priority: 'High', status: 'Urgent' },
  { id: 5, title: 'Database Optimization', project: 'Healthcare Portal', dueDate: '2026-06-30', daysLeft: 11, priority: 'Medium', status: 'Upcoming' }
];

export const teamNotifications = [
  { id: 1, title: 'Task Assigned', message: 'Unit Testing task assigned by Patricia Garcia.', type: 'Task Assigned', time: '2026-06-18 10:00', isRead: false },
  { id: 2, title: 'Deadline Reminder', message: 'User Auth Module deadline is tomorrow.', type: 'Deadline Reminder', time: '2026-06-19 08:00', isRead: false },
  { id: 3, title: 'Comment Mention', message: 'Michael Roberts mentioned you in a comment on API Integration.', type: 'Comment Mention', time: '2026-06-18 16:00', isRead: true },
  { id: 4, title: 'Project Update', message: 'E-commerce Platform progress reached 68%.', type: 'Project Update', time: '2026-06-17 14:00', isRead: true },
  { id: 5, title: 'Daily Report Reminder', message: 'Please submit your daily work report.', type: 'Daily Report Reminder', time: '2026-06-19 17:00', isRead: false }
];