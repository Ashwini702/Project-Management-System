// src/data/userData.js
import { 
  FiUsers, 
  FiShield, 
  FiUserCheck, 
  FiUser, 
  FiBriefcase 
} from 'react-icons/fi';

export const userStatsData = [
  {
    id: 1,
    title: 'Total Users',
    value: 56,
    icon: FiUsers,
    description: 'All registered users',
    color: 'primary'
  },
  {
    id: 2,
    title: 'Admins',
    value: 4,
    icon: FiShield,
    description: 'Full system access',
    color: 'purple'
  },
  {
    id: 3,
    title: 'Project Managers',
    value: 8,
    icon: FiUserCheck,
    description: 'Managing projects',
    color: 'success'
  },
  {
    id: 4,
    title: 'Team Members',
    value: 36,
    icon: FiUsers,
    description: 'Active contributors',
    color: 'info'
  },
  {
    id: 5,
    title: 'Clients',
    value: 8,
    icon: FiBriefcase,
    description: 'Project stakeholders',
    color: 'warning'
  }
];

export const usersData = [
  {
    id: 1,
    name: 'John Anderson',
    email: 'john.anderson@example.com',
    phone: '+1 (555) 123-4567',
    role: 'Admin',
    department: 'Development',
    assignedProjects: ['E-commerce Platform', 'CRM System', 'Mobile Banking App'],
    status: 'Active',
    lastLogin: '2026-06-19 14:30',
    createdDate: '2025-01-15',
    avatar: 'JA'
  },
  {
    id: 2,
    name: 'Sarah Mitchell',
    email: 'sarah.mitchell@example.com',
    phone: '+1 (555) 234-5678',
    role: 'Admin',
    department: 'Cyber Security',
    assignedProjects: ['Healthcare Portal', 'Security Audit'],
    status: 'Active',
    lastLogin: '2026-06-19 13:15',
    createdDate: '2025-02-20',
    avatar: 'SM'
  },
  {
    id: 3,
    name: 'Michael Roberts',
    email: 'michael.roberts@example.com',
    phone: '+1 (555) 345-6789',
    role: 'Project Manager',
    department: 'Development',
    assignedProjects: ['E-commerce Platform', 'Learning Management System'],
    status: 'Active',
    lastLogin: '2026-06-19 11:45',
    createdDate: '2025-03-10',
    avatar: 'MR'
  },
  {
    id: 4,
    name: 'Emily Davidson',
    email: 'emily.davidson@example.com',
    phone: '+1 (555) 456-7890',
    role: 'Project Manager',
    department: 'Design',
    assignedProjects: ['Mobile Banking App', 'Website Redesign'],
    status: 'Active',
    lastLogin: '2026-06-18 16:20',
    createdDate: '2025-04-05',
    avatar: 'ED'
  },
  {
    id: 5,
    name: 'David Thompson',
    email: 'david.thompson@example.com',
    phone: '+1 (555) 567-8901',
    role: 'Team Member',
    department: 'Development',
    assignedProjects: ['CRM System', 'E-commerce Platform'],
    status: 'Active',
    lastLogin: '2026-06-19 09:30',
    createdDate: '2025-05-15',
    avatar: 'DT'
  },
  {
    id: 6,
    name: 'Lisa Martinez',
    email: 'lisa.martinez@example.com',
    phone: '+1 (555) 678-9012',
    role: 'Team Member',
    department: 'Design',
    assignedProjects: ['Mobile Banking App', 'Healthcare Portal'],
    status: 'Active',
    lastLogin: '2026-06-19 10:00',
    createdDate: '2025-06-20',
    avatar: 'LM'
  },
  {
    id: 7,
    name: 'Robert Wilson',
    email: 'robert.wilson@example.com',
    phone: '+1 (555) 789-0123',
    role: 'Team Member',
    department: 'Marketing',
    assignedProjects: ['Website Redesign'],
    status: 'Inactive',
    lastLogin: '2026-06-15 08:45',
    createdDate: '2025-07-10',
    avatar: 'RW'
  },
  {
    id: 8,
    name: 'Jennifer Lee',
    email: 'jennifer.lee@example.com',
    phone: '+1 (555) 890-1234',
    role: 'Client',
    department: 'Accounts',
    assignedProjects: ['E-commerce Platform'],
    status: 'Active',
    lastLogin: '2026-06-18 15:00',
    createdDate: '2025-08-01',
    avatar: 'JL'
  },
  {
    id: 9,
    name: 'James Brown',
    email: 'james.brown@example.com',
    phone: '+1 (555) 901-2345',
    role: 'Client',
    department: 'HR',
    assignedProjects: ['CRM System', 'Learning Management System'],
    status: 'Active',
    lastLogin: '2026-06-17 11:30',
    createdDate: '2025-09-15',
    avatar: 'JB'
  },
  {
    id: 10,
    name: 'Patricia Garcia',
    email: 'patricia.garcia@example.com',
    phone: '+1 (555) 012-3456',
    role: 'Project Manager',
    department: 'Cyber Security',
    assignedProjects: ['Security Audit', 'Healthcare Portal'],
    status: 'Pending',
    lastLogin: '2026-06-16 14:20',
    createdDate: '2025-10-20',
    avatar: 'PG'
  },
  {
    id: 11,
    name: 'Thomas Wright',
    email: 'thomas.wright@example.com',
    phone: '+1 (555) 123-7890',
    role: 'Team Member',
    department: 'Development',
    assignedProjects: ['Learning Management System'],
    status: 'Active',
    lastLogin: '2026-06-19 08:15',
    createdDate: '2025-11-05',
    avatar: 'TW'
  },
  {
    id: 12,
    name: 'Amanda Taylor',
    email: 'amanda.taylor@example.com',
    phone: '+1 (555) 234-8901',
    role: 'Client',
    department: 'Marketing',
    assignedProjects: ['Website Redesign', 'Mobile Banking App'],
    status: 'Inactive',
    lastLogin: '2026-06-10 09:00',
    createdDate: '2025-12-01',
    avatar: 'AT'
  }
];

export const rolePermissionsData = [
  {
    role: 'Admin',
    icon: FiShield,
    color: 'purple',
    permissions: [
      'Full dashboard access',
      'Manage users',
      'Manage projects',
      'Manage reports',
      'Manage settings',
      'System configuration',
      'View all analytics',
      'Delete any content'
    ]
  },
  {
    role: 'Project Manager',
    icon: FiUserCheck,
    color: 'success',
    permissions: [
      'Manage assigned projects',
      'Assign tasks',
      'View team members',
      'View reports',
      'Manage deadlines',
      'Track progress',
      'Upload documents',
      'Client communication'
    ]
  },
  {
    role: 'Team Member',
    icon: FiUser,
    color: 'info',
    permissions: [
      'View assigned tasks',
      'Update task status',
      'Submit daily report',
      'Upload documents',
      'View project details',
      'Comment on tasks',
      'View deadlines',
      'Access team chat'
    ]
  },
  {
    role: 'Client',
    icon: FiBriefcase,
    color: 'warning',
    permissions: [
      'View assigned projects',
      'Upload feedback',
      'View files',
      'Send messages',
      'Track project progress',
      'View milestones',
      'Download reports',
      'Submit requirements'
    ]
  }
];

export const departments = [
  'Development',
  'Design',
  'Marketing',
  'Cyber Security',
  'HR',
  'Accounts'
];

export const roles = ['Admin', 'Project Manager', 'Team Member', 'Client'];
export const statuses = ['Active', 'Inactive', 'Pending'];