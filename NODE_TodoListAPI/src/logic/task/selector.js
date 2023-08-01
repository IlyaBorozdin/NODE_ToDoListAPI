const TaskId = require('./taskId');
class Selector extends TaskId {
    constructor(query) {
        super(query);
        this._titleReg = query.titleReg;
        this._since = query.since;
        this._until = query.until;

        if (typeof query.id === 'string') {
            this._id = Number(query.id);
        }
        if (typeof query.completed === 'string') {
            this._completed = query.completed.toLowerCase() === 'true';
        }
    }
    get titleReg() {
        return this._titleReg;
    }
    get since() {
        return this._since;
    }
    get until() {
        return this._until;
    }
    get objProps() {
        return Object.assign({}, super.objProps, {
            titleReg: this.titleReg,
            since: this.since,
            until: this.until
        });
    }
}

module.exports = Selector;