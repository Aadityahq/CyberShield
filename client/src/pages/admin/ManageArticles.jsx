import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../../services/api";
import AdminNavbar from "../../components/layout/AdminNavbar";
import { CheckCircle, XCircle, Trash2 } from "lucide-react";

export default function ManageArticles() {
  const [allArticles, setAllArticles] = useState([]);
  const [pendingArticles, setPendingArticles] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [processing, setProcessing] = useState({});

  const renderDisplayName = (person, fallback = "Unknown") => {
    if (!person) return fallback;

    const baseName = person.name || fallback;
    if (!person.alias) return baseName;

    return (
      <span title={`Username: ${baseName}`} className="cursor-help">
        {person.alias}
      </span>
    );
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const [pendingRes, allRes] = await Promise.all([
        API.get("/articles/admin/pending"),
        API.get("/articles")
      ]);
      setPendingArticles(pendingRes.data);
      setAllArticles(allRes.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch articles");
    }
  };

  const updateArticleStatus = async (id, status) => {
    setProcessing({ ...processing, [id]: true });
    try {
      await API.put(`/articles/${id}/status`, { status });
      toast.success(`Article ${status.toLowerCase()}`);
      fetchArticles();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update article");
    } finally {
      setProcessing({ ...processing, [id]: false });
    }
  };

  const deleteArticle = async (id) => {
    setProcessing({ ...processing, [id]: true });
    try {
      await API.delete(`/admin/articles/${id}`);
      toast.success("Article deleted");
      fetchArticles();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete article");
    } finally {
      setProcessing({ ...processing, [id]: false });
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="p-6">
        <h2 className="text-xl mb-4">Manage Articles</h2>

        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setActiveTab("pending")}
            className={`px-4 py-2 rounded ${activeTab === "pending" ? "btn btn-primary" : "btn"}`}
          >
            Pending ({pendingArticles.length})
          </button>
          <button
            onClick={() => setActiveTab("published")}
            className={`px-4 py-2 rounded ${activeTab === "published" ? "btn btn-primary" : "btn"}`}
          >
            Published ({allArticles.length})
          </button>
        </div>

        {activeTab === "pending" && (
          <div>
            {pendingArticles.length === 0 ? (
              <div className="card text-gray-500 text-center py-8">
                No pending articles.
              </div>
            ) : (
              pendingArticles.map((a) => (
                <div key={a._id} className="card mb-4">
                  <h3 className="font-semibold text-lg">{a.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{a.category}</p>
                  <p className="text-sm mb-3">{a.content.substring(0, 150)}...</p>
                  {a.createdBy && (
                    <p className="text-xs text-gray-400 mb-3">
                      <strong>Submitted by:</strong> {renderDisplayName(a.createdBy)} ({a.createdBy.email})
                    </p>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => updateArticleStatus(a._id, "APPROVED")}
                      disabled={processing[a._id]}
                      className="btn btn-primary flex items-center gap-2"
                    >
                      <CheckCircle size={16} />
                      {processing[a._id] ? "Processing..." : "Approve"}
                    </button>
                    <button
                      onClick={() => updateArticleStatus(a._id, "REJECTED")}
                      disabled={processing[a._id]}
                      className="btn btn-danger flex items-center gap-2"
                    >
                      <XCircle size={16} />
                      {processing[a._id] ? "Processing..." : "Reject"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "published" && (
          <div>
            {allArticles.length === 0 ? (
              <div className="card text-gray-500 text-center py-8">
                No articles published yet.
              </div>
            ) : (
              allArticles.map((a) => (
                <div key={a._id} className="card mb-3 flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-semibold">{a.title}</h3>
                    <p className="text-sm text-gray-500">{a.category}</p>
                  </div>

                  <button
                    onClick={() => deleteArticle(a._id)}
                    className="btn btn-danger flex items-center gap-2"
                    disabled={processing[a._id]}
                  >
                    <Trash2 size={16} />
                    {processing[a._id] ? "Processing..." : "Delete"}
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
}
