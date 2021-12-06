import fs from "fs";
import path from "path";

const lines = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .split("\n")
  .filter(Boolean);

let fish = lines[0].split(',').map(item => parseInt(item, 10))

for (let day = 0; day < 256; day++) {
    const startingFishLength = fish.length

    for (let fishIndex = 0; fishIndex < startingFishLength; fishIndex++) {
        const singleFish = fish[fishIndex]
        if (singleFish === 0) {
            fish.push(8)
            fish[fishIndex] = 6
        } else {
            fish[fishIndex] = singleFish - 1
        }
    }
}

console.log(fish.length)