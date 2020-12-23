const express = require('express'); 
const router = express.Router(); 
const nodemailer = require('nodemailer'); 
const bodyParser = require('body-parser'); 
const jsonParser = bodyParser.json(); 
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
}); 

module.exports = router; 