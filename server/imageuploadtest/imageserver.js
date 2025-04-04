const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Ensure images directory exists
const IMAGE_DIR = path.join(__dirname, "images");
if (!fs.existsSync(IMAGE_DIR)) {
  fs.mkdirSync(IMAGE_DIR);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, IMAGE_DIR);
  },
  filename: (req, file, cb) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    cb(null, `image_${timestamp}.jpg`);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("image"), (req, res) => {
  const { latitude, longitude } = req.body;
  console.log(
    `Received image at ${new Date().toISOString()} with GPS: (${latitude}, ${longitude})`
  );
  res.json({
    message: "Image received successfully",
    gps: { latitude, longitude },
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
