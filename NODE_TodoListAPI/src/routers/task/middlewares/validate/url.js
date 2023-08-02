const UrlValidation = require('./func/urlValidation');

const urlHandler = (req, res, next) => {
    const { id, since, until, deadline, completed } = req.query;

    console.log(`Request parametrs: ${JSON.stringify(req.query, null, 2)}\n`);

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

    if (remarks.length > 0) {
        console.log('Parameters validation in /task failed\n');
    } else {
        console.log('Parameters validation in /task passed\n');
    }

    return next();
};

module.exports = urlHandler;