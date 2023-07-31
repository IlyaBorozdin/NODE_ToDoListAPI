class SelectorToSqlQuery {

    static select(selector) {
        const columns = [];

        if (Object.keys(selector).length === 0) {
            columns.push('*');
        } else {
            Object.keys(selector).forEach(column => {
                if (selector[column]) {
                    columns.push(column);
                }
            });
        }

        const query = `SELECT ${columns.join(', ')}\nFROM todo_list;`;
        return { text: query, values: [] };
    }

    static insert(selector) {
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
            throw new Error('No valid fields provided for INSERT INTO query.');
        }

        const query = `INSERT INTO todo_list (${columns.join(', ')})\nVALUES (${Array(columns.length).fill('?').join(', ') });`;

        return { text: query, values: queryParams };
    }

    static update(selector) {
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
            throw new Error('No valid fields provided for UPDATE query.');
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
                case 'id':
                    condition = 'id = ?';
                    break;
                case 'titleReg':
                    condition = 'LOWER(title) LIKE LOWER(?)';
                    break;
                case 'since':
                    condition = 'deadline >= ?';
                    break;
                case 'until':
                    condition = 'deadline <= ?';
                    break;
                case 'deadline':
                    condition = 'deadline = ?';
                    break;
                case 'completed':
                    condition = 'completed = ?';
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