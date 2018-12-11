import supertest from 'supertest';
import 'babel-polyfill';
import app from '../../server';

const appInstance = app.listen();
afterAll(() => {
  appInstance.close();
});

describe('Server', () => {
  describe('GET /api/v1/red-flags', () => {
    it('should return 200 for successful request', async () => {
      await supertest(appInstance)
        .get('/api/v1/red-flags')
        .expect((res) => {
          expect(res.statusCode).toBe(200);
        });
    });
  });

  describe('POST /api/v1/red-flags', () => {
    const data = {
      title: 'Test red-flag',
      location: 'Test location',
      comment: 'Test comment',
    };

    it('Should return 201 for content created', async () => {
      await supertest(appInstance)
        .post('/api/v1/red-flags')
        .send(data)
        .set('content-type', 'application/json')
        .expect((res) => {
          expect(res.statusCode).toBe(201);
        });
    });

    it('Should return 400 for invalid data', async () => {
      await supertest(appInstance)
        .post('/api/v1/red-flags')
        .send()
        .set('content-type', 'application/json')
        .expect((res) => {
          expect(res.statusCode).toBe(400);
        });
    });
  });


  describe('GET /api/v1/red-flags/:id', () => {
    it('should return 200 for successful request', async () => {
      await supertest(appInstance)
        .get('/api/v1/red-flags/1')
        .expect((res) => {
          expect(res.statusCode).toBe(200);
        });
    });

    it('should return 422 for invalid url', async () => {
      await supertest(appInstance)
        .get('/api/v1/red-flags/sfs')
        .expect((res) => {
          expect(res.statusCode).toBe(422);
        });
    });

    it('should return 404 for record not found', async () => {
      await supertest(appInstance)
        .get('/api/v1/red-flags/100')
        .expect((res) => {
          expect(res.statusCode).toBe(404);
        });
    });
  });

  describe('PATCH /api/v1/red-flags/:id/location', () => {
    const data = {
      location: 'Another Test location',
    };

    it('should return 200 for successful request', async () => {
      await supertest(appInstance)
        .patch('/api/v1/red-flags/1/location')
        .send(data)
        .set('content-type', 'application/json')
        .expect((res) => {
          expect(res.statusCode).toBe(200);
        });
    });

    it('should return 422 for invalid data', async () => {
      await supertest(appInstance)
        .patch('/api/v1/red-flags/1/location')
        .send()
        .set('content-type', 'application/json')
        .expect((res) => {
          expect(res.statusCode).toBe(422);
        });
    });

    it('should return 404 for invalid data', async () => {
      await supertest(appInstance)
        .patch('/api/v1/red-flags/100/location')
        .send(data)
        .set('content-type', 'application/json')
        .expect((res) => {
          expect(res.statusCode).toBe(404);
        });
    });
  });

  describe('PATCH /api/v1/red-flags/:id/comment', () => {
    const data = {
    	comment: 'Another Test location',
    };

    it('should return 200 for successful request', async () => {
      await supertest(appInstance)
        .patch('/api/v1/red-flags/1/comment')
        .send(data)
        .set('content-type', 'application/json')
        .expect((res) => {
          expect(res.statusCode).toBe(200);
        });
    });

    it('should return 422 for invalid data', async () => {
      await supertest(appInstance)
        .patch('/api/v1/red-flags/1/comment')
        .send()
        .set('content-type', 'application/json')
        .expect((res) => {
          expect(res.statusCode).toBe(422);
        });
    });

    it('should return 404 for record not found', async () => {
      await supertest(appInstance)
        .patch('/api/v1/red-flags/100/comment')
        .send(data)
        .set('content-type', 'application/json')
        .expect((res) => {
          expect(res.statusCode).toBe(404);
        });
    });
  });

  describe('DELETE /api/v1/red-flags/:id', () => {
    it('should return 200 for successful request', async () => {
      await supertest(appInstance)
        .delete('/api/v1/red-flags/2')
        .expect((res) => {
          expect(res.statusCode).toBe(200);
        });
    });

    it('should return 404 for record not found', async () => {
      await supertest(appInstance)
        .delete('/api/v1/red-flags/100')
        .expect((res) => {
          expect(res.statusCode).toBe(404);
        });
    });
  });
});
