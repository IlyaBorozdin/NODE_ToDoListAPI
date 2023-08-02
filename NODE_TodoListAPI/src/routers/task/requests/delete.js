const storage = require('../../../db/usedStorage');
const Selector = require('../../../logic/task/selector');

const logger = require('../../../middlewares/logger/logger');

const deleteHandler = (req, res) => {
    const conditions = new Selector(req.query);

    //console.log(`Request parametrs: ${JSON.stringify(conditions.objProps, null, 2)}\n`);

    storage.connect()
        .then(() => {
            return storage.delete(conditions.objProps)
        })
        .then(() => {
            //console.log('DELETE request: OK\n');
            logger.res(req, res);
            return res.status(204).end();
        })
        .catch(err => {
            //console.error('Error while processing DELETE request:\n', err);
            throw err;
        });
};

module.exports = deleteHandler;