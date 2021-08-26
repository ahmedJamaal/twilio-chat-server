import { twilioConfig } from '../config/index.js';
import { createToken } from '../helpers/auth.js';
import twilio from 'twilio';

async function StartConversation(req, res, next) {
    const client = twilio(twilioConfig.accountSid, twilioConfig.authToken);

    const conversationTitle = req.body.conversationTitle;
    const username = req.body.username;

    if (conversationTitle && username) {
        const conversation = await client.conversations.conversations
            .create({ friendlyName: conversationTitle });

        req.session.token = createToken(username, conversation.chatServiceSid);
        req.session.username = username;

        const participant = await client.conversations.conversations(conversation.sid)
            .participants.create({ identity: username })

        res.send({ conversation, participant });
    } else {
        next({ message: 'Missing conversation title or username' });
    }
}

async function AddParticipant(req, res, next) {
    const client = twilio(twilioConfig.accountSid, twilioConfig.authToken);

    const username = req.body.username;
    const conversationSid = req.params.id;

    const conversation = await client.conversations.conversations
        .get(conversationSid).fetch();

    if (username && conversationSid) {
        req.session.token = createToken(username, conversation.chatServiceSid);
        req.session.username = username;

        const participant = await client.conversations.conversations(conversationSid)
            .participants.create({ identity: username })

        res.send({ conversation, participant });
    } else {
        next({ message: 'Missing username or conversation Sid' });
    }
}

export { AddParticipant, StartConversation };