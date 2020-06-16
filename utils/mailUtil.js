let nodemailer = require('nodemailer');

class MailUtil{
    static async sendMail(to,subject,content){
        let mailOptions = {
            from: 'vaibhav.verma2697@gmail.com',
            to: to,
            subject: subject,
            html: content
        };

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'vaibhav.verma2697@gmail.com',
                pass: ''
            }
        });

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}

module.exports = MailUtil;