const express = require('express')
const validateRouter = express.Router();

const ClientError = require('../../../../logic/serverError/clientError');

const urlHandler = require('./url');
const bodyHandler = require('./body');

validateRouter.use((req, res, next) => {
    req.remarks = [];
    return next();
});

validateRouter.use(urlHandler);
validateRouter.use(bodyHandler);

validateRouter.use((req, res, next) => {
    if (req.remarks.length > 0) {
        throw new ClientError(req.remarks);
    }

    return next();
});

module.exports = validateRouter;