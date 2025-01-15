// const MongoClient = require('mongodb');
// const dotenv = require('dotenv');
// dotenv.config();
// const MONDODB_URI = process.env.MONGODB_URI;

// const connectDb = async () => {
//     try {
//         const client = await MongoClient.connect(MONDODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
//         console.log('Connected to MongoDB');
//         return client;
//     } catch (error) {
//         console.error('Error connecting to MongoDB:', error.message);
//         process.exit(1);
//     }
// };

// module.exports = {connectDb};

const dotenv = require('dotenv');
const MongoClient = require('mongodb').MongoClient;

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
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