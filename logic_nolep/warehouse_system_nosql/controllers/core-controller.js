// controllers/core-controller.js
import CoreView from '../views/core-view.js';
import DBClient from '../models/db-client.js';

class CoreController {
    async initializeDatabaseAndCollections() {
        try {
            await DBClient.connect();

            const collections = ['products', 'inventories', 'orders'];

            await DBClient.createCollections(collections);
            CoreView.displaySuccess('Database and collections initialized and ready for use.');
        } catch (error) {
            CoreView.displayError('Error initializing database: ' + error.message);
            throw error;
        }
    }

    async closeDatabaseConnection() {
        await DBClient.disconnect();
    }
}

export default CoreController;