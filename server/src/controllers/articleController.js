import Article from "../models/Article.js";

// Create Article (Admin)
export const createArticle = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    const article = await Article.create({
      title,
      content,
      category,
      createdBy: req.user._id
    });

    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Articles (Public)
export const getArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });

    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Article
export const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
