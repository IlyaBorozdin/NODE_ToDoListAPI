'use strict';

const express = require('express');

const logger = require('./src/middlewares/logger/logger');

const taskRouter = require('./src/routers/task/taskRouter');

const port = process.env.PORT || 1337;
const app = express();

app.use(express.json());
app.use((req, res, next) => {
    logger.req(req);
    return next();
});
app.use('/task', taskRouter);

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = server;
