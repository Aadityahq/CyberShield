import { Home, FileText, Shield, Book, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = ["ADMIN", "SUPER_ADMIN"].includes(user?.role);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="bg-white shadow px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
      <h1 className="text-xl font-bold text-indigo-600 text-center sm:text-left">CyberShield</h1>

      <div className="w-full sm:w-auto flex flex-wrap items-center justify-center sm:justify-end gap-3 text-sm">
        {user && (
          <button onClick={() => navigate("/dashboard")} className="flex items-center gap-1 hover:text-indigo-500">
            <Home size={16} /> Dashboard
          </button>
        )}

        {user && (
          <button onClick={() => navigate("/profile")} className="flex items-center gap-1 hover:text-indigo-500">
            <FileText size={16} /> Profile
          </button>
        )}

        {isAdmin && (
          <button onClick={() => navigate("/admin")} className="flex items-center gap-1 hover:text-indigo-500">
            <Shield size={16} /> Admin
          </button>
        )}

        <button onClick={() => navigate("/reports")} className="flex items-center gap-1 hover:text-indigo-500">
          <FileText size={16} /> Reports
        </button>

        <button onClick={() => navigate("/ai")} className="flex items-center gap-1 hover:text-indigo-500">
          <Shield size={16} /> AI
        </button>

        <button onClick={() => navigate("/articles")} className="flex items-center gap-1 hover:text-indigo-500">
          <Book size={16} /> Learn
        </button>

        <button onClick={() => navigate("/forum")} className="flex items-center gap-1 hover:text-indigo-500">
          <FileText size={16} /> Forum
        </button>

        {user ? (
          <button onClick={logout} className="flex items-center gap-1 text-red-500">
            <LogOut size={16} /> Logout
          </button>
        ) : (
          <button onClick={() => navigate("/login")} className="flex items-center gap-1 text-indigo-600">
            <LogOut size={16} /> Login
          </button>
        )}
      </div>
    </div>
  );
}
