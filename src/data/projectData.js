// src/data/projectData.js
export const projectStatsData = [
  {
    id: 1,
    title: 'Total Projects',
    value: 48,
    icon: 'FiFolder',
    description: 'All registered projects',
    color: 'primary'
  },
  {
    id: 2,
    title: 'Active Projects',
    value: 18,
    icon: 'FiTrendingUp',
    description: 'Currently in progress',
    color: 'info'
  },
  {
    id: 3,
    title: 'Pending Projects',
    value: 12,
    icon: 'FiClock',
    description: 'Awaiting initiation',
    color: 'warning'
  },
  {
    id: 4,
    title: 'Completed Projects',
    value: 16,
    icon: 'FiCheckCircle',
    description: 'Successfully delivered',
    color: 'success'
  },
  {
    id: 5,
    title: 'Delayed Projects',
    value: 2,
    icon: 'FiAlertTriangle',
    description: 'Behind schedule',
    color: 'danger'
  },
  {
    id: 6,
    title: 'On Hold Projects',
    value: 4,
    icon: 'FiPauseCircle',
    description: 'Temporarily paused',
    color: 'purple'
  }
];

export const projectsData = [
  {
    id: 1,
    title: 'E-commerce Platform Redesign',
    description: 'Complete redesign of the existing e-commerce platform with modern UI/UX, improved performance, and new payment gateway integration.',
    client: 'FashionHub Inc.',
    category: 'Web Development',
    manager: 'Michael Roberts',
    teamMembers: ['David Thompson', 'Lisa Martinez', 'John Developer', 'Sarah Designer'],
    startDate: '2026-01-15',
    endDate: '2026-07-30',
    priority: 'High',
    status: 'In Progress',
    progress: 68,
    budget: '$150,000',
    totalTasks: 42,
    completedTasks: 28,
    documentsCount: 7,
    createdDate: '2026-01-10',
    timeline: [
      { title: 'Project Created', date: '2026-01-15', status: 'Completed' },
      { title: 'Planning Completed', date: '2026-02-01', status: 'Completed' },
      { title: 'Design Phase Started', date: '2026-02-15', status: 'Completed' },
      { title: 'Development Phase Started', date: '2026-03-15', status: 'Active' },
      { title: 'Testing Phase', date: '2026-06-15', status: 'Pending' },
      { title: 'Final Delivery', date: '2026-07-30', status: 'Pending' }
    ]
  },
  {
    id: 2,
    title: 'Mobile Banking App',
    description: 'Develop a secure and user-friendly mobile banking application with biometric authentication, fund transfer, and bill payment features.',
    client: 'FinanceHub',
    category: 'Mobile App',
    manager: 'Emily Davidson',
    teamMembers: ['Robert Wilson', 'Amanda Taylor', 'Mike Developer'],
    startDate: '2026-02-01',
    endDate: '2026-08-15',
    priority: 'Urgent',
    status: 'In Progress',
    progress: 45,
    budget: '$280,000',
    totalTasks: 65,
    completedTasks: 29,
    documentsCount: 12,
    createdDate: '2026-01-25',
    timeline: [
      { title: 'Project Created', date: '2026-02-01', status: 'Completed' },
      { title: 'Requirements Gathering', date: '2026-02-15', status: 'Completed' },
      { title: 'UI/UX Design', date: '2026-03-01', status: 'Active' },
      { title: 'Development Phase', date: '2026-04-15', status: 'Pending' },
      { title: 'Security Testing', date: '2026-07-01', status: 'Pending' },
      { title: 'Launch', date: '2026-08-15', status: 'Pending' }
    ]
  },
  {
    id: 3,
    title: 'CRM System Implementation',
    description: 'Custom CRM system for managing customer relationships, sales pipeline, and automated marketing campaigns.',
    client: 'SalesPro Ltd',
    category: 'CRM',
    manager: 'Patricia Garcia',
    teamMembers: ['Thomas Wright', 'Jennifer Lee'],
    startDate: '2026-01-10',
    endDate: '2026-05-20',
    priority: 'Medium',
    status: 'Completed',
    progress: 100,
    budget: '$95,000',
    totalTasks: 30,
    completedTasks: 30,
    documentsCount: 5,
    createdDate: '2026-01-05',
    timeline: [
      { title: 'Project Created', date: '2026-01-10', status: 'Completed' },
      { title: 'System Design', date: '2026-01-25', status: 'Completed' },
      { title: 'Development', date: '2026-02-15', status: 'Completed' },
      { title: 'Testing', date: '2026-04-01', status: 'Completed' },
      { title: 'Deployment', date: '2026-05-01', status: 'Completed' },
      { title: 'Project Closure', date: '2026-05-20', status: 'Completed' }
    ]
  },
  {
    id: 4,
    title: 'Healthcare Portal Development',
    description: 'Develop a comprehensive healthcare portal with patient management, appointment scheduling, and telemedicine features.',
    client: 'MediCare Group',
    category: 'Web Development',
    manager: 'Michael Roberts',
    teamMembers: ['David Thompson', 'Lisa Martinez', 'Dr. Sarah', 'Nurse Jack'],
    startDate: '2026-03-01',
    endDate: '2026-09-30',
    priority: 'High',
    status: 'In Progress',
    progress: 35,
    budget: '$320,000',
    totalTasks: 55,
    completedTasks: 19,
    documentsCount: 9,
    createdDate: '2026-02-20',
    timeline: [
      { title: 'Project Created', date: '2026-03-01', status: 'Completed' },
      { title: 'Requirement Analysis', date: '2026-03-15', status: 'Completed' },
      { title: 'Architecture Design', date: '2026-04-01', status: 'Active' },
      { title: 'Development Phase', date: '2026-05-15', status: 'Pending' },
      { title: 'Testing & QA', date: '2026-08-01', status: 'Pending' },
      { title: 'Go Live', date: '2026-09-30', status: 'Pending' }
    ]
  },
  {
    id: 5,
    title: 'ERP System Upgrade',
    description: 'Upgrade existing ERP system to latest version with new modules for inventory management, HR, and financial reporting.',
    client: 'Manufacturing Corp',
    category: 'ERP',
    manager: 'Emily Davidson',
    teamMembers: ['Robert Wilson', 'Thomas Wright'],
    startDate: '2026-04-01',
    endDate: '2026-11-15',
    priority: 'Medium',
    status: 'Not Started',
    progress: 0,
    budget: '$200,000',
    totalTasks: 40,
    completedTasks: 0,
    documentsCount: 3,
    createdDate: '2026-03-20',
    timeline: [
      { title: 'Project Created', date: '2026-04-01', status: 'Pending' },
      { title: 'System Audit', date: '2026-04-15', status: 'Pending' },
      { title: 'Planning Phase', date: '2026-05-01', status: 'Pending' },
      { title: 'Implementation', date: '2026-07-01', status: 'Pending' },
      { title: 'Testing', date: '2026-10-01', status: 'Pending' },
      { title: 'Go Live', date: '2026-11-15', status: 'Pending' }
    ]
  },
  {
    id: 6,
    title: 'Cyber Security Assessment',
    description: 'Comprehensive security assessment including penetration testing, vulnerability scanning, and security policy review.',
    client: 'TechCorp Inc.',
    category: 'Cyber Security',
    manager: 'Patricia Garcia',
    teamMembers: ['Security Expert', 'David Thompson'],
    startDate: '2026-02-20',
    endDate: '2026-04-30',
    priority: 'Urgent',
    status: 'On Hold',
    progress: 40,
    budget: '$75,000',
    totalTasks: 20,
    completedTasks: 8,
    documentsCount: 4,
    createdDate: '2026-02-15',
    timeline: [
      { title: 'Project Created', date: '2026-02-20', status: 'Completed' },
      { title: 'Initial Assessment', date: '2026-03-01', status: 'Completed' },
      { title: 'Vulnerability Scan', date: '2026-03-15', status: 'Active' },
      { title: 'Penetration Testing', date: '2026-04-01', status: 'Pending' },
      { title: 'Report Generation', date: '2026-04-20', status: 'Pending' },
      { title: 'Final Delivery', date: '2026-04-30', status: 'Pending' }
    ]
  },
  {
    id: 7,
    title: 'Digital Marketing Campaign',
    description: 'Create and execute a comprehensive digital marketing campaign including SEO, social media, email marketing, and PPC advertising.',
    client: 'EduTech Solutions',
    category: 'Digital Marketing',
    manager: 'Michael Roberts',
    teamMembers: ['Marketing Expert', 'Content Writer', 'SEO Specialist'],
    startDate: '2026-05-01',
    endDate: '2026-08-31',
    priority: 'Low',
    status: 'Not Started',
    progress: 0,
    budget: '$50,000',
    totalTasks: 25,
    completedTasks: 0,
    documentsCount: 2,
    createdDate: '2026-04-20',
    timeline: [
      { title: 'Project Created', date: '2026-05-01', status: 'Pending' },
      { title: 'Strategy Planning', date: '2026-05-15', status: 'Pending' },
      { title: 'Content Creation', date: '2026-06-01', status: 'Pending' },
      { title: 'Campaign Launch', date: '2026-07-01', status: 'Pending' },
      { title: 'Optimization', date: '2026-07-15', status: 'Pending' },
      { title: 'Final Report', date: '2026-08-31', status: 'Pending' }
    ]
  },
  {
    id: 8,
    title: 'UI/UX Redesign Project',
    description: 'Complete UI/UX overhaul of the client portal with modern design principles, improved accessibility, and better user experience.',
    client: 'InsurancePro',
    category: 'UI/UX Design',
    manager: 'Emily Davidson',
    teamMembers: ['Lisa Martinez', 'Sarah Designer', 'UX Researcher'],
    startDate: '2026-03-15',
    endDate: '2026-06-30',
    priority: 'High',
    status: 'In Progress',
    progress: 75,
    budget: '$90,000',
    totalTasks: 28,
    completedTasks: 21,
    documentsCount: 6,
    createdDate: '2026-03-10',
    timeline: [
      { title: 'Project Created', date: '2026-03-15', status: 'Completed' },
      { title: 'User Research', date: '2026-03-25', status: 'Completed' },
      { title: 'Wireframing', date: '2026-04-10', status: 'Completed' },
      { title: 'UI Design', date: '2026-05-01', status: 'Active' },
      { title: 'User Testing', date: '2026-06-01', status: 'Pending' },
      { title: 'Final Delivery', date: '2026-06-30', status: 'Pending' }
    ]
  },
  {
    id: 9,
    title: 'Learning Management System',
    description: 'Build a custom LMS with course management, student tracking, assessment tools, and certification generation.',
    client: 'EduTech Solutions',
    category: 'Web Development',
    manager: 'Patricia Garcia',
    teamMembers: ['David Thompson', 'Thomas Wright', 'Content Expert'],
    startDate: '2026-01-20',
    endDate: '2026-05-15',
    priority: 'Medium',
    status: 'Delayed',
    progress: 55,
    budget: '$180,000',
    totalTasks: 48,
    completedTasks: 26,
    documentsCount: 8,
    createdDate: '2026-01-15',
    timeline: [
      { title: 'Project Created', date: '2026-01-20', status: 'Completed' },
      { title: 'Architecture Design', date: '2026-02-01', status: 'Completed' },
      { title: 'Core Development', date: '2026-02-20', status: 'Completed' },
      { title: 'Feature Development', date: '2026-03-15', status: 'Active' },
      { title: 'Testing Phase', date: '2026-04-15', status: 'Delayed' },
      { title: 'Deployment', date: '2026-05-15', status: 'Delayed' }
    ]
  },
  {
    id: 10,
    title: 'Mobile App UI Review',
    description: 'Complete review and enhancement of mobile app user interface with focus on user engagement and conversion optimization.',
    client: 'RetailMax',
    category: 'Mobile App',
    manager: 'Michael Roberts',
    teamMembers: ['Lisa Martinez', 'UX Expert', 'Mobile Developer'],
    startDate: '2026-06-01',
    endDate: '2026-07-30',
    priority: 'Low',
    status: 'Not Started',
    progress: 0,
    budget: '$45,000',
    totalTasks: 15,
    completedTasks: 0,
    documentsCount: 2,
    createdDate: '2026-05-25',
    timeline: [
      { title: 'Project Created', date: '2026-06-01', status: 'Pending' },
      { title: 'Current UI Analysis', date: '2026-06-10', status: 'Pending' },
      { title: 'Design Proposals', date: '2026-06-20', status: 'Pending' },
      { title: 'Implementation', date: '2026-07-01', status: 'Pending' },
      { title: 'User Testing', date: '2026-07-20', status: 'Pending' },
      { title: 'Final Delivery', date: '2026-07-30', status: 'Pending' }
    ]
  },
  {
    id: 11,
    title: 'Network Infrastructure Setup',
    description: 'Complete network infrastructure setup including servers, firewalls, VPN, and cloud integration for new office location.',
    client: 'FinanceHub',
    category: 'Cyber Security',
    manager: 'Emily Davidson',
    teamMembers: ['Network Engineer', 'Security Expert', 'Cloud Architect'],
    startDate: '2026-04-15',
    endDate: '2026-07-15',
    priority: 'Urgent',
    status: 'In Progress',
    progress: 30,
    budget: '$250,000',
    totalTasks: 35,
    completedTasks: 10,
    documentsCount: 5,
    createdDate: '2026-04-10',
    timeline: [
      { title: 'Project Created', date: '2026-04-15', status: 'Completed' },
      { title: 'Site Survey', date: '2026-04-25', status: 'Completed' },
      { title: 'Equipment Procurement', date: '2026-05-10', status: 'Active' },
      { title: 'Installation', date: '2026-06-01', status: 'Pending' },
      { title: 'Configuration', date: '2026-06-20', status: 'Pending' },
      { title: 'Go Live', date: '2026-07-15', status: 'Pending' }
    ]
  },
  {
    id: 12,
    title: 'Data Migration Project',
    description: 'Migrate legacy data from old systems to new cloud-based platform with data cleansing, validation, and integrity checks.',
    client: 'Manufacturing Corp',
    category: 'ERP',
    manager: 'Patricia Garcia',
    teamMembers: ['Data Analyst', 'Database Admin', 'Thomas Wright'],
    startDate: '2026-05-15',
    endDate: '2026-09-30',
    priority: 'Medium',
    status: 'Not Started',
    progress: 0,
    budget: '$130,000',
    totalTasks: 32,
    completedTasks: 0,
    documentsCount: 4,
    createdDate: '2026-05-10',
    timeline: [
      { title: 'Project Created', date: '2026-05-15', status: 'Pending' },
      { title: 'Data Audit', date: '2026-05-30', status: 'Pending' },
      { title: 'Migration Planning', date: '2026-06-15', status: 'Pending' },
      { title: 'Data Migration', date: '2026-07-15', status: 'Pending' },
      { title: 'Validation', date: '2026-09-01', status: 'Pending' },
      { title: 'Project Closure', date: '2026-09-30', status: 'Pending' }
    ]
  }
];

export const managers = ['Michael Roberts', 'Emily Davidson', 'Patricia Garcia'];

export const teamMembersList = [
  'David Thompson', 'Lisa Martinez', 'Robert Wilson', 'Amanda Taylor',
  'Thomas Wright', 'Jennifer Lee', 'John Developer', 'Sarah Designer',
  'Mike Developer', 'Security Expert', 'Network Engineer', 'Data Analyst',
  'Database Admin', 'Content Writer', 'SEO Specialist', 'UX Researcher',
  'UX Expert', 'Mobile Developer', 'Cloud Architect', 'Marketing Expert',
  'Content Expert', 'Nurse Jack', 'Dr. Sarah'
];

export const categories = [
  'Web Development', 'Mobile App', 'CRM', 'ERP',
  'Cyber Security', 'Digital Marketing', 'UI/UX Design'
];

export const priorities = ['Low', 'Medium', 'High', 'Urgent'];
export const statuses = ['Not Started', 'In Progress', 'On Hold', 'Completed', 'Cancelled', 'Delayed'];

export const projectDocumentsData = [
  { id: 1, name: 'Project Proposal.pdf', type: 'pdf', uploadDate: '2026-01-15', size: '2.4 MB' },
  { id: 2, name: 'Requirement Document.docx', type: 'docx', uploadDate: '2026-01-20', size: '1.8 MB' },
  { id: 3, name: 'UI Design File.fig', type: 'fig', uploadDate: '2026-02-01', size: '5.2 MB' },
  { id: 4, name: 'Testing Report.xlsx', type: 'xlsx', uploadDate: '2026-03-15', size: '892 KB' },
  { id: 5, name: 'Architecture Diagram.png', type: 'png', uploadDate: '2026-02-10', size: '3.1 MB' },
  { id: 6, name: 'Meeting Notes.docx', type: 'docx', uploadDate: '2026-02-25', size: '456 KB' }
];