const mailer = require('nodemailer');
const { welcome } = require('./welcome_template');
const { purchase } = require('./purchase_template');

require("dotenv").config();

const getEmailData = (to, name, token, template, actionData) => {
  let data = null;

  switch(template){
    case "welcome":
      data = {
        from: "Waves Market <nik.art.vov.lor@gmail.com>",
        to,
        subject: `Welcome to Waves Market ${name}`,
        html: welcome()
      }
    break;

    case "purchase":
      data = {
        from: "Waves Market <nik.art.vov.lor@gmail.com>",
        to,
        subject: `Thanks for shopping with us, ${name} `,
        html: purchase(actionData)
      }
    break;

    default:
      return data;
  }

  return data;
}

const sendEmail = (to, name, token, template, actionData=null) => {
  const smtpTransport = mailer.createTransport({
    service: "gmail",
    auth: {
      user: "nik.art.vov.lor@gmail.com",
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mail = getEmailData(to, name, token, template, actionData)

  smtpTransport.sendMail(mail, function(err, res){
  if(err){
    console.log(err)
  }else{
    console.log('sent')
  }
  smtpTransport.close();
})
};

module.exports = { sendEmail };
