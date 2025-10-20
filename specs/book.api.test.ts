import { createBook, updateBook, getBook, deleteBook } from '../controllers/bookController';
import { generateToken } from '../controllers/authController';
import { getUser, deleteUser } from '../controllers/userController';
import { authData } from '../config';
import request, { Response } from 'supertest';

const api = request('https://demoqa.com');

const retry = async (fn: () => Promise<Response>, attempts = 3, delay = 1000): Promise<Response> => {
  let lastError;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      await new Promise(r => setTimeout(r, delay));
    }
  }
  throw lastError;
};

describe('Bookstore API Tests', () => {
  let userId: string;
  let token: string;
  let initialIsbn: string;
  let newIsbn: string;

  const uniqueUser = { userName: `${authData.userName}_${Date.now()}`, password: authData.password };

  beforeAll(async () => {
    // Создаем пользователя
    const createRes: Response = await api.post('/Account/v1/User').send(uniqueUser);
    if (![200, 201].includes(createRes.status)) throw new Error(`Не удалось создать пользователя: ${createRes.status}`);
    userId = createRes.body.userID || createRes.body.userId;

    // Генерируем токен
    const tokenRes: Response = await generateToken(uniqueUser.userName, uniqueUser.password);
    if (!tokenRes.body.token) throw new Error('Не удалось получить токен');
    token = tokenRes.body.token;

    // Получаем книги
    const booksRes: Response = await api.get('/BookStore/v1/Books');
    if (booksRes.status !== 200) throw new Error('Не удалось получить книги');
    initialIsbn = booksRes.body.books[0].isbn;
    newIsbn = booksRes.body.books[1].isbn;
  }, 30000);

  afterAll(async () => {
    await deleteUser(userId, token);
  }, 30000);

  test('Создание книги', async () => {
    const res = await createBook(userId, initialIsbn, token);
    expect([200, 201]).toContain(res.status);
    expect(res.body.books[0].isbn).toBe(initialIsbn);
  }, 30000);

  test('Обновление книги (смена ISBN)', async () => {
    const res = await updateBook(initialIsbn, userId, newIsbn, token);
    expect(res.status).toBe(200);
    expect(res.body.books.some((b: { isbn: string }) => b.isbn === newIsbn)).toBe(true);
  }, 30000);

  test('Получение информации о книге', async () => {
    const res = await getBook(newIsbn);
    if (res.status === 502) {
      // retry один раз на случай временного сбоя сервера
      const retryRes = await retry(() => getBook(newIsbn));
      expect(retryRes.status).toBe(200);
      expect(retryRes.body.isbn).toBe(newIsbn);
      return;
    }
    expect(res.status).toBe(200);
    expect(res.body.isbn).toBe(newIsbn);
  }, 30000);

  test('Удаление книги', async () => {
    await createBook(userId, newIsbn, token);
    const res = await deleteBook(userId, newIsbn, token);
    if (res.status === 502) {
      const retryRes = await retry(() => deleteBook(userId, newIsbn, token));
      expect([200, 204]).toContain(retryRes.status);
      return;
    }
    expect([200, 204]).toContain(res.status);
  }, 30000);
});
