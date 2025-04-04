const express = require("express");
const mapRouter = express.Router();
const { spawn } = require("child_process");
const cameradata = require("../Models/CameraData.json");

const GRAPH_HOPPER_API_KEY = "b43ba286-2b19-46c3-8066-4bf24159527f"; // Replace with your API key

// Models (simplified for example)
const SafetyRecord = {
  getSafetyRating: async (location) => {
    try {
      const bodyJson = JSON.stringify({
        lat: location.latitude,
        lng: location.longitude,
      });
      console.log(bodyJson);
      prediction = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: bodyJson,
        headers: {
          "Content-Type": "application/json",
        },
      });
      prediction = await prediction.json();
      console.log(prediction);
      return prediction.danger_level;
    } catch {
      return 0;
    }
  },
};

const RouteService = {
  getOpenRouteData: async (origin, destination) => {
    const OptimalCamLoc = cameradata[0].location;
    const url = `https://graphhopper.com/api/1/route?point=${origin.latitude},${origin.longitude}&point=${OptimalCamLoc.lat}, ${OptimalCamLoc.lon}&point=${destination.latitude},${destination.longitude}&profile=foot&key=${GRAPH_HOPPER_API_KEY}&points_encoded=false&alternatives=3&alternative_route.max_weight_factor=1.8&alternative_route.max_share_factor=0.4`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      console.log(data.paths.length);
      if (data.paths && data.paths.length > 0) {
        const route = data.paths[0].points.coordinates.map(([lon, lat]) => ({
          latitude: lat,
          longitude: lon,
        }));
        return route;
      } else {
        console.warn("No route found!");
      }
    } catch (error) {
      console.error("Error fetching route:", error);
    }

    return [];
  },
  // Get camera waypoints along the route and return the ones with high safety rating
  getCameraWaypoints: async () => {
    return cameradata;
  },
};

const RiskAssessment = {
  calculateRiskLevel: async (location) => {
    /* Compining crimeData and camerawaypoints */
  },
  getSafeAreas: async (location) => {
    /* Implementation */
  },
};

// Routes
// 1. Safety Ratings
mapRouter.get("/safety-ratings", async (req, res) => {
  try {
    const { geoLocation } = req.query; //geo location is a string

    if (!geoLocation) {
      return res.status(400).json({ error: "Geo location is required" });
    }

    const locCoords = await geocodeSearch(geoLocation);

    console.log(geoLocation);

    const data = await SafetyRecord.getSafetyRating(locCoords);

    const safetyRating = {
      rating: data,
    };
    console.log(safetyRating);
    //get this safety Rating from Danger Sense Database

    res.json(safetyRating);
  } catch (error) {
    res.status(500).json({ error: "Failed to get safety ratings" });
  }
});

// 2. Route Information
mapRouter.get("/route", async (req, res) => {
  try {
    const { originLat, originLon, endpointLat, endpointLon } = req.query;

    const origin = {
      latitude: originLat,
      longitude: originLon,
    };
    const endpoint = {
      latitude: endpointLat,
      longitude: endpointLon,
    };

    if (!origin || !endpoint) {
      return res
        .status(400)
        .json({ error: "Origin and endpoint are required" });
    }

    const routeData = await RouteService.getOpenRouteData(origin, endpoint);
    const cameraWaypoints = await RouteService.getCameraWaypoints();

    res.json({
      route: routeData,
      waypoints: cameraWaypoints,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to get route information" });
  }
});

// 4. Danger Sense Notifications
mapRouter.post("/danger-sense", async (req, res) => {
  try {
    const { location, currentRiskScore } = req.body;

    if (!location || currentRiskScore === undefined) {
      return res
        .status(400)
        .json({ error: "Location and risk score are required" });
    }

    const storedRiskLevel = await RiskAssessment.getStoredRiskLevel(location);

    if (currentRiskScore > storedRiskLevel.threshold) {
      // Send notification logic would go here
      await sendHighRiskNotification(location);
    }

    res.json({
      notification: "Processed",
      riskLevel: currentRiskScore,
      timestamp: new Date(),
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to process danger sense" });
  }
});

// 5. Safe Locations
mapRouter.get("/safe-locations", async (req, res) => {
  try {
    const { area } = req.query;

    if (!area) {
      return res.status(400).json({ error: "Area is required" });
    }

    const safeAreas = await RiskAssessment.getSafeAreas(area);

    res.json({
      safeLocations: safeAreas,
      count: safeAreas.length,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to get safe locations" });
  }
});

module.exports = mapRouter;

const geocodeSearch = async (locName) => {
  const url = `https://graphhopper.com/api/1/geocode?q=${locName}&key=${GRAPH_HOPPER_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.hits && data.hits.length > 0) {
      const { lat, lng } = data.hits[0].point;
      return { latitude: lat, longitude: lng };
    } else {
      console.log("No location found :", locName);
    }
  } catch (error) {
    console.error("Error in geocoding:", error);
  }
  return null;
};
