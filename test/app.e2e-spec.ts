import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/products (GET):retorna array de productos',async ()=>{
    const req=await request(app.getHttpServer())
    .get('/products');
    expect(req.status).toBe(200)
    expect(req.body).toBeInstanceOf(Array)
  });

  it('',()=>{

  });

  it('/auth/signup (POST):crea un usuario',async ()=>{
    const uniqueEmail = `test${Date.now()}@example.com`;
    const req = await request(app.getHttpServer())
        .post('/auth/signup')
        .send({
            email: uniqueEmail,
            name: "test test",
            address: "test test ",
            phone: 55555555,
            country: "test test",
            city: "test test",
            password:"Te$t1985",
            confirmPsw:"Te$t1985",
            isAdmin:""
        });
    expect(req.status).toBe(201)
  });
  it('/categories (GET): retorna  el array categorías', async () => {
    const req = await request(app.getHttpServer())
        .get('/categories')
        expect(req.status).toBe(200)
        expect(req.body).toBeInstanceOf(Array)
});

});
