const storage = require('../../../db/usedStorage');

const Task = require('../../../logic/task/task');
const Selector = require('../../../logic/task/selector');

const logger = require('../../../middlewares/logger/logger');

const putHandler = (req, res) => {
    const conditions = new Selector(req.query);
    const task = new Task(req.body);

    storage.connect()
        .then(() => {
            return storage.update(task.objProps, conditions.objProps);
        })
        .then(() => {
            logger.res(req, res);
            return res.status(204).end();
        })
        .catch(err => {
            throw err;
        });
};

module.exports = putHandler;