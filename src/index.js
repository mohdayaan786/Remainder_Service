const express = require('express');
const bodyParser = require('body-parser');

const { port } = require('./config/serverConfig');
//const {sendBasicEmail} = require('./services/email-service');
const setUpJobs = require('./utils/job');
const TicketController = require('./controllers/ticket-controller');

const setupAndStartServer = async () => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.post('/api/v1/tickets', TicketController.create);

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