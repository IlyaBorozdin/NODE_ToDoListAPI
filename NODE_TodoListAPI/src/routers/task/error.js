const ServerError = require('../../logic/serverError/serverError');

const errorHandler = (err, req, res, next) => {
    if (err instanceof ServerError) {
        console.log(`Server error: ${JSON.stringify(err.errorResponse, null, 2)}\n`);
        return res.status(err.statusCode).json(err.errorResponse);
    }

    console.log('Server Internal Error', err);
    return res.status(500).json({ error: 'Server Internal Error' });
};

module.exports = errorHandler;