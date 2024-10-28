const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const mongoose = require("mongoose");
const moment = require("moment");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const Game = require("./models/game");
const Venue = require("./models/venue");
const venues = require("./venues");

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose
  .connect(
    "mongodb+srv://zunayedkhanofficial:zunayed@cluster0.tmtff.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("connected"))
  .catch((e) => console.error(e.message));

app.listen(port, () => console.log("Server runing on port 8000"));

//endpoints for user creation
app.post("/register", async (req, res) => {
  try {
    const userData = req.body;
    const newUser = new User(userData);
    await newUser.save();
    const secretKey = crypto.randomBytes(32).toString("hex");
    const token = jwt.sign({ userID: newUser._id }, secretKey);
    res.status(200).json(token);
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "server error" });
  }
});

//endpoints for login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "user not found" });
    }
    if (user.password !== password) {
      res.status(401).json({ message: "incorrect password" });
    }
    const secretKey = crypto.randomBytes(32).toString("hex");
    const token = jwt.sign({ userID: user._id }, secretKey);
    res.status(200).json(token);
  } catch (error) {
    console.error(error);
    res.status().json({ error: "login error" });
  }
});

//add venues to the backend
/*
const addVenues = async () => {
  for (const venueData of venues) {
    const existingVenue = await Venue.findOne({ name: venueData?.name });
    if (!existingVenue) {
      const newVenue = new Venue(venueData);
      await newVenue.save();
      console.log("success");
    } else {
      console.log("skip");
    }
  }
};
addVenues().catch((e) => console.error(e));
*/

//get venue data
app.get("/venues", async (req, res) => {
  try {
    const venues = await Venue.find({});
    res.status(200).json(venues);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch venues" });
  }
});
