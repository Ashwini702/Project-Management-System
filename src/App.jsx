import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';

import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/variables.css';
import './styles/global.css';
import './styles/auth.css';
import './styles/sidebar.css';
import './styles/dashboard.css';
import './styles/users.css';
import './styles/projects.css';
import './styles/tasks.css';
import './styles/team.css';
import './styles/clients.css';
import './styles/calendar.css';
import './styles/meetings.css';
import './styles/reports.css';
import './styles/budget.css';
import './styles/notifications.css';
import './styles/activityLogs.css';
import './styles/backup.css';
import './styles/settings.css';
import './styles/projectDetails.css';
import './styles/taskDetails.css';
import './styles/managerDashboard.css';
import './styles/managerTasks.css';
import './styles/managerWorkload.css';
import './styles/managerDeadlines.css';
import './styles/managerMeetings.css';
import './styles/managerFeedback.css';
import './styles/managerReports.css';
import './styles/managerNotifications.css';
import './styles/managerProfile.css';
import './styles/clientDashboard.css';
import './styles/clientProjects.css';
import './styles/clientFeedback.css';
import './styles/clientMessages.css';
import './styles/clientInvoices.css';
import './styles/clientProfile.css';
import './styles/teamDashboard.css';
import './styles/teamTasks.css';
import './styles/teamProjects.css';
import './styles/teamDailyReport.css';
import './styles/teamAttendance.css';
import './styles/teamDeadlines.css';
import './styles/teamNotifications.css';
import './styles/teamProfile.css';
import './styles/notFound.css';
import './styles/accessDenied.css';
import './styles/serverError.css';
import './styles/maintenance.css';
import './styles/comingSoon.css';
import './styles/responsive.css';
import './styles/adminForms.css';
import './styles/layoutPolish.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
