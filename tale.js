function kolobok(character) {
  const name = character.toLowerCase()

  const actions = {
    'дедушка': 'Я от дедушки ушёл',
    'заяц': 'Я от зайца ушёл',
    'лиса': 'Меня съели'
  };

  if (actions.hasOwnProperty(name)) {
    return actions[name]
  } else {
    return 'Колобок не знает этого персонажа'
  }
}
console.log(kolobok('дедушка'))
console.log(kolobok('заяц'))
console.log(kolobok('лиса'))
console.log(kolobok('волк'))
function newYear(character) {
  const name = character.toLowerCase();

  if (name === 'дед мороз') {
    return 'Дед Мороз! Дед Мороз! Дед Мороз!'
  } else if (name === 'снегурочка') {
    return 'Снегурочка! Снегурочка! Снегурочка!'
  } else {
    return 'Новый год не узнаёт этого персонажа'
  }
}
console.log(newYear('Дед Мороз'))
console.log(newYear('Снегурочка'))
console.log(newYear('Ёлка'))