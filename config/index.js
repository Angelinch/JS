module.exports = {
  baseURL: 'https://bookstore.demoqa.com',
  authData: {
    userName: `user_${Date.now()}`, // уникальный логин
    password: 'Qwerty123!'          // по требованиям API: минимум 8 символов, заглавная буква, цифра
  }
}
