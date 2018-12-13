import supertest from 'supertest';
import 'babel-polyfill';
import app from '../../server';

const token = process.env.TEST_TOKEN;
const adminToken = process.env.TEST_TOKEN_ADMIN;

describe('Server', () => {
  const appInstance = app.listen();
  afterAll(() => {
    appInstance.close();
  });
  describe('GET /api/v1/red-flags', () => {
    it('should return 200 for successful request', async () => {
      await supertest(appInstance)
        .get('/api/v1/red-flags')
        .set('content-type', 'application/json')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(200);
        });
    });
  });
  describe('GET /api/v1/interventions', () => {
    it('should return 200 for successful request', async () => {
      await supertest(appInstance)
        .get('/api/v1/interventions')
        .set('content-type', 'application/json')
        .set('x-access-token', token)
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
      createdby: 1,
    };
    const dataOnlySpaces = {
      title: '   ',
      location: '  ',
      comment: '   ',
    };
    const dataNoTitle = {
      location: 'Test location',
      comment: 'Test comment',
    };
    const dataNoLocation = {
      title: 'Test red-flag',
      comment: 'Test comment',
    };
    const dataNoComment = {
      title: 'Test red-flag',
      location: 'Test location',
    };

    it('Should return 201 for content created', async () => {
      await supertest(appInstance)
        .post('/api/v1/red-flags')
        .send(data)
        .set('content-type', 'application/json')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(201);
        });
    });

    it('Should return 400 for invalid data', async () => {
      await supertest(appInstance)
        .post('/api/v1/red-flags')
        .send()
        .set('content-type', 'application/json')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(400);
        });
    });
    it('Should return 400 for no title', async () => {
      await supertest(appInstance)
        .post('/api/v1/red-flags')
        .send(dataNoTitle)
        .set('content-type', 'application/json')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(400);
        });
    });
    it('Should return 400 for no location', async () => {
      await supertest(appInstance)
        .post('/api/v1/red-flags')
        .send(dataNoLocation)
        .set('content-type', 'application/json')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(400);
        });
    });
    it('Should return 400 for no comment', async () => {
      await supertest(appInstance)
        .post('/api/v1/red-flags')
        .send(dataNoComment)
        .set('content-type', 'application/json')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(400);
        });
    });
    it('Should return 400 for no invalid data', async () => {
      await supertest(appInstance)
        .post('/api/v1/red-flags')
        .send(dataOnlySpaces)
        .set('content-type', 'application/json')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(400);
        });
    });
  });

  describe('POST /api/v1/interventions', () => {
    const data = {
      title: 'Test intervention record',
      location: 'Test location',
      comment: 'Test comment',
      createdby: 1,
    };
    const dataOnlySpaces = {
      title: '   ',
      location: '  ',
      comment: '   ',
    };
    const dataNoTitle = {
      location: 'Test location',
      comment: 'Test comment',
    };
    const dataNoLocation = {
      title: 'Test intervention',
      comment: 'Test comment',
    };
    const dataNoComment = {
      title: 'Test intervention',
      location: 'Test location',
    };

    it('Should return 201 for content created', async () => {
      await supertest(appInstance)
        .post('/api/v1/interventions')
        .send(data)
        .set('content-type', 'application/json')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(201);
        });
    });

    it('Should return 400 for invalid data', async () => {
      await supertest(appInstance)
        .post('/api/v1/interventions')
        .send()
        .set('content-type', 'application/json')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(400);
        });
    });
    it('Should return 400 for no title', async () => {
      await supertest(appInstance)
        .post('/api/v1/interventions')
        .send(dataNoTitle)
        .set('content-type', 'application/json')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(400);
        });
    });
    it('Should return 400 for no location', async () => {
      await supertest(appInstance)
        .post('/api/v1/interventions')
        .send(dataNoLocation)
        .set('content-type', 'application/json')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(400);
        });
    });
    it('Should return 400 for no comment', async () => {
      await supertest(appInstance)
        .post('/api/v1/interventions')
        .send(dataNoComment)
        .set('content-type', 'application/json')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(400);
        });
    });
    it('Should return 400 for no invalid data', async () => {
      await supertest(appInstance)
        .post('/api/v1/interventions')
        .send(dataOnlySpaces)
        .set('content-type', 'application/json')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(400);
        });
    });
  });

  describe('GET /api/v1/red-flags/:id', () => {
    it('should return 200 for successful request', async () => {
      await supertest(appInstance)
        .get('/api/v1/red-flags/1')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(200);
        });
    });

    it('should return 400 for invalid url', async () => {
      await supertest(appInstance)
        .get('/api/v1/red-flags/sfs')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(400);
        });
    });

    it('should return 404 for record not found', async () => {
      await supertest(appInstance)
        .get('/api/v1/red-flags/100')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(404);
        });
    });
  });

  describe('GET /api/v1/interventions/:id', () => {
    it('should return 200 for successful request', async () => {
      await supertest(appInstance)
        .get('/api/v1/interventions/4')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(200);
        });
    });

    it('should return 400 for invalid url', async () => {
      await supertest(appInstance)
        .get('/api/v1/interventions/sfs')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(400);
        });
    });

    it('should return 404 for record not found', async () => {
      await supertest(appInstance)
        .get('/api/v1/interventions/100')
        .set('x-access-token', token)
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
        .patch('/api/v1/red-flags/2/location')
        .send(data)
        .set('content-type', 'application/json')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(200);
        });
    });

    it('should return 422 for invalid data', async () => {
      await supertest(appInstance)
        .patch('/api/v1/red-flags/2/location')
        .send()
        .set('content-type', 'application/json')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(422);
        });
    });

    it('should return 404 for record not found', async () => {
      await supertest(appInstance)
        .patch('/api/v1/red-flags/100/location')
        .send(data)
        .set('content-type', 'application/json')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(404);
        });
    });

    it('should return 400 for invalid url', async () => {
      await supertest(appInstance)
        .patch('/api/v1/red-flags/konth/location')
        .send(data)
        .set('content-type', 'application/json')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(400);
        });
    });
  });

  describe('PATCH /api/v1/red-flags/:id/comment', () => {
    const data = {
      comment: 'Another Test location',
    };

    it('should return 200 for successful request', async () => {
      await supertest(appInstance)
        .patch('/api/v1/red-flags/2/comment')
        .send(data)
        .set('content-type', 'application/json')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(200);
        });
    });

    it('should return 422 for invalid data', async () => {
      await supertest(appInstance)
        .patch('/api/v1/red-flags/2/comment')
        .send()
        .set('content-type', 'application/json')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(422);
        });
    });

    it('should return 404 for record not found', async () => {
      await supertest(appInstance)
        .patch('/api/v1/red-flags/100/comment')
        .send(data)
        .set('content-type', 'application/json')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(404);
        });
    });

    it('should return 400 for invalid url', async () => {
      await supertest(appInstance)
        .patch('/api/v1/red-flags/gbiy/comment')
        .send(data)
        .set('content-type', 'application/json')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(400);
        });
    });
  });

  describe('PATCH /api/v1/interventions/:id/comment', () => {
    const data = {
      comment: 'Another Test comment',
    };

    it('should return 200 for successful request', async () => {
      await supertest(appInstance)
        .patch('/api/v1/interventions/4/comment')
        .send(data)
        .set('content-type', 'application/json')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(200);
        });
    });

    it('should return 422 for invalid data', async () => {
      await supertest(appInstance)
        .patch('/api/v1/interventions/4/comment')
        .send()
        .set('content-type', 'application/json')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(422);
        });
    });

    it('should return 404 for record not found', async () => {
      await supertest(appInstance)
        .patch('/api/v1/interventions/100/comment')
        .send(data)
        .set('content-type', 'application/json')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(404);
        });
    });

    it('should return 400 for invalid url', async () => {
      await supertest(appInstance)
        .patch('/api/v1/interventions/gbiy/comment')
        .send(data)
        .set('content-type', 'application/json')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(400);
        });
    });
  });

  describe('PATCH /api/v1/red-flags/:id/status', () => {
    const data = {
      status: 'Another Test status',
    };

    it('should return 422 for invalid data', async () => {
      await supertest(appInstance)
        .patch('/api/v1/red-flags/2/status')
        .send()
        .set('content-type', 'application/json')
        .set('x-access-token', adminToken)
        .expect((res) => {
          expect(res.statusCode).toBe(422);
        });
    });

    it('should return 404 for record not found', async () => {
      await supertest(appInstance)
        .patch('/api/v1/red-flags/100/status')
        .send(data)
        .set('content-type', 'application/json')
        .set('x-access-token', adminToken)
        .expect((res) => {
          expect(res.statusCode).toBe(404);
        });
    });

    it('should return 400 for invalid url', async () => {
      await supertest(appInstance)
        .patch('/api/v1/red-flags/gbiy/status')
        .send(data)
        .set('content-type', 'application/json')
        .set('x-access-token', adminToken)
        .expect((res) => {
          expect(res.statusCode).toBe(400);
        });
    });
  });


  describe('DELETE /api/v1/red-flags/:id', () => {
    it('should return 200 for successful request', async () => {
      await supertest(appInstance)
        .delete('/api/v1/red-flags/3')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(200);
        });
    });

    it('should return 404 for record not found', async () => {
      await supertest(appInstance)
        .delete('/api/v1/red-flags/100')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(404);
        });
    });
    it('should return 400 for invalid url', async () => {
      await supertest(appInstance)
        .delete('/api/v1/red-flags/ugi')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(400);
        });
    });
  });
});
