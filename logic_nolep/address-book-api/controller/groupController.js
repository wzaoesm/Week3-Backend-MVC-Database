// controller/groupController.js

const Group = require('../model/group');
const groupModel = new Group();

const groupController = {

    async getGroups(req, res) {
        try {
            const groups = await groupModel.findAll();
            if (groups.length === 0) {
                return res.status(404).json({ message: 'No groups found.' });
            } else {
                return res.status(200).json({ groups });
            }
        } catch (error) {
            return res.status(500).json({ error: `Failed to retrieve groups: ${error.message}` });
        }
    },

    async createGroups(req, res) {
        try {
            const { groupName } = req.body;
            const newGroup = await groupModel.create({ groupName });
            return res.status(201).json({ message: 'Group created successfully.', group: newGroup });
        } catch (error) {
            return res.status(500).json({ error: `Failed to create group: ${error.message}` });
        }
    },

    async updateGroups(req, res) {
        try {
            const { id } = req.params;
            const { groupName } = req.body;
            const updatedGroup = await groupModel.update(id, { groupName });
            if (!updatedGroup) {
                return res.status(404).json({ message: 'Group not found.' });
            }
            return res.status(200).json({ message: 'Group updated successfully.', group: updatedGroup });
        } catch (error) {
            return res.status(500).json({ error: `Failed to update group: ${error.message}` });
        }
    },

    async deleteGroups(req, res) {
        try {
            const { id } = req.params;
            const deleted = await groupModel.deleteById(id);
            if (!deleted) {
                return res.status(404).json({ message: 'Group not found.' });
            }
            return res.status(200).json({ message: 'Group deleted successfully.' });
        } catch (error) {
            return res.status(500).json({ error: `Failed to delete group: ${error.message}` });
        }
    }

};

module.exports = groupController;