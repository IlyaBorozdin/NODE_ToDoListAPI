const ServerError = require("./serverError");

class ValidationError extends ServerError {
    constructor(remarks) {
        super('Invalid parameters sent', 400);
        this._remarks = remarks;
    }
    get remarks() {
        return this._remarks;
    }
    get errorResponse() {
        return Object.assign({}, super.errorResponse, {
            remarks: this.remarks
        });
    }
}

module.exports = ValidationError;