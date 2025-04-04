const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());

app.post("/uploadvideo", (req, res) => {
  // Handle video post
  res.send("Video posted");
});

app.get("/getvulnerability", (req, res) => {
  // Handle vulnerability get
  res.send("Vulnerability info");
});

app.get("/getobjectinfo", (req, res) => {
  // Handle object info get
  res.send("Object info");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
