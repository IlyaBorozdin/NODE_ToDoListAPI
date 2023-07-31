const storage = require('../../../db/usedStorage');
const Task = require('../../../logic/task/task');

const putHandler = (req, res) => {
    console.log(`Request parametrs: ${JSON.stringify(req.query, null, 2)}\n`);

    const conditions = {
        id: req.query.id,
        title: req.query.title,
        titleReg: req.query.titleReg,
        since: req.query.since,
        until: req.query.until,
        deadline: req.query.deadline,
        completed: req.query.completed
    };

    const { title, deadline, completed } = req.body;
    console.log(title, deadline, completed);
    const task = new Task(title, new Date(deadline), completed);

    console.log(`Request body: ${JSON.stringify(task.objectProperties, null, 2)}\n`);

    storage.connect()
        .then(() => {
            return storage.update(task.objectProperties, conditions);
        })
        .then(affectedRows => {
            console.log('UPDATE request: OK\n');
            return res.status(201).json({ affectedRows: affectedRows });
        })
        .catch(err => {
            console.error('Error while processing UDPATE request:\n', err);
            throw err;
        });
};

module.exports = putHandler;