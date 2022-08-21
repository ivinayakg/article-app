const { Schema, model } = require("mongoose");
const {
  default: { isEmail },
} = require("validator");

const AdminSchema = new Schema(
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
    admin: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

AdminSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

AdminSchema.methods.createToken = function () {
  return sign(
    { userId: this._id, name: this.name, admin: true },
    process.env.JWT_SECRET,
    {
      expiresIn: Math.floor(Date.now() / 1000) + 10 * 60,
    }
  );
};

AdminSchema.methods.comparePassword = async function (password) {
  const isCorrect = await bcrypt.compare(password, this.password);
  return isCorrect;
};

module.exports = model("Admin", AdminSchema);
