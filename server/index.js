require("dotenv").config();
require('express-async-errors');
const express = require("express");
const app = express();

const connectDB = require("./db");

//middleware
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");

const whitelist = [];
const corsOptions = {
  origin: function (origin, callback) {
    return callback(null, true);
    if (process.env.mode === "DEVELOPMENT") {
      return callback(null, true);
    }
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(express.json());

app.use(helmet());
app.use(xss());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use("", require("./routes"));

const port = process.env.PORT || 8000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
