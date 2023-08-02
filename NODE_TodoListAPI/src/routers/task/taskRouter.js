const express = require('express');
const taskRouter = express.Router();

const idRouter = require('./id/idRouter');

const getHandler = require('./requests/get');
const postHandler = require('./requests/post');
const putHandler = require('./requests/put');
const deleteHandler = require('./requests/delete');

const valisateRouter = require('./middlewares/validate/validate');
const errorHandler = require('./middlewares/error');

taskRouter.use(valisateRouter);
taskRouter.use('/:id([1-9][0-9]*)', idRouter);

taskRouter.get('/', getHandler);
taskRouter.post('/', postHandler);
taskRouter.put('/', putHandler);
taskRouter.delete('/', deleteHandler);

taskRouter.use(errorHandler);

module.exports = taskRouter;