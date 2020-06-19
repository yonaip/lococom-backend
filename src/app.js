"use strict";

const express = require('express')
const helmet = require('helmet')
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const auth = require('./routes/auth');

const app = express()

// Swagger configuration
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Root Api',
            description: 'Root api for LoCoCom backend, doesn\'t really do anything.'
        },
        servers: ["http://localhost:4000"]
    },
    // [./routes/*.js]
    apis: ["./src/app.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware setup
app.use(helmet());

// Basic route
/**
 * @swagger
 * /:
 *  get:
 *      description: Use to request backend homepage
 *      responses:
 *          '200':
 *              description: A successful response 
 */
app.get('/', (req, res) => {
    res.json({
        name: 'Welcome to the LoCoCom backend server. If you are reading this message you might want use our frontend instead ;)'
    });
});

// API routes
app.use('/auth', auth);

module.exports = app;