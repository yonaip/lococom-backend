"use strict";

const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser');
const swaggerRouter = require('./routes/swagger');

const auth = require('./routes/auth');

const app = express()

// // Swagger configuration
// const swaggerOptions = {
//     swaggerDefinition: {
//         info: {
//             title: 'Root Api',
//             description: 'Root api for LoCoCom backend, doesn\'t really do anything.'
//         },
//         servers: ["http://localhost:4000"]
//     },
//     // [./src/routes/*.js]
//     apis: ["./src/app.js", "./src/routes/*.js"]
// };

// const swaggerDocs = swaggerJsDoc(swaggerOptions);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/docs', swaggerRouter);

// Middleware setup
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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