const router = require("express").Router();
const nodemailerController = require("../controllers/nodemailerController");

router.post("/mail", nodemailerController.sendMail);

module.exports = router;
