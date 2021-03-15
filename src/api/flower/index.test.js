import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Flower } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, flower

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  flower = await Flower.create({})
})

test('POST /flowers 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, name: 'test', colour: 'test', price: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.colour).toEqual('test')
  expect(body.price).toEqual('test')
})

test('POST /flowers 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /flowers 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /flowers 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /flowers 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /flowers 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /flowers/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${flower.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(flower.id)
})

test('GET /flowers/:id 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${flower.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /flowers/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${flower.id}`)
  expect(status).toBe(401)
})

test('GET /flowers/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})

test('PUT /flowers/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${flower.id}`)
    .send({ access_token: adminSession, name: 'test', colour: 'test', price: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(flower.id)
  expect(body.name).toEqual('test')
  expect(body.colour).toEqual('test')
  expect(body.price).toEqual('test')
})

test('PUT /flowers/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${flower.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /flowers/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${flower.id}`)
  expect(status).toBe(401)
})

test('PUT /flowers/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, name: 'test', colour: 'test', price: 'test' })
  expect(status).toBe(404)
})

test('DELETE /flowers/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${flower.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /flowers/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${flower.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /flowers/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${flower.id}`)
  expect(status).toBe(401)
})

test('DELETE /flowers/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
