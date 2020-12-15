const input = [14, 1, 17, 0, 3, 20];
const numbersSpoken = [...input];

const count = (array: number[], target: number): number =>
  array.reduce((memo, a) => memo + (a === target ? 1 : 0), 0);

while (numbersSpoken.length !== 2020) {
  const lastNumber = numbersSpoken[numbersSpoken.length - 1];
  const spokenCount = count(numbersSpoken, lastNumber);

  if (spokenCount > 1) {
    const index =
      numbersSpoken.slice(0, numbersSpoken.length - 1).lastIndexOf(lastNumber) +
      1;
    numbersSpoken.push(numbersSpoken.length - index);
  } else {
    numbersSpoken.push(0);
  }
}

console.log("Part one:", numbersSpoken[numbersSpoken.length - 1]);
