const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const apartmentRoute = require("./routes/apartments");
const mailRoute = require("./routes/nodemailer");

const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

const port = process.env.PORT || 8080;

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("MongoDb connected"))
  .catch((err) => console.log(err));

app.listen(port, (req, res) => {
  console.log("listening on port 8080");
});

app.use("/api/apartments", mailRoute);
app.use("/api/apartments", apartmentRoute);
