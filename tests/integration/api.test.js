const { describe, it, expect } = require('@jest/globals');
const request = require('supertest');
const app = require('../../app');

describe('API Tests', () => {
  it('GET /api/stars should return a response', async () => {
    const response = await request(app).get('/api/stars');
    expect(response.statusCode).not.toBe(404); // Vérifie que la route existe
  });
});