"use strict";

const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser');
const swaggerRouter = require('./routes/swagger');

const auth = require('./routes/auth');
const middlewares = require('./middlewares');
const discussion = require('./routes/discussion');
const comment = require('./routes/comment');
const app = express()

// Middleware setup
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(middlewares.allowCrossDomain);

app.get('/', (req, res) => {
    res.json({
        name: 'Welcome to the LoCoCom backend server. If you are reading this message you might want use our frontend instead ;)'
    });
});

// API routes
app.use('/auth', auth);
app.use('/docs', swaggerRouter);
app.use('/api', discussion);
app.use('/api', comment);
module.exports = app;