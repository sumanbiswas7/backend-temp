const nodemailer = require("nodemailer");

exports.sender = nodemailer.createTransport({
  service: "Mailgun",
  auth: {
    user: "postmaster@main.paperdaz.com",
    pass: "c5a79db79317a66898912ef7f707660f-2cc48b29-4f1600cb",
  },
});
