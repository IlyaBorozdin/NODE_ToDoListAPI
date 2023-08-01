const storage = require('../../../db/usedStorage');
const Selector = require('../../../logic/task/selector');

const getHandler = (req, res) => {
    const conditions = new Selector(req.query);

    console.log(`Request parametrs: ${JSON.stringify(conditions.objProps, null, 2)}\n`);

    storage.connect()
        .then(() => {
            return storage.read({}, conditions.objProps);
        })
        .then(tasks => {
            console.log('GET request: OK\n');
            return res.status(200).json(tasks.map(task => task.objProps));
        })
        .catch(err => {
            console.error('Error while processing GET request:\n', err);
            throw err;
        });
};

module.exports = getHandler;