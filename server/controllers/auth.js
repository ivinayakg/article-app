const User = require("../models/user");
const Admin = require("../models/admin");
const { Error } = require("mongoose");
const { createToken } = require("../utils/jwt");

const login = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const user = await (role === "admin" ? Admin : User).findOne({ username });
    if (!user) {
      throw Error("User Not Found");
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      throw Error("Something went wrong");
    }

    const token = createToken(user._doc);

    return res
      .status(200)
      .json({ success: true, data: { token, user: user._doc } });
  } catch (error) {
    return res.status(404).json({ success: false, error });
  }
};

const createUser = async (req, res) => {
  try {
    let { username, password, role, adminSecret, email, name } = req.body;
    if (role === "admin") {
      if (!adminSecret) throw Error("Not Authorized");
      if (adminSecret !== process.env.ADMIN_SECRET)
        throw Error("Not Authorized");
    }
    if (!name) name = "";

    const user = new (role === "admin" ? Admin : User)({
      username,
      password,
      email,
      name,
    });
    await user.save();

    return res.status(200).json({ success: true, data: { user: user._doc } });
  } catch (error) {
    return res.status(404).json({ success: false, error });
  }
};

module.exports = { login, createUser };
