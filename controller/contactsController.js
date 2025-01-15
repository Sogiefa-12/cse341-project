const { connectDb } = require('../db/db');
const { ObjectId } = require('mongodb'); // Import the ObjectId class from the mongodb package

const getContacts = async (req, res) => {
  const client = await connectDb();
  const db = client.db();
  const contacts = await db.collection('contacts').find({}).toArray();
  client.close();
  res.send(contacts);
};

const getContactById = async (req, res) => {
  const client = await connectDb();
  const db = client.db();
  const contact = await db.collection('contacts').findOne({ _id: new ObjectId(req.params.id) });
  client.close();
  res.send(contact);
};

const createContact = async (req, res) => {
  const client = await connectDb();
  const db = client.db();
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;
  const contact = { firstName, lastName, email, favoriteColor, birthday };
  const result = await db.collection('contacts').insertOne(contact);
  client.close();
  res.send(result.insertedCount === 1 ? contact : { message: 'Error inserting contact' });
};

const updateContactById = async (req, res) => {
  const client = await connectDb();
  const db = client.db();
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;
  const contactData = { firstName, lastName, email, favoriteColor, birthday };
  const result = await db.collection('contacts').updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: contactData }
  );
  client.close();
  res.send(result.matchedCount === 1 ? contactData : { message: 'Error updating contact' });
};

const deleteContactById = async (req, res) => {
  const client = await connectDb();
  const db = client.db();
  const result = await db.collection('contacts').deleteOne({ _id: new ObjectId(req.params.id) });
  client.close();
  res.send(result.deletedCount === 1 ? { message: 'Contact deleted' } : { message: 'Error deleting contact' });
};

module.exports = {
  getContacts,
  getContactById,
  createContact,
  updateContactById,
  deleteContactById
};