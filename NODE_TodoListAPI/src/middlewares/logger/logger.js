const logReq = require('./logReq');
const logRes = require('./logRes');
const logErr = require('./logErr');

module.exports = {
    req: logReq,
    res: logRes,
    err: logErr
};