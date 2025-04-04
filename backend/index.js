const express = require("express");
// const { TopicRequestDb, TeacherDb, StudentDb } = require("./database");
const bodyParser = require("body-parser");
const cors = require("cors");

const mainRouter = require("./routes/main");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use("/", mainRouter);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
