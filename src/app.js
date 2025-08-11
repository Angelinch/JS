const nameIsValid = name => typeof name === 'string' && name.length >= 2 && /^[a-z]+$/.test(name)

const fullTrim = text => (text ?? '').replace(/\s+/g, '')

const getTotal = (items = [], discount = 0) => {
  if (typeof discount !== 'number') throw new Error('Скидка должна быть числом')
  if (discount < 0 || discount >= 100) throw new Error('Процент скидки должен быть от 0 до 99')
  const total = items.reduce((acc, { price, quantity }) => acc + price * quantity, 0)
  return total * (1 - discount / 100)
}

module.exports = {
  nameIsValid,
  fullTrim,
  getTotal
}
// src/app.js
function getScore(scores) {
  // Получаем все значения из объекта (баллы)
  const values = Object.values(scores);
  // Суммируем все баллы и возвращаем результат
  return values.reduce((acc, curr) => acc + curr, 0)
}

const scores = {
  Anna: 10,
  Olga: 1,
  Ivan: 5,
};

console.log(getScore(scores)); // Ожидаем 16
