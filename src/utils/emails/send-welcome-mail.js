const { sender } = require("../../services/nodemailer");
const { welcomeMail } = require("../../templates/emails/welcome");

function sendWelcomeMail(to, businessName) {
  const mail = {
    from: "Paperlink <hello@paperlink.app>",
    to,
    subject:
      "Signinlink, Welcome" +
      ` #${Math.floor(Math.random() * (10000 - 1 + 1) + 1)}`,
    html: welcomeMail(businessName),
  };

  sender.sendMail(mail, function (error, info) {
    if (error) {
      return console.log(error);
    } else {
      return console.log("Email sent successfully: " + info.response);
    }
  });
}

module.exports = { sendWelcomeMail };
