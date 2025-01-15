const mongodb = require('mongodb');

const initDb = async (options) => {
  const client = new mongodb.MongoClient(process.env.MONGODB_URI, options);

  try {
    await client.connect();
    const db = client.db('project'); 
    return db;
  } catch (error) {
    throw error;
  }
};

module.exports = { initDb };