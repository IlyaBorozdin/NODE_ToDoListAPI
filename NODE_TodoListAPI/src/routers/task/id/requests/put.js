const taskPutHandler = require('../../requests/put');
const logger = require('../../../../middlewares/logger/logger');

const putHandler = (req, res) => {
    if (!req.task.completed) {
        req.query = { id: req.params.id };
        req.body = { completed: true };
        return taskPutHandler(req, res);
    }
    logger.res(req, res);
    return res.status(204).end();
};

module.exports = putHandler;