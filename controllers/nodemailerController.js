const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendMail = (req, res) => {
  let mailOptions = {
    from: req.body.mail,
    to: req.body.email,
    subject: req.body.subject,
    html: `From ${req.body.username} ${req.body.mail} <br /> ${req.body.message}`,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      res.status(500).json(err.message);
      console.log(err);
    } else {
      res.status(200).json(data);
      console.log(data);
    }
  });
};

module.exports = { sendMail };
