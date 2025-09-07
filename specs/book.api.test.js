const { baseURL, authData } = require('../config');
const request = require('supertest');

const api = request(baseURL);

// хелперы для работы с книгами
async function createBook(userId, isbn, token) {
  return api
    .post('/BookStore/v1/Books')
    .set('Authorization', `Bearer ${token}`)
    .send({
      userId,
      collectionOfIsbns: [{ isbn }]
    });
}

async function updateBook(isbn, userId, newIsbn, token) {
  return api
    .put(`/BookStore/v1/Books/${isbn}`)
    .set('Authorization', `Bearer ${token}`)
    .send({ userId, isbn: newIsbn });
}

async function getBook(isbn) {
  return api.get(`/BookStore/v1/Book?ISBN=${isbn}`);
}

async function deleteBook(userId, isbn, token) {
  return api
    .delete('/BookStore/v1/Book')
    .set('Authorization', `Bearer ${token}`)
    .send({ userId, isbn });
}

describe('Bookstore API Tests', () => {
  let userId;
  let token;
  let initialIsbn;
  let newIsbn;

  beforeAll(async () => {
    // создаем пользователя
    const createRes = await api.post('/Account/v1/User').send(authData);
    expect(createRes.status).toBe(201);
    userId = createRes.body.userID;

    // генерируем токен
    const tokenRes = await api.post('/Account/v1/GenerateToken').send(authData);
    expect(tokenRes.status).toBe(200);
    token = tokenRes.body.token;

    // получаем список доступных книг
    const booksRes = await api.get('/BookStore/v1/Books');
    expect(booksRes.status).toBe(200);

    // выбираем первые две книги из списка
    initialIsbn = booksRes.body.books[0].isbn;
    newIsbn = booksRes.body.books[1].isbn;

    console.log(`Выбраны ISBN: initial=${initialIsbn}, new=${newIsbn}`);
  }, 30000);

  afterAll(async () => {
    await api
      .delete(`/Account/v1/User/${userId}`)
      .set('Authorization', `Bearer ${token}`);
  }, 30000);

  test('Создание книги', async () => {
    const res = await createBook(userId, initialIsbn, token);
    console.log('Создание книги:', res.status, res.body);

    expect(res.status).toBe(201);
    expect(Array.isArray(res.body.books)).toBe(true);
    expect(res.body.books[0].isbn).toBe(initialIsbn);
  }, 30000);

  test('Обновление книги (смена ISBN)', async () => {
    const res = await updateBook(initialIsbn, userId, newIsbn, token);
    console.log('Обновление книги:', res.status, res.body);

    expect(res.status).toBe(200);
    expect(res.body.books.some(b => b.isbn === newIsbn)).toBe(true);
  }, 30000);

  test('Получение информации о книге', async () => {
    const res = await getBook(newIsbn);
    console.log('Инфо о книге:', res.status, res.body);

    expect(res.status).toBe(200);
    expect(res.body.isbn).toBe(newIsbn);
  }, 30000);

  test('Удаление книги', async () => {
    // сначала добавляем книгу, если её ещё нет
    await createBook(userId, newIsbn, token);

    const res = await deleteBook(userId, newIsbn, token);
    console.log('Удаление книги:', res.status, res.body);

    expect([204, 200]).toContain(res.status);
  }, 30000);
});
