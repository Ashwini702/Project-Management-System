// src/data/taskData.js
export const taskStatsData = [
  {
    id: 1,
    title: 'Total Tasks',
    value: 240,
    icon: 'FiCheckSquare',
    description: 'All project tasks',
    color: 'primary'
  },
  {
    id: 2,
    title: 'Pending Tasks',
    value: 65,
    icon: 'FiClock',
    description: 'Awaiting start',
    color: 'warning'
  },
  {
    id: 3,
    title: 'In Progress',
    value: 82,
    icon: 'FiTrendingUp',
    description: 'Currently active',
    color: 'info'
  },
  {
    id: 4,
    title: 'Under Review',
    value: 31,
    icon: 'FiEye',
    description: 'Quality check',
    color: 'purple'
  },
  {
    id: 5,
    title: 'Completed Tasks',
    value: 55,
    icon: 'FiCheckCircle',
    description: 'Successfully done',
    color: 'success'
  },
  {
    id: 6,
    title: 'Reopened Tasks',
    value: 7,
    icon: 'FiRefreshCw',
    description: 'Needs revision',
    color: 'danger'
  }
];

export const projectsForTasks = [
  'E-commerce Platform',
  'Mobile Banking App',
  'CRM System',
  'Healthcare Portal',
  'ERP System',
  'Digital Marketing',
  'UI/UX Redesign',
  'Learning Management',
  'Cyber Security Assessment',
  'Network Infrastructure'
];

export const assigneesList = [
  'David Thompson',
  'Lisa Martinez',
  'Robert Wilson',
  'Amanda Taylor',
  'Thomas Wright',
  'Jennifer Lee',
  'John Developer',
  'Sarah Designer',
  'Mike Developer',
  'Security Expert'
];

export const tasksData = [
  {
    id: 1,
    title: 'Design Homepage Layout',
    description: 'Create a modern, responsive homepage design with hero section, features grid, and call-to-action buttons.',
    project: 'E-commerce Platform',
    assignee: 'Lisa Martinez',
    startDate: '2026-06-01',
    deadline: '2026-06-15',
    priority: 'High',
    status: 'In Progress',
    progress: 70,
    estimatedHours: 40,
    timeSpent: 28,
    checklistCount: 8,
    completedChecklist: 5,
    commentsCount: 4,
    createdDate: '2026-05-28',
    checklist: [
      { id: 1, text: 'Research competitor designs', completed: true },
      { id: 2, text: 'Create wireframes', completed: true },
      { id: 3, text: 'Design hero section', completed: true },
      { id: 4, text: 'Design features grid', completed: true },
      { id: 5, text: 'Design CTA buttons', completed: true },
      { id: 6, text: 'Mobile responsive layout', completed: false },
      { id: 7, text: 'Client review', completed: false },
      { id: 8, text: 'Final revisions', completed: false }
    ],
    discussions: [
      { id: 1, user: 'Michael Roberts', avatar: 'MR', message: 'Please ensure the hero section matches our brand guidelines.', time: '2 hours ago' },
      { id: 2, user: 'Lisa Martinez', avatar: 'LM', message: 'Working on it. Will share the mockup by EOD.', time: '1 hour ago' },
      { id: 3, user: 'Sarah Designer', avatar: 'SD', message: 'I can help with the illustrations if needed.', time: '30 mins ago' },
      { id: 4, user: 'Michael Roberts', avatar: 'MR', message: 'Great, let\'s collaborate on this.', time: '15 mins ago' }
    ]
  },
  {
    id: 2,
    title: 'API Integration for Payment Gateway',
    description: 'Integrate Stripe payment gateway with proper error handling, webhook setup, and testing.',
    project: 'E-commerce Platform',
    assignee: 'David Thompson',
    startDate: '2026-06-05',
    deadline: '2026-06-20',
    priority: 'Urgent',
    status: 'In Progress',
    progress: 45,
    estimatedHours: 30,
    timeSpent: 13,
    checklistCount: 6,
    completedChecklist: 3,
    commentsCount: 3,
    createdDate: '2026-06-01',
    checklist: [
      { id: 1, text: 'Set up Stripe account', completed: true },
      { id: 2, text: 'Install Stripe SDK', completed: true },
      { id: 3, text: 'Implement payment flow', completed: true },
      { id: 4, text: 'Error handling', completed: false },
      { id: 5, text: 'Webhook setup', completed: false },
      { id: 6, text: 'Testing & QA', completed: false }
    ],
    discussions: [
      { id: 1, user: 'Emily Davidson', avatar: 'ED', message: 'Make sure to implement proper error handling for declined payments.', time: '3 hours ago' },
      { id: 2, user: 'David Thompson', avatar: 'DT', message: 'Will do. Also adding retry logic for failed transactions.', time: '2 hours ago' },
      { id: 3, user: 'Emily Davidson', avatar: 'ED', message: 'Perfect. Keep me updated on progress.', time: '1 hour ago' }
    ]
  },
  {
    id: 3,
    title: 'User Authentication Module',
    description: 'Implement JWT-based authentication with login, registration, password reset, and session management.',
    project: 'Mobile Banking App',
    assignee: 'David Thompson',
    startDate: '2026-06-10',
    deadline: '2026-06-25',
    priority: 'High',
    status: 'In Progress',
    progress: 60,
    estimatedHours: 35,
    timeSpent: 21,
    checklistCount: 7,
    completedChecklist: 4,
    commentsCount: 2,
    createdDate: '2026-06-05',
    checklist: [
      { id: 1, text: 'Set up JWT configuration', completed: true },
      { id: 2, text: 'Login endpoint', completed: true },
      { id: 3, text: 'Registration endpoint', completed: true },
      { id: 4, text: 'Password reset flow', completed: true },
      { id: 5, text: 'Session management', completed: false },
      { id: 6, text: 'Security testing', completed: false },
      { id: 7, text: 'Documentation', completed: false }
    ],
    discussions: [
      { id: 1, user: 'Patricia Garcia', avatar: 'PG', message: 'Ensure we\'re using bcrypt for password hashing.', time: '5 hours ago' },
      { id: 2, user: 'David Thompson', avatar: 'DT', message: 'Yes, implemented with salt rounds of 12.', time: '4 hours ago' }
    ]
  },
  {
    id: 4,
    title: 'Database Schema Design',
    description: 'Design and implement database schema for customer management module with proper relationships and indexing.',
    project: 'CRM System',
    assignee: 'Thomas Wright',
    startDate: '2026-05-15',
    deadline: '2026-05-30',
    priority: 'Medium',
    status: 'Completed',
    progress: 100,
    estimatedHours: 20,
    timeSpent: 18,
    checklistCount: 5,
    completedChecklist: 5,
    commentsCount: 1,
    createdDate: '2026-05-10',
    checklist: [
      { id: 1, text: 'Analyze requirements', completed: true },
      { id: 2, text: 'Design ER diagram', completed: true },
      { id: 3, text: 'Create migrations', completed: true },
      { id: 4, text: 'Add indexes', completed: true },
      { id: 5, text: 'Performance testing', completed: true }
    ],
    discussions: [
      { id: 1, user: 'Michael Roberts', avatar: 'MR', message: 'Schema looks good. Approved for next phase.', time: '2 days ago' }
    ]
  },
  {
    id: 5,
    title: 'Patient Records Module',
    description: 'Develop HIPAA-compliant patient records management system with search, filter, and secure access controls.',
    project: 'Healthcare Portal',
    assignee: 'Mike Developer',
    startDate: '2026-06-15',
    deadline: '2026-07-15',
    priority: 'High',
    status: 'Pending',
    progress: 0,
    estimatedHours: 80,
    timeSpent: 0,
    checklistCount: 10,
    completedChecklist: 0,
    commentsCount: 0,
    createdDate: '2026-06-10',
    checklist: [
      { id: 1, text: 'Requirements gathering', completed: false },
      { id: 2, text: 'HIPAA compliance review', completed: false },
      { id: 3, text: 'Database design', completed: false },
      { id: 4, text: 'API development', completed: false },
      { id: 5, text: 'Frontend UI', completed: false },
      { id: 6, text: 'Access control implementation', completed: false },
      { id: 7, text: 'Search functionality', completed: false },
      { id: 8, text: 'Testing', completed: false },
      { id: 9, text: 'Security audit', completed: false },
      { id: 10, text: 'Documentation', completed: false }
    ],
    discussions: []
  },
  {
    id: 6,
    title: 'Inventory Management API',
    description: 'Build RESTful API for inventory tracking with CRUD operations, stock alerts, and reporting endpoints.',
    project: 'ERP System',
    assignee: 'Robert Wilson',
    startDate: '2026-06-01',
    deadline: '2026-06-30',
    priority: 'Medium',
    status: 'In Progress',
    progress: 35,
    estimatedHours: 50,
    timeSpent: 17,
    checklistCount: 8,
    completedChecklist: 3,
    commentsCount: 2,
    createdDate: '2026-05-25',
    checklist: [
      { id: 1, text: 'API documentation', completed: true },
      { id: 2, text: 'CRUD endpoints', completed: true },
      { id: 3, text: 'Stock alert system', completed: true },
      { id: 4, text: 'Reporting endpoints', completed: false },
      { id: 5, text: 'Authentication middleware', completed: false },
      { id: 6, text: 'Rate limiting', completed: false },
      { id: 7, text: 'Unit tests', completed: false },
      { id: 8, text: 'Integration tests', completed: false }
    ],
    discussions: [
      { id: 1, user: 'Emily Davidson', avatar: 'ED', message: 'Please include pagination for large datasets.', time: '1 day ago' },
      { id: 2, user: 'Robert Wilson', avatar: 'RW', message: 'Added pagination with limit and offset parameters.', time: '20 hours ago' }
    ]
  },
  {
    id: 7,
    title: 'Social Media Content Calendar',
    description: 'Create and schedule social media posts for the upcoming product launch campaign across all platforms.',
    project: 'Digital Marketing',
    assignee: 'Amanda Taylor',
    startDate: '2026-06-20',
    deadline: '2026-07-10',
    priority: 'Low',
    status: 'Pending',
    progress: 0,
    estimatedHours: 25,
    timeSpent: 0,
    checklistCount: 6,
    completedChecklist: 0,
    commentsCount: 0,
    createdDate: '2026-06-15',
    checklist: [
      { id: 1, text: 'Platform research', completed: false },
      { id: 2, text: 'Content strategy', completed: false },
      { id: 3, text: 'Create posts', completed: false },
      { id: 4, text: 'Design graphics', completed: false },
      { id: 5, text: 'Schedule posts', completed: false },
      { id: 6, text: 'Review and approve', completed: false }
    ],
    discussions: []
  },
  {
    id: 8,
    title: 'Mobile App Navigation Design',
    description: 'Design intuitive bottom navigation with gesture controls and smooth transitions between screens.',
    project: 'Mobile Banking App',
    assignee: 'Sarah Designer',
    startDate: '2026-06-10',
    deadline: '2026-06-25',
    priority: 'Medium',
    status: 'Under Review',
    progress: 85,
    estimatedHours: 30,
    timeSpent: 25,
    checklistCount: 6,
    completedChecklist: 5,
    commentsCount: 3,
    createdDate: '2026-06-05',
    checklist: [
      { id: 1, text: 'Research navigation patterns', completed: true },
      { id: 2, text: 'Create wireframes', completed: true },
      { id: 3, text: 'Design bottom nav', completed: true },
      { id: 4, text: 'Gesture animations', completed: true },
      { id: 5, text: 'Screen transitions', completed: true },
      { id: 6, text: 'Client approval', completed: false }
    ],
    discussions: [
      { id: 1, user: 'Emily Davidson', avatar: 'ED', message: 'The transitions look great! Small feedback on the animation speed.', time: '3 hours ago' },
      { id: 2, user: 'Sarah Designer', avatar: 'SD', message: 'Thanks! I\'ll adjust the animation duration to 300ms.', time: '2 hours ago' },
      { id: 3, user: 'Emily Davidson', avatar: 'ED', message: 'Perfect, that should feel more natural.', time: '1 hour ago' }
    ]
  },
  {
    id: 9,
    title: 'Email Template for Newsletter',
    description: 'Design and code responsive HTML email template for monthly newsletter with brand styling.',
    project: 'Digital Marketing',
    assignee: 'Lisa Martinez',
    startDate: '2026-06-15',
    deadline: '2026-06-28',
    priority: 'Low',
    status: 'Pending',
    progress: 0,
    estimatedHours: 15,
    timeSpent: 0,
    checklistCount: 4,
    completedChecklist: 0,
    commentsCount: 0,
    createdDate: '2026-06-12',
    checklist: [
      { id: 1, text: 'Design mockup', completed: false },
      { id: 2, text: 'Code HTML template', completed: false },
      { id: 3, text: 'Test across email clients', completed: false },
      { id: 4, text: 'Final approval', completed: false }
    ],
    discussions: []
  },
  {
    id: 10,
    title: 'Security Vulnerability Patch',
    description: 'Apply security patches for identified vulnerabilities in the authentication system and update dependencies.',
    project: 'Cyber Security Assessment',
    assignee: 'Security Expert',
    startDate: '2026-06-05',
    deadline: '2026-06-15',
    priority: 'Urgent',
    status: 'Reopened',
    progress: 80,
    estimatedHours: 20,
    timeSpent: 16,
    checklistCount: 5,
    completedChecklist: 4,
    commentsCount: 2,
    createdDate: '2026-06-03',
    checklist: [
      { id: 1, text: 'Identify vulnerabilities', completed: true },
      { id: 2, text: 'Apply patches', completed: true },
      { id: 3, text: 'Update dependencies', completed: true },
      { id: 4, text: 'Run security tests', completed: true },
      { id: 5, text: 'Deploy to production', completed: false }
    ],
    discussions: [
      { id: 1, user: 'Patricia Garcia', avatar: 'PG', message: 'One vulnerability still showing in the penetration test. Please re-check.', time: '4 hours ago' },
      { id: 2, user: 'Security Expert', avatar: 'SE', message: 'Found it. It\'s in the third-party library. Updating now.', time: '2 hours ago' }
    ]
  },
  {
    id: 11,
    title: 'Report Generation Module',
    description: 'Build dynamic report generation system with customizable templates, charts, and export to PDF/Excel.',
    project: 'CRM System',
    assignee: 'Thomas Wright',
    startDate: '2026-06-20',
    deadline: '2026-07-15',
    priority: 'Medium',
    status: 'Pending',
    progress: 0,
    estimatedHours: 45,
    timeSpent: 0,
    checklistCount: 7,
    completedChecklist: 0,
    commentsCount: 0,
    createdDate: '2026-06-15',
    checklist: [
      { id: 1, text: 'Requirements analysis', completed: false },
      { id: 2, text: 'Design report templates', completed: false },
      { id: 3, text: 'Chart integration', completed: false },
      { id: 4, text: 'PDF export', completed: false },
      { id: 5, text: 'Excel export', completed: false },
      { id: 6, text: 'Testing', completed: false },
      { id: 7, text: 'Documentation', completed: false }
    ],
    discussions: []
  },
  {
    id: 12,
    title: 'Performance Optimization',
    description: 'Optimize website performance including image compression, code minification, caching implementation, and CDN setup.',
    project: 'E-commerce Platform',
    assignee: 'John Developer',
    startDate: '2026-06-10',
    deadline: '2026-06-22',
    priority: 'High',
    status: 'Under Review',
    progress: 90,
    estimatedHours: 25,
    timeSpent: 22,
    checklistCount: 6,
    completedChecklist: 5,
    commentsCount: 1,
    createdDate: '2026-06-08',
    checklist: [
      { id: 1, text: 'Image optimization', completed: true },
      { id: 2, text: 'Code minification', completed: true },
      { id: 3, text: 'Browser caching', completed: true },
      { id: 4, text: 'CDN setup', completed: true },
      { id: 5, text: 'Lazy loading implementation', completed: true },
      { id: 6, text: 'Performance testing', completed: false }
    ],
    discussions: [
      { id: 1, user: 'Michael Roberts', avatar: 'MR', message: 'Page load time improved from 4.2s to 1.8s. Great work!', time: '1 hour ago' }
    ]
  }
];

export const priorities = ['Low', 'Medium', 'High', 'Urgent'];
export const statuses = ['Pending', 'In Progress', 'Under Review', 'Completed', 'Reopened', 'Cancelled'];
export const deadlineFilters = ['All Deadlines', 'Today', 'This Week', 'This Month', 'Overdue'];