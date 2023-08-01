const Task = require('./task');
class TaskId extends Task {
    constructor(body) {
        super(body);
        this._id = body.id;

        if (body.deadline instanceof Date) {
            this._deadline = `${body.deadline.getFullYear()}-${body.deadline.getMonth() + 1}-${body.deadline.getDate()}`
        }
        if (body.completed === 1 || body.completed === 0) {
            this._completed = !!body.completed;
        }
    }
    get id() {
        return this._id;
    }
    get objProps() {
        return Object.assign({}, super.objProps, {
            id: this.id
        });
    }
}

module.exports = TaskId;