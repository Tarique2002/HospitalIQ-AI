import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";

import AppShell from "./layouts/AppShell";
import Login from "./pages/Auth/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PageLoader from "./components/common/PageLoader";

// Lazy loaded pages for performance
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const PatientsPage = lazy(() => import("./pages/Patients/PatientsPage"));
const DoctorsPage = lazy(() => import("./pages/Doctors/DoctorsPage"));
const BedsPage = lazy(() => import("./pages/Beds/BedsPage"));
const AIHubPage = lazy(() => import("./pages/AI/AIHubPage"));
const AnalyticsPage = lazy(() => import("./pages/Analytics/AnalyticsPage"));
const SettingsPage = lazy(() => import("./pages/Settings/SettingsPage"));

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        element={
          <ProtectedRoute>
            <AppShell />
          </ProtectedRoute>
        }
      >
        <Route
          path="/"
          element={
            <Suspense fallback={<PageLoader />}>
              <Dashboard />
            </Suspense>
          }
        />
        <Route
          path="/patients"
          element={
            <Suspense fallback={<PageLoader />}>
              <PatientsPage />
            </Suspense>
          }
        />
        <Route
          path="/doctors"
          element={
            <Suspense fallback={<PageLoader />}>
              <DoctorsPage />
            </Suspense>
          }
        />
        <Route
          path="/beds"
          element={
            <Suspense fallback={<PageLoader />}>
              <BedsPage />
            </Suspense>
          }
        />
        <Route
          path="/ai"
          element={
            <Suspense fallback={<PageLoader />}>
              <AIHubPage />
            </Suspense>
          }
        />
        <Route
          path="/analytics"
          element={
            <Suspense fallback={<PageLoader />}>
              <AnalyticsPage />
            </Suspense>
          }
        />
        <Route
          path="/settings"
          element={
            <Suspense fallback={<PageLoader />}>
              <SettingsPage />
            </Suspense>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}