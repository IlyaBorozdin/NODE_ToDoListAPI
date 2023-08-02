class ServerError extends Error {
    constructor(message, userMessage, developerMessage, statusCode) {
        super(message || 'Internal Server Error');
        this._statusCode = statusCode || 500;
        this._userMessage = userMessage || 'We\'re sorry, but something went wrong while processing your request.Our technical team has been notified and is working to resolve the issue.Please try again later.';
        this._developerMessage = developerMessage || 'An unexpected internal server error occurred. The issue has been logged for investigation. This error is not related to a specific database operation.';
    }
    get userMessage() {
        return this._userMessage;
    }
    get developerMessage() {
        return this._developerMessage;
    }
    get statusCode() {
        return this._statusCode;
    }
    get objError() {
        return {
            message: this.message,
            userMessage: this.userMessage,
            developerMessage: this.developerMessage,
            statusCode: this.statusCode
        };
    }
}

module.exports = ServerError;