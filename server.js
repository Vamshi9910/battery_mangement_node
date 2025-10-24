// server.js
// --------------------------------------
// Battery Management System Backend
// Using Express + MongoDB Atlas
// --------------------------------------

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// ✅ Replace this with your actual MongoDB Atlas connection string
const MONGO_URI = "mongodb+srv://vamshi:vam123@batteryproj.smpqb0e.mongodb.net/?appName=batteryProj";

// ✅ Connect to MongoDB Atlas
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// ✅ Define Mongoose Schema
const batterySchema = new mongoose.Schema({
  battery_id: { type: String, required: true, index: true },
  current: { type: Number, required: true },
  voltage: { type: Number, required: true },
  temperature: { type: Number, required: true },
  time: { type: Date, required: true, index: true },
});

const Battery = mongoose.model("Battery", batterySchema);

// ✅ Initialize Express App
const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static("public"));


// ✅ Health Check Route
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// ✅ POST: Store Battery Data
app.post("/api/battery/data", async (req, res) => {
  try {
    const { battery_id, current, voltage, temperature, time } = req.body;

    if (!battery_id || !current || !voltage || !temperature || !time) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const newBatteryData = new Battery({
      battery_id,
      current,
      voltage,
      temperature,
      time: new Date(time),
    });

    await newBatteryData.save();
    res.json({ success: true, message: "Data saved successfully" });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// ✅ GET: All Data for a Specific Battery
app.get("/api/battery/:id", async (req, res) => {
  try {
    const batteryData = await Battery.find({ battery_id: req.params.id }).sort({
      time: 1,
    });
    res.json(batteryData);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// ✅ GET: Specific Field for a Battery
app.get("/api/battery/:id/:field", async (req, res) => {
  try {
    const { id, field } = req.params;
    const validFields = ["current", "voltage", "temperature", "time"];

    if (!validFields.includes(field)) {
      return res.status(400).json({ success: false, message: "Invalid field" });
    }

    const data = await Battery.find({ battery_id: id })
      .select(`${field} time -_id`)
      .sort({ time: 1 });

    res.json(data);
  } catch (error) {
    console.error("Error retrieving field data:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// ✅ GET: Specific Field with Time Range
app.get("/api/battery/:id/:field/range", async (req, res) => {
  try {
    const { id, field } = req.params;
    const { start, end } = req.query;

    if (!start || !end) {
      return res
        .status(400)
        .json({ success: false, message: "Start and end times required" });
    }

    const validFields = ["current", "voltage", "temperature", "time"];
    if (!validFields.includes(field)) {
      return res.status(400).json({ success: false, message: "Invalid field" });
    }

    const data = await Battery.find({
      battery_id: id,
      time: { $gte: new Date(start), $lte: new Date(end) },
    })
      .select(`${field} time -_id`)
      .sort({ time: 1 });

    res.json(data);
  } catch (error) {
    console.error("Error retrieving range data:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// ✅ Set Port and Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
