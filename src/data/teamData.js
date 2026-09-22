// src/data/teamData.js
export const teamStatsData = [
  {
    id: 1,
    title: 'Total Team Members',
    value: 35,
    icon: 'FiUsers',
    description: 'All registered members',
    color: 'primary'
  },
  {
    id: 2,
    title: 'Active Members',
    value: 30,
    icon: 'FiUserCheck',
    description: 'Currently working',
    color: 'success'
  },
  {
    id: 3,
    title: 'On Leave',
    value: 3,
    icon: 'FiCalendar',
    description: 'Temporarily away',
    color: 'warning'
  },
  {
    id: 4,
    title: 'Departments',
    value: 6,
    icon: 'FiGrid',
    description: 'Active departments',
    color: 'info'
  },
  {
    id: 5,
    title: 'Overloaded Members',
    value: 4,
    icon: 'FiAlertTriangle',
    description: 'High workload',
    color: 'danger'
  },
  {
    id: 6,
    title: 'Available Members',
    value: 12,
    icon: 'FiSmile',
    description: 'Ready for tasks',
    color: 'purple'
  }
];

export const departments = [
  'Development',
  'UI/UX Design',
  'Digital Marketing',
  'Cyber Security',
  'HR',
  'Accounts'
];

export const roles = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'UI/UX Designer',
  'Digital Marketer',
  'Cyber Security Analyst',
  'HR Executive',
  'Accountant'
];

export const projectsList = [
  'E-commerce Platform',
  'Mobile Banking App',
  'CRM System',
  'Healthcare Portal',
  'ERP System',
  'Digital Marketing Campaign',
  'UI/UX Redesign',
  'Cyber Security Assessment'
];

export const teamMembersData = [
  {
    id: 1,
    name: 'David Thompson',
    email: 'david.thompson@example.com',
    phone: '+1 (555) 567-8901',
    role: 'Full Stack Developer',
    department: 'Development',
    skills: ['React', 'Node.js', 'MongoDB', 'AWS', 'Docker'],
    assignedProjects: ['E-commerce Platform', 'CRM System'],
    assignedTasks: 12,
    completedTasks: 8,
    pendingTasks: 4,
    workload: 75,
    performance: 92,
    status: 'Active',
    joiningDate: '2025-05-15',
    lastActivity: '2026-06-19 14:30',
    recentTasks: [
      { title: 'API Integration', status: 'Completed', date: '2026-06-18' },
      { title: 'Database Optimization', status: 'In Progress', date: '2026-06-19' },
      { title: 'Code Review', status: 'Pending', date: '2026-06-20' }
    ]
  },
  {
    id: 2,
    name: 'Lisa Martinez',
    email: 'lisa.martinez@example.com',
    phone: '+1 (555) 678-9012',
    role: 'UI/UX Designer',
    department: 'UI/UX Design',
    skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research'],
    assignedProjects: ['Mobile Banking App', 'Healthcare Portal'],
    assignedTasks: 8,
    completedTasks: 6,
    pendingTasks: 2,
    workload: 60,
    performance: 88,
    status: 'Active',
    joiningDate: '2025-06-20',
    lastActivity: '2026-06-19 10:00',
    recentTasks: [
      { title: 'Homepage Design', status: 'Completed', date: '2026-06-17' },
      { title: 'User Flow Creation', status: 'Completed', date: '2026-06-18' },
      { title: 'Prototype Testing', status: 'In Progress', date: '2026-06-19' }
    ]
  },
  {
    id: 3,
    name: 'Robert Wilson',
    email: 'robert.wilson@example.com',
    phone: '+1 (555) 789-0123',
    role: 'Digital Marketer',
    department: 'Digital Marketing',
    skills: ['SEO', 'Social Media', 'Content Strategy', 'PPC', 'Analytics'],
    assignedProjects: ['Digital Marketing Campaign', 'UI/UX Redesign'],
    assignedTasks: 6,
    completedTasks: 3,
    pendingTasks: 3,
    workload: 50,
    performance: 78,
    status: 'On Leave',
    joiningDate: '2025-07-10',
    lastActivity: '2026-06-15 08:45',
    recentTasks: [
      { title: 'SEO Audit', status: 'Completed', date: '2026-06-14' },
      { title: 'Social Media Calendar', status: 'In Progress', date: '2026-06-15' }
    ]
  },
  {
    id: 4,
    name: 'Amanda Taylor',
    email: 'amanda.taylor@example.com',
    phone: '+1 (555) 234-8901',
    role: 'Frontend Developer',
    department: 'Development',
    skills: ['React', 'Vue.js', 'JavaScript', 'CSS', 'Tailwind'],
    assignedProjects: ['Healthcare Portal', 'CRM System'],
    assignedTasks: 10,
    completedTasks: 7,
    pendingTasks: 3,
    workload: 70,
    performance: 85,
    status: 'Active',
    joiningDate: '2025-12-01',
    lastActivity: '2026-06-19 09:00',
    recentTasks: [
      { title: 'Component Development', status: 'Completed', date: '2026-06-17' },
      { title: 'Bug Fixing', status: 'Completed', date: '2026-06-18' },
      { title: 'UI Implementation', status: 'In Progress', date: '2026-06-19' }
    ]
  },
  {
    id: 5,
    name: 'Thomas Wright',
    email: 'thomas.wright@example.com',
    phone: '+1 (555) 123-7890',
    role: 'Backend Developer',
    department: 'Development',
    skills: ['Python', 'Django', 'PostgreSQL', 'Redis', 'Docker'],
    assignedProjects: ['Learning Management', 'ERP System'],
    assignedTasks: 9,
    completedTasks: 5,
    pendingTasks: 4,
    workload: 65,
    performance: 90,
    status: 'Available',
    joiningDate: '2025-11-05',
    lastActivity: '2026-06-19 08:15',
    recentTasks: [
      { title: 'Database Schema', status: 'Completed', date: '2026-06-16' },
      { title: 'API Development', status: 'In Progress', date: '2026-06-18' },
      { title: 'Performance Testing', status: 'Pending', date: '2026-06-20' }
    ]
  },
  {
    id: 6,
    name: 'Jennifer Lee',
    email: 'jennifer.lee@example.com',
    phone: '+1 (555) 890-1234',
    role: 'HR Executive',
    department: 'HR',
    skills: ['Recruitment', 'Employee Relations', 'Payroll', 'Training'],
    assignedProjects: ['Internal HR System'],
    assignedTasks: 5,
    completedTasks: 4,
    pendingTasks: 1,
    workload: 40,
    performance: 82,
    status: 'Active',
    joiningDate: '2025-08-01',
    lastActivity: '2026-06-18 15:00',
    recentTasks: [
      { title: 'Employee Review', status: 'Completed', date: '2026-06-17' },
      { title: 'Policy Update', status: 'Completed', date: '2026-06-18' }
    ]
  },
  {
    id: 7,
    name: 'John Developer',
    email: 'john.dev@example.com',
    phone: '+1 (555) 111-2233',
    role: 'Full Stack Developer',
    department: 'Development',
    skills: ['Angular', 'Java', 'Spring Boot', 'Oracle', 'Kubernetes'],
    assignedProjects: ['E-commerce Platform', 'Mobile Banking App', 'Healthcare Portal'],
    assignedTasks: 15,
    completedTasks: 10,
    pendingTasks: 5,
    workload: 95,
    performance: 94,
    status: 'Busy',
    joiningDate: '2025-03-15',
    lastActivity: '2026-06-19 16:00',
    recentTasks: [
      { title: 'Payment Gateway', status: 'Completed', date: '2026-06-18' },
      { title: 'Security Patch', status: 'Completed', date: '2026-06-19' },
      { title: 'Load Testing', status: 'In Progress', date: '2026-06-19' },
      { title: 'Documentation', status: 'Pending', date: '2026-06-21' }
    ]
  },
  {
    id: 8,
    name: 'Sarah Designer',
    email: 'sarah.design@example.com',
    phone: '+1 (555) 222-3344',
    role: 'UI/UX Designer',
    department: 'UI/UX Design',
    skills: ['Figma', 'Illustrator', 'After Effects', 'Design Systems'],
    assignedProjects: ['E-commerce Platform', 'UI/UX Redesign'],
    assignedTasks: 7,
    completedTasks: 5,
    pendingTasks: 2,
    workload: 55,
    performance: 91,
    status: 'Active',
    joiningDate: '2025-04-20',
    lastActivity: '2026-06-19 12:00',
    recentTasks: [
      { title: 'Design System', status: 'Completed', date: '2026-06-17' },
      { title: 'Animation Design', status: 'Completed', date: '2026-06-18' },
      { title: 'Client Presentation', status: 'In Progress', date: '2026-06-19' }
    ]
  },
  {
    id: 9,
    name: 'Mike Developer',
    email: 'mike.dev@example.com',
    phone: '+1 (555) 333-4455',
    role: 'Backend Developer',
    department: 'Development',
    skills: ['Node.js', 'Express', 'MongoDB', 'GraphQL', 'AWS'],
    assignedProjects: ['Healthcare Portal', 'CRM System'],
    assignedTasks: 11,
    completedTasks: 6,
    pendingTasks: 5,
    workload: 80,
    performance: 87,
    status: 'Busy',
    joiningDate: '2025-02-10',
    lastActivity: '2026-06-19 11:00',
    recentTasks: [
      { title: 'API Optimization', status: 'Completed', date: '2026-06-17' },
      { title: 'GraphQL Schema', status: 'In Progress', date: '2026-06-18' },
      { title: 'AWS Deployment', status: 'Pending', date: '2026-06-21' }
    ]
  },
  {
    id: 10,
    name: 'Security Expert',
    email: 'security.expert@example.com',
    phone: '+1 (555) 444-5566',
    role: 'Cyber Security Analyst',
    department: 'Cyber Security',
    skills: ['Penetration Testing', 'SIEM', 'Firewall', 'Encryption', 'Compliance'],
    assignedProjects: ['Cyber Security Assessment', 'Mobile Banking App'],
    assignedTasks: 8,
    completedTasks: 6,
    pendingTasks: 2,
    workload: 60,
    performance: 89,
    status: 'Available',
    joiningDate: '2025-09-15',
    lastActivity: '2026-06-19 13:00',
    recentTasks: [
      { title: 'Vulnerability Scan', status: 'Completed', date: '2026-06-18' },
      { title: 'Security Audit', status: 'Completed', date: '2026-06-19' },
      { title: 'Report Generation', status: 'In Progress', date: '2026-06-19' }
    ]
  },
  {
    id: 11,
    name: 'Accountant Smith',
    email: 'accountant@example.com',
    phone: '+1 (555) 555-6677',
    role: 'Accountant',
    department: 'Accounts',
    skills: ['QuickBooks', 'Excel', 'Financial Reporting', 'Tax Preparation'],
    assignedProjects: ['Internal Finance System'],
    assignedTasks: 4,
    completedTasks: 3,
    pendingTasks: 1,
    workload: 30,
    performance: 76,
    status: 'Active',
    joiningDate: '2025-10-01',
    lastActivity: '2026-06-18 17:00',
    recentTasks: [
      { title: 'Monthly Report', status: 'Completed', date: '2026-06-17' },
      { title: 'Budget Analysis', status: 'Completed', date: '2026-06-18' }
    ]
  },
  {
    id: 12,
    name: 'Marketing Pro',
    email: 'marketing.pro@example.com',
    phone: '+1 (555) 666-7788',
    role: 'Digital Marketer',
    department: 'Digital Marketing',
    skills: ['Google Ads', 'Facebook Ads', 'Content Marketing', 'Email Marketing'],
    assignedProjects: ['Digital Marketing Campaign'],
    assignedTasks: 6,
    completedTasks: 2,
    pendingTasks: 4,
    workload: 45,
    performance: 72,
    status: 'Inactive',
    joiningDate: '2025-11-20',
    lastActivity: '2026-06-10 09:00',
    recentTasks: [
      { title: 'Ad Campaign Setup', status: 'Completed', date: '2026-06-09' },
      { title: 'Content Creation', status: 'In Progress', date: '2026-06-10' }
    ]
  }
];

export const topPerformers = [
  { name: 'John Developer', role: 'Full Stack Developer', performance: 94, tasks: 15, completed: 10, avatar: 'JD' },
  { name: 'David Thompson', role: 'Full Stack Developer', performance: 92, tasks: 12, completed: 8, avatar: 'DT' },
  { name: 'Sarah Designer', role: 'UI/UX Designer', performance: 91, tasks: 7, completed: 5, avatar: 'SD' },
  { name: 'Thomas Wright', role: 'Backend Developer', performance: 90, tasks: 9, completed: 5, avatar: 'TW' }
];

export const availableMembers = [
  { name: 'Thomas Wright', role: 'Backend Developer', department: 'Development', avatar: 'TW' },
  { name: 'Security Expert', role: 'Cyber Security Analyst', department: 'Cyber Security', avatar: 'SE' }
];

export const statusesList = ['Active', 'On Leave', 'Inactive', 'Available', 'Busy'];
export const workloadLevels = ['Low', 'Medium', 'High', 'Overloaded'];