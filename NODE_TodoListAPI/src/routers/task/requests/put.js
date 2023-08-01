const storage = require('../../../db/usedStorage');
const Task = require('../../../logic/task/task');
const Selector = require('../../../logic/task/selector');

const putHandler = (req, res) => {
    const conditions = new Selector(req.query);

    console.log(`Request parametrs: ${JSON.stringify(conditions.objProps, null, 2)}\n`);

    const task = new Task(req.body);

    console.log(`Request body: ${JSON.stringify(task.objProps, null, 2)}\n`);

    storage.connect()
        .then(() => {
            return storage.update(task.objProps, conditions.objProps);
        })
        .then(affectedRows => {
            console.log('UPDATE request: OK\n');
            return res.status(200).json({ affectedRows: affectedRows });
        })
        .catch(err => {
            console.error('Error while processing UDPATE request:\n', err);
            throw err;
        });
};

module.exports = putHandler;