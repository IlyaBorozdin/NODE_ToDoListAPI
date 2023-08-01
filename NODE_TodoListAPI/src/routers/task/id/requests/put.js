const taskPutHandler = require('../../requests/put');

const putHandler = (req, res) => {
    if (!req.task.completed) {
        req.query = { id: req.params.id };
        req.body = { completed: true };
        return taskPutHandler(req, res);
    }
    console.log('PUT request: OK\n');
    return res.status(204).end();
};

module.exports = putHandler;