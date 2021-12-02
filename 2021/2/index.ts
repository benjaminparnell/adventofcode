import fs from "fs";
import path from "path";

const lines = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .split("\n")

const [x, y] = lines.reduce((coords, line) => {
    const [dir, valueString] = line.split(' ')
    const value = parseInt(valueString, 10)
    let [xValue, yValue] = coords

    if (dir === 'up') {
        yValue -= value        
    } else if (dir === 'down') {
        yValue += value
    } else if (dir === 'forward') {
        xValue += value
    }
    
    return [xValue, yValue]
}, [0, 0])

console.log(x * y)

const [x2, y2] = lines.reduce((coords, line) => {
    const [dir, valueString] = line.split(' ')
    const value = parseInt(valueString, 10)
    let [xValue, yValue, aim] = coords

    if (dir === 'up') {
        aim -= value        
    } else if (dir === 'down') {
        aim += value
    } else if (dir === 'forward') {
        xValue += value
        yValue += (aim * value)
    }
    
    return [xValue, yValue, aim]
}, [0, 0, 0])

console.log(x2 * y2)