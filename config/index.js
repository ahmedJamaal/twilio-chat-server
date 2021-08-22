import dotenv from 'dotenv';

if (process.env.NODE_ENV == 'development') {
    dotenv.config();
}

const sessionDB = {
    host: process.env.SESSION_DB_HOST,
    user: process.env.SESSION_DB_USER,
    pass: process.env.SESSION_DB_PASS,
    port: process.env.SESSION_DB_PORT,
    name: process.env.SESSION_DB_NAME,
    secret: process.env.SESSION_DB_SECRET
};

const twilioConfig = {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    apiKey: process.env.TWILIO_API_KEY,
    apiSecret: process.env.TWILIO_API_SECRET
};

export { sessionDB, twilioConfig };