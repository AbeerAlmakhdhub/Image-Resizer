import supertest from 'supertest';
import { promises as fs } from 'fs';
import app from '../index';
import file from './../file';
import path from 'path';

const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('Test responses status', function () {
  describe('@GET /', function () {
    it('@GET /', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/');
      expect(response.status).toBe(200);
    });
  });

  it('@GET /api/images', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/api/images');

    expect(response.status).toBe(200);
  });
});

describe('@GET /api/images', function () {
  it('@GET /api/images?imageName=lake => valid image parameter', async (): Promise<void> => {
    const response: supertest.Response = await request.get(
      '/api/images?imageName=lake'
    );
    expect(response.status).toBe(200);
  });

  it('@GET /api/images?imageName=bike&width=200&height=400 => valid parameters to resize', async (): Promise<void> => {
    const response: supertest.Response = await request.get(
      '/api/images?imageName=bike&width=200&height=400'
    );
    expect(response.status).toBe(200);
  });
});

describe('Failure senarios', (): void => {
  it('Should return 404 for invalid endpoint', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/failure');
    expect(response.status).toBe(404);
  });

  it('Should return 404 for invalid endpoint', async (): Promise<void> => {
    const response: supertest.Response = await request.get(
      '/api/image/nonExisitnge'
    );
    expect(response.status).toBe(404);
  });

  it('@GET /api/images?imageName=river&width=600&height=0 => Height of zero', async (): Promise<void> => {
    const response: supertest.Response = await request.get(
      '/api/images?imageName=river&width=600&height=0'
    );
    expect(response.status).toBe(200);
  });
});

//Clear Chache
afterAll(async (): Promise<void> => {
  const resizedImagePath: string = path.resolve(
    file.imagesThumbPath,
    'bike-200x400.jpg'
  );

  try {
    await fs.access(resizedImagePath);
    fs.unlink(resizedImagePath);
  } catch {
    //Empty
  }
});
