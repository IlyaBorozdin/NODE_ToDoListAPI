class Storage {
    constructor(storage) {
        this._storage = storage;
    }
    get storage() {
        return this._storage;
    }
    set storage(storage) {
        this._storage = storage;
    }

    connect() {
        return this._storage.connect();
    }

    end() {
        this._storage.end();
    }

    create(task) {
        return this._storage.create(task);
    }

    read(selector = {}, conditions = {}) {
        return this._storage.read(selector, conditions);
    }

    update(task, conditions) {
        return this._storage.update(task, conditions);
    }

    delete(conditions) {
        return this._storage.delete(conditions);
    }
}

module.exports = Storage;