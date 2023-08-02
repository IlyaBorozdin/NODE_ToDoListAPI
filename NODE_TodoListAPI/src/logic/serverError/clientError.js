const ServerError = require("./serverError")

class ClientError extends ServerError {
    constructor(suggestions, statusCode) {
        super('Client Error',
            `Your request could not be processed due to validation errors. Please review the following suggestions and correct your input. ${suggestions.join(' ')}`,
            `Client validation error: Your request contained validation errors. Please review the following suggestions and guide the user to correct their input. ${suggestions.join(' ')}`,
            statusCode || 400
        );
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ClientError;