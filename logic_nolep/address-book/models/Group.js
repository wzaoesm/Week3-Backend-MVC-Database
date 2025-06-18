// ===== MODELS/GROUP.JS =====
const db = require('../database/db');

class Group {
    constructor() {
        this.tableName = 'Groups';
    }

    async create(groupName) {
        await db.connect();
        try {
            const result = await db.run(
                `INSERT INTO ${this.tableName} (groupName) VALUES (?)`,
                [groupName]
            );
            return result;
        } catch (error) {
            throw error;
        } finally {
            await db.close();
        }
    }

    async update(id, groupName) {
        await db.connect();
        try {
            const result = await db.run(
                `UPDATE ${this.tableName} SET groupName = ? WHERE id = ?`,
                [groupName, id]
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
            // First delete related ContactGroups
            await db.run(`DELETE FROM ContactGroups WHERE groupId = ?`, [id]);
            // Then delete the group
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

    async findAll() {
        await db.connect();
        try {
            const query = `
                SELECT 
                    g.id,
                    g.groupName,
                    GROUP_CONCAT(c.name || ' (' || c.phoneNumber || ')') as contacts
                FROM Groups g
                LEFT JOIN ContactGroups cg ON g.id = cg.groupId
                LEFT JOIN Contact c ON cg.contactId = c.id
                GROUP BY g.id, g.groupName
                ORDER BY g.id
            `;
            const result = await db.all(query);
            return result;
        } catch (error) {
            throw error;
        } finally {
            await db.close();
        }
    }
}

module.exports = Group;