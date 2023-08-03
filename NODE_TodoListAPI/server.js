'use strict';

const express = require('express');
const cors = require('cors');
const errorHandler = require('./src/middlewares/error');
const headersHandler = require('./src/middlewares/headers');
const logger = require('./src/middlewares/logger/logger');
const localhostRouter = require('./src/routers/localhost/localhostRouter');
const taskRouter = require('./src/routers/task/taskRouter');
const NotFoundError = require('./src/logic/serverError/notFoundError');

const port = process.env.PORT || 1337;
const app = express();

app.use(cors());
app.use(express.json());
app.use(headersHandler);
app.use((req, res, next) => {
    logger.req(req);
    return next();
});
app.use('/', localhostRouter);
app.use('/task', taskRouter);
app.use(() => {
    throw new NotFoundError();
});
app.use(errorHandler);

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = server;
