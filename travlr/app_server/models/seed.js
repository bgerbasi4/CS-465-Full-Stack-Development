const mongoose = require('mongoose');
const Trip = require('./travlr');
const trips = require('../../data/trips.json');

const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/travlr`;

const seedDB = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(dbURI);
        console.log('Connected to MongoDB');

        // Remove existing trip records
        await Trip.deleteMany({});
        console.log('Existing trips removed');

        // Insert sample trip data
        await Trip.insertMany(trips);
        console.log(`${trips.length} trips inserted successfully`);

    } catch (err) {
        console.error('Error seeding database:', err);
        process.exitCode = 1;
    } finally {
        // Close database connection
        await mongoose.disconnect();
        console.log('MongoDB connection closed');
    }
};

seedDB();