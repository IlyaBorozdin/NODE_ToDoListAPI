const mysql = require('mysql2');

const TaskId = require('../logic/task/taskId');
const SelectorToSqlQuery = require('./selectorToSqlQuery');
const DBError = require('../logic/serverError/dbError');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ILYA_BOROZDIN',
    database: 'db_todo_list_api'
}).promise();

connection.connect()
    .then(() => {
        console.log('Database is connected\n');
    })
    .catch(err => {
        console.error('Database is disconnected\n', err);
        throw new DBError('CONNECT', 503);
    });
class MySql {
    constructor(connection) {
        this._connection = connection;
    }

    connect() {
        return this._connection.connect();
    }

    end() {
        this._connection.end();
    }

    create(task) {
        const { text, values } = SelectorToSqlQuery.insert(task);

        return this._connection.query(text, values)
            .then(([res]) => {
                let id = res.insertId;
                console.log(`Inserted task: id = ${id}\n`);
                return id;
            })
            .catch(err => {
                console.error('Error inserting new task\n', err);
                throw new DBError('CREATE');
            });
    }

    read(conditions) {
        const { text, values } = SelectorToSqlQuery.concat(
            SelectorToSqlQuery.select(),
            SelectorToSqlQuery.where(conditions)
        );

        return this._connection.query(text, values)
            .then(([tasks]) => {
                console.log(`Selected tasks: ${JSON.stringify(tasks, null, 2)}\n`);
                return tasks.map(body => new TaskId(body));
            })
            .catch(err => {
                console.error('Error searching tasks\n', err);
                throw new DBError('READ');
            });
    }

    update(task, conditions) {
        const { text, values } = SelectorToSqlQuery.concat(
            SelectorToSqlQuery.update(task),
            SelectorToSqlQuery.where(conditions)
        );

        return this._connection.query(text, values)
            .then(([res]) => {
                console.log(`Affected rows: ${res.affectedRows}\n`);
                return;
            })
            .catch(err => {
                console.error('Error updating tasks\n', err);
                throw new DBError('UPDATE');
            });
    }

    delete(conditions) {
        const { text, values } = SelectorToSqlQuery.concat(
            SelectorToSqlQuery.delete(),
            SelectorToSqlQuery.where(conditions)
        );

        return this._connection.query(text, values)
            .then(([res]) => {
                console.log(`Affected rows: ${res.affectedRows}\n`);
                return;
            })
            .catch(err => {
                console.error('Error removing tasks\n', err);
                throw new DBError('DELETE');
            });
    }
}

module.exports = new MySql(connection);