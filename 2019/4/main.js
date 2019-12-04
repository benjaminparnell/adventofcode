function someDigits(password, fn) {
  return password
    .toString()
    .split("")
    .map(digit => parseInt(digit, 10))
    .some(fn);
}

function passwordIsInRange(password, lowerLimit, upperLimit) {
  return password >= lowerLimit && password <= upperLimit;
}

function digitsNeverDecrease(password) {
  return !someDigits(
    password,
    (digit, index, digits) => digit < digits[index - 1]
  );
}

function containsRepeatingDigit(password) {
  return someDigits(
    password,
    (digit, index, digits) => digit === digits[index - 1]
  );
}

function passwordMeetsCriteria(password, lowerLimit, upperLimit) {
  return (
    password.toString().length === 6 &&
    passwordIsInRange(password, lowerLimit, upperLimit) &&
    digitsNeverDecrease(password) &&
    containsRepeatingDigit(password)
  );
}

function countValidPasswordsInRange(lowerLimit, upperLimit) {
  let count = 0;

  for (let password = lowerLimit; password <= upperLimit; password++) {
    if (passwordMeetsCriteria(password, lowerLimit, upperLimit)) {
      count++;
    }
  }

  return count;
}

console.log(countValidPasswordsInRange(128392, 643281));
