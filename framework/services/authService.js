const request = require('supertest')
const { baseURL } = require('../config')

const api = request(baseURL);

async function generateToken(userName, password) {
  const res = await api
    .post('/Account/v1/GenerateToken')
    .send({ userName, password });

  return {
    status: res.status,
    token: res.body.token
  }
}

async function authorize(userName, password) {
  const res = await api
    .post('/Account/v1/Authorized')
    .send({ userName, password })

  return {
    status: res.status,
    isAuthorized: res.body
  };
}

module.exports = { generateToken, authorize }
