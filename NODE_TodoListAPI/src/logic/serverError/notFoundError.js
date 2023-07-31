const ClientError = require('./clientError');
class NotFoundError extends ClientError {
    constructor(resource) {
        super(`The ${resource} was not found`, 'Visit \'localhost:1337/help\'', 404);
        this.name = this.constructor.name;
        this.resource = resource;
    }
}

module.exports = NotFoundError;