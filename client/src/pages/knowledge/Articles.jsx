import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../../services/api";
import { sanitizeObject } from "../../utils/sanitizer";
import Navbar from "../../components/layout/Navbar";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "GENERAL"
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const sanitized = sanitizeObject(form);
      await API.post("/articles", sanitized);
      toast.success("Article submitted for review!");
      setForm({ title: "", content: "", category: "GENERAL" });
      setShowForm(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit article");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="p-6">
        <h2 className="text-xl mb-4">Knowledge Hub</h2>

        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary mb-6"
        >
          {showForm ? "Cancel" : "Submit Article"}
        </button>

        {showForm && (
          <form className="card mb-6" onSubmit={handleSubmit}>
            <h3 className="font-semibold mb-3">Submit Your Article</h3>

            <input
              name="title"
              placeholder="Article Title"
              className="input"
              value={form.title}
              onChange={handleChange}
              required
            />

            <textarea
              name="content"
              placeholder="Article Content"
              className="input"
              value={form.content}
              onChange={handleChange}
              rows={6}
              required
            />

            <select
              name="category"
              className="input"
              value={form.category}
              onChange={handleChange}
            >
              <option value="GENERAL">General</option>
              <option value="PHISHING">Phishing</option>
              <option value="SCAM">Scam</option>
              <option value="PRIVACY">Privacy</option>
            </select>

            <p className="text-xs text-gray-500 mb-3">
              Your article will be reviewed by admins before publication.
            </p>

            <button className="btn btn-primary w-full">
              {loading ? "Submitting..." : "Submit Article"}
            </button>
          </form>
        )}

        {articles.map((a) => (
          <div
            key={a._id}
            className="card mb-3 cursor-pointer hover:scale-[1.02] transition"
            onClick={() => navigate(`/articles/${a._id}`)}
          >
            <h3 className="font-semibold text-lg">{a.title}</h3>
            <p className="text-sm text-gray-500">{a.category}</p>
            {a.createdBy && (
              <p className="text-xs text-gray-400 mt-2">By: {a.createdBy.name}</p>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
