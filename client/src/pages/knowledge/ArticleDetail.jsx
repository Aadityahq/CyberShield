import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";
import Navbar from "../../components/layout/Navbar";

export default function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetchArticle();
  }, []);

  const fetchArticle = async () => {
    try {
      const { data } = await API.get(`/articles/${id}`);
      setArticle(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!article) return <p>Loading...</p>;

  return (
    <>
      <Navbar />

      <div className="p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl mb-3">{article.title}</h2>
        <p className="text-sm mb-4">{article.category}</p>
        <p>{article.content}</p>
      </div>
    </>
  );
}
