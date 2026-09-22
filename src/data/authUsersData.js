// src/data/authUsersData.js
export const ROLES = {
  ADMIN: 'Admin',
  MANAGER: 'Project Manager',
  TEAM: 'Team Member',
  CLIENT: 'Client'
};

export const authUsers = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@pms.com',
    password: 'Admin@123',
    role: ROLES.ADMIN,
    avatar: 'AU',
    status: 'Active',
    dashboardPath: '/admin/dashboard',
    permissions: [
      'manage_users', 'manage_projects', 'manage_tasks', 'manage_clients',
      'manage_reports', 'manage_settings', 'view_all_analytics', 'delete_any_content'
    ]
  },
  {
    id: 2,
    name: 'Priya Sharma',
    email: 'manager@pms.com',
    password: 'Manager@123',
    role: ROLES.MANAGER,
    avatar: 'PS',
    status: 'Active',
    dashboardPath: '/manager/dashboard',
    permissions: [
      'view_assigned_projects', 'manage_tasks', 'view_team_workload',
      'manage_deadlines', 'view_reports', 'manage_meetings', 'view_client_feedback'
    ]
  },
  {
    id: 3,
    name: 'Amit Verma',
    email: 'team@pms.com',
    password: 'Team@123',
    role: ROLES.TEAM,
    avatar: 'AV',
    status: 'Active',
    dashboardPath: '/team/dashboard',
    permissions: [
      'view_tasks', 'update_tasks', 'submit_daily_report',
      'mark_attendance', 'view_deadlines', 'view_notifications'
    ]
  },
  {
    id: 4,
    name: 'Rahul Mehta',
    email: 'client@pms.com',
    password: 'Client@123',
    role: ROLES.CLIENT,
    avatar: 'RM',
    status: 'Active',
    dashboardPath: '/client/dashboard',
    permissions: [
      'view_projects', 'view_files', 'submit_feedback',
      'view_invoices', 'send_messages', 'view_dashboard'
    ]
  }
];
