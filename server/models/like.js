const { Schema, model, Types } = require("mongoose");

const LikeSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    articleId: {
      type: Types.ObjectId,
      ref: "Article",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Like", LikeSchema);
