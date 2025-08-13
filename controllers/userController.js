const request = require('supertest');
const { baseURL } = require('../config');

const api = request(baseURL);

async function getUser(userId, token = '') {
  return api.get(`/Account/v1/User/${userId}`).set('Authorization', `Bearer ${token}`);
}

async function deleteUser(userId, token = '') {
  return api.delete(`/Account/v1/User/${userId}`).set('Authorization', `Bearer ${token}`);
}

module.exports = { getUser, deleteUser };
