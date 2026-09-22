// src/data/meetingData.js
export const meetingStatsData = [
  { id: 1, title: 'Total Meetings', value: 42, icon: 'FiVideo', description: 'All scheduled meetings', color: 'primary' },
  { id: 2, title: "Today's Meetings", value: 5, icon: 'FiCalendar', description: 'Scheduled for today', color: 'info' },
  { id: 3, title: 'Upcoming Meetings', value: 14, icon: 'FiClock', description: 'Next 7 days', color: 'warning' },
  { id: 4, title: 'Completed Meetings', value: 20, icon: 'FiCheckCircle', description: 'Successfully held', color: 'success' },
  { id: 5, title: 'Cancelled Meetings', value: 3, icon: 'FiXCircle', description: 'Cancelled this month', color: 'danger' },
  { id: 6, title: 'Client Meetings', value: 8, icon: 'FiUsers', description: 'With external clients', color: 'purple' }
];

export const meetingTypes = ['Internal Meeting', 'Client Meeting', 'Project Review', 'Daily Standup', 'Sprint Planning', 'Demo Meeting', 'Training Meeting'];
export const meetingStatuses = ['Scheduled', 'Ongoing', 'Completed', 'Cancelled', 'Rescheduled'];
export const meetingModes = ['Online', 'Offline', 'Hybrid'];

export const projectsForMeetings = ['Website Redesign', 'Mobile App UI', 'CRM Development', 'ERP System', 'Cyber Security Audit', 'E-commerce Platform'];
export const clientsForMeetings = ['TechCorp India', 'EduTech Solutions', 'MediCare Group', 'FinanceHub', 'RetailMax', 'RealEstate Pro'];

export const participantsList = [
  { id: 1, name: 'Michael Roberts', role: 'Project Manager', email: 'michael@example.com', avatar: 'MR' },
  { id: 2, name: 'Emily Davidson', role: 'Project Manager', email: 'emily@example.com', avatar: 'ED' },
  { id: 3, name: 'David Thompson', role: 'Full Stack Developer', email: 'david@example.com', avatar: 'DT' },
  { id: 4, name: 'Lisa Martinez', role: 'UI/UX Designer', email: 'lisa@example.com', avatar: 'LM' },
  { id: 5, name: 'Robert Wilson', role: 'Digital Marketer', email: 'robert@example.com', avatar: 'RW' },
  { id: 6, name: 'Thomas Wright', role: 'Backend Developer', email: 'thomas@example.com', avatar: 'TW' },
  { id: 7, name: 'Security Expert', role: 'Cyber Security Analyst', email: 'security@example.com', avatar: 'SE' },
  { id: 8, name: 'Rajesh Sharma', role: 'Client', email: 'rajesh@techcorp.in', avatar: 'RS' },
  { id: 9, name: 'Priya Patel', role: 'Client', email: 'priya@edutech.com', avatar: 'PP' },
  { id: 10, name: 'Dr. Ankit Gupta', role: 'Client', email: 'ankit@medicare.in', avatar: 'AG' }
];

export const meetingsData = [
  {
    id: 1, title: 'Weekly Sprint Planning', description: 'Plan sprint backlog and assign tasks for the upcoming sprint.', type: 'Sprint Planning', project: 'Website Redesign', client: '', date: '2026-06-19', startTime: '10:00', endTime: '11:30', mode: 'Online', location: '', meetingLink: 'https://meet.google.com/abc-defg-hij', participants: ['Michael Roberts', 'David Thompson', 'Lisa Martinez', 'Thomas Wright'], agenda: [{ id: 1, text: 'Review previous sprint', status: 'Discussed' }, { id: 2, text: 'Plan new sprint tasks', status: 'Pending' }, { id: 3, text: 'Assign story points', status: 'Pending' }], status: 'Scheduled', notes: [{ id: 1, author: 'Michael Roberts', text: 'Please review the backlog before the meeting.', time: '2026-06-18 15:00' }], createdDate: '2026-06-17'
  },
  {
    id: 2, title: 'Client Progress Review', description: 'Present project progress to TechCorp stakeholders.', type: 'Client Meeting', project: 'E-commerce Platform', client: 'TechCorp India', date: '2026-06-19', startTime: '14:00', endTime: '15:00', mode: 'Online', location: '', meetingLink: 'https://zoom.us/j/123456789', participants: ['Michael Roberts', 'Emily Davidson', 'Rajesh Sharma'], agenda: [{ id: 1, text: 'Show completed features', status: 'Pending' }, { id: 2, text: 'Discuss timeline', status: 'Pending' }, { id: 3, text: 'Gather feedback', status: 'Pending' }], status: 'Scheduled', notes: [{ id: 1, author: 'Emily Davidson', text: 'Prepare demo of payment gateway integration.', time: '2026-06-18 10:00' }], createdDate: '2026-06-15'
  },
  {
    id: 3, title: 'Daily Standup - Dev Team', description: 'Quick daily sync for development team members.', type: 'Daily Standup', project: 'Mobile App UI', client: '', date: '2026-06-19', startTime: '09:00', endTime: '09:15', mode: 'Online', location: '', meetingLink: 'https://meet.google.com/standup-dev', participants: ['David Thompson', 'Thomas Wright', 'Lisa Martinez'], agenda: [{ id: 1, text: 'What did you do yesterday?', status: 'Pending' }, { id: 2, text: 'What will you do today?', status: 'Pending' }, { id: 3, text: 'Any blockers?', status: 'Pending' }], status: 'Scheduled', notes: [], createdDate: '2026-06-19'
  },
  {
    id: 4, title: 'CRM System Demo', description: 'Demonstrate CRM system features to SalesPro Ltd.', type: 'Demo Meeting', project: 'CRM Development', client: 'EduTech Solutions', date: '2026-06-20', startTime: '11:00', endTime: '12:30', mode: 'Hybrid', location: 'Conference Room A', meetingLink: 'https://zoom.us/j/987654321', participants: ['Patricia Garcia', 'Priya Patel', 'Thomas Wright'], agenda: [{ id: 1, text: 'CRM dashboard overview', status: 'Pending' }, { id: 2, text: 'Customer management module', status: 'Pending' }, { id: 3, text: 'Q&A session', status: 'Pending' }], status: 'Scheduled', notes: [], createdDate: '2026-06-18'
  },
  {
    id: 5, title: 'Security Audit Review', description: 'Review findings of the cybersecurity assessment.', type: 'Project Review', project: 'Cyber Security Audit', client: '', date: '2026-06-21', startTime: '15:00', endTime: '16:30', mode: 'Offline', location: 'Meeting Room 3', meetingLink: '', participants: ['Security Expert', 'Michael Roberts', 'David Thompson'], agenda: [{ id: 1, text: 'Vulnerability report', status: 'Pending' }, { id: 2, text: 'Remediation plan', status: 'Pending' }, { id: 3, text: 'Timeline discussion', status: 'Pending' }], status: 'Scheduled', notes: [], createdDate: '2026-06-19'
  },
  {
    id: 6, title: 'UI Design Review', description: 'Review final UI designs for healthcare portal.', type: 'Internal Meeting', project: 'Healthcare Portal', client: '', date: '2026-06-18', startTime: '14:00', endTime: '15:00', mode: 'Online', location: '', meetingLink: 'https://meet.google.com/design-review', participants: ['Lisa Martinez', 'Emily Davidson', 'David Thompson'], agenda: [{ id: 1, text: 'Homepage design', status: 'Discussed' }, { id: 2, text: 'Patient portal UI', status: 'Discussed' }, { id: 3, text: 'Mobile responsive', status: 'Discussed' }], status: 'Completed', notes: [{ id: 1, author: 'Lisa Martinez', text: 'All designs approved. Minor changes requested for mobile view.', time: '2026-06-18 15:30' }], createdDate: '2026-06-16'
  },
  {
    id: 7, title: 'Marketing Strategy Session', description: 'Plan digital marketing strategy for next quarter.', type: 'Internal Meeting', project: 'Digital Marketing Campaign', client: '', date: '2026-06-22', startTime: '10:00', endTime: '12:00', mode: 'Offline', location: 'Conference Room B', meetingLink: '', participants: ['Robert Wilson', 'Emily Davidson', 'Amanda Taylor'], agenda: [{ id: 1, text: 'Review current campaigns', status: 'Pending' }, { id: 2, text: 'Budget allocation', status: 'Pending' }, { id: 3, text: 'New channel strategy', status: 'Pending' }], status: 'Scheduled', notes: [], createdDate: '2026-06-19'
  },
  {
    id: 8, title: 'ERP Training Session', description: 'Train team on new ERP system features and workflows.', type: 'Training Meeting', project: 'ERP System', client: '', date: '2026-06-23', startTime: '09:00', endTime: '13:00', mode: 'Offline', location: 'Training Room', meetingLink: '', participants: ['Thomas Wright', 'David Thompson', 'Robert Wilson', 'Lisa Martinez'], agenda: [{ id: 1, text: 'System overview', status: 'Pending' }, { id: 2, text: 'Module walkthrough', status: 'Pending' }, { id: 3, text: 'Hands-on practice', status: 'Pending' }, { id: 4, text: 'Q&A session', status: 'Pending' }], status: 'Scheduled', notes: [], createdDate: '2026-06-18'
  },
  {
    id: 9, title: 'Client Onboarding Call', description: 'Initial onboarding call with new client.', type: 'Client Meeting', project: 'CRM Development', client: 'RealEstate Pro', date: '2026-06-19', startTime: '16:00', endTime: '17:00', mode: 'Online', location: '', meetingLink: 'https://meet.google.com/onboarding', participants: ['Jennifer Lee', 'Amit Khanna', 'Michael Roberts'], agenda: [{ id: 1, text: 'Introduction', status: 'Pending' }, { id: 2, text: 'Project scope review', status: 'Pending' }, { id: 3, text: 'Next steps', status: 'Pending' }], status: 'Scheduled', notes: [], createdDate: '2026-06-17'
  },
  {
    id: 10, title: 'Mobile App Sprint Demo', description: 'Demo completed sprint features for mobile banking app.', type: 'Demo Meeting', project: 'Mobile App UI', client: 'FinanceHub', date: '2026-06-24', startTime: '14:00', endTime: '15:30', mode: 'Online', location: '', meetingLink: 'https://zoom.us/j/sprint-demo', participants: ['Emily Davidson', 'David Thompson', 'Sneha Reddy'], agenda: [{ id: 1, text: 'Feature showcase', status: 'Pending' }, { id: 2, text: 'User feedback', status: 'Pending' }, { id: 3, text: 'Next sprint planning', status: 'Pending' }], status: 'Scheduled', notes: [], createdDate: '2026-06-19'
  },
  {
    id: 11, title: 'Performance Review Meeting', description: 'Monthly performance review with team leads.', type: 'Internal Meeting', project: 'Website Redesign', client: '', date: '2026-06-25', startTime: '11:00', endTime: '12:00', mode: 'Online', location: '', meetingLink: 'https://meet.google.com/perf-review', participants: ['Michael Roberts', 'Emily Davidson', 'Patricia Garcia'], agenda: [{ id: 1, text: 'Team performance metrics', status: 'Pending' }, { id: 2, text: 'Individual reviews', status: 'Pending' }, { id: 3, text: 'Improvement plans', status: 'Pending' }], status: 'Scheduled', notes: [], createdDate: '2026-06-19'
  },
  {
    id: 12, title: 'Daily Standup - Design Team', description: 'Daily design team sync.', type: 'Daily Standup', project: 'UI/UX Redesign', client: '', date: '2026-06-19', startTime: '09:30', endTime: '09:45', mode: 'Online', location: '', meetingLink: 'https://meet.google.com/standup-design', participants: ['Lisa Martinez', 'Sarah Designer'], agenda: [{ id: 1, text: 'Yesterday progress', status: 'Completed' }, { id: 2, text: 'Today plan', status: 'Completed' }, { id: 3, text: 'Blockers', status: 'Completed' }], status: 'Completed', notes: [{ id: 1, author: 'Lisa Martinez', text: 'All design tasks on track. No blockers.', time: '2026-06-19 09:50' }], createdDate: '2026-06-19'
  },
  {
    id: 13, title: 'Budget Planning Meeting', description: 'Quarterly budget planning and resource allocation.', type: 'Internal Meeting', project: 'ERP System', client: '', date: '2026-06-15', startTime: '10:00', endTime: '11:30', mode: 'Offline', location: 'Board Room', meetingLink: '', participants: ['Michael Roberts', 'Accountant Smith', 'Emily Davidson'], agenda: [{ id: 1, text: 'Budget review', status: 'Discussed' }, { id: 2, text: 'Resource allocation', status: 'Discussed' }, { id: 3, text: 'Cost optimization', status: 'Discussed' }], status: 'Completed', notes: [{ id: 1, author: 'Accountant Smith', text: 'Budget approved for Q3. 5% increase for development team.', time: '2026-06-15 12:00' }], createdDate: '2026-06-13'
  },
  {
    id: 14, title: 'Healthcare Portal Review', description: 'Review healthcare portal with MediCare stakeholders.', type: 'Client Meeting', project: 'Healthcare Portal', client: 'MediCare Group', date: '2026-06-26', startTime: '11:00', endTime: '12:00', mode: 'Online', location: '', meetingLink: 'https://zoom.us/j/health-review', participants: ['Michael Roberts', 'Dr. Ankit Gupta', 'David Thompson'], agenda: [{ id: 1, text: 'Patient module demo', status: 'Pending' }, { id: 2, text: 'Compliance check', status: 'Pending' }, { id: 3, text: 'Feedback collection', status: 'Pending' }], status: 'Scheduled', notes: [], createdDate: '2026-06-19'
  },
  {
    id: 15, title: 'Rescheduled: API Design Discussion', description: 'Discuss API architecture for payment gateway. (Rescheduled from June 16)', type: 'Internal Meeting', project: 'E-commerce Platform', client: '', date: '2026-06-16', startTime: '14:00', endTime: '15:00', mode: 'Online', location: '', meetingLink: 'https://meet.google.com/api-design', participants: ['David Thompson', 'Thomas Wright'], agenda: [{ id: 1, text: 'API endpoints', status: 'Discussed' }, { id: 2, text: 'Data flow', status: 'Discussed' }], status: 'Rescheduled', notes: [{ id: 1, author: 'David Thompson', text: 'Rescheduled due to conflict. Moved to June 16.', time: '2026-06-15' }], createdDate: '2026-06-14'
  }
];