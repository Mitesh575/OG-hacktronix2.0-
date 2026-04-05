import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import SmoothScroll from "./components/SmoothScroll";
import Home from "./pages/Home";
import Team from "./pages/Team";
import Guidelines from "./pages/Guidelines";
import FAQPage from "./pages/FAQPage";

const SoftwarePage = lazy(() => import("./pages/SoftwarePage"));
const HardwarePage = lazy(() => import("./pages/HardwarePage"));
const AdminLogin = lazy(() => import("./admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./admin/AdminDashboard"));

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default function App() {
  return (
    <SmoothScroll>
      <Suspense
        fallback={
          <div className="min-h-screen bg-bg flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/software" element={<SoftwarePage />} />
          <Route path="/hardware" element={<HardwarePage />} />
          <Route path="/team" element={<Team />} />
          <Route path="/guidelines" element={<Guidelines />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </SmoothScroll>
  );
}
