'use strict';

const express = require('express');

const taskRouter = require('./src/routers/task/taskRouter');

const port = process.env.PORT || 1337;
const app = express();

app.use(express.json());
app.use('/task', taskRouter);

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = server;
