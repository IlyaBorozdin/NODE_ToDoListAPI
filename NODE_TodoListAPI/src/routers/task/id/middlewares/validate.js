const storage = require('../../../../db/usedStorage');
const Selector = require('../../../../logic/task/selector');

const validateHandler = (req, res, next) => {
    const idSelector = new Selector(req.params);

    console.log(`Request parametrs: ${JSON.stringify(idSelector.objProps, null, 2)}\n`);

    storage.connect()
        .then(() => {
            return storage.read(idSelector.objProps);
        })
        .then(([task]) => {
            if (task === undefined) {
                console.log(`Validation in /task/:id failed: task not found\n`);
                return res.status(404).json({ error: 'Task not Found' });
            }
            req.task = task.objProps;
            console.log(`Validation in /task/:id passed\n`);
            return next();
        })
        .catch(err => {
            console.error('Error while validation in /task/:id:\n', err);
            throw err;
        });
};

module.exports = validateHandler;