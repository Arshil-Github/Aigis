const express = require("express");
const socialRouter = express.Router();
const fs = require("fs");
const path = require("path");

// Database models (to be implemented based on your database choice)
const Post = {
  create: async (postData) => {
    /* Implementation */
  },
};

const NGO = {
  getAll: async () => {
    /* Implementation */
  },
};

const Emergency = {
  notifyTrustees: async (userId, location) => {
    /* Implementation */
  },
  notifyAuthorities: async (location) => {
    /* Implementation */
  },
  sendDangerAlert: async (userId) => {
    /* Implementation */
  },
};

// 1. Post Repository - Create new community posts
socialRouter.post("/post", async (req, res) => {
  try {
    const { location, userAccount, text } = req.body;

    if (!location || !text) {
      return res.status(400).json({
        error: "Location and text content are required",
      });
    }

    const newPost = await Post.create({
      location,
      userId: userAccount.id,
      content: text,
      timestamp: new Date(),
    });

    res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({
      error: "Failed to create post",
    });
  }
});

// 2. Get NGOs - Retrieve list of pre-stored NGO information
socialRouter.get("/ngos", async (req, res) => {
  try {
    const ngoList = await NGO.getAll();

    res.json({
      count: ngoList.length,
      ngos: ngoList,
    });
  } catch (error) {
    console.error("Error fetching NGOs:", error);
    res.status(500).json({
      error: "Failed to retrieve NGO information",
    });
  }
});

// 3. Post SOS Signal - Emergency alert system
socialRouter.post("/sos", async (req, res) => {
  try {
    const { userAccount, userLocation } = req.body;

    if (!userLocation) {
      return res.status(400).json({
        error: "User location is required for SOS signal",
      });
    }

    // Parallel processing of notifications
    await Promise.all([
      Emergency.notifyTrustees(userAccount.id, userLocation),
      Emergency.notifyAuthorities(userLocation),
    ]);

    res.json({
      message: "SOS signal sent successfully",
      timestamp: new Date(),
      status: "Emergency services and trustees notified",
    });
  } catch (error) {
    console.error("Error sending SOS:", error);
    res.status(500).json({
      error: "Failed to send SOS signal",
    });
  }
});

// 4. Post Danger Signal - Alert user about dangerous zones
socialRouter.post("/danger", async (req, res) => {
  try {
    const { userAccount } = req.body;

    await Emergency.sendDangerAlert(userAccount.id);

    res.json({
      message: "Danger alert sent successfully",
      timestamp: new Date(),
      alertType: "danger_zone",
    });
  } catch (error) {
    console.error("Error sending danger alert:", error);
    res.status(500).json({
      error: "Failed to send danger alert",
    });
  }
});

socialRouter.post("/crimeReport", async (req, res) => {
  // Extract location and action from the request body
  const { location, action } = req.body;

  // Validate input
  if (!location || !action) {
    return res.status(400).json({
      error: "Both location and action are required.",
    });
  }

  // Define the path for the crime database JSON file
  const crimeDatabasePath = path.join(__dirname, "../data/reportedCrime.json");

  try {
    // Read the existing data from the JSON file
    const fileData = fs.readFileSync(crimeDatabasePath, "utf8");
    let crimeDatabase = JSON.parse(fileData);

    // Add the new crime report to the database
    crimeDatabase.push({ location, action });

    // Write the updated data back to the JSON file
    fs.writeFileSync(crimeDatabasePath, JSON.stringify(crimeDatabase, null, 2));

    // Send success response with a timestamp
    res.status(201).json({
      message: "Crime reported successfully.",
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("Error while reporting crime:", error);

    // Send failure response if an error occurs
    res.status(500).json({
      error: "Failed to report crime. Please try again later.",
    });
  }
});
module.exports = socialRouter;
