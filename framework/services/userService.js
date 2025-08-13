const request = require('supertest')
const { baseURL } = require('../config')

const api = request(baseURL)

async function createUser(userName, password) {
  const res = await api
    .post('/Account/v1/User')
    .send({ userName, password })

  return {
    status: res.status,
    userId: res.body.userID
  };
}

async function getUser(userId, token) {
  const res = await api
    .get(`/Account/v1/User/${userId}`)
    .set('Authorization', `Bearer ${token}`);

  return {
    status: res.status,
    body: res.body
  }
}

async function deleteUser(userId, token) {
  const res = await api
    .delete(`/Account/v1/User/${userId}`)
    .set('Authorization', `Bearer ${token}`);

  return {
    status: res.status,
    body: res.body
  }
}

module.exports = { createUser, getUser, deleteUser }
