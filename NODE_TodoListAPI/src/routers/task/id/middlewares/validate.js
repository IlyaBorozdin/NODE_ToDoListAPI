const storage = require('../../../../db/usedStorage');
const NotFoundError = require('../../../../logic/serverError/notFoundError');
const Selector = require('../../../../logic/task/selector');

const validateHandler = (req, res, next) => {
    const idSelector = new Selector(req.params);

    storage.connect()
        .then(() => {
            return storage.read(idSelector.objProps);
        })
        .then(([task]) => {
            if (task === undefined) {
                throw new NotFoundError();
            }
            req.task = task.objProps;
            return next();
        })
        .catch(err => {
            throw err;
        });
};

module.exports = validateHandler;