import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import indexRoute from './routes/index-route';
import productRoute from './routes/product-route';

dotenv.config();

const app = express();

// Conectando ao MongoDB — a URI deve vir do ambiente (ver .env.example).
// Se não houver MONGODB_URI, a conexão é pulada (útil para testes com MongoMemoryServer).
if (process.env.MONGODB_URI) {
    mongoose
        .connect(process.env.MONGODB_URI)
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.error('Error connecting to MongoDB:', err.message));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/', indexRoute);
app.use('/products', productRoute);

export default app;