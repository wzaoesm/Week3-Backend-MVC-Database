const databaseConfig = {
    uri: 'mongodb+srv://admin:admin@prod-warehouse-ap-south.ckhmxii.mongodb.net/?retryWrites=true&w=majority&appName=prod-warehouse-ap-southeast-1',
    options: {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
    },
};

export default databaseConfig;