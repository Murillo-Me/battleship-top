function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function create2DArray({
  rows,
  columns,
  defaultValue,
}) {
  return Array.from({ length: rows }, () => (
    Array.from({ length: columns }, () => defaultValue)
  ));
}

export { getRandomIntInclusive, create2DArray };
