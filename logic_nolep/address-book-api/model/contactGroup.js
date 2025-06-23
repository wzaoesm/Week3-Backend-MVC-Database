// model/contactGroup.js

const db = require('../connection/connection');

class ContactGroup {
    constructor(){
        this.tableName = "ContactGroups"
    }

    async create({ contactId, groupId }) {
        await db.connect();
        try {
            const query = `
                INSERT INTO ContactGroups (contactId, groupId)
                VALUES (?, ?)
            `;
            const result = await db.run(query, [contactId, groupId]);
            // Ambil data yang baru saja dimasukkan
            const newContactGroup = await db.get(
                `SELECT id, contactId, groupId FROM ContactGroups WHERE id = ?`,
                [result.id]
            );
            return newContactGroup;
        } catch (error) {
            throw error;
        } finally {
            await db.close();
        }
    }

    async update(id, { contactId, groupId }) {
        await db.connect();
        try {
            const query = `
                UPDATE ContactGroups
                SET contactId = ?, groupId = ?
                WHERE id = ?
            `;
            const result = await db.run(query, [contactId, groupId, id]);
            if (result.changes === 0) {
                return null;
            }
            const updatedContactGroup = await db.get(
                `SELECT id, contactId, groupId FROM ContactGroups WHERE id = ?`,
                [id]
            );
            return updatedContactGroup;
        } catch (error) {
            throw error;
        } finally {
            await db.close();
        }
    }

    async deleteById(id) {
        await db.connect();
        try {
            const query = `DELETE FROM ContactGroups WHERE id = ?`;
            const result = await db.run(query, [id]);
            return result.changes > 0;
        } catch (error) {
            throw error;
        } finally {
            await db.close();
        }
    }

    async findByContactAndGroup(contactId, groupId) {
        await db.connect();
        try {
            const query = `SELECT id FROM ContactGroups WHERE contactId = ? AND groupId = ?`;
            const result = await db.get(query, [contactId, groupId]);
            return result;
        } catch (error) {
            throw error;
        } finally {
            await db.close();
        }
    }

}

module.exports = ContactGroup
