const sender = require('../config/emailConfig');

const sendBasicEmail = async (mailFrom, mailtTo, mailSubject, mailBody) => {
        sender.sendMail({
            from: mailFrom,
            to: mailtTo,
            subject: mailSubject,
            text: mailBody
        }, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log(info);
            }
        });
}

module.exports = {
    sendBasicEmail
};