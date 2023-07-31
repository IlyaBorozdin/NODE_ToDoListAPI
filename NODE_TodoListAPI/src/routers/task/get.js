const storage = require('../../db/usedStorage');

const getHandler = (req, res) => {
    console.log(`Request parametrs: ${JSON.stringify(req.query, null, 2)}\n`);

    const conditions = {
        title: req.query.title,
        titleReg: req.query.titleReg,
        since: req.query.since,
        until: req.query.until,
        deadline: req.query.deadline,
        completed: req.query.completed
    };

    storage.connect()
        .then(() => {
            return storage.read({}, conditions);
        })
        .then(tasks => {
            console.log('GET request: OK\n');
            return res.status(200).json(tasks.map(task => task.objectProperties));
        })
        .catch(err => {
            console.error('Error while processing GET request:', err);
            throw err;
        });
};

module.exports = getHandler;