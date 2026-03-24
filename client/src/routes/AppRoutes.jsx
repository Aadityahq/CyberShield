import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import UserDashboard from "../pages/dashboard/UserDashboard";
import CreateReport from "../pages/reports/CreateReport";
import ViewReports from "../pages/reports/ViewReports";
import ScamDetector from "../pages/ai/ScamDetector";
import Articles from "../pages/knowledge/Articles";
import ArticleDetail from "../pages/knowledge/ArticleDetail";
import PrivateRoute from "../components/PrivateRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute><UserDashboard /></PrivateRoute>}
        />
        <Route
          path="/create-report"
          element={<PrivateRoute><CreateReport /></PrivateRoute>}
        />
        <Route
          path="/reports"
          element={<PrivateRoute><ViewReports /></PrivateRoute>}
        />
        <Route
          path="/ai"
          element={<PrivateRoute><ScamDetector /></PrivateRoute>}
        />
        <Route
          path="/articles"
          element={<PrivateRoute><Articles /></PrivateRoute>}
        />
        <Route
          path="/articles/:id"
          element={<PrivateRoute><ArticleDetail /></PrivateRoute>}
        />
      </Routes>
    </BrowserRouter>
  );
}
