
'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const router = express.Router();

// Conectando ao mongodb
const userName = 'marcosvmdilly';
const userPassword = '6tASWUR7sD6KNnDN';
const mongoURL = `mongodb+srv://${userName}:${userPassword}@cluster0.ldz1kzb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(mongoURL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error!', err));

// Carrega os Models
const Product = require('./models/product');

// Carrega as Rotas
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
    extended: false 
}));

app.use('/', indexRoute);
app.use('/products', productRoute);

module.exports = app;
