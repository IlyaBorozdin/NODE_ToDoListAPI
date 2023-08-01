class Task {
    constructor(body) {
        this._title = body.title;
        this._deadline = body.deadline;
        this._completed = body.completed;
    }
    get title() {
        return this._title;
    }
    get deadline() {
        return this._deadline;
    }
    get completed() {
        return this._completed;
    }
    get objProps() {
        return {
            title: this.title,
            deadline: this.deadline,
            completed: this.completed
        };
    }
}

module.exports = Task;