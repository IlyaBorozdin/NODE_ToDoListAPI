class Log {

    write(res) {
        console.log('\n+------------------------------------------------------------------------------------------+\n');
        console.log('status:\t\t\t' + res.status + '\n');
        console.log('status text:\t\t' + res.statusText + '\n');
        if (res.status !== 204) {
            res.json()
                .then(obj => {
                    //console.dir(obj, { colors: true });
                    console.table(obj);
                })
                .catch(err => {
                    console.error('error:\n', err);
                })
                .finally(() => {
                    console.log('\n+------------------------------------------------------------------------------------------+\n');
                });
        } else {
            console.log('\n+------------------------------------------------------------------------------------------+\n');
        }
    }
}

module.exports = new Log();