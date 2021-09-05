import { twilioConfig } from '../config/index.js';
import twilio from 'twilio';

function createToken(username, serviceSid) {
    const AccessToken = twilio.jwt.AccessToken;
    const ChatGrant = AccessToken.ChatGrant;

    const token = new AccessToken(
        twilioConfig.accountSid,
        twilioConfig.apiKey,
        twilioConfig.apiSecret,
        { identity: username }
    );

    const chatGrant = new ChatGrant({
        serviceSid: serviceSid,
    });

    token.addGrant(chatGrant);

    return token.toJwt();
}

export { createToken };