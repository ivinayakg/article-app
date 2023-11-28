const Article = require("../models/article");

const createArticle = async (req, res) => {
  const { _id: userId } = req.user;
  const { title, description } = req.body;
  try {
    const articleDoc = new Article({ title, description, userId });
    await articleDoc.save();
    return res.status(200).json({ success: true, data: articleDoc });
  } catch (error) {
    return res.status(404).json({ success: false, error });
  }
};

const deleteArticle = async (req, res) => {
  const { _id: userId } = req.user;
  const { articleId } = req.params;
  try {
    const articleDoc = await Article.findOne({ _id: articleId, userId });
    if (!articleDoc) {
      throw Error("Article Document Is Not Present");
    }
    await Article.deleteOne({ _id: articleId, userId });
    return res.status(200).json({ success: true, data: articleDoc });
  } catch (error) {
    return res.status(404).json({ success: false, error });
  }
};

const updateArticle = async (req, res) => {
  const { _id: userId } = req.user;
  const { articleId, title, description } = req.body;
  try {
    const articleDoc = await Article.findOne({ _id: articleId, userId });
    if (!articleDoc) {
      throw Error("Article Document Is Not Present");
    }
    if (!title) title = articleDoc.title;
    if (!description) description = articleDoc.description;
    await Article.updateOne({ _id: articleId, userId }, { title, description });
    return res
      .status(200)
      .json({ success: true, data: { ...articleDoc, title, description } });
  } catch (error) {
    return res.status(404).json({ success: false, error });
  }
};
const getSelfArticle = async (req, res) => {
  const { _id: userId } = req.user;
  try {
    const selfArticles = await Article.find({
      userId,
    }).populate({
      path: "userId",
      select: ["username"],
    });
    if (!selfArticles) {
      throw Error("Article Document Is Not Present");
    }
    return res.status(202).json({ success: true, data: selfArticles });
  } catch (error) {
    return res.status(404).json({ success: false, error });
  }
};

const getAllArticle = async (req, res) => {
  let { limit, before } = req.query;
  if (isNaN(limit)) limit = 10;

  let lastArticle = {};

  try {
    if (before !== "undefined") {
      lastArticle = (await Article.findOne({ _id: before })) ?? {};
    }

    const allArticles = await Article.find({
      createdAt: {
        $lt: lastArticle.createdAt ? lastArticle.createdAt : new Date(),
      },
    })
      .limit(Number(limit))
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "userId",
        select: ["username"],
      });

    return res.status(202).json({ success: true, data: allArticles });
  } catch (error) {
    return res.status(404).json({ success: false, error });
  }
};

const getOneArticle = async (req, res) => {
  const { articleId } = req.params;
  try {
    const article = await Article.findOne({ _id: articleId }).populate({
      path: "userId",
      select: ["username"],
    });
    return res.status(202).json({ success: true, data: article });
  } catch (error) {
    return res.status(404).json({ success: false, error });
  }
};

module.exports = {
  createArticle,
  deleteArticle,
  getAllArticle,
  getOneArticle,
  updateArticle,
  getSelfArticle,
};
