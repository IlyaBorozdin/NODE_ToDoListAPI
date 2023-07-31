const express = require('express');
const taskRouter = express.Router();

const getHandler = require('./get');
const validateHandler = require('./validate');
const errorHandler = require('./error');

taskRouter.use(validateHandler);
taskRouter.get('/', getHandler);
taskRouter.use(errorHandler);

module.exports = taskRouter;