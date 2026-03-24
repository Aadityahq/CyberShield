import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import Navbar from "../../components/layout/Navbar";

export default function Articles() {
  const [articles, setArticles] = useState([]);
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

  return (
    <>
      <Navbar />

      <div className="p-6">
        <h2 className="text-xl mb-4">Knowledge Hub</h2>

        {articles.map((a) => (
          <div
            key={a._id}
            className="border p-3 mb-3 cursor-pointer"
            onClick={() => navigate(`/articles/${a._id}`)}
          >
            <h3 className="font-bold">{a.title}</h3>
            <p className="text-sm">{a.category}</p>
          </div>
        ))}
      </div>
    </>
  );
}
