const logReq = req => {
    console.log('Request received:');
    console.log('Request received at:', new Date().toLocaleString());
    console.log('HTTP Version:', req.httpVersion);
    console.log('Client IP:', req.ip);

    console.log('Method:', req.method);
    console.log('URL:', req.originalUrl);

    console.log(`Headers  ${JSON.stringify(req.headers, null, 4)}`);
    console.log(`Query Parameters ${JSON.stringify(req.query, null, 4)}`);
    console.log(`Route parameters ${JSON.stringify(req.params, null, 4)}`);
    console.log(`Body ${JSON.stringify(req.body, null, 4)}`);
    console.log('----------------------');

    req.startTime = Date.now();
};

module.exports = logReq;