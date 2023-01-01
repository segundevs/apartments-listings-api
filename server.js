const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const apartmentRoute = require("./routes/apartments");
const mailRoute = require("./routes/nodemailer");
const path = require("path");

const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8080;

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("MongoDb connected"))
  .catch((err) => console.log(err));

app.listen(port, (req, res) => {
  console.log("listening on port 8080");
});

app.use("/", express.static("public"));
app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});
app.use("/api/apartments", mailRoute);
app.use("/api/apartments", apartmentRoute);
