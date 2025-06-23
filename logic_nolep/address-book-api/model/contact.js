// model/contact.js

const db = require('../connection/connection');

class Contact {
    constructor() {
        this.tableName = 'Contact';
    }


    async findAll() {
        await db.connect();
        try {
            const query = `
                SELECT 
                    id,
                    name,
                    phoneNumber,
                    company,
                    email
                FROM Contact
                ORDER BY id
            `;
            const result = await db.all(query);
            return result;
        } catch (error) {
            throw error;
        } finally {
            await db.close();
        }
    }

    async create({ name, phoneNumber,company, email }) {
        await db.connect();
        try {
            const query = `
                INSERT INTO Contact (name, phoneNumber,company, email)
                VALUES (?, ?, ?, ?)
            `;
            const result = await db.run(query, [name, phoneNumber,company, email]);
            // Ambil data yang baru saja dimasukkan
            const newContact = await db.get(
                `SELECT id, name, phoneNumber, company, email FROM Contact WHERE id = ?`,
                [result.id]
            );
            return newContact;
        } catch (error) {
            throw error;
        } finally {
            await db.close();
        }
    }

    async update(id, { name, phoneNumber, company, email }) {
        await db.connect();
        try {
            const query = `
                UPDATE Contact
                SET name = ?, phoneNumber = ?, company = ?, email = ?
                WHERE id = ?
            `;
            const result = await db.run(query, [name, phoneNumber, company, email, id]);
            if (result.changes === 0) {
                return null;
            }
            const updatedContact = await db.get(
                `SELECT id, name, phoneNumber, company, email FROM Contact WHERE id = ?`,
                [id]
            );
            return updatedContact;
        } catch (error) {
            throw error;
        } finally {
            await db.close();
        }
    }

    async deleteById(id) {
        await db.connect();
        try {
            const query = `DELETE FROM Contact WHERE id = ?`;
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
            const query = `SELECT id, name, phoneNumber, company, email FROM Contact WHERE id = ?`;
            const result = await db.get(query, [id]);
            return result;
        } catch (error) {
            throw error;
        } finally {
            await db.close();
        }
    }
}

module.exports = Contact;