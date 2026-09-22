// src/data/managerDashboardData.js
export const managerStatsData = [
  { id: 1, title: 'Assigned Projects', value: 8, icon: 'FiFolder', desc: 'Active management', color: 'primary' },
  { id: 2, title: 'Active Tasks', value: 46, icon: 'FiCheckSquare', desc: 'In progress', color: 'info' },
  { id: 3, title: 'Completed Tasks', value: 120, icon: 'FiCheckCircle', desc: 'This quarter', color: 'success' },
  { id: 4, title: 'Team Members', value: 14, icon: 'FiUsers', desc: 'In my teams', color: 'warning' },
  { id: 5, title: 'Upcoming Deadlines', value: 7, icon: 'FiClock', desc: 'Next 7 days', color: 'danger' },
  { id: 6, title: 'Pending Client Feedback', value: 5, icon: 'FiMessageSquare', desc: 'Needs response', color: 'purple' }
];

export const assignedProjects = [
  { id: 1, projectName: 'E-commerce Platform', clientName: 'TechCorp India', category: 'Web Development', startDate: '2026-01-15', endDate: '2026-07-30', status: 'In Progress', priority: 'High', progress: 68, totalTasks: 42, completedTasks: 28, pendingTasks: 14, teamCount: 6, deadline: '2026-07-30' },
  { id: 2, projectName: 'Healthcare Portal', clientName: 'MediCare Group', category: 'Web Development', startDate: '2026-03-01', endDate: '2026-09-30', status: 'In Progress', priority: 'High', progress: 35, totalTasks: 55, completedTasks: 19, pendingTasks: 36, teamCount: 4, deadline: '2026-09-30' },
  { id: 3, projectName: 'Digital Marketing Campaign', clientName: 'EduTech Solutions', category: 'Digital Marketing', startDate: '2026-05-01', endDate: '2026-08-31', status: 'Not Started', priority: 'Low', progress: 0, totalTasks: 25, completedTasks: 0, pendingTasks: 25, teamCount: 3, deadline: '2026-08-31' },
  { id: 4, projectName: 'Learning Management System', clientName: 'EduTech Solutions', category: 'Web Development', startDate: '2026-01-20', endDate: '2026-05-15', status: 'Delayed', priority: 'Medium', progress: 55, totalTasks: 48, completedTasks: 26, pendingTasks: 22, teamCount: 3, deadline: '2026-05-15' }
];

export const taskOverview = { pending: 12, inProgress: 18, underReview: 8, completed: 46, reopened: 2, blocked: 3 };

export const recentTasks = [
  { id: 1, title: 'Homepage UI Development', project: 'E-commerce Platform', assignedTo: 'Saurabh Nalode', deadline: '2026-06-25', priority: 'High', status: 'In Progress', progress: 65 },
  { id: 2, title: 'API Payment Integration', project: 'E-commerce Platform', assignedTo: 'David Thompson', deadline: '2026-06-28', priority: 'Urgent', status: 'In Progress', progress: 40 },
  { id: 3, title: 'Patient Records Module', project: 'Healthcare Portal', assignedTo: 'Mike Developer', deadline: '2026-07-15', priority: 'High', status: 'Pending', progress: 0 },
  { id: 4, title: 'User Authentication', project: 'CRM System', assignedTo: 'Saurabh Nalode', deadline: '2026-06-20', priority: 'High', status: 'Under Review', progress: 90 },
  { id: 5, title: 'Database Schema Optimization', project: 'Healthcare Portal', assignedTo: 'Thomas Wright', deadline: '2026-06-30', priority: 'Medium', status: 'Blocked', progress: 25 }
];

export const teamWorkload = [
  { id: 1, name: 'Saurabh Nalode', role: 'Frontend Developer', department: 'Development', assignedProjects: 3, assignedTasks: 10, completedTasks: 6, pendingTasks: 4, workload: 80, availability: 'Busy', avatar: 'SN' },
  { id: 2, name: 'David Thompson', role: 'Full Stack Developer', department: 'Development', assignedProjects: 2, assignedTasks: 12, completedTasks: 8, pendingTasks: 4, workload: 75, availability: 'Active', avatar: 'DT' },
  { id: 3, name: 'Lisa Martinez', role: 'UI/UX Designer', department: 'Design', assignedProjects: 4, assignedTasks: 8, completedTasks: 6, pendingTasks: 2, workload: 60, availability: 'Active', avatar: 'LM' },
  { id: 4, name: 'Mike Developer', role: 'Backend Developer', department: 'Development', assignedProjects: 2, assignedTasks: 11, completedTasks: 6, pendingTasks: 5, workload: 90, availability: 'Overloaded', avatar: 'MD' },
  { id: 5, name: 'Amanda Taylor', role: 'Frontend Developer', department: 'Development', assignedProjects: 2, assignedTasks: 9, completedTasks: 5, pendingTasks: 4, workload: 65, availability: 'Available', avatar: 'AT' },
  { id: 6, name: 'Robert Wilson', role: 'Digital Marketer', department: 'Marketing', assignedProjects: 2, assignedTasks: 6, completedTasks: 3, pendingTasks: 3, workload: 50, availability: 'Active', avatar: 'RW' }
];

export const managerDeadlines = [
  { id: 1, title: 'E-commerce Final Delivery', project: 'E-commerce Platform', assignedTo: 'Saurabh Nalode', dueDate: '2026-07-30', daysLeft: 38, priority: 'High', status: 'Upcoming' },
  { id: 2, title: 'User Auth Review', project: 'CRM System', assignedTo: 'Saurabh Nalode', dueDate: '2026-06-20', daysLeft: -2, priority: 'High', status: 'Overdue' },
  { id: 3, title: 'API Integration', project: 'E-commerce Platform', assignedTo: 'David Thompson', dueDate: '2026-06-28', daysLeft: 6, priority: 'Urgent', status: 'Upcoming' },
  { id: 4, title: 'Patient Records Start', project: 'Healthcare Portal', assignedTo: 'Mike Developer', dueDate: '2026-07-15', daysLeft: 23, priority: 'High', status: 'Upcoming' },
  { id: 5, title: 'LMS Project Closure', project: 'Learning Management', assignedTo: 'Team', dueDate: '2026-05-15', daysLeft: -38, priority: 'Medium', status: 'Overdue' }
];

export const managerMeetings = [
  { id: 1, title: 'Sprint Planning', project: 'E-commerce Platform', client: '', date: '2026-06-20', time: '10:00 AM', mode: 'Online', participants: 6, status: 'Scheduled' },
  { id: 2, title: 'Client Progress Review', project: 'Healthcare Portal', client: 'MediCare Group', date: '2026-06-21', time: '02:00 PM', mode: 'Online', participants: 4, status: 'Scheduled' },
  { id: 3, title: 'Design Review Meeting', project: 'E-commerce Platform', client: '', date: '2026-06-19', time: '04:00 PM', mode: 'Offline', participants: 3, status: 'Today' },
  { id: 4, title: 'Marketing Campaign Kickoff', project: 'Digital Marketing', client: 'EduTech Solutions', date: '2026-06-25', time: '11:00 AM', mode: 'Online', participants: 5, status: 'Scheduled' }
];

export const managerActivities = [
  { id: 1, title: 'Task Assigned', description: 'Homepage UI task assigned to Saurabh Nalode.', user: 'Priya Sharma', dateTime: '2026-06-19 14:00', type: 'task' },
  { id: 2, title: 'Task Completed', description: 'API Integration testing completed by David Thompson.', user: 'David Thompson', dateTime: '2026-06-19 11:00', type: 'complete' },
  { id: 3, title: 'Status Updated', description: 'Healthcare Portal moved to In Progress.', user: 'Priya Sharma', dateTime: '2026-06-18 16:00', type: 'status' },
  { id: 4, title: 'Client Feedback', description: 'TechCorp India submitted feedback on E-commerce design.', user: 'Rahul Sharma', dateTime: '2026-06-18 10:00', type: 'feedback' },
  { id: 5, title: 'Document Uploaded', description: 'Requirement document uploaded for Healthcare Portal.', user: 'Lisa Martinez', dateTime: '2026-06-17 15:00', type: 'upload' },
  { id: 6, title: 'Deadline Reminder', description: 'User Auth Module deadline is tomorrow.', user: 'System', dateTime: '2026-06-19 08:00', type: 'deadline' }
];

export const clientFeedback = [
  { id: 1, clientName: 'Rahul Sharma', company: 'TechCorp India', project: 'E-commerce Platform', message: 'The homepage design looks great! Minor tweaks needed in the footer.', date: '2026-06-18', status: 'Pending' },
  { id: 2, clientName: 'Sneha Reddy', company: 'FinanceHub', project: 'Mobile Banking App', message: 'Navigation needs improvement. Please add bottom tabs.', date: '2026-06-17', status: 'Approved' },
  { id: 3, clientName: 'Dr. Ankit Gupta', company: 'MediCare Group', project: 'Healthcare Portal', message: 'Patient records module is working well. Very satisfied.', date: '2026-06-16', status: 'Resolved' },
  { id: 4, clientName: 'Priya Patel', company: 'EduTech Solutions', project: 'Digital Marketing', message: 'Campaign results need more detailed analytics.', date: '2026-06-15', status: 'Pending' }
];

export const projects = ['E-commerce Platform', 'Healthcare Portal', 'Digital Marketing Campaign', 'Learning Management', 'CRM System', 'Mobile Banking App'];
export const teamMembersList = ['Saurabh Nalode', 'David Thompson', 'Lisa Martinez', 'Mike Developer', 'Amanda Taylor', 'Robert Wilson', 'Thomas Wright'];