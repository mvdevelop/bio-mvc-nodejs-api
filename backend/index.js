
// Config inicial
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const port = process.env.port || 3000;

// Forma de ler JSON / middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

// Rota inicial / endpoint
app.get('/', (req, res) => {
    // Mostrar req
    res.json({ message: 'Hello World!'});

});

// Entregar uma porta
const DB_USER = 'marcosvmdilly';
const DB_PASSWORD = '123qweasdzxc';

// mongodb+srv://DB_USER:DB_PASSWORD@cluster0.ppznk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

app.listen(port);
