const request = require('supertest')

const BASE_URL = 'https://bookstore.demoqa.com'
const sleep = (ms) => new Promise(r => setTimeout(r, ms))
const generateUsername = () => `User_${Date.now()}_${Math.floor(Math.random() * 100000)}`
const validPassword = 'Password123!'

describe('API тесты Bookstore', () => {
  let createdUser = { username: '', password: validPassword };

  test('Создание пользователя с ошибкой — логин уже используется', async () => {
    const username = generateUsername()
    createdUser.username = username

    // Первый запрос — создаём пользователя
    const first = await request(BASE_URL)
      .post('/Account/v1/User')
      .set('Content-Type', 'application/json')
      .send({ userName: username, password: validPassword })

    expect(first.status).toBe(201)

    // Ждём фиксации в базе
    await sleep(300)

    // Второй запрос — тот же логин
    const res = await request(BASE_URL)
      .post('/Account/v1/User')
      .set('Content-Type', 'application/json')
      .send({ userName: username, password: validPassword })

    console.log('Ответ API:', res.status, res.body)

    expect(res.status).toBe(406)
    expect(res.body.code).toBe('1204')
    expect(res.body.message).toMatch(/User exists/i)
  })

  test('Создание пользователя с ошибкой — пароль не подходит', async () => {
    const res = await request(BASE_URL)
      .post('/Account/v1/User')
      .set('Content-Type', 'application/json')
      .send({
        userName: generateUsername(),
        password: '123'
      });

    console.log('Ответ API:', res.status, res.body);

    expect(res.status).toBe(400)
    expect(res.body.code).toBe('1300')
    expect(res.body.message).toMatch(/Password/);
  })

  test('Создание пользователя успешно', async () => {
    const username = generateUsername()
    createdUser.username = username

    const res = await request(BASE_URL)
      .post('/Account/v1/User')
      .set('Content-Type', 'application/json')
      .send({ userName: username, password: validPassword })

    console.log('Ответ API:', res.status, res.body)

    expect(res.status).toBe(201);
    expect(res.body.username).toBe(username)
  });

  test('Генерация токена с ошибкой', async () => {
    const res = await request(BASE_URL)
      .post('/Account/v1/GenerateToken')
      .set('Content-Type', 'application/json')
      .send({
        userName: 'nonexistentUser',
        password: 'wrongPassword123!'
      });

    console.log('Ответ API:', res.status, res.body)

    expect([200, 400]).toContain(res.status)
    expect(res.body.status).toBe('Failed')
    expect(res.body.result).toMatch(/authorization failed/i)
  })

  test('Генерация токена успешно', async () => {
    // Создадим юзера, если нет
    if (!createdUser.username) {
      createdUser.username = generateUsername()
      await request(BASE_URL)
        .post('/Account/v1/User')
        .set('Content-Type', 'application/json')
        .send({
          userName: createdUser.username,
          password: createdUser.password
        })
    }

    const res = await request(BASE_URL)
      .post('/Account/v1/GenerateToken')
      .set('Content-Type', 'application/json')
      .send({
        userName: createdUser.username,
        password: createdUser.password
      })

    console.log('Ответ API:', res.status, res.body)

    expect(res.status).toBe(200)
    expect(res.body.status).toBe('Success')
    expect(res.body.token).not.toBeNull()
  })
})
