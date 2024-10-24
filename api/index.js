const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const moment = require("moment");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose
  .connect(
    "mongodb+srv://zunayedkhanofficial:zunayed@cluster0.tmtff.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("connected"))
  .catch((e) => console.error(e.message));

app.listen(port, () => console.log("Server runing on port 8000"));
