import { twilioConfig } from '../config/index.js';
import twilio from 'twilio';

function CreateToken(req, res, next) {
    const AccessToken = twilio.jwt.AccessToken;
    const ChatGrant = AccessToken.ChatGrant;

    const serviceSid = req.body.serviceSid;
    const username = req.body.username;

    if (req.session.token) {
        res.send({ token: req.session.token });
    }
    else if (username) {
        const token = new AccessToken(
            twilioConfig.accountSid,
            twilioConfig.apiKey,
            twilioConfig.apiSecret,
            { identity: username }
        );

        if (serviceSid) {
            const chatGrant = new ChatGrant({
                serviceSid: serviceSid,
            });

            token.addGrant(chatGrant);
        }

        req.session.token = token.toJwt();

        res.send({ token: req.session.token });
    } else {
        next({ message: 'Missing username' });
    }
}

function GetToken(req, res, next) {
    if (req.session.token) {
        res.send({ token: req.session.token });
    } else {
        next({ status: 400, message: 'Token not set' });
    }
}

export { CreateToken, GetToken };