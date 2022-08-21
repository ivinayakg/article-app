const Like = require("../models/like");
const Article = require("../models/article");
const { Error } = require("mongoose");

const addLike = async (req, res) => {
  const { articleId } = req.query;
  const { _id: userId } = req.user;
  try {
    const articleDoc = await Article.findOne({ _id: articleId });
    if (!articleDoc) {
      throw Error("Article Document Is Not Present");
    }
    let likeDoc = await Like.findOne({ userId, articleId });
    if (likeDoc) {
      throw Error("Like Already there");
    }
    likeDoc = new Like({ userId, articleId });
    await likeDoc.save();
    return res.status(200).json({ success: true, data: likeDoc });
  } catch (error) {
    return res.status(404).json({ success: false, error });
  }
};
const removeLike = async (req, res) => {
  const { articleId } = req.query;
  const { _id: userId } = req.user;
  try {
    const articleDoc = await Article.findOne({ _id: articleId });
    if (!articleDoc) {
      throw Error("Article Document Is Not Present");
    }
    let likeDoc = await Like.findOne({ userId, articleId });
    if (!likeDoc) {
      throw Error("No like found");
    }
    await Like.deleteOne({ userId, articleId });
    return res.status(200).json({ success: true, data: likeDoc });
  } catch (error) {
    return res.status(404).json({ success: false, error });
  }
};

const getAllLikes = async (req, res) => {
  const { articleId } = req.query;
  try {
    const articleDoc = await Article.findOne({ _id: articleId });
    if (!articleDoc) {
      throw Error("Article Document Is Not Present");
    }
    let allLikes = await Like.findOne({ articleId });
    return res.status(202).json({ success: true, data: allLikes });
  } catch (error) {
    return res.status(404).json({ success: false, error });
  }
};

module.exports = { addLike, removeLike, getAllLikes };
