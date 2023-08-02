const storage = require('../../../db/usedStorage');
const Task = require('../../../logic/task/task');

const logger = require('../../../middlewares/logger/logger');

const postHandler = (req, res) => {
    const task = new Task(req.body);

    storage.connect()
        .then(() => {
            return storage.create(task.objProps);
        })
        .then(id => {
            logger.res(req, res);
            return res.status(201).json({ id: id });
        })
        .catch(err => {
            throw err;
        });
};

module.exports = postHandler;