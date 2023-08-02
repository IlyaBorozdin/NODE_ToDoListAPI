const logRes = (req, res) => {
    console.log('Response sent:');
    console.log('Response sent at:', new Date().toLocaleString());
    console.log('Processing time:', Date.now() - req.startTime + ' ms');

    console.log('Status:', res.statusCode);
    console.log(`Headers  ${JSON.stringify(res.getHeaders(), null, 4)}`);
    console.log('----------------------');
};

module.exports = logRes;