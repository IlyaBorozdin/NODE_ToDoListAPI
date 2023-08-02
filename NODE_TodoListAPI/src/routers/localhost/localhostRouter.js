const express = require('express');
const getHandler = require('./get');
const localhostRouter = express.Router();

localhostRouter.get('/', getHandler);

module.exports = localhostRouter;