const router = require("express").Router();
const express = require("express");
const nodemailerController = require("../controllers/nodemailerController");

const app = express();

router.post(
  "/mail",
  app.use((req, res, next) => {
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://apartmentshub.netlify.app/"
    );
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
  }),
  nodemailerController.sendMail
);

module.exports = router;
