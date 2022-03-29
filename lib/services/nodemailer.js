'use strict';

const { Service } = require('@hapipal/schmervice');
const Nodemailer = require('nodemailer');

module.exports = class MailService extends Service {

    transporter;

    constructor() {
        super();
        this.transporter = Nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'zoey.lockman78@ethereal.email',
                pass: 'VwMU14bAptdcDt6wVW'
            }
        });
    }

    sendWelcomeMail(user) {
        const info = this.transporter.sendMail({
            from: '"Zoey Lockman" <zoey.lockman78@ethereal.email>', // sender address
            to: user.email, // list of receivers
            subject: 'Welcome', // Subject line
            text: 'Welcome ' + user.firstName + ' ' + user.lastName + '!', // plain text body
            html: '<b>Welcome ' + user.firstName + ' ' + user.lastName + '!</b>' // html body
        });

    }

};