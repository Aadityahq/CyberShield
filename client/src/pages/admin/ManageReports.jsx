import { useEffect, useState } from "react";
import API from "../../services/api";
import AdminNavbar from "../../components/layout/AdminNavbar";

export default function ManageReports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const { data } = await API.get("/admin/reports");
      setReports(data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (id, status) => {
    if (!status) return;

    try {
      await API.put(`/reports/${id}`, { status });
      fetchReports();
    } catch (error) {
      console.error(error);
      alert("Failed to update status");
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="p-6">
        <h2 className="text-xl mb-4">All Reports</h2>

        {reports.length === 0 ? (
          <div className="card text-gray-500">No reports found.</div>
        ) : (
          reports.map((r) => (
            <div key={r._id} className="card mb-3">
              <h3 className="font-semibold text-lg">{r.title}</h3>
              <p className="text-gray-600">{r.description}</p>

              <div className="flex justify-between items-center mt-2 text-sm">
                <span className="text-gray-500">User: {r.user?.email || "N/A"}</span>

                <span
                  className={`px-2 py-1 rounded text-white text-xs ${
                    r.status === "PENDING"
                      ? "bg-yellow-500"
                      : r.status === "REVIEWED"
                      ? "bg-blue-500"
                      : "bg-green-500"
                  }`}
                >
                  {r.status}
                </span>
              </div>

              <select
                onChange={(e) => updateStatus(r._id, e.target.value)}
                className="input mt-3"
                defaultValue=""
              >
                <option value="">Update Status</option>
                <option value="REVIEWED">Reviewed</option>
                <option value="RESOLVED">Resolved</option>
              </select>
            </div>
          ))
        )}
      </div>
    </>
  );
}
