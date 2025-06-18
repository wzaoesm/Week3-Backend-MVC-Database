// ===== CONTROLLERS/CONTACTGROUPCONTROLLER.JS =====
const ContactGroup = require('../models/ContactGroup');
const View = require('../views/view');

class ContactGroupController {
    constructor() {
        this.model = new ContactGroup();
        this.view = new View();
    }

    async create(contactId, groupId) {
        try {
            const contactExists = await this.model.checkContactExists(contactId);
            if (!contactExists) {
                this.view.showError(`Contact with ID ${contactId} not found!`);
                return;
            }

            const groupExists = await this.model.checkGroupExists(groupId);
            if (!groupExists) {
                this.view.showError(`Group with ID ${groupId} not found!`);
                return;
            }

            const result = await this.model.create(contactId, groupId);
            this.view.showSuccess(`Contact-Group association created successfully with ID: ${result.id}`);
        } catch (error) {
            this.view.showError(`Failed to create contact-group association: ${error.message}`);
        }
    }

    async update(id, contactId, groupId) {
        try {
            const existing = await this.model.findById(id);
            if (!existing) {
                this.view.showError(`Contact-Group association with ID ${id} not found!`);
                return;
            }

            const contactExists = await this.model.checkContactExists(contactId);
            if (!contactExists) {
                this.view.showError(`Contact with ID ${contactId} not found!`);
                return;
            }

            const groupExists = await this.model.checkGroupExists(groupId);
            if (!groupExists) {
                this.view.showError(`Group with ID ${groupId} not found!`);
                return;
            }

            const result = await this.model.update(id, contactId, groupId);
            if (result.changes > 0) {
                this.view.showSuccess(`Contact-Group association updated successfully!`);
            } else {
                this.view.showError('No changes made to association.');
            }
        } catch (error) {
            this.view.showError(`Failed to update contact-group association: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            const existing = await this.model.findById(id);
            if (!existing) {
                this.view.showError(`Contact-Group association with ID ${id} not found!`);
                return;
            }

            const result = await this.model.delete(id);
            if (result.changes > 0) {
                this.view.showSuccess(`Contact-Group association deleted successfully!`);
            } else {
                this.view.showError('Failed to delete association.');
            }
        } catch (error) {
            this.view.showError(`Failed to delete contact-group association: ${error.message}`);
        }
    }
}

module.exports = ContactGroupController;