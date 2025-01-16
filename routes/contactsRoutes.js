const express = require('express');
const router = express.Router();

const contactsController = require('../controller/contactsController');

// router.get('/', (req, res) => {
//     res.send('Welcome to the Contacts API');
//   });
router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.post('/', contactsController.createContact);

router.put('/:id', contactsController.updateContact);

router.delete('/:id', contactsController.deleteContact);

module.exports = router;