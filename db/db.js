const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      _db = client.db();
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = async () => {
  if (!_db) {
    throw Error('Db not initialized');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb
};