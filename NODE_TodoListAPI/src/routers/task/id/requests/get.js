const logger = require('../../../../middlewares/logger/logger');

const getHandler = (req, res) => {
    //console.log('GET request: OK\n');
    logger.res(req, res);
    return res.status(200).json(req.task);
};

module.exports = getHandler;