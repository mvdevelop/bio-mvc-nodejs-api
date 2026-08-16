import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import indexRoute from './routes/index-route';
import productRoute from './routes/product-route';

const app = express();
const router = express.Router();

// Conectando ao mongodb
const mongoURL = process.env.MONGODB_URI || 'mongodb+srv://marcosvmdilly:6tASWUR7sD6KNnDN@cluster0.ldz1kzb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error!', err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/', indexRoute);
app.use('/products', productRoute);

export default app;