const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    port: process.env.PORT,
    EMAIL_ID : process.env.EMAIL_ID,
    EMAIL_PASS : process.env.EMAIL_PASS
};
