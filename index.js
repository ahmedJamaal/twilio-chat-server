import createError from 'http-errors';
import express, { json, urlencoded } from 'express';
import logger from 'morgan';
import session from 'express-session';
import store from 'connect-mongo';
import cors from 'cors';

import { client, sessionDB } from './config/index.js';
import authRouter from './routes/auth.js';
import apiRouter from './routes/index.js';

var app = express();

app.set('query parser', 'simple');
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));

app.use(cors({
    origin: client.domain,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    maxAge: 2 * 60 * 60 * 1000,
    allowedHeaders: ['Content-Type', 'Range'],
    exposedHeaders: ['Accept-Ranges', 'Content-Encoding', 'Content-Length', 'Content-Range']
}));
app.options('*', cors());

app.use(session({
    store: store.create({
        mongoUrl: `mongodb://${sessionDB.user}:${sessionDB.pass}@${sessionDB.host}:${sessionDB.port}/${sessionDB.name}`,
        mongoOptions: { useUnifiedTopology: true },
        collectionName: 'sessions'
    }),
    secret: sessionDB.secret,
    cookie: {
        maxAge: 2 * 60 * 60 * 1000
    },
    name: 'twilio.sid',
    resave: false,
    saveUninitialized: true
}));

app.use('/auth', authRouter);
app.use('/api', apiRouter);

app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500).send(err);
});

app.listen(3001);