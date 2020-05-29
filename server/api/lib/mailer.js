const nodemailer = require("nodemailer");

const {
   EMAIL_HOST,
   EMAIL_PORT,
   EMAIL_HOST_USER,
   EMAIL_HOST_PASSWORD,
   EMAIL_USE_SSL
} = process.env

const transporter = nodemailer.createTransport({
   host: EMAIL_HOST,
   port: EMAIL_PORT,
   secure: EMAIL_USE_SSL, // true for 465 false for other ports
   auth: {
      user: EMAIL_HOST_USER,
      pass: EMAIL_HOST_PASSWORD,
   },
});

module.exports = transporter


// // send mail with defined transport object
// let info = await transporter.sendMail({
//    from: '"Fred Foo 👻" <foo@example.com>', // sender address
//    to: "bar@example.com, baz@example.com", // list of receivers
//    subject: "Hello ✔", // Subject line
//    text: "Hello world?", // plain text body
//    html: "<b>Hello world?</b>", // html body
//  });

//  console.log("Message sent: %s", info.messageId);
//  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//  // Preview only available when sending through an Ethereal account
//  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...