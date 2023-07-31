const Task = require('./task');
class TaskId extends Task {
    constructor(id, title, deadline, completed) {
        super(title, deadline, completed);
        this._id = id;
    }
    get id() {
        return this._id;
    }
}

module.exports = TaskId;