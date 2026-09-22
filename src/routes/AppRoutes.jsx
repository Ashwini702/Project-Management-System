// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROLES } from '../data/authUsersData';

// Route Protection Components
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import RoleBasedRedirect from './RoleBasedRedirect';

// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';

// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminUsers from '../pages/admin/Users';
import AdminProjects from '../pages/admin/Projects';
import AdminTasks from '../pages/admin/Tasks';
import AdminTeam from '../pages/admin/Team';
import AdminClients from '../pages/admin/Clients';
import AdminCalendar from '../pages/admin/Calendar';
import AdminMeetings from '../pages/admin/Meetings';
import AdminReports from '../pages/admin/Reports';
import AdminBudget from '../pages/admin/Budget';
import AdminNotifications from '../pages/admin/Notifications';
import AdminActivityLogs from '../pages/admin/ActivityLogs';
import AdminBackup from '../pages/admin/Backup';
import AdminSettings from '../pages/admin/Settings';
import AdminAttendance from '../pages/admin/Attendance';
import ProjectDetails from '../pages/admin/ProjectDetails';
import TaskDetails from '../pages/admin/TaskDetails';

// Manager Pages
import ManagerDashboard from '../pages/manager/ManagerDashboard';
import ManagerProjects from '../pages/manager/ManagerProjects';
import ManagerTasks from '../pages/manager/ManagerTasks';
import ManagerTeamWorkload from '../pages/manager/ManagerTeamWorkload';
import ManagerDeadlines from '../pages/manager/ManagerDeadlines';
import ManagerMeetings from '../pages/manager/ManagerMeetings';
import ManagerClientFeedback from '../pages/manager/ManagerClientFeedback';
import ManagerReports from '../pages/manager/ManagerReports';
import ManagerNotifications from '../pages/manager/ManagerNotifications';
import ManagerProfile from '../pages/manager/ManagerProfile';
import ManagerAttendance from '../pages/manager/ManagerAttendance';

// Client Pages
import ClientDashboard from '../pages/client/ClientDashboard';
import ClientProjects from '../pages/client/ClientProjects';
import ClientFiles from '../pages/client/ClientFiles';
import ClientFeedback from '../pages/client/ClientFeedback';
import ClientMessages from '../pages/client/ClientMessages';
import ClientNotifications from '../pages/client/ClientNotifications';
import ClientInvoices from '../pages/client/ClientInvoices';
import ClientProfile from '../pages/client/ClientProfile';
import ClientAttendance from '../pages/client/ClientAttendance';

// Team Pages
import TeamDashboard from '../pages/team/TeamDashboard';
import TeamMyTasks from '../pages/team/TeamMyTasks';
import TeamMyProjects from '../pages/team/TeamMyProjects';
import TeamDailyReport from '../pages/team/TeamDailyReport';
import TeamAttendance from '../pages/team/TeamAttendance';
import TeamDeadlines from '../pages/team/TeamDeadlines';
import TeamNotifications from '../pages/team/TeamNotifications';
import TeamProfile from '../pages/team/TeamProfile';

// Error Pages
import NotFound from '../pages/error/NotFound';
import AccessDenied from '../pages/error/AccessDenied';
import ServerError from '../pages/error/ServerError';
import Maintenance from '../pages/error/Maintenance';
import ComingSoon from '../pages/error/ComingSoon';

const AppRoutes = () => {
  return (
    <Routes>
      {/* ===== Public Auth Routes ===== */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
      />
      <Route
        path="/reset-password"
        element={
          <PublicRoute>
            <ResetPassword />
          </PublicRoute>
        }
      />

      {/* ===== Admin Routes (Admin Only) ===== */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <AdminUsers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/projects"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <AdminProjects />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/tasks"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <AdminTasks />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/team"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <AdminTeam />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/clients"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <AdminClients />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/calendar"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <AdminCalendar />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/meetings"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <AdminMeetings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/reports"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <AdminReports />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/budget"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <AdminBudget />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/notifications"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <AdminNotifications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/activity-logs"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <AdminActivityLogs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/backup"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <AdminBackup />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <AdminSettings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/projects/:id"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <ProjectDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/tasks/:id"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <TaskDetails />
          </ProtectedRoute>
        }
      />

      {/* ===== Manager Routes (Project Manager Only) ===== */}
      <Route
        path="/manager/dashboard"
        element={
          <ProtectedRoute allowedRoles={[ROLES.MANAGER]}>
            <ManagerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manager/projects"
        element={
          <ProtectedRoute allowedRoles={[ROLES.MANAGER]}>
            <ManagerProjects />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manager/tasks"
        element={
          <ProtectedRoute allowedRoles={[ROLES.MANAGER]}>
            <ManagerTasks />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manager/team-workload"
        element={
          <ProtectedRoute allowedRoles={[ROLES.MANAGER]}>
            <ManagerTeamWorkload />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manager/deadlines"
        element={
          <ProtectedRoute allowedRoles={[ROLES.MANAGER]}>
            <ManagerDeadlines />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manager/meetings"
        element={
          <ProtectedRoute allowedRoles={[ROLES.MANAGER]}>
            <ManagerMeetings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manager/client-feedback"
        element={
          <ProtectedRoute allowedRoles={[ROLES.MANAGER]}>
            <ManagerClientFeedback />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manager/reports"
        element={
          <ProtectedRoute allowedRoles={[ROLES.MANAGER]}>
            <ManagerReports />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manager/notifications"
        element={
          <ProtectedRoute allowedRoles={[ROLES.MANAGER]}>
            <ManagerNotifications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manager/profile"
        element={
          <ProtectedRoute allowedRoles={[ROLES.MANAGER]}>
            <ManagerProfile />
          </ProtectedRoute>
        }
      />

      <Route path="/admin/attendance" element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]}><AdminAttendance /></ProtectedRoute>} />`r`n`r`n      <Route path="/manager/attendance" element={<ProtectedRoute allowedRoles={[ROLES.MANAGER]}><ManagerAttendance /></ProtectedRoute>} />`r`n`r`n      {/* ===== Client Routes (Client Only) ===== */}
      <Route
        path="/client/dashboard"
        element={
          <ProtectedRoute allowedRoles={[ROLES.CLIENT]}>
            <ClientDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/client/projects"
        element={
          <ProtectedRoute allowedRoles={[ROLES.CLIENT]}>
            <ClientProjects />
          </ProtectedRoute>
        }
      />
      <Route
        path="/client/files"
        element={
          <ProtectedRoute allowedRoles={[ROLES.CLIENT]}>
            <ClientFiles />
          </ProtectedRoute>
        }
      />
      <Route
        path="/client/feedback"
        element={
          <ProtectedRoute allowedRoles={[ROLES.CLIENT]}>
            <ClientFeedback />
          </ProtectedRoute>
        }
      />
      <Route
        path="/client/messages"
        element={
          <ProtectedRoute allowedRoles={[ROLES.CLIENT]}>
            <ClientMessages />
          </ProtectedRoute>
        }
      />
      <Route
        path="/client/notifications"
        element={
          <ProtectedRoute allowedRoles={[ROLES.CLIENT]}>
            <ClientNotifications />
          </ProtectedRoute>
        }
      />      <Route
        path="/client/invoices"
        element={
          <ProtectedRoute allowedRoles={[ROLES.CLIENT]}>
            <ClientInvoices />
          </ProtectedRoute>
        }
      />
      <Route
        path="/client/attendance"
        element={
          <ProtectedRoute allowedRoles={[ROLES.CLIENT]}>
            <ClientAttendance />
          </ProtectedRoute>
        }
      />
      <Route
        path="/client/profile"
        element={
          <ProtectedRoute allowedRoles={[ROLES.CLIENT]}>
            <ClientProfile />
          </ProtectedRoute>
        }
      />

      {/* ===== Team Routes (Team Member Only) ===== */}
      <Route
        path="/team/dashboard"
        element={
          <ProtectedRoute allowedRoles={[ROLES.TEAM]}>
            <TeamDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/team/tasks"
        element={
          <ProtectedRoute allowedRoles={[ROLES.TEAM]}>
            <TeamMyTasks />
          </ProtectedRoute>
        }
      />
      <Route
        path="/team/projects"
        element={
          <ProtectedRoute allowedRoles={[ROLES.TEAM]}>
            <TeamMyProjects />
          </ProtectedRoute>
        }
      />
      <Route
        path="/team/daily-report"
        element={
          <ProtectedRoute allowedRoles={[ROLES.TEAM]}>
            <TeamDailyReport />
          </ProtectedRoute>
        }
      />
      <Route
        path="/team/attendance"
        element={
          <ProtectedRoute allowedRoles={[ROLES.TEAM]}>
            <TeamAttendance />
          </ProtectedRoute>
        }
      />
      <Route
        path="/team/deadlines"
        element={
          <ProtectedRoute allowedRoles={[ROLES.TEAM]}>
            <TeamDeadlines />
          </ProtectedRoute>
        }
      />
      <Route
        path="/team/notifications"
        element={
          <ProtectedRoute allowedRoles={[ROLES.TEAM]}>
            <TeamNotifications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/team/profile"
        element={
          <ProtectedRoute allowedRoles={[ROLES.TEAM]}>
            <TeamProfile />
          </ProtectedRoute>
        }
      />

      {/* ===== Error / Support Routes (Public) ===== */}
      <Route path="/403" element={<AccessDenied />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="/500" element={<ServerError />} />
      <Route path="/maintenance" element={<Maintenance />} />
      <Route path="/coming-soon" element={<ComingSoon />} />

      {/* ===== Default Routes ===== */}
      <Route path="/" element={<RoleBasedRedirect />} />
      <Route path="/dashboard" element={<RoleBasedRedirect />} />

      {/* ===== 404 Catch All ===== */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
