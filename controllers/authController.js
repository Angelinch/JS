const request = require('supertest')
const { baseURL } = require('../config')

const api = request(baseURL)

async function authorize(userName, password) {
  return api.post('/Account/v1/Authorized').send({ userName, password })
}

module.exports = { authorize }
