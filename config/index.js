import dotenv from 'dotenv';

dotenv.config();

const corsClient = {
    domain: process.env.CORS_CLIENT_DOMAIN
};

const twilioConfig = {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    apiKey: process.env.TWILIO_API_KEY,
    apiSecret: process.env.TWILIO_API_SECRET
};

const port = process.env.PORT || '8000';

export { corsClient, port, twilioConfig };