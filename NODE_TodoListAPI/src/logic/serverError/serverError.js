class ServerError extends Error {
    constructor(message, statusCode) {
        super(message || 'Internal Server Error');
        this._statusCode = statusCode || 500;
    }
    get statusCode() {
        return this._statusCode;
    }
    get errorResponse() {
        return {
            error: this.message,
            statusCode: this.statusCode
        };
    }
}

module.exports = ServerError;