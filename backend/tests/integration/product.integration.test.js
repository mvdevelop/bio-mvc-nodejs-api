"use strict";

const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../src/app');
const Product = require('../../src/models/product');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Product.deleteMany({});
});

describe('Product API Integration Tests', () => {
  test('GET /api/bios returns empty array initially', async () => {
    const res = await request(app).get('/api/bios').expect(200);
    expect(res.body).toEqual([]);
  });

  test('POST /api/bios creates a product', async () => {
    const payload = {
      title: 'Test Product',
      slug: 'test-product',
      description: 'A test product',
      price: 99,
      tags: ['test'],
      active: true,
    };
    const res = await request(app).post('/api/bios').send(payload).expect(201);
    expect(res.body.message).toBe('Product registered successfully!');

    const products = await Product.find({});
    expect(products).toHaveLength(1);
    expect(products[0].title).toBe('Test Product');
  });

  test('GET /api/bios/:id returns the product', async () => {
    const product = new Product({
      title: 'Get Test',
      slug: 'get-test',
      description: 'Get test',
      price: 10,
      tags: ['get'],
      active: true,
    });
    await product.save();

    const res = await request(app).get(`/api/bios/${product._id}`).expect(200);
    expect(res.body.title).toBe('Get Test');
  });

  test('PUT /api/bios/:id updates the product', async () => {
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
    const res = await request(app).put(`/api/bios/${product._id}`).send(payload).expect(200);
    expect(res.body.message).toBe('Product updated successfully!');

    const updated = await Product.findById(product._id);
    expect(updated.title).toBe('New Title');
    expect(updated.price).toBe(15);
  });

  test('DELETE /api/bios/:id deletes the product', async () => {
    const product = new Product({
      title: 'Delete Me',
      slug: 'delete-me',
      description: 'Delete',
      price: 20,
      tags: ['del'],
      active: true,
    });
    await product.save();

    const res = await request(app).delete(`/api/bios/${product._id}`).expect(200);
    expect(res.body.message).toBe('Product deleted successfully!');

    const remaining = await Product.findById(product._id);
    expect(remaining).toBeNull();
  });
});
