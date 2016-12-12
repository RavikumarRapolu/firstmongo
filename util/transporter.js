var smtpTransport = require('nodemailer-smtp-transport');
var nodemailer = require('nodemailer');
var Trans = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
        user: 'rkravisunny@gmail.com', // my mail
        pass: 'Ravi@1993'
    }
}));

module.exports = Trans;