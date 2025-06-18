// ===== CONTROLLERS/CONTACTCONTROLLER.JS =====
const Contact = require('../models/contact');
const View = require('../views/view');

class ContactController {
    constructor() {
        this.model = new Contact();
        this.view = new View();
    }

    async create(name, phoneNumber, company, email) {
        try {
            const result = await this.model.create(name, phoneNumber, company, email);
            this.view.showSuccess(`Contact created successfully with ID: ${result.id}`);
        } catch (error) {
            if (error.message.includes('UNIQUE constraint failed')) {
                if (error.message.includes('phoneNumber')) {
                    this.view.showError('Phone number already exists!');
                } else if (error.message.includes('email')) {
                    this.view.showError('Email already exists!');
                } else {
                    this.view.showError('Duplicate data found!');
                }
            } else {
                this.view.showError(`Failed to create contact: ${error.message}`);
            }
        }
    }

    async update(id, name, phoneNumber, company, email) {
        try {
            const existing = await this.model.findById(id);
            if (!existing) {
                this.view.showError(`Contact with ID ${id} not found!`);
                return;
            }

            const result = await this.model.update(id, name, phoneNumber, company, email);
            if (result.changes > 0) {
                this.view.showSuccess(`Contact updated successfully!`);
            } else {
                this.view.showError('No changes made to contact.');
            }
        } catch (error) {
            if (error.message.includes('UNIQUE constraint failed')) {
                if (error.message.includes('phoneNumber')) {
                    this.view.showError('Phone number already exists!');
                } else if (error.message.includes('email')) {
                    this.view.showError('Email already exists!');
                } else {
                    this.view.showError('Duplicate data found!');
                }
            } else {
                this.view.showError(`Failed to update contact: ${error.message}`);
            }
        }
    }

    async delete(id) {
        try {
            const existing = await this.model.findById(id);
            if (!existing) {
                this.view.showError(`Contact with ID ${id} not found!`);
                return;
            }

            const result = await this.model.delete(id);
            if (result.changes > 0) {
                this.view.showSuccess(`Contact deleted successfully!`);
            } else {
                this.view.showError('Failed to delete contact.');
            }
        } catch (error) {
            this.view.showError(`Failed to delete contact: ${error.message}`);
        }
    }

    async showAll() {
        try {
            const contacts = await this.model.findAll();
            if (contacts.length === 0) {
                this.view.showInfo('No contacts found.');
            } else {
                this.view.showContacts(contacts);
            }
        } catch (error) {
            this.view.showError(`Failed to retrieve contacts: ${error.message}`);
        }
    }
}

module.exports = ContactController;