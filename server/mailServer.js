import nodemailer from 'nodemailer'

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'prajith.manian@gmail.com',
        pass: ''
    }
});

module.exports = transporter
