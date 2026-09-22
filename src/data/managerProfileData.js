// src/data/managerProfileData.js
export const managerProfile = {
  id: 1,
  name: 'Priya Sharma',
  email: 'priya.sharma@pms.com',
  phone: '+91 98765 43210',
  alternatePhone: '+91 98765 12345',
  role: 'Project Manager',
  department: 'Project Management',
  employeeId: 'PMS-PM-001',
  joiningDate: '2025-03-15',
  city: 'Mumbai',
  state: 'Maharashtra',
  country: 'India',
  address: '123, Tech Park, Andheri East, Mumbai - 400093',
  bio: 'Experienced Project Manager with 5+ years of expertise in managing web development, mobile app, and enterprise software projects. Skilled in Agile methodologies, team leadership, and client relationship management.',
  status: 'Active',
  avatar: 'PS',
  emergencyContact: '+91 98765 00000',
  workMode: 'Hybrid',
  reportingManager: 'Admin User',
  workExperience: '8 Years',
  skills: ['Agile', 'Scrum', 'Project Planning', 'Risk Management', 'Team Leadership', 'Client Communication', 'JIRA', 'MS Project', 'Budgeting', 'Stakeholder Management'],
  certifications: ['PMP Certified', 'CSM Certified', 'ITIL Foundation', 'AWS Cloud Practitioner']
};

export const profileStatsData = [
  { id: 1, title: 'Assigned Projects', value: 8, icon: 'FiFolder', desc: 'Currently managing', color: 'primary' },
  { id: 2, title: 'Completed Projects', value: 24, icon: 'FiCheckCircle', desc: 'Total delivered', color: 'success' },
  { id: 3, title: 'Active Tasks', value: 46, icon: 'FiCheckSquare', desc: 'Across projects', color: 'info' },
  { id: 4, title: 'Team Members', value: 14, icon: 'FiUsers', desc: 'Managed team', color: 'warning' },
  { id: 5, title: 'Client Satisfaction', value: '91%', icon: 'FiSmile', desc: 'Average rating', color: 'purple' },
  { id: 6, title: 'Productivity Score', value: '84%', icon: 'FiTrendingUp', desc: 'Monthly average', color: 'danger' }
];

export const performanceData = {
  productivityScore: 84,
  projectCompletionRate: 78,
  taskCompletionRate: 85,
  teamEfficiency: 82,
  clientSatisfaction: 91,
  deadlineSuccessRate: 88,
  avgResponseTime: '2.5 hours',
  performanceGrade: 'Excellent',
  monthlyScores: [
    { month: 'Jan', score: 80 },
    { month: 'Feb', score: 82 },
    { month: 'Mar', score: 85 },
    { month: 'Apr', score: 83 },
    { month: 'May', score: 86 },
    { month: 'Jun', score: 84 }
  ]
};

export const assignedProjects = [
  { id: 1, projectName: 'Website Redesign', clientName: 'TechCorp India', category: 'Web Development', startDate: '2026-01-15', endDate: '2026-07-30', status: 'In Progress', priority: 'High', progress: 68, totalTasks: 42, completedTasks: 28, pendingTasks: 14, teamSize: 6 },
  { id: 2, projectName: 'Mobile App UI', clientName: 'FinanceHub', category: 'Mobile App', startDate: '2026-02-01', endDate: '2026-08-15', status: 'In Progress', priority: 'High', progress: 45, totalTasks: 65, completedTasks: 29, pendingTasks: 36, teamSize: 4 },
  { id: 3, projectName: 'CRM Development', clientName: 'SalesPro Ltd', category: 'CRM', startDate: '2026-01-10', endDate: '2026-05-20', status: 'Completed', priority: 'Medium', progress: 100, totalTasks: 30, completedTasks: 30, pendingTasks: 0, teamSize: 3 },
  { id: 4, projectName: 'ERP System', clientName: 'Manufacturing Corp', category: 'ERP', startDate: '2026-04-01', endDate: '2026-11-15', status: 'In Progress', priority: 'Medium', progress: 35, totalTasks: 40, completedTasks: 14, pendingTasks: 26, teamSize: 3 },
  { id: 5, projectName: 'Cyber Security Audit', clientName: 'TechCorp India', category: 'Cyber Security', startDate: '2026-02-20', endDate: '2026-04-30', status: 'On Hold', priority: 'Urgent', progress: 40, totalTasks: 20, completedTasks: 8, pendingTasks: 12, teamSize: 2 },
  { id: 6, projectName: 'Digital Marketing', clientName: 'EduTech Solutions', category: 'Digital Marketing', startDate: '2026-05-01', endDate: '2026-08-31', status: 'Not Started', priority: 'Low', progress: 0, totalTasks: 25, completedTasks: 0, pendingTasks: 25, teamSize: 3 }
];

export const recentActivities = [
  { id: 1, title: 'Project Status Updated', description: 'Updated CRM Development status to Completed.', relatedTo: 'CRM Development', dateTime: '2026-06-21 17:00', type: 'status' },
  { id: 2, title: 'Task Assigned', description: 'Assigned Homepage UI task to Saurabh Nalode.', relatedTo: 'Website Redesign', dateTime: '2026-06-23 14:00', type: 'task' },
  { id: 3, title: 'Meeting Scheduled', description: 'Scheduled sprint planning meeting for June 23.', relatedTo: 'Website Redesign', dateTime: '2026-06-22 09:00', type: 'meeting' },
  { id: 4, title: 'Client Feedback Responded', description: 'Responded to Rajesh Sharma feedback on footer design.', relatedTo: 'Website Redesign', dateTime: '2026-06-22 16:30', type: 'feedback' },
  { id: 5, title: 'Deadline Reminder Sent', description: 'Sent reminder for API Integration deadline to David Thompson.', relatedTo: 'E-commerce Platform', dateTime: '2026-06-23 08:00', type: 'deadline' },
  { id: 6, title: 'Report Exported', description: 'Exported monthly project progress report.', relatedTo: 'Reports', dateTime: '2026-06-21 15:00', type: 'report' },
  { id: 7, title: 'Team Workload Reviewed', description: 'Reviewed team workload and balanced task assignments.', relatedTo: 'Team Management', dateTime: '2026-06-20 16:00', type: 'team' },
  { id: 8, title: 'Comment Added', description: 'Added comment on User Auth Module review.', relatedTo: 'CRM Development', dateTime: '2026-06-19 15:30', type: 'comment' }
];

export const securitySettingsData = {
  twoFactorEnabled: false,
  loginNotification: true,
  sessionTimeout: '1 Hour'
};

export const loginHistory = [
  { id: 1, dateTime: '2026-06-23 08:00', ipAddress: '192.168.1.101', device: 'MacBook Pro', browser: 'Chrome 124', location: 'Mumbai, India', status: 'Success' },
  { id: 2, dateTime: '2026-06-22 09:00', ipAddress: '192.168.1.101', device: 'MacBook Pro', browser: 'Chrome 124', location: 'Mumbai, India', status: 'Success' },
  { id: 3, dateTime: '2026-06-21 10:30', ipAddress: '192.168.1.102', device: 'iPhone 15', browser: 'Safari Mobile', location: 'Mumbai, India', status: 'Success' },
  { id: 4, dateTime: '2026-06-20 08:15', ipAddress: '192.168.1.101', device: 'MacBook Pro', browser: 'Chrome 124', location: 'Mumbai, India', status: 'Success' }
];

export const activeSessions = [
  { id: 1, device: 'MacBook Pro', browser: 'Chrome 124', location: 'Mumbai, India', lastActive: 'Current Session', current: true },
  { id: 2, device: 'iPhone 15', browser: 'Safari Mobile', location: 'Mumbai, India', lastActive: '2026-06-23 10:00', current: false }
];

export const notificationPreferences = {
  tasks: { taskAssigned: true, taskUpdated: true, taskCompleted: true, taskOverdue: true },
  projects: { projectStatus: true, projectDeadline: true, documentUpload: false, milestoneReminder: true },
  clients: { clientFeedback: true, clientMessage: false, clientApproval: true },
  meetings: { meetingScheduled: true, meetingReminder: true, meetingCancelled: true },
  channels: { system: true, email: true, whatsapp: false }
};