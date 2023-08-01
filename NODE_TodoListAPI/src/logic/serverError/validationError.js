const ServerError = require("./serverError");

class ValidationError extends ServerError {
    constructor() {
        super('Invalid parameters sent', 400);
        this._remarks = [];
    }
    get remarks() {
        return this._remarks;
    }
    get length() {
        return this._remarks.length;
    }

    push(message) {
        this._remarks.push(message);
    }
    get errorResponse() {
        return Object.assign({}, super.errorResponse, {
            remarks: this.remarks
        });
    }
}

module.exports = ValidationError;