const { isValidBoolean, isValidDate } = require('./validateFunc');

const validateBodyHandler = (req, res, next) => {
    if (!Object.keys(req.body).length) {
        return next();
    }

    const { deadline, completed } = req.body;
    const errors = [];

    if (deadline !== undefined && !isValidDate(deadline)) {
        errors.push('Deadline must be a valid date');
    }

    if (completed !== undefined && !isValidBoolean(completed)) {
        errors.push('Completed must be a valid boolean');
    }

    if (errors.length > 0) {
        const message = errors.join('. ');
        console.log(`Body validation failed: ${message}\n`);
        return res.status(400).json({ error: message });
    }

    console.log('Body validation passed\n');
    next();
};

module.exports = validateBodyHandler;