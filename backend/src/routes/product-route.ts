import express from 'express';
import router from './index-route';
import { get, getById, getBySlug, getByTag, post, put, delete as deleteProduct } from '../controllers/product-controller';

const productRouter = express.Router();

productRouter.get('/', get);
productRouter.get('/:slug', getBySlug);
productRouter.get('/:id', getById);
productRouter.get('/tags/:tag', getByTag);
productRouter.post('/', post);
productRouter.put('/:id', put);
productRouter.delete('/', deleteProduct);

module.exports = productRouter;