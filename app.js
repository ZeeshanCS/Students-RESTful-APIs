const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

app.use(cors());
app.options("*", cors());

// Middleware
app.use(express.json());
app.use(morgan("tiny"));

//Routers
const studentsRoute = require("./routes/students");

// Students Api Url
const api = process.env.API_URL;

app.use(`${api}/students`, studentsRoute);

// Database Connection
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME,
  })
  .then(() => {
    console.log("Connected to the database...");
  })
  .catch((err) => {
    console.log(err);
  });

// Running server
app.listen(PORT, () => {
  console.log(api);
  console.log(`Server is running on: http://localhost:${PORT}`);
});
