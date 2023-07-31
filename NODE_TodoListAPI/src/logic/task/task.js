class Task {
    constructor(title, deadline, completed) {
        this._title = title;
        this._deadline = deadline;
        this._completed = !!completed;
    }
    get title() {
        return this._title;
    }
    set title(title) {
        this._title = title;
    }
    get deadline() {
        return this._deadline;
    }
    set deadline(deadline) {
        this._deadline = deadline;
    }
    get completed() {
        return this._completed;
    }
    set completed(completed) {
        this._completed = completed;
    }

    finish() {
        this._completed = true;
    }
    get status() {
        if (this.completed) {
            return 'finished';
        }
        if (new Date() - this.deadline > 0) {
            return 'overdue';
        }
        return 'in progress';
    }
    get objectProperties() {
        const props = {};
        for (const key in this) {
            props[key.replace(/^_/, '')] = this[key];
        }
        return props;
    }
}

module.exports = Task;