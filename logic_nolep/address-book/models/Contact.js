// ===== MODELS/CONTACT.JS =====
const db = require('../database/db');

class Contact {
    constructor() {
        this.tableName = 'Contact';
    }

    async create(name, phoneNumber, company, email) {
        await db.connect();
        try {
            const result = await db.run(
                `INSERT INTO ${this.tableName} (name, phoneNumber, company, email) VALUES (?, ?, ?, ?)`,
                [name, phoneNumber, company, email]
            );
            return result;
        } catch (error) {
            throw error;
        } finally {
            await db.close();
        }
    }

    async update(id, name, phoneNumber, company, email) {
        await db.connect();
        try {
            const result = await db.run(
                `UPDATE ${this.tableName} SET name = ?, phoneNumber = ?, company = ?, email = ? WHERE id = ?`,
                [name, phoneNumber, company, email, id]
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

    async findAll() {
        await db.connect();
        try {
            const query = `
                SELECT 
                    c.id,
                    c.name,
                    c.phoneNumber,
                    c.company,
                    c.email,
                    GROUP_CONCAT(g.groupName) as groups
                FROM Contact c
                LEFT JOIN ContactGroups cg ON c.id = cg.contactId
                LEFT JOIN Groups g ON cg.groupId = g.id
                GROUP BY c.id, c.name, c.phoneNumber, c.company, c.email
                ORDER BY c.id
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

module.exports = Contact;