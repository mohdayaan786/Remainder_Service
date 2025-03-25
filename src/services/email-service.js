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
        return response || [];  
    } catch (err) {
        console.error("Error fetching pending emails:", err);
        return [];
    }
};


const createNotification = async (data) => {
    try {
        const response = await Repo.create(data);
        return response;
    }
    catch (err) {
        console.log(err);
    }
}

const updateTicket = async (id, data) => {
    try {
        const response = await Repo.update(id, data);
        return response;
    }
    catch (err) {
        console.log(err);
    }
}

const subsrcribeEvents = async (paylaod) => {
    let service = paylaod.service;
    let data = paylaod.data;
    switch (service) {
        case 'sendBasicEmail':
            await sendBasicEmail(data.mailFrom, data.mailTo, data.mailSubject, data.mailBody);
            break;
        case 'fetchPendingEmails':
            await fetchPendingEmails();
            break;
        case 'createTicket':
            await createNotification(data);
            break;
        case 'updateTicket':
            await updateTicket(data.id, data);
            break;
        default:
            console.log('Invalid Service');
    }
}

module.exports = {
    sendBasicEmail,
    fetchPendingEmails,
    createNotification,
    updateTicket,
    subsrcribeEvents
};