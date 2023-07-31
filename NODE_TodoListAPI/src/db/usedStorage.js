const mySql = require('./mySql');
const Storage = require('./storage');

module.exports = new Storage(mySql);