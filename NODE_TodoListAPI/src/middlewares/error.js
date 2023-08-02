const ServerError = require('../logic/serverError/serverError');

const logger = require('./logger/logger');

const errorHandler = (err, req, res, next) => {
    const resError = err instanceof ServerError ? err.objError : (new ServerError()).objError;

    logger.err(err);
    logger.res(req, res);
    return res.status(resError.statusCode).json(resError);
};

module.exports = errorHandler;