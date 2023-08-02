const storage = require('../../../db/usedStorage');

const Task = require('../../../logic/task/task');
const Selector = require('../../../logic/task/selector');

const logger = require('../../../middlewares/logger/logger');

const putHandler = (req, res) => {
    const conditions = new Selector(req.query);

    //console.log(`Request parametrs: ${JSON.stringify(conditions.objProps, null, 2)}\n`);

    const task = new Task(req.body);

    //console.log(`Request body: ${JSON.stringify(task.objProps, null, 2)}\n`);

    storage.connect()
        .then(() => {
            return storage.update(task.objProps, conditions.objProps);
        })
        .then(() => {
            //console.log('PUT request: OK\n');
            logger.res(req, res);
            return res.status(204).end();
        })
        .catch(err => {
            //console.error('Error while processing PUT request:\n', err);
            throw err;
        });
};

module.exports = putHandler;