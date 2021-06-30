const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();

// Express MW
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

// port
const port = process.env.PORT || 3000;

/* app.get('/', (req, res) => {
    res.send("Hello World")
}) */

const transporter = nodemailer.createTransport({
    host: 'mail.fikxit.com', //"smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: 'noreply@fikxit.com',
      pass: '@lexim39'
    },
    tls: {
      rejectUnauthorized: false
    }
});



// email sub post
app.post('/api/subscription', (req, res) => {  
    
    const mailOptions = {
        from: 'Fikxit Server <noreply@fikxit.com>',
        to: 'ago.fnc@gmail.com',
        subject: 'FikxIT Subscripton Message',
        html: `Hi, <br>
        Please not that someone with email ${req.body.email} just subscribed to Fikxit website`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(400).json({msg: 'Your subscription was not successful, please try again'})
        } else {
          //console.log('Email sent: ' + info.response);
          res.status(200).json({msg: 'You have subscribed successfully'})
        }
    });
})

app.post('/api/request', (req, res) => {

    const mailOptions = {
        from: 'Fikxit Server <noreply@fikxit.com>',
        to: 'ago.fnc@gmail.com',
        subject: 'FikxIT Request Message',
        html: `Hi, <br>
        Please not that someone with details as below just made a request at Fikxit website: <br>
        Full name: ${req.body.name}, <br>
        Phone number: ${req.body.phone}, <br>
        Email address: ${req.body.email}, <br>
        Request subject: ${req.body.subject}, <br>
        Request descripton: ${req.body.msg} <br>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(400).json({msg: 'Your subscription was not successful, please try again'})
        } else {
          //console.log('Email sent: ' + info.response);
          res.status(200).json({msg: 'Request was sent successfully, We will contact you just before you finish a bottle of coke'})
        }
    });
})

app.listen(port, () => {
    console.log(`Server started`)
})