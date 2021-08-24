import { twilioConfig } from '../config/index.js';
import twilio from 'twilio';

async function StartConversation(req, res, next) {
    const client = twilio(twilioConfig.accountSid, twilioConfig.authToken);
    const conversationTitle = req.body.conversationTitle;

    const conversation = await client.conversations.conversations
        .create({ friendlyName: conversationTitle });

    res.send(conversation);
}

export { StartConversation };