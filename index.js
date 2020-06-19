"use strict";

const http = require('http');
const mongoose = require('mongoose');

const app = require('./src/app');
const config = require('./src/config');

// Set API port
app.set('port', config.port);

// Create server
const server = http.createServer(app).listen(config.port);

server.on('listening', () => {
    console.log(`API is running on port ${config.port}`);
});

server.on('error', (err) => {
    console.log('Error', err.message);
    process.exit(err.statusCode);
});