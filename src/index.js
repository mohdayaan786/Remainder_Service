const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const { port } = require('./config/serverConfig');
const {sendBasicEmail} = require('./services/email-service');

const setupAndStartServer = async () => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
        // sendBasicEmail(
        //     '"Support Team" <support@admin.com>',
        //     'mohdamaan069@gmail.com',
        //     'Test Email',
        //     'Hello World!'
        // );
        cron.schedule('*/2 * * * *', () => {
            console.log('running a task every two minutes');
          });
    });
}

setupAndStartServer();