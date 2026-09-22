// src/data/taskDetailsData.js
export const taskData = {
  id: 1,
  title: 'Design Homepage UI',
  description: 'Create a modern, responsive homepage design with hero section, features grid, call-to-action buttons, and client testimonials section. The design should follow the brand guidelines and be optimized for both desktop and mobile devices.',
  project: 'Website Redesign Project',
  assignedTo: 'Lisa Martinez',
  startDate: '2026-02-01',
  deadline: '2026-06-30',
  priority: 'High',
  status: 'In Progress',
  progress: 72,
  estimatedHours: 40,
  timeSpent: 18,
  checklistTotal: 8,
  checklistCompleted: 5,
  commentsCount: 14,
  documentsCount: 6,
  createdBy: 'Michael Roberts',
  createdDate: '2026-02-01 09:00',
  lastUpdated: '2026-06-19 14:30'
};

export const taskStatsData = [
  { id: 1, title: 'Progress', value: '72%', icon: 'FiTrendingUp', desc: 'Overall completion', color: 'primary' },
  { id: 2, title: 'Checklist Items', value: 8, icon: 'FiCheckSquare', desc: '5 completed', color: 'success' },
  { id: 3, title: 'Comments', value: 14, icon: 'FiMessageSquare', desc: 'Discussion count', color: 'info' },
  { id: 4, title: 'Documents', value: 6, icon: 'FiFileText', desc: 'Attached files', color: 'warning' },
  { id: 5, title: 'Time Spent', value: '18h', icon: 'FiClock', desc: 'of 40h estimated', color: 'purple' },
  { id: 6, title: 'Remaining', value: '22h', icon: 'FiAlertCircle', desc: 'Estimated left', color: 'danger' }
];

export const checklistItems = [
  { id: 1, text: 'Research competitor homepage designs', completed: true, assignedTo: 'Lisa Martinez', dueDate: '2026-02-05' },
  { id: 2, text: 'Create wireframe sketches', completed: true, assignedTo: 'Lisa Martinez', dueDate: '2026-02-10' },
  { id: 3, text: 'Design hero section with banner', completed: true, assignedTo: 'Lisa Martinez', dueDate: '2026-02-20' },
  { id: 4, text: 'Design features grid section', completed: true, assignedTo: 'Lisa Martinez', dueDate: '2026-03-01' },
  { id: 5, text: 'Design CTA buttons and forms', completed: true, assignedTo: 'Lisa Martinez', dueDate: '2026-03-15' },
  { id: 6, text: 'Add client testimonials section', completed: false, assignedTo: 'Lisa Martinez', dueDate: '2026-04-01' },
  { id: 7, text: 'Mobile responsive optimization', completed: false, assignedTo: 'Lisa Martinez', dueDate: '2026-04-20' },
  { id: 8, text: 'Final review and client approval', completed: false, assignedTo: 'Lisa Martinez', dueDate: '2026-06-30' }
];

export const discussionComments = [
  { id: 1, user: 'Michael Roberts', role: 'Project Manager', avatar: 'MR', message: 'Please ensure the hero section matches our new brand guidelines with the updated color palette.', dateTime: '2026-02-15 10:00' },
  { id: 2, user: 'Lisa Martinez', role: 'UI/UX Designer', avatar: 'LM', message: 'Sure! I\'ve incorporated the new brand colors. Will share the mockup by EOD.', dateTime: '2026-02-15 14:30' },
  { id: 3, user: 'David Thompson', role: 'Full Stack Developer', avatar: 'DT', message: 'The CTA buttons need to be easily integrable with our React components. Can you use standard button sizes?', dateTime: '2026-03-10 11:00' },
  { id: 4, user: 'Lisa Martinez', role: 'UI/UX Designer', avatar: 'LM', message: 'Yes, I\'m using the design system button components. They\'ll map directly to the code.', dateTime: '2026-03-10 15:00' },
  { id: 5, user: 'Rajesh Sharma', role: 'Client', avatar: 'RS', message: 'The features grid looks excellent! Can we add animation to the cards on hover?', dateTime: '2026-03-20 09:30' },
  { id: 6, user: 'Lisa Martinez', role: 'UI/UX Designer', avatar: 'LM', message: 'Good suggestion! I\'ll add subtle hover animations with smooth transitions.', dateTime: '2026-03-20 16:00' }
];

export const taskDocuments = [
  { id: 1, name: 'Homepage Wireframes.pdf', type: 'PDF', uploadedBy: 'Lisa Martinez', uploadDate: '2026-02-10', size: '3.2 MB' },
  { id: 2, name: 'Hero Section Mockups.png', type: 'PNG', uploadedBy: 'Lisa Martinez', uploadDate: '2026-02-20', size: '5.8 MB' },
  { id: 3, name: 'CTA Button Designs.fig', type: 'FIG', uploadedBy: 'Lisa Martinez', uploadDate: '2026-03-15', size: '2.1 MB' },
  { id: 4, name: 'Mobile Responsive Screens.png', type: 'PNG', uploadedBy: 'Lisa Martinez', uploadDate: '2026-04-20', size: '4.5 MB' },
  { id: 5, name: 'Client Feedback.pdf', type: 'PDF', uploadedBy: 'Michael Roberts', uploadDate: '2026-05-10', size: '890 KB' },
  { id: 6, name: 'Final Review Notes.docx', type: 'DOCX', uploadedBy: 'Lisa Martinez', uploadDate: '2026-06-15', size: '345 KB' }
];

export const timeLogs = [
  { id: 1, date: '2026-06-19', user: 'Lisa Martinez', startTime: '09:00', endTime: '12:00', duration: '3h', description: 'Working on mobile responsive layout', billable: true },
  { id: 2, date: '2026-06-18', user: 'Lisa Martinez', startTime: '14:00', endTime: '17:00', duration: '3h', description: 'Client testimonials section design', billable: true },
  { id: 3, date: '2026-06-17', user: 'Lisa Martinez', startTime: '10:00', endTime: '13:00', duration: '3h', description: 'CTA button refinements', billable: true },
  { id: 4, date: '2026-06-16', user: 'Lisa Martinez', startTime: '09:00', endTime: '11:00', duration: '2h', description: 'Team meeting and design review', billable: false },
  { id: 5, date: '2026-06-15', user: 'Lisa Martinez', startTime: '14:00', endTime: '18:00', duration: '4h', description: 'Features grid animation implementation', billable: true },
  { id: 6, date: '2026-06-14', user: 'Lisa Martinez', startTime: '10:00', endTime: '13:00', duration: '3h', description: 'Hero section final touches', billable: true }
];

export const taskActivities = [
  { id: 1, title: 'Task Created', description: 'Design Homepage UI task was created.', user: 'Michael Roberts', dateTime: '2026-02-01 09:00', type: 'create' },
  { id: 2, title: 'Task Assigned', description: 'Assigned to Lisa Martinez.', user: 'Michael Roberts', dateTime: '2026-02-01 09:00', type: 'assign' },
  { id: 3, title: 'Checklist Item Completed', description: 'Research competitor homepage designs marked complete.', user: 'Lisa Martinez', dateTime: '2026-02-05 16:00', type: 'checklist' },
  { id: 4, title: 'Document Uploaded', description: 'Homepage Wireframes.pdf uploaded.', user: 'Lisa Martinez', dateTime: '2026-02-10 14:00', type: 'upload' },
  { id: 5, title: 'Comment Added', description: 'Michael Roberts commented on hero section.', user: 'Michael Roberts', dateTime: '2026-02-15 10:00', type: 'comment' },
  { id: 6, title: 'Status Changed', description: 'Status changed from Pending to In Progress.', user: 'Lisa Martinez', dateTime: '2026-02-15 16:00', type: 'status' },
  { id: 7, title: 'Priority Updated', description: 'Priority changed from Medium to High.', user: 'Michael Roberts', dateTime: '2026-03-01 09:00', type: 'priority' },
  { id: 8, title: 'Document Uploaded', description: 'CTA Button Designs.fig uploaded.', user: 'Lisa Martinez', dateTime: '2026-03-15 16:00', type: 'upload' },
  { id: 9, title: 'Comment Added', description: 'Rajesh Sharma suggested hover animations.', user: 'Rajesh Sharma', dateTime: '2026-03-20 09:30', type: 'comment' },
  { id: 10, title: 'Task Marked Completed', description: 'This is a simulated final activity.', user: 'Lisa Martinez', dateTime: '2026-06-19 14:30', type: 'complete' }
];

export const relatedProject = {
  id: 1,
  name: 'Website Redesign Project',
  client: 'TechCorp India Pvt Ltd',
  manager: 'Michael Roberts',
  status: 'In Progress',
  priority: 'High',
  progress: 68,
  startDate: '2026-01-15',
  endDate: '2026-07-30',
  totalTasks: 36,
  completedTasks: 22,
  teamCount: 6
};

export const assignedMember = {
  name: 'Lisa Martinez',
  role: 'UI/UX Designer',
  department: 'Design',
  email: 'lisa.martinez@example.com',
  phone: '+91 98765 33333',
  avatar: 'LM',
  assignedTasks: 8,
  completedTasks: 5,
  workload: 65,
  status: 'Active'
};