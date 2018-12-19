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

  describe('PATCH /api/v1/interventions/:id/location', () => {
    const data = {
      location: 'Another Test location',
    };

    it('should return 200 for successful request', async () => {
      await supertest(appInstance)
        .patch('/api/v1/interventions/4/location')
        .send(data)
        .set('content-type', 'application/json')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(200);
        });
    });

    it('should return 422 for invalid data', async () => {
      await supertest(appInstance)
        .patch('/api/v1/interventions/4/location')
        .send()
        .set('content-type', 'application/json')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(422);
        });
    });

    it('should return 404 for record not found', async () => {
      await supertest(appInstance)
        .patch('/api/v1/interventions/100/location')
        .send(data)
        .set('content-type', 'application/json')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(404);
        });
    });

    it('should return 400 for invalid url', async () => {
      await supertest(appInstance)
        .patch('/api/v1/interventions/konth/location')
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
      status: 'resolved',
    };
    const incorrectData = {
      status: 'any other status',
    }

    it('should return 200 for successful request', async () => {
      await supertest(appInstance)
        .patch('/api/v1/red-flags/1/status')
        .send(data)
        .set('content-type', 'application/json')
        .set('x-access-token', adminToken)
        .expect((res) => {
          expect(res.statusCode).toBe(200);
        });
    });

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

  describe('PATCH /api/v1/interventions/:id/status', () => {
    const data = {
      status: 'rejected',
    };
    const incorrectData = {
      status: 'Another Test intervention',
    };

    it('should return 200 for successful request', async () => {
      await supertest(appInstance)
        .patch('/api/v1/interventions/4/status')
        .send(data)
        .set('content-type', 'application/json')
        .set('x-access-token', adminToken)
        .expect((res) => {
          expect(res.statusCode).toBe(200);
        });
    });

    it('should return 422 for invalid data', async () => {
      await supertest(appInstance)
        .patch('/api/v1/interventions/4/status')
        .send()
        .set('content-type', 'application/json')
        .set('x-access-token', adminToken)
        .expect((res) => {
          expect(res.statusCode).toBe(422);
        });
    });

    it('should return 404 for record not found', async () => {
      await supertest(appInstance)
        .patch('/api/v1/interventions/100/status')
        .send(data)
        .set('content-type', 'application/json')
        .set('x-access-token', adminToken)
        .expect((res) => {
          expect(res.statusCode).toBe(404);
        });
    });

    it('should return 400 for invalid url', async () => {
      await supertest(appInstance)
        .patch('/api/v1/interventions/gbiy/status')
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

  describe('DELETE /api/v1/interventions/:id', () => {
    it('should return 200 for successful request', async () => {
      await supertest(appInstance)
        .delete('/api/v1/interventions/5')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(200);
        });
    });

    it('should return 404 for record not found', async () => {
      await supertest(appInstance)
        .delete('/api/v1/interventions/100')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(404);
        });
    });
    it('should return 400 for invalid url', async () => {
      await supertest(appInstance)
        .delete('/api/v1/interventions/ugi')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(400);
        });
    });
  });

  describe('POST /api/v1/auth/signup', () => {
    const data = {
      firstname: 'firstname',
      lastname: 'lastname',
      othernames: 'other',
      username: 'anewusername',
      phonenumber: '0123456789',
      password: 'abcdef',
      email: 'test@domain.com',
    };
    const dataNoFirstName = {
      lastname: 'lastname',
      othernames: 'other',
      username: 'anewusername',
      phonenumber: '0123456789',
      password: 'abcdef',
      email: 'test@domain.com',
     };
    const dataNoLastName = {
      firstname: 'firstname',
      othernames: 'other',
      username: 'anewusername',
      phonenumber: '0123456789',
      password: 'abcdef',
      email: 'test@domain.com',
      };
    const dataNoOtherNames = {
      firstname: 'firstname',
      lastname: 'lastname',
      username: 'anewusername',
      phonenumber: '0123456789',
      password: 'abcdef',
      email: 'test@domain.com',
      };
    const dataNoUsername = {
      firstname: 'firstname',
      lastname: 'lastname',
      othernames: 'other',
      phonenumber: '0123456789',
      password: 'abcdef',
      email: 'test@domain.com',
     };
    const dataNoPassword = {
      firstname: 'firstname',
      lastname: 'lastname',
      othernames: 'other',
      phonenumber: '0123456789',
      username: 'abcdef',
      email: 'test@domain.com',
     };
    const dataNoEmail= {
      firstname: 'firstname',
      lastname: 'lastname',
      othernames: 'other',
      phonenumber: '0123456789',
      password: 'abcdef',
      username: 'test@domain.com',
     };
    const dataFirstNameInvalid= {
      firstname: 'firstname123',
      lastname: 'lastname',
      othernames: 'other',
      username: 'anewusername',
      phonenumber: '0123456789',
      password: 'abcdef',
      email: 'test@domain.com',
    };
    const dataLastNameInvalid= {
      firstname: 'firstname',
      lastname: 'lastname123',
      othernames: 'other',
      username: 'anewusername',
      phonenumber: '0123456789',
      password: 'abcdef',
      email: 'test@domain.com',
    };
    const dataOtherNamesInvalid= {
      firstname: 'firstname',
      lastname: 'lastname',
      othernames: 'othersdf1212',
      username: 'anewusername',
      phonenumber: '0123456789',
      password: 'abcdef',
      email: 'test@domain.com',
    };
    const dataEmailInvalid= {
      firstname: 'firstname',
      lastname: 'lastname',
      othernames: 'othersdf',
      username: 'anewusername',
      phonenumber: '0123456789',
      password: 'abcdef',
      email: 'testdomain.com',
    };
    const dataEmailExists= {
      firstname: 'firstname',
      lastname: 'lastname',
      othernames: 'othersdf',
      username: 'anewusername',
      phonenumber: '0123456789',
      password: 'abcdef',
      email: 'jessam@joyson.com',
    };
    const dataUsernameExists= {
      firstname: 'firstname',
      lastname: 'lastname',
      othernames: 'othersdf',
      username: 'lannister',
      phonenumber: '0123456789',
      password: 'abcdef',
      email: 'jessam@joyson.com',
    };
    it('Should return 201 for content created', async () => {
      await supertest(appInstance)
        .post('/api/v1/auth/signup')
        .send(data)
        .set('content-type', 'application/json')
        .expect((res) => {
          expect(res.statusCode).toBe(201);
        });
    });

    it('Should return 400 for invalid data', async () => {
      await supertest(appInstance)
        .post('/api/v1/auth/signup')
        .send()
        .set('content-type', 'application/json')
        .expect((res) => {
          expect(res.statusCode).toBe(400);
        });
    });
    it('Should return 400 for no firstname', async () => {
      await supertest(appInstance)
        .post('/api/v1/auth/signup')
        .send(dataNoFirstName)
        .set('content-type', 'application/json')
        .expect((res) => {
          expect(res.statusCode).toBe(400);
        });
    });
    it('Should return 400 for no lastname', async () => {
      await supertest(appInstance)
        .post('/api/v1/auth/signup')
        .send(dataNoLastName)
        .set('content-type', 'application/json')
        .expect((res) => {
          expect(res.statusCode).toBe(400);
        });
    });
    it('Should return 400 for no othernames', async () => {
      await supertest(appInstance)
        .post('/api/v1/auth/signup')
        .send(dataNoOtherNames)
        .set('content-type', 'application/json')
        .expect((res) => {
          expect(res.statusCode).toBe(400);
        });
    });
    it('Should return 400 for no password', async () => {
      await supertest(appInstance)
        .post('/api/v1/auth/signup')
        .send(dataNoPassword)
        .set('content-type', 'application/json')
        .expect((res) => {
          expect(res.statusCode).toBe(400);
        });
    });
    it('Should return 400 for no email', async () => {
      await supertest(appInstance)
        .post('/api/v1/auth/signup')
        .send(dataNoEmail)
        .set('content-type', 'application/json')
        .expect((res) => {
          expect(res.statusCode).toBe(400);
        });
    });
    it('Should return 400 for no username', async () => {
      await supertest(appInstance)
        .post('/api/v1/auth/signup')
        .send(dataNoUsername)
        .set('content-type', 'application/json')
        .expect((res) => {
          expect(res.statusCode).toBe(400);
        });
    });
    it('Should return 422 for invalid firstname', async () => {
      await supertest(appInstance)
        .post('/api/v1/auth/signup')
        .send(dataFirstNameInvalid)
        .set('content-type', 'application/json')
        .expect((res) => {
          expect(res.statusCode).toBe(422);
        });
    });
    it('Should return 422 for invalid lastname', async () => {
      await supertest(appInstance)
        .post('/api/v1/auth/signup')
        .send(dataLastNameInvalid)
        .set('content-type', 'application/json')
        .expect((res) => {
          expect(res.statusCode).toBe(422);
        });
    });
    it('Should return 422 for invalid othernames', async () => {
      await supertest(appInstance)
        .post('/api/v1/auth/signup')
        .send(dataOtherNamesInvalid)
        .set('content-type', 'application/json')
        .expect((res) => {
          expect(res.statusCode).toBe(422);
        });
    });
    it('Should return 422 for invalid Email', async () => {
      await supertest(appInstance)
        .post('/api/v1/auth/signup')
        .send(dataEmailInvalid)
        .set('content-type', 'application/json')
        .expect((res) => {
          expect(res.statusCode).toBe(422);
        });
    });
    it('Should return 409 for Email exists', async () => {
      await supertest(appInstance)
        .post('/api/v1/auth/signup')
        .send(dataEmailExists)
        .set('content-type', 'application/json')
        .expect((res) => {
          expect(res.statusCode).toBe(409);
        });
    });
    it('Should return 409 for Username exists', async () => {
      await supertest(appInstance)
        .post('/api/v1/auth/signup')
        .send(dataUsernameExists)
        .set('content-type', 'application/json')
        .expect((res) => {
          expect(res.statusCode).toBe(409);
        });
    });
  });

  describe('POST /api/v1/auth/login', () => {
    const data = { email: 'jessam@joyson.com', password: 'abcdef' };
    const dataOnlySpaces = { email: '  ', password: '  ' };
    const dataNoEmail = { password: 'abcdef'};
    const dataNoPassword = { email: 'jessam@joyson.com' };
    const dataEmailInvalid = { email: 'jessam12312@joyson.com', password: 'abcdef' };
    const dataPasswordInvalid = { email: 'jessam@joyson.com', password: '121345' };

    it('should return 200 for successful request', async () => {
      await supertest(appInstance)
        .post('/api/v1/auth/login')
        .send(data)
        .set('content-type', 'application/json')
        .expect((res) => {
          expect(res.statusCode).toBe(200);
        });
    });

    it('should return 404 for only spaces', async () => {
      await supertest(appInstance)
        .post('/api/v1/auth/login')
        .send(dataOnlySpaces)
        .set('content-type', 'application/json')
        .expect((res) => {
          expect(res.statusCode).toBe(400);
        });
    });
    it('should return 400 for no email', async () => {
      await supertest(appInstance)
        .post('/api/v1/auth/login')
        .send(dataNoEmail)
        .set('content-type', 'application/json')
        .expect((res) => {
          expect(res.statusCode).toBe(400);
        });
    });
    it('should return 400 for no password', async () => {
      await supertest(appInstance)
        .post('/api/v1/auth/login')
        .send(dataNoPassword)
        .set('content-type', 'application/json')
        .expect((res) => {
          expect(res.statusCode).toBe(400);
        });
    });
    it('should return 400 for invalid email', async () => {
      await supertest(appInstance)
        .post('/api/v1/auth/login')
        .send(dataEmailInvalid)
        .set('content-type', 'application/json')
        .expect((res) => {
          expect(res.statusCode).toBe(400);
        });
    });
    it('should return 400 for no invalid password', async () => {
      await supertest(appInstance)
        .post('/api/v1/auth/login')
        .send(dataPasswordInvalid)
        .set('content-type', 'application/json')
        .expect((res) => {
          expect(res.statusCode).toBe(400);
        });
    });
  });


});
