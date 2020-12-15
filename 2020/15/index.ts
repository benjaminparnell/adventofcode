const input = [14, 1, 17, 0, 3, 20];

const addInIndex = (
  map: Map<number, number[]>,
  value: number,
  turnNumber: number
) => {
  const turns = map.get(value);

  if (turns) {
    return [turns[turns.length - 1], turnNumber];
  }

  return [turnNumber];
};

const playTheGameToTurn = (lastTurnNumber: number) => {
  const map = new Map<number, number[]>();

  input.forEach((number, index) => {
    map.set(number, [index + 1]);
  });

  let turnNumber = input.length + 1;
  let lastNumber = input[input.length - 1];

  while (turnNumber <= lastTurnNumber) {
    const turnsSpoken = map.get(lastNumber);
    const spokenCount = turnsSpoken?.length;
    if (spokenCount > 1) {
      const newNumber = turnNumber - turnsSpoken[turnsSpoken.length - 2] - 1;
      map.set(newNumber, addInIndex(map, newNumber, turnNumber));
      lastNumber = newNumber;
    } else {
      map.set(0, addInIndex(map, 0, turnNumber));
      lastNumber = 0;
    }
    turnNumber++;
  }

  return lastNumber;
};

console.log("Part one:", playTheGameToTurn(2020));
console.log("Part two:", playTheGameToTurn(30000000));
