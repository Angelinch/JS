import { createBook, updateBook, getBook, deleteBook } from '../controllers/bookController';
import { generateToken } from '../controllers/authController';
import { retry } from '../utils/retry';
import { Response } from 'supertest';

describe('Bookstore API Tests', () => {
  let userId = '';          // Здесь укажи ID пользователя из DemoQA
  let token = '';
  const initialIsbn = '9781449325862';
  const newIsbn = '9781449331818';
  const username = 'yourDemoQAUser';
  const password = 'yourPassword';

  // Генерация токена перед всеми тестами
  beforeAll(async () => {
    const tokenRes: Response = await generateToken(username, password);
    if (!tokenRes.body.token) throw new Error('Не удалось получить токен');
    token = tokenRes.body.token;
    userId = tokenRes.body.userId || userId; // если API возвращает userId вместе с токеном
    console.log('TOKEN:', token, 'USER ID:', userId);
  }, 30000);

  test('Создание книги', async () => {
    const res = await retry(() => createBook(userId, initialIsbn, token));
    expect([200, 201]).toContain(res.status);
    expect(res.body).toHaveProperty('books');
  }, 30000);

  test('Обновление книги (смена ISBN)', async () => {
    const res = await retry(() => updateBook(initialIsbn, userId, newIsbn, token));
    expect([200, 204]).toContain(res.status);
    if (res.status === 200) {
      expect(res.body.books.some((b: { isbn: string }) => b.isbn === newIsbn)).toBe(true);
    }
  }, 30000);

  test('Получение информации о книге', async () => {
    const res = await retry(() => getBook(newIsbn));
    expect(res.status).toBe(200);
    expect(res.body.isbn).toBe(newIsbn);
  }, 30000);

  test('Удаление книги', async () => {
    const res = await retry(() => deleteBook(userId, newIsbn, token));
    expect([200, 204]).toContain(res.status);
  }, 30000);
});
