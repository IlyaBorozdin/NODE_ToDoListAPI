class ServerError extends Error {
    constructor(message, statusCode) {
        super(message || 'Internal Server Error');
        this.name = this.constructor.name;
        this.statusCode = statusCode || 500;
    }
    get errorResponse() {
        const errorObj = { error: this.message };
        let currentPrototype = this;

        while (currentPrototype !== Error.prototype) {
            Object.assign(errorObj, currentPrototype);
            currentPrototype = Object.getPrototypeOf(currentPrototype);
        }

        errorObj.name = this.name;

        return errorObj;
    }
}

module.exports = ServerError;