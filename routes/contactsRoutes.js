const express = require('express');
const { getContacts, getContactById, createContact, updateContactById, deleteContactById } = require('../controller/contactsController');

const router = express.Router();

router.get('/contacts', getContacts);
router.get('/contacts/:id', getContactById);
router.post('/contacts', createContact);
router.put('/contacts/:id', updateContactById);
router.delete('/contacts/:id', deleteContactById);

module.exports = router;