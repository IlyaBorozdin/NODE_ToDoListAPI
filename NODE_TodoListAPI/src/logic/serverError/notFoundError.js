const ServerError = require("./serverError")
class NotFoundError extends ServerError {
    constructor() {
        super(
            'Resource Not Found',
            'Oops! The resource you are looking for could not be found. Please make sure you\'ve entered the correct URL or try again later.',
            'The requested resource could not be found. This could be due to an incorrect URL or a missing record in the database. Double-check the URL path and the database records.',
            404
        );
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = NotFoundError;