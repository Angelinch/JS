import { generateToken } from '../controllers/authController';
import { getUser, deleteUser } from '../controllers/userController';
import { authData } from '../config';
import request, { Response } from 'supertest';

const api = request('https://demoqa.com');

describe('API Tests for Bookstore DemoQA', () => {
  let userId: string;
  let token: string;
  const uniqueUser = { userName: `${authData.userName}_${Date.now()}`, password: authData.password };

  beforeAll(async () => {
    const createRes: Response = await api.post('/Account/v1/User').send(uniqueUser);
    if (![200, 201].includes(createRes.status)) throw new Error(`Не удалось создать пользователя: ${createRes.status}`);
    userId = createRes.body.userID || createRes.body.userId;

    const tokenRes: Response = await generateToken(uniqueUser.userName, uniqueUser.password);
    if (!tokenRes.body.token) throw new Error('Не удалось получить токен');
    token = tokenRes.body.token;
  }, 30000);

  afterAll(async () => {
    await deleteUser(userId, token);
  }, 30000);

  test('Authorization should return token', async () => {
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(0);
  }, 30000);

  test('Get user info', async () => {
    const res: Response = await getUser(userId, token);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('userId', userId);
    expect(res.body).toHaveProperty('username', uniqueUser.userName);
    expect(Array.isArray(res.body.books)).toBe(true);
  }, 30000);

  test('Delete user', async () => {
    const res: Response = await deleteUser(userId, token);
    expect([200, 204]).toContain(res.status);
  }, 30000);
});
