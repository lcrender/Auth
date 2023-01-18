const express = require('express');
const app = express();

// Settings
app.set('port', process.env.PORT || 4000);
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
app.use(require('./routes/auth.routes'));

module.exports = app;