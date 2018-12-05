const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8").trim();

function scanPolymerTaskOne(polymer) {
  let currentPolymer = polymer;
  let index = 0;
  let operationThisRun;

  while (operationThisRun !== false) {
    const currentCharacter = currentPolymer[index];
    const nextCharacter = currentPolymer[index + 1];
    const currentCharacterCode = currentCharacter.charCodeAt(0);
    const nextCharacterCode = nextCharacter.charCodeAt(0);

    if (currentCharacter.toUpperCase() === nextCharacter.toUpperCase() && currentCharacterCode !== nextCharacterCode) {
      currentPolymer = currentPolymer.substr(0, index) + currentPolymer.substr(index + 2);
      operationThisRun = true;
    }

    if (index + 1 > currentPolymer.length - 2) {
      index = 0;
      if (operationThisRun === null) {
        operationThisRun = false;
      } else {
        operationThisRun = null;
      }
    } else {
      index++;
    }
  }

  return currentPolymer;
}

function scanPolymerTaskTwo(polymer) {
  const characterMap = polymer.split('').reduce((map, character) => {
    map[character.toLowerCase()] = true;
    return map;
  }, {})

  let shortestPolymerLength;

  Object.keys(characterMap).forEach(character => {
    const modifiedPolymer = polymer.split('').filter(c => c !== character.toUpperCase() && c !== character).join('');
    const scannedLength = scanPolymerTaskOne(modifiedPolymer).length;
    if (!shortestPolymerLength || scannedLength < shortestPolymerLength) {
      shortestPolymerLength = scannedLength;
    }
  });

  return shortestPolymerLength;
}

console.log(scanPolymerTaskOne(input).length);
console.log(scanPolymerTaskTwo(input));
