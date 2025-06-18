// ===== MODELS/CONTACTGROUP.JS =====
const db = require('../database/db');

class ContactGroup {
    constructor() {
        this.tableName = 'ContactGroups';
    }

    async create(contactId, groupId) {
        await db.connect();
        try {
            const result = await db.run(
                `INSERT INTO ${this.tableName} (contactId, groupId) VALUES (?, ?)`,
                [contactId, groupId]
            );
            return result;
        } catch (error) {
            throw error;
        } finally {
            await db.close();
        }
    }

    async update(id, contactId, groupId) {
        await db.connect();
        try {
            const result = await db.run(
                `UPDATE ${this.tableName} SET contactId = ?, groupId = ? WHERE id = ?`,
                [contactId, groupId, id]
            );
            return result;
        } catch (error) {
            throw error;
        } finally {
            await db.close();
        }
    }

    async delete(id) {
        await db.connect();
        try {
            const result = await db.run(`DELETE FROM ${this.tableName} WHERE id = ?`, [id]);
            return result;
        } catch (error) {
            throw error;
        } finally {
            await db.close();
        }
    }

    async findById(id) {
        await db.connect();
        try {
            const result = await db.get(`SELECT * FROM ${this.tableName} WHERE id = ?`, [id]);
            return result;
        } catch (error) {
            throw error;
        } finally {
            await db.close();
        }
    }

    async checkContactExists(contactId) {
        await db.connect();
        try {
            const result = await db.get(`SELECT id FROM Contact WHERE id = ?`, [contactId]);
            return !!result;
        } catch (error) {
            throw error;
        } finally {
            await db.close();
        }
    }

    async checkGroupExists(groupId) {
        await db.connect();
        try {
            const result = await db.get(`SELECT id FROM Groups WHERE id = ?`, [groupId]);
            return !!result;
        } catch (error) {
            throw error;
        } finally {
            await db.close();
        }
    }
}

module.exports = ContactGroup;