

const mongodb = require('../db/db');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const db = await mongodb.getDb();
    const collection = db.collection('contacts');
    const result = await collection.find().toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching contacts.' });
  }
};

const getSingle = async (req, res) => {
  try {
    const db = await mongodb.getDb();
    const collection = db.collection('contacts');
    const userId = new ObjectId(req.params.id);
    const result = await collection.findOne({ _id: userId });

    if (!result) {
      res.status(404).json({ message: 'Contact not found.' });
    } else {
      res.status(200).json(result);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching contact.' });
  }
};

const createContact = async (req, res) => {
  try {
    const db = await mongodb.getDb();
    const collection = db.collection('contacts');

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await collection.insertOne(contact);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the contact.');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating contact.' });
  }
};

const updateContact = async (req, res) => {
  try {
    const db = await mongodb.getDb();
    const collection = db.collection('contacts');
    const userId = new ObjectId(req.params.id);

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await collection.replaceOne({ _id: userId }, contact);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the contact.');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating contact.' });
  }
};

const deleteContact = async (req, res) => {
  try {
    const db = await mongodb.getDb();
    const collection = db.collection('contacts');
    const userId = new ObjectId(req.params.id);

    const response = await collection.remove({ _id: userId }, true);

    if (response.matchedCount > 0) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: 'Contact not found.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting contact.' });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};