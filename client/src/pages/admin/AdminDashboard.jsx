import { useEffect, useState } from "react";
import API from "../../services/api";
import AdminNavbar from "../../components/layout/AdminNavbar";

export default function AdminDashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await API.get("/admin/stats");
      setStats(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 p-6">
        <div className="card text-center">
          <p className="text-gray-500">Users</p>
          <h2 className="text-2xl font-bold">{stats.totalUsers}</h2>
        </div>
        <div className="card text-center">
          <p className="text-gray-500">Reports</p>
          <h2 className="text-2xl font-bold">{stats.totalReports}</h2>
        </div>
        <div className="card text-center">
          <p className="text-gray-500">Pending</p>
          <h2 className="text-2xl font-bold">{stats.pendingReports}</h2>
        </div>
        <div className="card text-center">
          <p className="text-gray-500">Articles</p>
          <h2 className="text-2xl font-bold">{stats.totalArticles}</h2>
        </div>
      </div>
    </>
  );
}
