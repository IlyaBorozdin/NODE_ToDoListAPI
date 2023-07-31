const mysql = require('mysql2');

const TaskId = require('../logic/task/taskId');
const SelectorToSqlQuery = require('./selectorToSqlQuery');
const DBError = require('../logic/serverError/DBError');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ILYA_BOROZDIN',
    database: 'db_todo_list_api'
}).promise();

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
        const { text, values } = SelectorToSqlQuery.insert(task.objectProperties);

        return this._connection.query(text, values)
            .then(([res]) => {
                let id = res.insertId;
                console.log(`Inserted task: id = ${id}\n`);
                return id;
            })
            .catch(err => {
                console.error('Error inserting new task\n', err);
                throw new DBError('Error inserting new task', 'CREATE', 500);
            });
    }

    read(selector, conditions) {
        const { text, values } = SelectorToSqlQuery.concat(
            SelectorToSqlQuery.select(selector),
            SelectorToSqlQuery.where(conditions)
        );

        return this._connection.query(text, values)
            .then(([tasks]) => {
                console.log(`Selected tasks: ${JSON.stringify(tasks, null, 2)}\n`);

                return tasks.map(taskData => {
                    const { id, title, deadline, completed } = taskData;
                    return new TaskId(id, title, deadline, completed);
                });
            })
            .catch(err => {
                console.error('Error searching tasks\n', err);
                throw new DBError('Error searching task', 'READ', 500);
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
                return res.affectedRows;
            })
            .catch(err => {
                console.error('Error updating tasks\n', err);
                throw new DBError('Error updating tasks', 'UPDATE', 500);
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
                return res.affectedRows;
            })
            .catch(err => {
                console.error('Error removing tasks\n', err);
                throw new DBError('Error removing tasks', 'DELETE', 500);
            });
    }
}

module.exports = new MySql(connection);