const request = require('supertest');
const { baseURL, authData } = require('../config');

const api = request(baseURL);

describe('API Tests for Bookstore DemoQA', () => {
  let userId;
  let token;

  beforeAll(async () => {
    // 1. Создаем пользователя
    const createRes = await api
      .post('/Account/v1/User')
      .send({
        userName: authData.userName,
        password: authData.password
      });

    expect(createRes.status).toBe(201); // Created
    userId = createRes.body.userID;

    // 2. Получаем токен
    const tokenRes = await api
      .post('/Account/v1/GenerateToken')
      .send({
        userName: authData.userName,
        password: authData.password
      });

    expect(tokenRes.status).toBe(200);
    token = tokenRes.body.token;
  });

  test('Authorization should return true', async () => {
    const res = await api
      .post('/Account/v1/Authorized')
      .send({
        userName: authData.userName,
        password: authData.password
      });

    expect(res.status).toBe(200);
    expect(res.body).toBe(true);
  });

  test('Get user info', async () => {
    const res = await api
      .get(`/Account/v1/User/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('userId', userId);
    expect(res.body).toHaveProperty('username', authData.userName);
    expect(Array.isArray(res.body.books)).toBe(true);
  });

  test('Delete user', async () => {
    const res = await api
      .delete(`/Account/v1/User/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect([200, 204]).toContain(res.status);

    if (res.status === 200) {
      expect(res.body).toHaveProperty('code', 0);
      expect(res.body).toHaveProperty('message');
    }
  });
});
