"use strict";

// Configuration variables
const port = process.env.PORT || '4000';
const mongoUsername = process.env.MONGODB_USERNAME || 'stefko';
const mongoPassword = process.env.MONGODB_PASSWORD || '123';
const mongoURI = process.env.MONGODB_URI || `mongodb://${mongoUsername}:${mongoPassword}@host.docker.internal/lococom`;
// const mongoURI = process.env.MONGODB_URI || `mongodb://${mongoUsername}:${mongoPassword}@host.docker.internal/lococom`; if on windows
const JwtSecret = process.env.JWT_SECRET  || 'very secret secret';


module.exports = {
    port,
    mongoURI,
    JwtSecret
};