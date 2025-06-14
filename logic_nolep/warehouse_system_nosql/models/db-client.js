// models/db-client.js
import { MongoClient } from 'mongodb';
import databaseConfig from '../config/database-config.js';
import CoreView from '../views/core-view.js';

let client;
let db;

let dbName = 'warehouse';

class DBClient {
    static async connect() {
        if (!client || !client.topology || !client.topology.isConnected()) {
            CoreView.displayInfo('Connecting to MongoDB...');
            client = new MongoClient(databaseConfig.uri, databaseConfig.options);
            await client.connect();

            db = client.db(dbName);
            CoreView.displaySuccess(`Connected to database: ${db.s.namespace.db}`);
        } else {
            CoreView.displayInfo('Already connected to MongoDB.');
        }
    }

    static async disconnect() {
        if (client && client.topology && client.topology.isConnected()) {
            await client.close();
            CoreView.displaySuccess('MongoDB connection closed.');
            client = null;
            db = null;
        }
    }

    static getDb() {
        if (!db) {
            throw new Error('Database not connected. Please run initialization first.');
        }
        return db;
    }

    static async createCollections(collectionsToCreate) {
        if (!db) {
            throw new Error('Database not connected for creating collections.');
        }
        CoreView.displayInfo('Attempting to create specified collections...');
        for (const collectionName of collectionsToCreate) {
            try {
                const collections = await db.listCollections({ name: collectionName }).toArray();
                if (collections.length === 0) {
                    await db.createCollection(collectionName);
                    CoreView.displaySuccess(`Collection '${collectionName}' created.`);
                } else {
                    CoreView.displayInfo(`Collection '${collectionName}' already exists, skipping creation.`);
                }
            } catch (error) {
                CoreView.displayError(`Error creating collection '${collectionName}': ${error.message}`);
                throw error;
            }
        }
        CoreView.displaySuccess('All specified collections have been ensured to exist.');
    }
}

export default DBClient;