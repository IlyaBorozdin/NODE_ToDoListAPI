const taskDeleteHandler = require('../../requests/delete');

const deleteHandler = (req, res) => {
    req.query = { id: req.params.id };
    return taskDeleteHandler(req, res);
};

module.exports = deleteHandler;