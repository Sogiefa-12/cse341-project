const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');

const data = require('./contacts.json');

MongoClient.connect(process.env.MONGODB_URI)
  .then((client) => {
    const db = client.db();
    const collection = db.collection('contacts');

    collection.insertMany(data, (err, result) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(`${result.insertedCount} contacts inserted successfully.`);
      process.exit(0);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });