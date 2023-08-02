const storage = require('../../../db/usedStorage');
const Selector = require('../../../logic/task/selector');
const logger = require('../../../middlewares/logger/logger');

const getHandler = (req, res) => {
    const conditions = new Selector(req.query);

    storage.connect()
        .then(() => {
            return storage.read(conditions.objProps);
        })
        .then(tasks => {
            logger.res(req, res);
            return res.status(200).json(tasks.map(task => task.objProps));
        })
        .catch(err => {
            throw err;
        });
};

module.exports = getHandler;