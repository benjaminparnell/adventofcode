function someDigits(password, fn) {
  return password
    .toString()
    .split("")
    .map(digit => parseInt(digit, 10))
    .some(fn);
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

function containsRepeatingDigitPair(password) {
  return someDigits(password, (digit, index, digits) => {
    if (digits[index - 1] && digits[index + 1]) {
      return (
        digit !== digits[index - 2] &&
        digit === digits[index - 1] &&
        digit !== digits[index + 1]
      );
    } else if (digits[index - 1]) {
      return digit === digits[index - 1] && digit !== digits[index - 2];
    } else {
      return false;
    }
  });
}

function doesNotContainRepeatingDigitGroup(password) {
  return !someDigits(
    password,
    (digit, index, digits) =>
      digit === digits[index + 1] && digit === digits[index - 1]
  );
}

function passwordMeetsCriteria(password, criteria, lowerLimit, upperLimit) {
  return criteria.every(criteriaFn =>
    criteriaFn(password, lowerLimit, upperLimit)
  );
}

function countValidPasswordsInRange(lowerLimit, upperLimit, criteria) {
  let count = 0;

  for (let password = lowerLimit; password <= upperLimit; password++) {
    if (passwordMeetsCriteria(password, criteria, lowerLimit, upperLimit)) {
      count++;
    }
  }

  return count;
}

// Task 1
console.log(
  countValidPasswordsInRange(128392, 643281, [
    digitsNeverDecrease,
    containsRepeatingDigit
  ])
);
// Task 2
console.log(
  countValidPasswordsInRange(128392, 643281, [
    digitsNeverDecrease,
    containsRepeatingDigitPair
  ])
);
