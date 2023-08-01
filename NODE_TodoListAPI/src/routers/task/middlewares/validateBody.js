const BodyValidation = require('./validation/bodyValidation');

const validateBodyHandler = (req, res, next) => {
    if (!Object.keys(req.body).length) {
        return next();
    }

    const { deadline, completed } = req.body;
    const errors = [];

    if (!BodyValidation.isDate(deadline)) {
        errors.push('Deadline must be a valid date');
    }

    if (!BodyValidation.isBool(completed)) {
        errors.push('Completed must be a valid boolean');
    }

    if (errors.length > 0) {
        const message = errors.join('. ');
        console.log(`Body validation in /task failed: ${message}\n`);
        return res.status(400).json({ error: message });
    }

    console.log('Body validation in /task passed\n');
    next();
};

module.exports = validateBodyHandler;