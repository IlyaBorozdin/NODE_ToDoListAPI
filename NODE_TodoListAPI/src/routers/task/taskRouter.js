const express = require('express');
const taskRouter = express.Router();

const idRouter = require('./id/idRouter');

const getHandler = require('./requests/get');
const postHandler = require('./requests/post');
const putHandler = require('./requests/put');
const deleteHandler = require('./requests/delete');

const validateUrlHandler = require('./middlewares/validateUrl');
const validateBodyHandler = require('./middlewares/validateBody');
const errorHandler = require('./middlewares/error');

taskRouter.use(validateUrlHandler);
taskRouter.use(validateBodyHandler);

taskRouter.use('/:id', idRouter);

taskRouter.get('/', getHandler);
taskRouter.post('/', postHandler);
taskRouter.put('/', putHandler);
taskRouter.delete('/', deleteHandler);

taskRouter.use(errorHandler);

module.exports = taskRouter;