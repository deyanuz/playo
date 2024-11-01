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

app.post("/create-game", async (req, res) => {
  try {
    const { sport, area, date, time, admin, totalPlayers } = req.body;
    const newGame = new Game({
      sport,
      area,
      date,
      time,
      admin,
      totalPlayers,
      players: [admin],
    });
    const savedGame = newGame.save();
    res.status(200).json(savedGame);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error });
  }
});

app.get("/games", async (req, res) => {
  try {
    const games = await Game.find({})
      .populate("admin")
      .populate("players", "image firstName lastName");
    const currentDate = moment();
    const filteredGames = games?.filter((g) => {
      const gameDate = moment(g.date, "Do MMMM");
      const gameTime = g.time.split("-")[0];
      const gameDateTime = moment(
        `${gameDate.format("YYYY-MM-DD")} ${gameTime}`,
        "YYYY-MM-DD h:mm A"
      );
      return gameDateTime.isAfter(currentDate);
    });

    const formattedGames = filteredGames.map((game) => ({
      _id: game._id,
      sport: game.sport,
      date: game.date,
      area: game.area,
      time: game.time,
      players: game.players?.map((player) => ({
        _id: player?._id,
        imageUrl: player.image,
        name: `${player.firstName} ${player.lastName}`,
      })),
      totalPlayers: game.totalPlayers,
      queries: game.queries,
      requests: game.requests,
      isBooked: game.isBooked,
      admin: `${game.admin.firstName} ${game.admin.lastName}`,
      adminUrl: game.admin.image,
      matchFull: game.matchFull,
    }));
    res.status(200).json(formattedGames);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error });
  }
});

app.get("/upcoming", async (req, res) => {
  try {
    const userID = req.query.userID;
    const games = await Game.find({
      $or: [{ admin: userID }, { players: userID }],
    })
      .populate("admin")
      .populate("players", "image firstName lastName");
    const formattedGames = games.map((game) => ({
      _id: game._id,
      sport: game.sport,
      date: game.date,
      area: game.area,
      time: game.time,
      players: game.players?.map((player) => ({
        _id: player?._id,
        imageUrl: player.image,
        name: `${player.firstName} ${player.lastName}`,
      })),
      totalPlayers: game.totalPlayers,
      queries: game.queries,
      requests: game.requests,
      isBooked: game.isBooked,
      admin: `${game.admin.firstName} ${game.admin.lastName}`,
      isUserAdmin: game.admin._id.toString() == userID,
      adminUrl: game.admin.image,
      matchFull: game.matchFull,
    }));
    res.status(200).json(formattedGames);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error });
  }
});

app.post("/games/:gameID/request", async (req, res) => {
  try {
    const { userID, comment } = req.body;
    const { gameID } = req.params;
    const game = await Game.findById(gameID);
    if (!game) {
      return res.status(404).json({ message: "Invalid game" });
    }
    const existingRequest = game?.requests.find(
      (r) => r.userID.toString() === userID
    );
    if (existingRequest) {
      return res.status(400).json({ message: "Request already sent" });
    }
    game.requests.push({ userID, comment });
    await game.save();
    return res.status(200).json({ message: "Request sent successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error });
  }
});
app.get("/gmaes/:gameID/requests", async (req, res) => {
  try {
    const { gameID } = req.params;
    const game = Game.findById(gameID).populate({
      path: "requests.userID",
      select: "email firstName lastName image skill nOfGames playpals sports",
    });
    if (!game) {
      res.status(400).json({ message: "Invalid game" });
    }
    const requestsWithUserInfo = game.requests?.map((request) => ({
      userID: request.userID._id,
      email: request.userID.email,
      firstName: request.userID.firstName,
      lastName: request.userID.lastName,
      image: request.userID.image,
      skill: request.userID.skill,
      noOdGames: request.userID.noOdGames,
      playpals: request.userID.playpals,
      sports: request.userID.sports,
      comment: request.comment,
    }));
    res.json(requestsWithUserInfo);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error });
  }
});

app.get("/user/:userID", async (req, res) => {
  try {
    const { userID } = req.params;
    const user = await User.findById(userID);
    if (!user) {
      res.status(400).json({ message: "Invalid user" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error });
  }
});
