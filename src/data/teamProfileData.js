// src/data/teamProfileData.js
export const teamProfile = {
  id: 1,
  name: 'Amit Verma',
  email: 'amit.verma@pms.com',
  phone: '+91 98765 43210',
  alternatePhone: '+91 98765 12345',
  role: 'Frontend Developer',
  department: 'Development',
  employeeId: 'PMS-FD-015',
  joiningDate: '2025-06-15',
  city: 'Mumbai',
  state: 'Maharashtra',
  country: 'India',
  address: '789, Tech Park, Andheri East, Mumbai - 400093',
  bio: 'Passionate frontend developer with 3+ years of experience in building responsive web applications using React, JavaScript, and modern UI frameworks. Focused on delivering high-quality, user-friendly interfaces.',
  status: 'Active',
  avatar: 'AV',
  emergencyContact: '+91 98765 00000',
  workMode: 'Hybrid',
  availabilityStatus: 'Available'
};

export const profileStatsData = [
  { id: 1, title: 'Assigned Tasks', value: 28, icon: 'FiCheckSquare', desc: 'Total assigned', color: 'primary' },
  { id: 2, title: 'Completed Tasks', value: 18, icon: 'FiCheckCircle', desc: 'This quarter', color: 'success' },
  { id: 3, title: 'Active Projects', value: 4, icon: 'FiFolder', desc: 'Currently working', color: 'info' },
  { id: 4, title: 'Attendance Rate', value: '92%', icon: 'FiCalendar', desc: 'Monthly average', color: 'warning' },
  { id: 5, title: 'Work Hours', value: 176, icon: 'FiClock', desc: 'This month', color: 'purple' },
  { id: 6, title: 'Productivity Score', value: '86%', icon: 'FiTrendingUp', desc: 'Monthly average', color: 'danger' }
];

export const professionalInfo = {
  employeeId: 'PMS-FD-015',
  designation: 'Frontend Developer',
  department: 'Development',
  reportingManager: 'Priya Sharma',
  joiningDate: '2025-06-15',
  experience: '3 Years',
  employmentType: 'Full Time',
  workMode: 'Hybrid',
  availability: 'Available',
  activeProjects: 4,
  assignedTasks: 28,
  shiftTiming: '9:00 AM - 6:00 PM',
  officialEmail: 'amit.verma@pms.com'
};

export const skills = [
  { id: 1, skillName: 'HTML', level: 95, experience: '3 Years', category: 'Technical' },
  { id: 2, skillName: 'CSS', level: 90, experience: '3 Years', category: 'Technical' },
  { id: 3, skillName: 'JavaScript', level: 88, experience: '3 Years', category: 'Technical' },
  { id: 4, skillName: 'React JS', level: 85, experience: '2 Years', category: 'Technical' },
  { id: 5, skillName: 'Bootstrap', level: 90, experience: '3 Years', category: 'Technical' },
  { id: 6, skillName: 'Node.js', level: 70, experience: '1 Year', category: 'Technical' },
  { id: 7, skillName: 'MongoDB', level: 65, experience: '1 Year', category: 'Technical' },
  { id: 8, skillName: 'Git/GitHub', level: 85, experience: '3 Years', category: 'Technical' }
];

export const tools = [
  { id: 1, skillName: 'VS Code', level: 95, experience: '3 Years', category: 'Tools' },
  { id: 2, skillName: 'Figma', level: 80, experience: '2 Years', category: 'Tools' },
  { id: 3, skillName: 'Jira', level: 85, experience: '3 Years', category: 'Tools' },
  { id: 4, skillName: 'GitHub', level: 88, experience: '3 Years', category: 'Tools' },
  { id: 5, skillName: 'Postman', level: 75, experience: '2 Years', category: 'Tools' }
];

export const certifications = [
  { id: 1, title: 'React Frontend Development', issuer: 'Meta', year: '2024', status: 'Completed' },
  { id: 2, title: 'JavaScript Advanced', issuer: 'Udemy', year: '2023', status: 'Completed' },
  { id: 3, title: 'UI/UX Foundation', issuer: 'Google', year: '2024', status: 'Completed' },
  { id: 4, title: 'Git & GitHub', issuer: 'Udemy', year: '2023', status: 'Completed' }
];

export const performanceData = {
  productivityScore: 86,
  taskCompletionRate: 78,
  attendanceRate: 92,
  deadlineSuccessRate: 82,
  dailyReportRate: 95,
  avgWorkHours: 8,
  completedTasks: 18,
  pendingTasks: 6,
  overdueTasks: 3,
  performanceGrade: 'Good'
};

export const assignedProjects = [
  { id: 1, projectName: 'Website Redesign', clientName: 'TechCorp India', projectManager: 'Priya Sharma', category: 'Web Development', status: 'In Progress', priority: 'High', projectProgress: 68, myProgress: 65, assignedTasks: 8, completedTasks: 5, pendingTasks: 3, deadline: '2026-07-30' },
  { id: 2, projectName: 'Mobile App UI', clientName: 'FinanceHub', projectManager: 'Emily Davidson', category: 'Mobile App', status: 'In Progress', priority: 'High', projectProgress: 45, myProgress: 75, assignedTasks: 5, completedTasks: 2, pendingTasks: 3, deadline: '2026-08-15' },
  { id: 3, projectName: 'CRM Development', clientName: 'SalesPro Ltd', projectManager: 'Patricia Garcia', category: 'CRM', status: 'Completed', priority: 'Medium', projectProgress: 100, myProgress: 100, assignedTasks: 3, completedTasks: 3, pendingTasks: 0, deadline: '2026-05-20' },
  { id: 4, projectName: 'ERP System', clientName: 'Manufacturing Corp', projectManager: 'Priya Sharma', category: 'ERP', status: 'In Progress', priority: 'Medium', projectProgress: 35, myProgress: 35, assignedTasks: 4, completedTasks: 1, pendingTasks: 3, deadline: '2026-11-15' }
];

export const recentActivities = [
  { id: 1, title: 'Task Completed', description: 'Completed UI Component Library Setup task.', relatedTo: 'E-commerce Platform', dateTime: '2026-06-18 16:00', type: 'task' },
  { id: 2, title: 'Daily Report Submitted', description: 'Submitted daily work report for June 24.', relatedTo: 'Daily Report', dateTime: '2026-06-24 18:00', type: 'report' },
  { id: 3, title: 'Attendance Marked', description: 'Checked in at 9:00 AM from Mumbai Office.', relatedTo: 'Attendance', dateTime: '2026-06-24 09:00', type: 'attendance' },
  { id: 4, title: 'Project Update Submitted', description: 'Submitted update for Website Redesign project.', relatedTo: 'Website Redesign', dateTime: '2026-06-23 17:00', type: 'project' },
  { id: 5, title: 'Comment Added', description: 'Added work note on Homepage UI Development.', relatedTo: 'Website Redesign', dateTime: '2026-06-23 15:00', type: 'comment' },
  { id: 6, title: 'Notification Read', description: 'Marked deadline reminder as read.', relatedTo: 'Notifications', dateTime: '2026-06-24 08:30', type: 'notification' }
];

export const securitySettingsData = {
  twoFactorEnabled: false,
  loginNotification: true,
  sessionTimeout: '1 Hour'
};

export const loginHistory = [
  { id: 1, dateTime: '2026-06-24 09:00', ipAddress: '192.168.1.105', device: 'Dell Laptop', browser: 'Chrome 124', location: 'Mumbai, India', status: 'Success' },
  { id: 2, dateTime: '2026-06-23 09:00', ipAddress: '192.168.1.105', device: 'Dell Laptop', browser: 'Chrome 124', location: 'Mumbai, India', status: 'Success' },
  { id: 3, dateTime: '2026-06-22 09:15', ipAddress: '192.168.1.106', device: 'iPhone 14', browser: 'Safari Mobile', location: 'Mumbai, India', status: 'Success' }
];

export const activeSessions = [
  { id: 1, device: 'Dell Laptop', browser: 'Chrome 124', location: 'Mumbai, India', lastActive: 'Current Session', current: true },
  { id: 2, device: 'iPhone 14', browser: 'Safari Mobile', location: 'Mumbai, India', lastActive: '2026-06-24 08:00', current: false }
];

export const notificationPreferences = {
  tasks: { taskAssigned: true, taskUpdated: true, taskDeadline: true, taskReview: true },
  projects: { projectUpdate: true, fileUpload: false, milestone: true },
  attendance: { checkInReminder: true, checkOutReminder: false, attendanceApproval: true },
  reports: { reportReminder: true, reportApproval: true, reportRejection: true },
  deadlines: { todayDeadline: true, upcomingDeadline: true, overdueAlert: true },
  channels: { system: true, email: true, whatsapp: false }
};