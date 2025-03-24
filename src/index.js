const express = require('express');
const bodyParser = require('body-parser');

const { port } = require('./config/serverConfig');
//const {sendBasicEmail} = require('./services/email-service');
const setUpJobs = require('./utils/job');
const TicketController = require('./controllers/ticket-controller');
const {createChannel, subscribeMessage} = require('./utils/message-queue');
const { REMAINDER_BINDING_KEY } = require('./config/serverConfig');
const EmailService = require('./services/email-service');

const setupAndStartServer = async () => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    
    app.post('/api/v1/tickets', TicketController.create);
    const channel = await createChannel();
    subscribeMessage(channel, EmailService.subsrcribeEvents, REMAINDER_BINDING_KEY);

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
        setUpJobs();
        // sendBasicEmail(
        //     '"Support Team" <support@admin.com>',
        //     'mohdamaan069@gmail.com',
        //     'Test Email',
        //     'Hello World!'
        // );
        
    });
}

setupAndStartServer();