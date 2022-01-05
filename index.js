import cors from 'cors';
import createError from 'http-errors';
import express, { json, urlencoded } from 'express';
import logger from 'morgan';
import session from 'express-session';
import store from 'connect-mongo';

import { corsClient, port, sessionDB } from './config/index.js';

import router from './routes/index.js';

var app = express();

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));

app.use(cors({
    origin: corsClient.domain,
    credentials: true,
    methods: ['GET', 'POST', 'DELETE'],
    maxAge: 3600 * 1000,
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
        maxAge: 3600 * 1000,
        sameSite: 'strict'
    },
    name: 'twilio.sid',
    resave: false,
    saveUninitialized: true
}));

app.use('/', router);

app.use(function (_req, _res, next) {
    next(createError(404, 'Route does not exist.'));
});

app.use(function (err, _req, res, _next) {
    res.status(err.status || 500).send(err);
});

app.listen(port);