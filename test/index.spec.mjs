import request from 'supertest';
import { expect } from 'chai';
import jsYaml from 'js-yaml';
import fs from 'fs';
import appRoot from 'app-root-path';
import { OpenApiValidator } from 'express-openapi-validate';

const openApiDocument = jsYaml.load(fs.readFileSync(`${appRoot}/api.yaml`, 'utf-8'));
const validator = new OpenApiValidator(openApiDocument, {});

import app from '../server.js';

describe('API Test', function () {
  const validateResponse1Get = validator.validateResponse('get', '/api/resource1');
  const validateResponse1Post = validator.validateResponse('post', '/api/resource1');
  const validateResponse2Get = validator.validateResponse('get', '/api/resource2');
  const validateResponse2Post = validator.validateResponse('post', '/api/resource2');

  it('should return a valid response for resource1 (GET)', async function () {
    const res = await request(app).get('/api/resource1').expect(200);
    expect(validateResponse1Get(res)).to.be.undefined;
  });

  it('should return a valid response for resource1 (POST)', async function () {
    const postData = { data: { name: 'New Resource 1', value: 42 } };
    const res = await request(app)
      .post('/api/resource1')
      .send(postData)
      .expect(201);
    expect(validateResponse1Post(res)).to.be.undefined;
    expect(res.body.data).to.deep.equal(postData.data);
  });

  it('should return a valid response for resource2 (GET)', async function () {
    const res = await request(app).get('/api/resource2').expect(200);
    expect(validateResponse2Get(res)).to.be.undefined;
  });

  it('should return a valid response for resource2 (POST)', async function () {
    const postData = { data: { title: 'New Resource 2', description: 'Some description' } };
    const res = await request(app)
      .post('/api/resource2')
      .send(postData)
      .expect(201);
    expect(validateResponse2Post(res)).to.be.undefined;
    expect(res.body.data).to.deep.equal(postData.data);
  });
});
