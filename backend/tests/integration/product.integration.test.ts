import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { beforeAll, afterAll, beforeEach, describe, test, expect } from 'vitest';
import type { Express } from 'express';

let mongoServer: MongoMemoryServer;
let app: Express;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  process.env.MONGODB_URI = uri;

  // Importa o app somente depois de definir a URI do banco de teste,
  // para que o app.ts conecte ao MongoMemoryServer em vez do banco real.
  app = (await import('../../src/app')).default;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  const Product = (await import('../../src/models/product')).default;
  await Product.deleteMany({});
});

describe('Product API Integration Tests', () => {
  test('GET /products returns empty array initially', async () => {
    const res = await request(app).get('/products').expect(200);
    expect(res.body).toEqual([]);
  });

  test('POST /products creates a product', async () => {
    const payload = {
      title: 'Test Product',
      slug: 'test-product',
      description: 'A test product',
      price: 99,
      tags: ['test'],
      active: true,
    };
    const res = await request(app).post('/products').send(payload).expect(201);
    expect(res.body.message).toBe('Product registered successfully!');

    const Product = (await import('../../src/models/product')).default;
    const products = await Product.find({});
    expect(products).toHaveLength(1);
    expect(products[0].title).toBe('Test Product');
  });

  test('GET /products/admin/:id returns the product', async () => {
    const Product = (await import('../../src/models/product')).default;
    const product = new Product({
      title: 'Get Test',
      slug: 'get-test',
      description: 'Get test',
      price: 10,
      tags: ['get'],
      active: true,
    });
    await product.save();

    const res = await request(app).get(`/products/admin/${product._id}`).expect(200);
    expect(res.body.title).toBe('Get Test');
  });

  test('GET /products/:slug returns the product by slug', async () => {
    const Product = (await import('../../src/models/product')).default;
    const product = new Product({
      title: 'By Slug',
      slug: 'by-slug',
      description: 'Slug lookup',
      price: 11,
      tags: ['slug'],
      active: true,
    });
    await product.save();

    const res = await request(app).get('/products/by-slug').expect(200);
    expect(res.body.title).toBe('By Slug');
  });

  test('PUT /products/:id updates the product', async () => {
    const Product = (await import('../../src/models/product')).default;
    const product = new Product({
      title: 'Old Title',
      slug: 'old-title',
      description: 'Old',
      price: 5,
      tags: ['old'],
      active: true,
    });
    await product.save();

    const payload = {
      title: 'New Title',
      slug: 'old-title',
      description: 'New',
      price: 15,
    };
    const res = await request(app).put(`/products/${product._id}`).send(payload).expect(200);
    expect(res.body.message).toBe('Product updated successfully!');

    const updated = await Product.findById(product._id);
    expect(updated!.title).toBe('New Title');
    expect(updated!.price).toBe(15);
  });

  test('DELETE /products/:id deletes the product', async () => {
    const Product = (await import('../../src/models/product')).default;
    const product = new Product({
      title: 'Delete Me',
      slug: 'delete-me',
      description: 'Delete',
      price: 20,
      tags: ['del'],
      active: true,
    });
    await product.save();

    const res = await request(app).delete(`/products/${product._id}`).expect(200);
    expect(res.body.message).toBe('Product deleted successfully!');

    const remaining = await Product.findById(product._id);
    expect(remaining).toBeNull();
  });
});
