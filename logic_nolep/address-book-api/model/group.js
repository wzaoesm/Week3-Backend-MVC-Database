// model/group.js

const db = require('../connection/connection');

class Group {
    constructor(){
        this.tableName = "Groups"
    }

    async findAll (){
        await db.connect()
        try {
            const query = `
                SELECT 
                    id,
                    groupName
                FROM Groups
                ORDER BY id
            `;
            const result = await db.all(query);
            return result
        } catch (error) {
            throw error;
        } finally {
            await db.connect()
        }
    }

    async create({ groupName }) {
        await db.connect();
        try {
            const query = `
                INSERT INTO Groups (groupName)
                VALUES (?)
            `;
            const result = await db.run(query, [groupName]);
            // Ambil data yang baru saja dimasukkan
            const newGroup = await db.get(
                `SELECT groupName FROM Groups WHERE id = ?`,
                [result.id]
            );
            return newGroup;
        } catch (error) {
            throw error;
        } finally {
            await db.close();
        }
    }

    async update(id, { groupName }) {
        await db.connect();
        try {
            const query = `
                UPDATE Groups
                SET groupName = ?
                WHERE id = ?
            `;
            const result = await db.run(query, [groupName, id]);
            if (result.changes === 0) {
                return null;
            }
            const updatedGroup = await db.get(
                `SELECT id, groupName FROM Groups WHERE id = ?`,
                [id]
            );
            return updatedGroup;
        } catch (error) {
            throw error;
        } finally {
            await db.close();
        }
    }

    async deleteById(id) {
        await db.connect();
        try {
            const query = `DELETE FROM Groups WHERE id = ?`;
            const result = await db.run(query, [id]);
            return result.changes > 0;
        } catch (error) {
            throw error;
        } finally {
            await db.close();
        }
    }

    async findById(id) {
        await db.connect();
        try {
            const query = `SELECT id, groupName FROM Groups WHERE id = ?`;
            const result = await db.get(query, [id]);
            return result;
        } catch (error) {
            throw error;
        } finally {
            await db.close();
        }
    }
}

module.exports = Group