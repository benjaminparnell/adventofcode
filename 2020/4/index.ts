import fs from "fs";
import path from "path";

const lines = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .split("\n");
const passwords: string[][] = [];

for (let index = 0; index < lines.length; index++) {
  if (lines[index]?.length) {
    let password = [];

    while (lines[index]?.length) {
      password = password.concat(lines[index].split(" "));
      index++;
    }

    passwords.push(password);
  }
}

const inRange = (min: number, max: number, value: string): boolean => {
  const number = parseInt(value, 10);
  return number >= min && number <= max;
};

const requiredParts: { id: string; validate: (value: string) => boolean }[] = [
  {
    id: "byr",
    validate: inRange.bind(null, 1920, 2002),
  },
  {
    id: "iyr",
    validate: inRange.bind(null, 2010, 2020),
  },
  {
    id: "eyr",
    validate: inRange.bind(null, 2020, 2030),
  },
  {
    id: "hgt",
    validate: (value) => {
      const unit = value.substring(value.length - 2);
      const number = value.substring(0, value.length - 2);
      if (unit === "in") {
        return inRange(59, 76, number);
      } else if (unit === "cm") {
        return inRange(150, 193, number);
      }
    },
  },
  { id: "hcl", validate: (value) => /#[0-9a-f]/.test(value) },
  {
    id: "ecl",
    validate: (value) =>
      ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(value),
  },
  { id: "pid", validate: (value) => value.length === 9 && !!Number(value) },
];

const validPasswords = passwords.reduce(
  (count, password) =>
    requiredParts.every(({ id }) =>
      password.find((part) => part.startsWith(id))
    )
      ? count + 1
      : count,
  0
);

console.log("Part one:", validPasswords);

const validPasswordsTwo = passwords.reduce(
  (count, password) =>
    requiredParts.every(({ id, validate }) =>
      password.find(
        (part) => part.startsWith(id) && validate(part.split(":")[1])
      )
    )
      ? count + 1
      : count,
  0
);

console.log("Part two:", validPasswordsTwo);
