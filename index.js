"use strict";

const http = require('http');
const mongoose = require('mongoose');

const app = require('./src/app');
const config = require('./src/config');

// Set API port
app.set('port', config.port);

// Create server
const server = http.createServer(app);

// Connect to MongoDB database, probably running in docker container
mongoose.connect(config.mongoURI)
    .then(() => server.listen(config.port))
    .catch(err => {
        console.log('Error connecting to the database', err.message);
        process.exit(err.statusCode);
    })

server.on('listening', () => {
    console.log(`API is running on port ${config.port}`);
});

server.on('error', (err) => {
    console.log('Error', err.message);
    process.exit(err.statusCode);
});