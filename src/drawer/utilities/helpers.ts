function getNextHigherValue(list: number[], value: number) {
  return list.find((num) => num > value);
}

function getNextLowerValue(list: number[], value: number) {
  return [...list].reverse().find((num) => num < value);
}

export { getNextHigherValue, getNextLowerValue };
