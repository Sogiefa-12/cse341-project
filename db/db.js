const dotenv = require('dotenv');
const MongoClient = require('mongodb').MongoClient;

let _db;

const initDb = (options, callback) => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }

  if (!callback) {
    throw new Error('No callback function provided');
  }

  MongoClient.connect(
    process.env.MONGODB_URI,
    options || { useUnifiedTopology: true },
    (err, client) => {
      if (err) {
        callback(err);
        return;
      }

      _db = client;
      callback(null, _db);
    }
  );
};

const getDb = () => {
  if (!_db) {
    throw Error('Db not initialized');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};