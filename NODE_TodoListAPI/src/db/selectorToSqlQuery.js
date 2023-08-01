const DBError = require('../logic/serverError/DBError');
class SelectorToSqlQuery {

    static select() {
        return { text: 'SELECT * FROM todo_list;', values: [] };
    }

    static insert(selector) {
        if (selector.title && selector.title.length > 255) {
            throw new DBError('Title length must not exceed 255 characters', 'CREATE', 400);
        }

        const queryParams = [];
        const columns = [];

        Object.keys(selector).forEach(field => {
            const paramValue = selector[field];

            if (paramValue === undefined) {
                return;
            }

            columns.push(field);
            queryParams.push(paramValue);
        });

        if (columns.length === 0) {
            throw new DBError('No valid fields provided for query', 'CREATE', 400);
        }

        const query = `INSERT INTO todo_list (${columns.join(', ')})\nVALUES (${Array(columns.length).fill('?').join(', ') });`;

        return { text: query, values: queryParams };
    }

    static update(selector) {
        if (selector.title && selector.title.length > 255) {
            throw new DBError('Title length must not exceed 255 characters', 'UPDATE', 400);
        }

        const fields = Object.keys(selector);
        const queryParams = [];
        const updateFields = [];

        fields.forEach(field => {
            const paramValue = selector[field];

            if (field === 'id') {
                return;
            }

            if (paramValue !== undefined) {
                updateFields.push(`${field} = ?`);
                queryParams.push(paramValue);
            }
        });

        if (updateFields.length === 0) {
            throw new DBError('No valid fields provided for query', 'UPDATE', 400);
        }

        const query = `UPDATE todo_list\nSET ${updateFields.join(', ')};`;

        return { text: query, values: queryParams };
    }

    static delete() {
        return { text: 'DELETE FROM todo_list;', values: [] };
    }

    static where(selector) {
        if (selector.id) {
            return { text: 'WHERE id = ?;', values: [selector.id] };
        }

        const fields = Object.keys(selector);
        const queryParams = [];
        const conditions = [];

        fields.forEach(field => {
            const paramValue = selector[field];

            if (paramValue === undefined) {
                return;
            }

            let condition = '';

            switch (field) {
                case 'title':
                    condition = 'title = ?';
                    queryParams.push(paramValue);
                    break;
                case 'titleReg':
                    condition = 'LOWER(title) LIKE LOWER(?)';
                    queryParams.push(paramValue);
                    break;
                case 'since':
                    condition = 'deadline >= ?';
                    queryParams.push(paramValue);
                    break;
                case 'until':
                    condition = 'deadline <= ?';
                    queryParams.push(paramValue);
                    break;
                case 'deadline':
                    if (paramValue !== 'null') {
                        condition = 'deadline = ?';
                        queryParams.push(paramValue);
                    } else {
                        condition = 'deadline IS NULL';
                    }
                case 'completed':
                    condition = 'completed = ?';
                    queryParams.push(paramValue);
                    break;
                default:
                    break;
            }

            queryParams.push(paramValue);
            conditions.push(condition);
        });

        if (conditions.length > 0) {
            return { text: 'WHERE ' + conditions.join('\nAND ') + ';', values: queryParams };
        } else {
            return { text: '', values: [] };
        }
    }

    static concat(queryA, queryB) {
        if (queryB.text === '') {
            return queryA;
        }

        const text = `${queryA.text.slice(0, -1)}\n${queryB.text}`;

        const values = [...queryA.values, ...queryB.values];

        return { text, values };
    }
}

module.exports = SelectorToSqlQuery;