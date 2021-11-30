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
    from: req.body.senderEmail,
    to: req.body.receiverEmail,
    subject: req.body.subject,
    html: `${req.body.username} from Apartments <br /> ${req.body.senderEmail} <br /> <br /> ${req.body.message}`,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      res.status(500).json(err.message);
      console.log(err.message);
    } else {
      res.status(200).json(data);
      console.log(data);
    }
  });
};

module.exports = { sendMail };
