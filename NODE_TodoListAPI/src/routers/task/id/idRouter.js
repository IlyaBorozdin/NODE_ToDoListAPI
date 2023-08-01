const express = require('express');
const idRouter = express.Router({ mergeParams: true });

const getHandler = require('./requests/get');
const putHandler = require('./requests/put');
const deleteHandler = require('./requests/delete');

const validateHandler = require('./middlewares/validate');

idRouter.use(validateHandler);

idRouter.get('/', getHandler);
idRouter.put('/', putHandler);
idRouter.delete('/', deleteHandler);

module.exports = idRouter;