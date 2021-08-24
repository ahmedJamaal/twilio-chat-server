import { twilioConfig } from '../config/index.js';
import twilio from 'twilio';

function CreateToken(req, res, next) {
    const AccessToken = twilio.jwt.AccessToken;
    const ChatGrant = AccessToken.ChatGrant;

    const serviceSid = req.body.serviceSid;
    const email = req.body.email;

    if (email && serviceSid) {
        const chatGrant = new ChatGrant({
            serviceSid: serviceSid,
        });

        const token = new AccessToken(
            twilioConfig.accountSid,
            twilioConfig.apiKey,
            twilioConfig.apiSecret,
            { identity: email }
        );

        token.addGrant(chatGrant);

        req.session.token = token.toJwt();

        res.send(token);
    } else {
        next({ message: 'Missing email or service SID' });
    }
}

function GetToken(req, res, next) {
    if (req.session.token) {
        res.send(req.session.token);
    } else {
        next({ status: 400, message: 'Token not set' });
    }
}

export { CreateToken, GetToken };