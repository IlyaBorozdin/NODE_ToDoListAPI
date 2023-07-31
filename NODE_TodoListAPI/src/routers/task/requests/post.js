const storage = require('../../../db/usedStorage');
const Task = require('../../../logic/task/task');

const postHandler = (req, res) => {
    const { title, deadline, completed } = req.body;
    const task = new Task(title, new Date(deadline), completed);

    console.log(`Request body: ${JSON.stringify(task.objectProperties, null, 2)}\n`);

    storage.connect()
        .then(() => {
            return storage.create(task.objectProperties);
        })
        .then(id => {
            console.log('POST request: OK\n');
            return res.status(201).json({ id: id });
        })
        .catch(err => {
            console.error('Error while processing POST request:\n', err);
            throw err;
        });
};

module.exports = postHandler;