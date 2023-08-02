const storage = require('../../../../db/usedStorage');
const ServerError = require('../../../../logic/serverError/serverError');
const Selector = require('../../../../logic/task/selector');

const validateHandler = (req, res, next) => {
    const idSelector = new Selector(req.params);

    //console.log(`Request parametrs: ${JSON.stringify(idSelector.objProps, null, 2)}\n`);

    storage.connect()
        .then(() => {
            return storage.read(idSelector.objProps);
        })
        .then(([task]) => {
            if (task === undefined) {
                //console.log(`Validation in /task/:id failed: task not found\n`);
                throw new ServerError(
                    'Resource Not Found',
                    'Oops! The resource you are looking for could not be found. Please make sure you\'ve entered the correct URL or try again later.',
                    'The requested resource could not be found. This could be due to an incorrect URL or a missing record in the database. Double-check the URL path and the database records.',
                    404
                );
            }
            req.task = task.objProps;
            //console.log(`Validation in /task/:id passed\n`);
            return next();
        })
        .catch(err => {
            //console.error('Error while validation in /task/:id:\n', err);
            throw err;
        });
};

module.exports = validateHandler;