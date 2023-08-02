const storage = require('../../../db/usedStorage');
const Selector = require('../../../logic/task/selector');
const logger = require('../../../middlewares/logger/logger');

const deleteHandler = (req, res) => {
    const conditions = new Selector(req.query);

    storage.connect()
        .then(() => {
            return storage.delete(conditions.objProps)
        })
        .then(() => {
            logger.res(req, res);
            return res.status(204).end();
        })
        .catch(err => {
            throw err;
        });
};

module.exports = deleteHandler;