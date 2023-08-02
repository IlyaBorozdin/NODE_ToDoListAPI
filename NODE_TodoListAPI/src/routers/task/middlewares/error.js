const ServerError = require('../../../logic/serverError/serverError');

const errorHandler = (err, req, res, next) => {
    const resError = err instanceof ServerError ? err.objError : (new ServerError()).objError;

    console.log(`Server error: ${JSON.stringify(resError, null, 2)}\n`);
    return res.status(resError.statusCode).json(resError);
};

module.exports = errorHandler;