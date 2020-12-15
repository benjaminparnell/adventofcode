const input = [14, 1, 17, 0, 3, 20];

const map = new Map<number, number[]>();

input.forEach((number, index) => {
  map.set(number, [index + 1]);
});

let turnNumber = input.length + 1;
let lastNumber = input[input.length - 1];

while (turnNumber <= 30000000) {
  const turnsSpoken = map.get(lastNumber);
  const spokenCount = turnsSpoken?.length;
  if (spokenCount > 1) {
    const newNumber = turnNumber - turnsSpoken[turnsSpoken.length - 2] - 1;
    map.set(
      newNumber,
      map.has(newNumber)
        ? map.get(newNumber).concat([turnNumber])
        : [turnNumber]
    );
    lastNumber = newNumber;
  } else {
    map.set(0, map.has(0) ? map.get(0).concat([turnNumber]) : [turnNumber]);
    lastNumber = 0;
  }
  turnNumber++;
}

console.log(map);

console.log("Part one:", lastNumber);
