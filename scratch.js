const DB = require('c:/Users/coura/OneDrive/Bureau/lab 4 junior 1/server/node_modules/better-sqlite3');
const db = new DB('./sqlite.db');
console.log(db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all());
