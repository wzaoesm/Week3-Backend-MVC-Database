// controller/contactGroupController.js

const Contact = require('../model/contact');
const Group = require('../model/group');
const ContactGroup = require('../model/contactGroup');
const contactGroupModel = new ContactGroup();

const contactGroupController = {

    async createContactGroup(req, res) {
        try {
            const { contactId, groupId } = req.body;
            if (!contactId || !groupId) {
                return res.status(400).json({ message: 'contactId and groupId are required.' });
            }
            // Cek apakah contactId dan groupId valid
            const contactModel = new Contact();
            const groupModel = new Group();
            const contact = await contactModel.findById(contactId);
            const group = await groupModel.findById(groupId);
            if (!contact) {
                return res.status(404).json({ message: 'Contact not found.' });
            }
            if (!group) {
                return res.status(404).json({ message: 'Group not found.' });
            }

            // Pastikan pasangan contactId dan groupId belum ada
            const exists = await contactGroupModel.findByContactAndGroup(contactId, groupId);
            if (exists) {
                return res.status(409).json({ message: 'This contactId and groupId pair already exists.' });
            }

            const newContactGroup = await contactGroupModel.create({ contactId, groupId });
            return res.status(201).json({ message: 'ContactGroup created successfully.', contactGroup: newContactGroup });
        } catch (error) {
            return res.status(500).json({ error: `Failed to create contact group: ${error.message}` });
        }
    },

    async updateContactGroup(req, res) {
        try {
            const { id } = req.params;
            const { contactId, groupId } = req.body;
            if (!contactId || !groupId) {
                return res.status(400).json({ message: 'contactId and groupId are required.' });
            }
            // Cek apakah contactId dan groupId valid
            const contactModel = new Contact();
            const groupModel = new Group();
            const contact = await contactModel.findById(contactId);
            const group = await groupModel.findById(groupId);
            if (!contact) {
                return res.status(404).json({ message: 'Contact not found.' });
            }
            if (!group) {
                return res.status(404).json({ message: 'Group not found.' });
            }

            // Pastikan pasangan contactId dan groupId belum ada di record lain
            const exists = await contactGroupModel.findByContactAndGroup(contactId, groupId);
            if (exists && String(exists.id) !== String(id)) {
                return res.status(409).json({ message: 'This contactId and groupId pair already exists.' });
            }

            const updatedContactGroup = await contactGroupModel.update(id, { contactId, groupId });
            if (!updatedContactGroup) {
                return res.status(404).json({ message: 'ContactGroup not found.' });
            }
            return res.status(200).json({ message: 'ContactGroup updated successfully.', contactGroup: updatedContactGroup });
        } catch (error) {
            return res.status(500).json({ error: `Failed to update contact group: ${error.message}` });
        }
    },

    async deleteContactGroup(req, res) {
        try {
            const { id } = req.params;
            const deleted = await contactGroupModel.deleteById(id);
            if (!deleted) {
                return res.status(404).json({ message: 'ContactGroup not found.' });
            }
            return res.status(200).json({ message: 'ContactGroup deleted successfully.' });
        } catch (error) {
            return res.status(500).json({ error: `Failed to delete contact group: ${error.message}` });
        }
    }
};

module.exports = contactGroupController;