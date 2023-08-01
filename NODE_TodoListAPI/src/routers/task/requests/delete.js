const storage = require('../../../db/usedStorage');
const Selector = require('../../../logic/task/selector');

const deleteHandler = (req, res) => {
    const conditions = new Selector(req.query);

    console.log(`Request parametrs: ${JSON.stringify(conditions.objProps, null, 2)}\n`);

    storage.connect()
        .then(() => {
            return storage.delete(conditions.objProps)
        })
        .then(affectedRows => {
            console.log('DELETE request: OK\n');
            return res.status(200).json({ affectedRows: affectedRows });
        })
        .catch(err => {
            console.error('Error while processing DELETE request:\n', err);
            throw err;
        });
};

module.exports = deleteHandler;