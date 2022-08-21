const express = require("express");
const {
  getAllArticle,
  getOneArticle,
  createArticle,
  deleteArticle,
  updateArticle,
} = require("../controllers/article");
const { login, createUser } = require("../controllers/auth");
const { getAllLikes, addLike, removeLike } = require("../controllers/like");
const authenticateUser = require("../middleware/authentication");
const router = express.Router();

// auth
router.post("/login", login);
router.post("/register", createUser);

//public queries
router.get("/article", getAllArticle);
router.get("/article/:articleId", getOneArticle);
router.get("/likes", getAllLikes);

//private queries
router.post("/article", authenticateUser, createArticle);
router.delete("/article/:articleId", authenticateUser, deleteArticle);
router.put("/article", authenticateUser, updateArticle);

router.post("/like", authenticateUser, addLike);
router.delete("/like", authenticateUser, removeLike);

module.exports = router;
