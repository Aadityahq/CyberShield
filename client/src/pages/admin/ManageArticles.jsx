import { useEffect, useState } from "react";
import API from "../../services/api";
import AdminNavbar from "../../components/layout/AdminNavbar";

export default function ManageArticles() {
  const [articles, setArticles] = useState([]);
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "GENERAL"
  });

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data } = await API.get("/articles");
      setArticles(data);
    } catch (error) {
      console.error(error);
    }
  };

  const createArticle = async (e) => {
    e.preventDefault();

    try {
      await API.post("/articles", form);
      setForm({ title: "", content: "", category: "GENERAL" });
      fetchArticles();
    } catch (error) {
      console.error(error);
      alert("Failed to create article");
    }
  };

  const deleteArticle = async (id) => {
    try {
      await API.delete(`/admin/articles/${id}`);
      fetchArticles();
    } catch (error) {
      console.error(error);
      alert("Failed to delete article");
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="p-6">
        <h2 className="text-xl mb-4">Manage Articles</h2>

        <form onSubmit={createArticle} className="card mb-6">
          <input
            placeholder="Title"
            className="input"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <textarea
            placeholder="Content"
            className="input"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
          <select
            className="input"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option value="GENERAL">General</option>
            <option value="PHISHING">Phishing</option>
            <option value="SCAM">Scam</option>
            <option value="PRIVACY">Privacy</option>
          </select>
          <button className="btn btn-primary">
            Add Article
          </button>
        </form>

        {articles.length === 0 ? (
          <div className="card text-gray-500">No articles found.</div>
        ) : (
          articles.map((a) => (
            <div key={a._id} className="card mb-3 flex items-center justify-between gap-3">
              <div>
                <h3 className="font-semibold">{a.title}</h3>
                <p className="text-sm text-gray-500">{a.category}</p>
              </div>

              <button
                onClick={() => deleteArticle(a._id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
}
