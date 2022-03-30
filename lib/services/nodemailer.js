'use strict';

const { Service } = require('@hapipal/schmervice');
const Nodemailer = require('nodemailer');

module.exports = class MailService extends Service {

    transporter;

    constructor() {
        super();

        this.email_host = process.env.EMAIL_HOST || 'smtp.ethereal.email';
        this.email_port = process.env.EMAIL_PORT || 587;
        this.email_user = process.env.EMAIL_USER || 'zoey.lockman78@ethereal.email';
        this.email_pass = process.env.EMAIL_PASS || 'VwMU14bAptdcDt6wVW';
        this.email_name = process.env.EMAIL_NAME || 'Zoey Lockman';
        this.transporter = Nodemailer.createTransport({
            host: this.email_host,
            port: this.email_port,
            auth: {
                user: this.email_user,
                pass: this.email_pass
            }
        });
        
    }

    sendWelcomeMail(user) {
        const info = this.transporter.sendMail({
            from: '"'+ this.email_name +'" <'+this.email_user+'>', // sender address
            to: user.email, // list of receivers
            subject: 'Welcome', // Subject line
            text: 'Welcome ' + user.firstName + ' ' + user.lastName + '!', // plain text body
            html: '<b>Welcome ' + user.firstName + ' ' + user.lastName + '!</b>' // html body
        });

    }

    sendNewFilmMail(user, film) {
        const info = this.transporter.sendMail({
            from: '"'+ this.email_name +'" <'+this.email_user+'>',
            to: user.email,
            subject: 'New Film',
            text: 'New film ' + film.title + ' has been added!',
            html: '<b>New film ' + film.title + ' has been added!</b>'
        });
    }

    sendUpdatedFilmMail(user, film) {
        const info = this.transporter.sendMail({
            from: '"'+ this.email_name +'" <'+this.email_user+'>',
            to: user.email,
            subject: 'Updated Film',
            text: 'Film ' + film.title + ' has been updated!',
            html: '<b>Film ' + film.title + ' has been updated!</b>'
        });
    }

};