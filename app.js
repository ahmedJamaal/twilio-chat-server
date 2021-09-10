import createError from 'http-errors';
import express, { json, urlencoded } from 'express';
import logger from 'morgan';

import { port } from './config/index.js';

import router from './routes/index.js';

var app = express();

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));

app.use('/', router);

app.use(function (_req, _res, next) {
    next(createError(404, 'Route does not exist.'));
});

app.use(function (err, _req, res, _next) {
    res.status(err.status || 500).send(err);
});

app.listen(port);