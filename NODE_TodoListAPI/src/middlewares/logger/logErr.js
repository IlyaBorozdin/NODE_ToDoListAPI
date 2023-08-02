const logErr = err => {
    console.error('Error occurred:');
    console.error('Message:', err.message);
    console.error('Stack Trace:', err.stack);
    console.error('----------------------');
};

module.exports = logErr;