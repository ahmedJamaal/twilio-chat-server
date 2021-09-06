import { twilioConfig } from '../config/index.js';
import { createToken } from '../utils/token.js';
import twilio from 'twilio';

async function StartConversation(req, res, next) {
    const client = twilio(twilioConfig.accountSid, twilioConfig.authToken);

    const conversationTitle = req.body.conversationTitle;
    const username = req.body.username;

    try {
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
    catch (error) {
        next({ error, message: 'There was a problem creating your conversation' });
    }
}

async function AddParticipant(req, res, next) {
    const client = twilio(twilioConfig.accountSid, twilioConfig.authToken);

    const username = req.body.username;
    const conversationSid = req.params.id;

    try {
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
    } catch (error) {
        next({ error, message: 'There was a problem adding a participant' });
    }
}

export { AddParticipant, StartConversation };