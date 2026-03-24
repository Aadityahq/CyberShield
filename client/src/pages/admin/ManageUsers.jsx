import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../../services/api";
import AdminNavbar from "../../components/layout/AdminNavbar";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await API.get("/admin/users");
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (id) => {
    setDeletingId(id);
    try {
      await API.delete(`/admin/users/${id}`);
      toast.success("User deleted");
      fetchUsers();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete user");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="p-6">
        <h2 className="text-xl mb-4">Users</h2>

        {users.length === 0 ? (
          <div className="card text-gray-500">No users found.</div>
        ) : (
          users.map((u) => (
            <div key={u._id} className="card mb-3 flex items-center justify-between gap-3">
              <div>
                <p className="font-semibold">{u.name}</p>
                <p className="text-sm text-gray-500">{u.email}</p>
              </div>

              <button
                onClick={() => deleteUser(u._id)}
                className="btn btn-danger"
                disabled={deletingId === u._id}
              >
                {deletingId === u._id ? "Processing..." : "Delete"}
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
}
