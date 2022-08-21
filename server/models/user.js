const { Schema, model } = require("mongoose");
const {
  default: { isEmail },
} = require("validator");
const bcrypt = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");

const UserSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [isEmail, "invalid email"],
    },
    password: {
      type: String,
      required: true,
      min: [8, "Need atleast the password of the length of 8"],
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createToken = function () {
  return sign({ userId: this._id, name: this.name }, process.env.JWT_SECRET, {
    expiresIn: Math.floor(Date.now() / 1000) + 10 * 60,
  });
};

UserSchema.methods.comparePassword = async function (password) {
  const isCorrect = await bcrypt.compare(password, this.password);
  return isCorrect;
};

module.exports = model("User", UserSchema);
