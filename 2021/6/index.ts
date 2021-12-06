import fs from "fs";
import path from "path";

const lines = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .split("\n")
  .filter(Boolean);

let fish = lines[0].split(',').map(item => ({ count: 1, days: parseInt(item, 10) }))

for (let day = 0; day < 256; day++) {
    const startingFishLength = fish.length
    let newFish = 0;

    for (let fishIndex = 0; fishIndex < startingFishLength; fishIndex++) {
        const singleFish = fish[fishIndex]
        if (singleFish.days === 0) {
            fish[fishIndex].days = 6
            newFish += fish[fishIndex].count
        } else {
            fish[fishIndex].days = singleFish.days - 1
        }
    }

    fish.push({ count: newFish, days: 8 })
}

const numberOfFish = fish.reduce((memo, item) => {
    return memo + item.count
}, 0)

console.log(numberOfFish)