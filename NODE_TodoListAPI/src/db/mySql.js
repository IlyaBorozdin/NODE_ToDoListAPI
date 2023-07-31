const mysql = require('mysql2');
const TaskId = require('../logic/taskId');
const SelectorToSqlQuery = require('./selectorToSqlQuery');

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
        if (task.title.length > 255) {
            throw new Error('Title length must not exceed 255 characters');
        }

        const { text, values } = SelectorToSqlQuery.insert(task.objectProperties);

        return this._connection.query(text, values)
            .then(([res]) => {
                let id = res.insertId;
                console.log(`Inserted task: id = ${id}`);
                return id;
            })
            .catch(err => {
                console.error('Error inserting new task', err);
                throw err;
            });
    }

    read(selector, conditions) {
        const { text, values } = SelectorToSqlQuery.concat(
            SelectorToSqlQuery.select(selector),
            SelectorToSqlQuery.where(conditions)
        );

        return this._connection.query(text, values)
            .then(([tasks]) => {
                console.log(`Selected tasks: ${tasks}`);

                return tasks.map(taskData => {
                    const { id, title, deadline, completed } = taskData;
                    return new TaskId(id, title, deadline, completed);
                });
            })
            .catch(err => {
                console.error('Error searching tasks', err);
                throw err;
            });
    }

    update(selector, conditions) {
        const { text, values } = SelectorToSqlQuery.concat(
            SelectorToSqlQuery.update(selector),
            SelectorToSqlQuery.where(conditions)
        );

        return this._connection.query(text, values)
            .then(([res]) => {
                return res.affectedRows;
            })
            .catch(err => {
                console.error('Error updating tasks', err);
                throw err;
            });
    }

    delete(conditions) {
        const { text, values } = SelectorToSqlQuery.concat(
            SelectorToSqlQuery.delete(),
            SelectorToSqlQuery.where(conditions)
        );

        return this._connection.query(text, values)
            .then(([res]) => {
                return res.affectedRows;
            })
            .catch(err => {
                console.error('Error removing tasks', err);
                throw err;
            });
    }
}

module.exports = new MySql(connection);