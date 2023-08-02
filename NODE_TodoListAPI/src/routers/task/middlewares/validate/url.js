const UrlValidation = require('./logic/urlValidation');

const urlHandler = (req, res, next) => {
    const { id, since, until, deadline, completed } = req.query;
    const remarks = req.remarks;

    if (!UrlValidation.isNum(id)) {
        remarks.push('Invalid id provided in query parameters.');
    }

    if (!UrlValidation.isDate(since)) {
        remarks.push('Invalid "since" date format in query parameters. Use YYYY-MM-DD.');
    }

    if (!UrlValidation.isDate(until)) {
        remarks.push('Invalid "until" date format in query parameters. Use YYYY-MM-DD.');
    }

    if (!UrlValidation.isDate(deadline)) {
        remarks.push('Invalid "deadline" date format in query parameters. Use YYYY-MM-DD.');
    }

    if (!UrlValidation.isBool(completed)) {
        remarks.push('Invalid "completed" value in query parameters. Use "true" or "false".');
    }

    return next();
};

module.exports = urlHandler;