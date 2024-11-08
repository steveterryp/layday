import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { CircularProgress, Box } from '@mui/material';

// Lazy load pages
const Dashboard = lazy(() => import('../features/dashboard/DashboardPage'));
const Employees = lazy(() => import('../features/employees/EmployeesPage'));
const Payroll = lazy(() => import('../features/payroll/PayrollPage'));
const TimeAttendance = lazy(() => import('../features/timeAttendance/TimeAttendancePage'));
const LeaveManagement = lazy(() => import('../features/leaveManagement/LeaveManagementPage'));
const Settings = lazy(() => import('../features/settings/SettingsPage'));
const Profile = lazy(() => import('../features/profile/ProfilePage'));
const Login = lazy(() => import('../features/auth/LoginPage'));

// Loading component for suspense fallback
const LoadingScreen = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    <CircularProgress />
  </Box>
);

// Protected Route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // Check if user is authenticated
  const isAuthenticated = localStorage.getItem('accessToken');

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  return <MainLayout>{children}</MainLayout>;
};

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <Employees />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payroll"
          element={
            <ProtectedRoute>
              <Payroll />
            </ProtectedRoute>
          }
        />
        <Route
          path="/time-attendance"
          element={
            <ProtectedRoute>
              <TimeAttendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leave-management"
          element={
            <ProtectedRoute>
              <LeaveManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Redirect root to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Catch all route - 404 */}
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <h1>404 - Page Not Found</h1>
              </Box>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
