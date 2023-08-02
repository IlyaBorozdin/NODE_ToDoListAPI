class Log {
    async write(res) {
        console.log('+------------------------------------------------------------------------------------------+');

        console.log(`status:\t\t\t${res.status}`);
        console.log(`status text:\t\t${res.statusText}`);
        console.log(`url:\t\t\t${res.url}`);
        console.log(`type:\t\t\t${res.type}`);

        if (res.status !== 204) {
            try {
                const responseJson = await res.json();

                console.log('\nResponse JSON:');
                if (res.ok && res.url !== 'http://localhost:1337/') {
                    console.table(responseJson);
                } else {
                    console.log(JSON.stringify(responseJson, null, 4));
                }
            } catch (err) {
                console.error('Error while parsing response:\n', err);
            } finally {
                console.log('+------------------------------------------------------------------------------------------+\n');
            }
        } else {
            console.log('+------------------------------------------------------------------------------------------+\n');
        }
    }
}

module.exports = new Log();
