function count(arr, memo = {}) {
  return arr.reduce((m, c) => {
    if (m[c]) {
      m[c] = m[c] + 1;
    } else {
      m[c] = 1;
    }
    return m;
  }, memo)
}

module.exports = {
  count
}
