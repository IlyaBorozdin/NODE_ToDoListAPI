const api = (url, method, body) => {
    method = method.toUpperCase();
    const options = optionsFetch(method, body);
    const fullUrl = 'http://localhost:1337' + url;


    return fetch(fullUrl, options)
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.error('Error in API request:\n', err);
            throw err;
        });
};
function optionsFetch(method, body) {
    let options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (['POST', 'PUT', 'DELETE'].indexOf(method) !== -1) {
        options.body = JSON.stringify(body);
    }

    return options;
}

module.exports = api;