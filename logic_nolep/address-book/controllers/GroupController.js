// ===== CONTROLLERS/GROUPCONTROLLER.JS =====
const Group = require('../models/Group');
const View = require('../views/view');

class GroupController {
    constructor() {
        this.model = new Group();
        this.view = new View();
    }

    async create(groupName) {
        try {
            const result = await this.model.create(groupName);
            this.view.showSuccess(`Group created successfully with ID: ${result.id}`);
        } catch (error) {
            this.view.showError(`Failed to create group: ${error.message}`);
        }
    }

    async update(id, groupName) {
        try {
            const existing = await this.model.findById(id);
            if (!existing) {
                this.view.showError(`Group with ID ${id} not found!`);
                return;
            }

            const result = await this.model.update(id, groupName);
            if (result.changes > 0) {
                this.view.showSuccess(`Group updated successfully!`);
            } else {
                this.view.showError('No changes made to group.');
            }
        } catch (error) {
            this.view.showError(`Failed to update group: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            const existing = await this.model.findById(id);
            if (!existing) {
                this.view.showError(`Group with ID ${id} not found!`);
                return;
            }

            const result = await this.model.delete(id);
            if (result.changes > 0) {
                this.view.showSuccess(`Group and related contact associations deleted successfully!`);
            } else {
                this.view.showError('Failed to delete group.');
            }
        } catch (error) {
            this.view.showError(`Failed to delete group: ${error.message}`);
        }
    }

    async showAll() {
        try {
            const groups = await this.model.findAll();
            if (groups.length === 0) {
                this.view.showInfo('No groups found.');
            } else {
                this.view.showGroups(groups);
            }
        } catch (error) {
            this.view.showError(`Failed to retrieve groups: ${error.message}`);
        }
    }
}

module.exports = GroupController;