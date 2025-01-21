const express = require('express');
const router = express.Router();
const { Contact } = require('../models/contact');
const contactsController = require('../controller/contactsController');

// Swagger comments
/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all contacts
 *     responses:
 *       '200':
 *         description: Success
 *   post:
 *     summary: Create a new contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       '201':
 *         description: Success
 *
 * /contacts/{id}:
 *   get:
 *     summary: Get a single contact by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Success
 *   put:
 *     summary: Update a contact by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       '204':
 *         description: Success
 *   delete:
 *     summary: Delete a contact by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Success
 */

router.get('/', contactsController.getAll);
router.post('/', contactsController.createContact);

router.get('/:id', contactsController.getSingle);
router.put('/:id', contactsController.updateContact);
router.delete('/:id', contactsController.deleteContact);

module.exports = router;