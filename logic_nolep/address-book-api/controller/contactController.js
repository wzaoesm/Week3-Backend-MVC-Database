// controller/contactController.js

const Contact = require('../model/contact');
const contactModel = new Contact();

const contactController = {

    async getContacts(req, res) {
        try {
            const contacts = await contactModel.findAll();
            if (contacts.length === 0) {
                return res.status(404).json({ message: 'No contacts found.' });
            } else {
                return res.status(200).json({ contacts });
            }
        } catch (error) {
            return res.status(500).json({ error: `Failed to retrieve contacts: ${error.message}` });
        }
    },

    async createContact(req, res) {
        try {
            const { name, phoneNumber, company, email } = req.body;
            if (!name || !phoneNumber || !email) {
                return res.status(400).json({ message: 'Name, phone number, and email are required.' });
            }
            const newContact = await contactModel.create({ name, phoneNumber, company, email });
            return res.status(201).json({ message: 'Contact created successfully.', contact: newContact });
        } catch (error) {
            return res.status(500).json({ error: `Failed to create contact: ${error.message}` });
        }
    },

    async updateContact(req, res) {
        try {
            const { id } = req.params;
            const { name, phoneNumber, company, email } = req.body;
            if (!name || !phoneNumber || !email) {
                return res.status(400).json({ message: 'Name, phone number, and email are required.' });
            }
            const updatedContact = await contactModel.update(id, { name, phoneNumber, company, email });
            if (!updatedContact) {
                return res.status(404).json({ message: 'Contact not found.' });
            }
            return res.status(200).json({ message: 'Contact updated successfully.', contact: updatedContact });
        } catch (error) {
            return res.status(500).json({ error: `Failed to update contact: ${error.message}` });
        }
    },

    async deleteContact(req, res) {
        try {
            const { id } = req.params;
            const deleted = await contactModel.deleteById(id);
            if (!deleted) {
                return res.status(404).json({ message: 'Contact not found.' });
            }
            return res.status(200).json({ message: 'Contact deleted successfully.' });
        } catch (error) {
            return res.status(500).json({ error: `Failed to delete contact: ${error.message}` });
        }
    }
};

module.exports = contactController;