function isValidBoolean(value) {
    return value === '0' || value === '1';
}
function isValidNumber(value) {
    return !isNaN(value) && Number.isInteger(Number(value));
}
function isValidDate(value) {
    const date = new Date(value);
    return date instanceof Date && !isNaN(date.getTime());
}

module.exports = {
    isValidBoolean,
    isValidNumber,
    isValidDate
};