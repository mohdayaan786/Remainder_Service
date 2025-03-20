const cron = require('node-cron');
const emailService = require('../services/email-service');
const sender = require('../config/emailConfig');

const setUpJobs = () => {
    cron.schedule('*/2 * * * *', async () => {
        try {
            const pendingEmails = await emailService.fetchPendingEmails();
            if (pendingEmails.length === 0) {
                console.log("No pending emails to send.");
                return;
            }

            for (const email of pendingEmails) {
                try {
                    const info = await sender.sendMail({
                        from: '"Support Team" <support@admin.com>',
                        to: email.recepientEmail,
                        subject: email.subject,
                        text: email.content
                    });

                    console.log(`Email sent to ${email.recepientEmail}:`, info.response);
                    await emailService.updateTicket(email.id, { status: "success" });

                } catch (error) {
                    console.error(`Error sending email to ${email.recepientEmail}:`, error);
                    await emailService.updateTicket(email.id, { status: "failed" });
                }
            }

            console.log("Email job execution completed.");

        } catch (error) {
            console.error("Error in cron job:", error);
        }
    });
};

module.exports = setUpJobs;
