const { nameIsValid, fullTrim, getTotal } = require('../src/app');

describe('nameIsValid', () => {
  test('должно вернуть true для "alex"', () => {
    expect(nameIsValid('alex')).toBe(true)
  });

  test('должно вернуть false для короткого имени', () => {
    expect(nameIsValid('a')).toBe(false)
  });

  test('должно вернуть false для имени с цифрами', () => {
    expect(nameIsValid('alex123')).toBe(false)
  })
})

describe('fullTrim', () => {
  test('удаляет все пробелы', () => {
    expect(fullTrim('a b c')).toBe('abc')
  });

  test('удаляет табы и переносы строк', () => {
    expect(fullTrim('a\tb\nc')).toBe('abc')
  })

  test('работает с пустой строкой', () => {
    expect(fullTrim('')).toBe('')
  })
})

describe('getTotal', () => {
  test.each([
    [[{ price: 10, quantity: 1 }], 0, 10],
    [[{ price: 10, quantity: 10 }], 10, 90],
    [[{ price: 5, quantity: 2 }, { price: 15, quantity: 1 }], 0, 25]
  ])('считает сумму заказа %j с скидкой %i%', (items, discount, expected) => {
    expect(getTotal(items, discount)).toBeCloseTo(expected)
  })

  test('выбрасывает ошибку при неправильной скидке', () => {
    expect(() => getTotal([], 'abc')).toThrow('Скидка должна быть числом');
  })

  test('выбрасывает ошибку при скидке > 99', () => {
    expect(() => getTotal([], 100)).toThrow('Процент скидки должен быть от 0 до 99')
  })
})