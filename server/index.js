require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

const connectDB = require("./db");
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : [];

//middleware
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");

app.use(express.json());

app.use(helmet());
app.use(xss());

// Enable CORS with dynamic origin based on the request
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

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
