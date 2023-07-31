const { isValidBoolean, isValidNumber, isValidDate } = require('./validateFunc');

const validateUrlHandler = (req, res, next) => {
    const { id, since, until, deadline, completed } = req.query;
    const errors = [];

    if (id !== undefined && !isValidNumber(id)) {
        errors.push('ID must be a valid integer');
    }

    if (since !== undefined && !isValidDate(since)) {
        errors.push('Since must be a valid date');
    }

    if (until !== undefined && !isValidDate(until)) {
        errors.push('Until must be a valid date');
    }

    if (deadline !== undefined && !isValidDate(deadline)) {
        errors.push('Deadline must be a valid date');
    }

    if (completed !== undefined && !isValidBoolean(completed)) {
        errors.push('Completed must be a valid boolean');
    }

    if (errors.length > 0) {
        const message = errors.join('. ');
        console.log(`Parameters validation failed: ${message}\n`);
        return res.status(400).json({ error: message });
    }

    console.log('Parameters validation passed\n');
    next();
};

module.exports = validateUrlHandler;