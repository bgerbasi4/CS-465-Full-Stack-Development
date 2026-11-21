const mongoose = require('mongoose');

const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/travlr`;

// Connect to MongoDB
const connect = () => {
    mongoose.connect(dbURI).catch(err => {
        console.log('Initial MongoDB connection error:', err);
    });
};

// Monitor connection events
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', err => {
    console.log('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// Graceful shutdown
const gracefulShutdown = async (msg) => {
    await mongoose.connection.close();
    console.log(`Mongoose disconnected through ${msg}`);
};

// Application termination
process.once('SIGINT', async () => {
    await gracefulShutdown('app termination');
    process.exit(0);
});

// Container termination
process.once('SIGTERM', async () => {
    await gracefulShutdown('app shutdown');
    process.exit(0);
});

// Make initial connection
connect();

// Import Mongoose schema
require('./travlr');

module.exports = mongoose;
