import request from 'supertest';
import { createApp } from '../../src/app';
import { Application } from 'express';

describe('POST /transform', () => {
  let app: Application;

  beforeAll(() => {
    app = createApp();
  });

  describe('Successful transformations', () => {
    it('should transform a simple string', async () => {
      const response = await request(app)
        .post('/transform')
        .send({ data: 'I love my dog' })
        .expect(200);

      expect(response.body).toBe('I love my cat');
    });

    it('should transform nested objects', async () => {
      const input = {
        pet: 'dog',
        owner: { name: 'John', pets: ['dog', 'bird'] }
      };

      const response = await request(app)
        .post('/transform')
        .send({ data: input })
        .expect(200);

      expect(response.body).toEqual({
        pet: 'cat',
        owner: { name: 'John', pets: ['cat', 'bird'] }
      });
    });

    it('should transform arrays', async () => {
      const response = await request(app)
        .post('/transform')
        .send({ data: ['dog', 'cat', 'dog'] })
        .expect(200);

      expect(response.body).toEqual(['cat', 'cat', 'cat']);
    });

    it('should handle primitive values', async () => {
      const response = await request(app)
        .post('/transform')
        .send({ data: 42 })
        .expect(200);

      expect(response.body).toBe(42);
    });

    it('should handle null', async () => {
      const response = await request(app)
        .post('/transform')
        .send({ data: null })
        .expect(200);

      expect(response.body).toBeNull();
    });

    it('should handle empty objects', async () => {
      const response = await request(app)
        .post('/transform')
        .send({ data: {} })
        .expect(200);

      expect(response.body).toEqual({});
    });

    it('should handle empty arrays', async () => {
      const response = await request(app)
        .post('/transform')
        .send({ data: [] })
        .expect(200);

      expect(response.body).toEqual([]);
    });
  });
});