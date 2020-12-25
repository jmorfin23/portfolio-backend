const express = require('express'); 
const router = express.Router(); 
const nodemailer = require('nodemailer'); 
const bodyParser = require('body-parser'); 
const jsonParser = bodyParser.json(); 
const fetch = require('node-fetch'); 
require('dotenv').config();

// login to gmail SMTP 
const contactEmail = nodemailer.createTransport({
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
});

// **** Api Routes **** / 

// Send contact email 
router.post('/contact-email', jsonParser, (req, res) => {

  const token = req.get('Authorization').split(" "); 
  
  if (token[0] === "Bearer") {

    try {

      // Verify recaptcha token // 

      fetch(process.env.RECAPTCHA_VERIFY_URL, {
        method: 'POST', 
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token[1]}`
      })
        .then(res => res.json())
        .then(json => {

          if (json.success === true) {
            
            // *** Send email *** // 

            const { name, email, subject, message } = req.body; 
      
            const mail = {
                from: req.body.name,
                to: process.env.SMTP_EMAIL,
                subject: "Contact Form Submission",
                html: `<p>Name: ${req.body.name}</p>
                      <p>Email: ${req.body.email}</p>
                      <p>Subject: ${req.body.subject}</p>
                      <p>Message: ${req.body.message}</p>`,
              };

            contactEmail.sendMail(mail, (error) => {

              if (error) {
                res.json({ status: "Error try again." });
              } else {
                res.json({ status: "Message sent. Thank you." });
              }
            });

          } else {
              res.json({status: 'Recaptcha error, try again.'})
            }
        });
    } catch(err) {
      res.json({status: err.toString()})
    }
  }
}); 

module.exports = router; 