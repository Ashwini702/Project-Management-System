// src/data/dashboardData.js
import { 
  FiFolder, 
  FiCheckCircle, 
  FiClock, 
  FiTrendingUp, 
  FiUsers, 
  FiAlertCircle,
  FiFileText,
  FiUpload,
  FiFlag,
  FiMessageSquare,
  FiCalendar
} from 'react-icons/fi';

export const statsData = [
  {
    id: 1,
    title: 'Total Projects',
    value: 48,
    icon: FiFolder,
    growth: '+12% this month',
    color: 'primary'
  },
  {
    id: 2,
    title: 'Active Projects',
    value: 18,
    icon: FiTrendingUp,
    growth: '+3 this week',
    color: 'success'
  },
  {
    id: 3,
    title: 'Pending Projects',
    value: 12,
    icon: FiClock,
    growth: 'Awaiting approval',
    color: 'warning'
  },
  {
    id: 4,
    title: 'Completed Projects',
    value: 16,
    icon: FiCheckCircle,
    growth: '92% success rate',
    color: 'info'
  },
  {
    id: 5,
    title: 'Team Members',
    value: 35,
    icon: FiUsers,
    growth: '+5 new joins',
    color: 'purple'
  },
  {
    id: 6,
    title: 'Upcoming Deadlines',
    value: 9,
    icon: FiAlertCircle,
    growth: 'Next 7 days',
    color: 'danger'
  }
];

export const projectStatusData = [
  { id: 1, status: 'Not Started', count: 6, percentage: 12.5, color: 'secondary' },
  { id: 2, status: 'In Progress', count: 18, percentage: 37.5, color: 'primary' },
  { id: 3, status: 'On Hold', count: 4, percentage: 8.3, color: 'warning' },
  { id: 4, status: 'Completed', count: 16, percentage: 33.3, color: 'success' },
  { id: 5, status: 'Cancelled', count: 2, percentage: 4.2, color: 'danger' },
  { id: 6, status: 'Delayed', count: 2, percentage: 4.2, color: 'danger' }
];

export const taskProgressData = {
  total: 240,
  categories: [
    { id: 1, label: 'Pending', count: 65, percentage: 27, color: 'warning' },
    { id: 2, label: 'In Progress', count: 82, percentage: 34, color: 'primary' },
    { id: 3, label: 'Under Review', count: 31, percentage: 13, color: 'info' },
    { id: 4, label: 'Completed', count: 55, percentage: 23, color: 'success' },
    { id: 5, label: 'Reopened', count: 7, percentage: 3, color: 'danger' }
  ]
};

export const recentActivitiesData = [
  {
    id: 1,
    icon: FiFolder,
    title: 'New Project Created',
    description: 'E-commerce Platform Redesign',
    time: '5 mins ago',
    color: 'primary'
  },
  {
    id: 2,
    icon: FiUsers,
    title: 'Task Assigned',
    description: 'Frontend development assigned to John Doe',
    time: '18 mins ago',
    color: 'success'
  },
  {
    id: 3,
    icon: FiMessageSquare,
    title: 'Client Feedback',
    description: 'Sarah Johnson uploaded feedback for CRM Module',
    time: '1 hour ago',
    color: 'info'
  },
  {
    id: 4,
    icon: FiFlag,
    title: 'Project Status Changed',
    description: 'Mobile App moved to In Progress',
    time: '2 hours ago',
    color: 'warning'
  },
  {
    id: 5,
    icon: FiUpload,
    title: 'Document Uploaded',
    description: 'Technical specifications document added',
    time: '3 hours ago',
    color: 'purple'
  },
  {
    id: 6,
    icon: FiCalendar,
    title: 'Deadline Reminder',
    description: 'Website Redesign due in 2 days',
    time: '4 hours ago',
    color: 'danger'
  }
];

export const upcomingDeadlinesData = [
  {
    id: 1,
    project: 'Website Redesign Project',
    dueDate: '20 June 2026',
    priority: 'Urgent',
    status: 'In Progress',
    daysLeft: 2
  },
  {
    id: 2,
    project: 'Mobile App UI Review',
    dueDate: '22 June 2026',
    priority: 'High',
    status: 'Under Review',
    daysLeft: 4
  },
  {
    id: 3,
    project: 'Client CRM Module',
    dueDate: '25 June 2026',
    priority: 'Medium',
    status: 'In Progress',
    daysLeft: 7
  },
  {
    id: 4,
    project: 'Final Testing Phase',
    dueDate: '28 June 2026',
    priority: 'High',
    status: 'Pending',
    daysLeft: 10
  }
];

export const recentProjectsData = [
  {
    id: 1,
    name: 'E-commerce Platform',
    client: 'TechCorp Inc.',
    manager: 'John Smith',
    startDate: '15 Jan 2026',
    endDate: '30 Mar 2026',
    priority: 'High',
    status: 'In Progress',
    progress: 75
  },
  {
    id: 2,
    name: 'Mobile Banking App',
    client: 'FinanceHub',
    manager: 'Emily Davis',
    startDate: '01 Feb 2026',
    endDate: '15 Apr 2026',
    priority: 'Urgent',
    status: 'In Progress',
    progress: 60
  },
  {
    id: 3,
    name: 'CRM System',
    client: 'SalesPro Ltd',
    manager: 'Michael Brown',
    startDate: '10 Jan 2026',
    endDate: '20 Feb 2026',
    priority: 'Medium',
    status: 'Completed',
    progress: 100
  },
  {
    id: 4,
    name: 'Healthcare Portal',
    client: 'MediCare Group',
    manager: 'Sarah Wilson',
    startDate: '20 Feb 2026',
    endDate: '30 May 2026',
    priority: 'High',
    status: 'In Progress',
    progress: 45
  },
  {
    id: 5,
    name: 'Learning Management',
    client: 'EduTech Solutions',
    manager: 'David Clark',
    startDate: '05 Mar 2026',
    endDate: '15 Jun 2026',
    priority: 'Low',
    status: 'Not Started',
    progress: 0
  }
];