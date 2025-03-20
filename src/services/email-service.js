const sender = require('../config/emailConfig');
const TicketRepository = require('../repository/ticket-repository');
const Repo = new TicketRepository();

const sendBasicEmail = async (mailFrom, mailTo, mailSubject, mailBody) => {
    return new Promise((resolve, reject) => {
        sender.sendMail({
            from: mailFrom,
            to: mailTo,
            subject: mailSubject,
            text: mailBody
        }, (err, info) => {
            if (err) {
                console.error("Error sending email:", err);
                reject(err);
            } else {
                console.log("Email sent successfully:", info.response);
                resolve(info);
                console.log(info);
            }
        });
    });
};


const fetchPendingEmails = async () => {
    try {
        const response = await Repo.get({ status: "pending" });
        return response || [];  // Ensuring it always returns an array
    } catch (err) {
        console.error("Error fetching pending emails:", err);
        return [];
    }
};


const createNotification = async (data) => {
    try{
        const response = await Repo.create(data);
        return response;
    }
    catch(err){
        console.log(err);
    }
}

const updateTicket = async(id, data) => {
    try{
        const response = await Repo.update(id,data);
        return response;
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {
    sendBasicEmail,
    fetchPendingEmails,
    createNotification,
    updateTicket
};