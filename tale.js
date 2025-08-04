function kolobok(character) {
  const name = character.toLowerCase();

  const actions = {
    'дедушка': 'Я от дедушки ушёл',
    'заяц': 'Я от зайца ушёл',
    'лиса': 'Меня съели'
  };

  if (actions.hasOwnProperty(name)) {
    return actions[name];
  } else {
    return 'Колобок не знает этого персонажа';
  }
}
console.log(kolobok('дедушка'));
console.log(kolobok('заяц'));
console.log(kolobok('лиса'));
console.log(kolobok('волк'));
