const isWinning = (arr) => {
  if (
    arr[0] !== null &&
    arr[1] !== null &&
    arr[2] !== null &&
    arr[0] === arr[1] &&
    arr[1] === arr[2]
  ) {
    return true;
  }
  if (
    arr[3] !== null &&
    arr[4] !== null &&
    arr[5] !== null &&
    arr[3] === arr[4] &&
    arr[4] === arr[5]
  ) {
    return true;
  }
  if (
    arr[6] !== null &&
    arr[7] !== null &&
    arr[8] !== null &&
    arr[6] === arr[7] &&
    arr[7] === arr[8]
  ) {
    return true;
  }
  if (
    arr[0] !== null &&
    arr[3] !== null &&
    arr[6] !== null &&
    arr[0] === arr[3] &&
    arr[3] === arr[6]
  ) {
    return true;
  }
  if (
    arr[1] !== null &&
    arr[4] !== null &&
    arr[7] !== null &&
    arr[1] === arr[4] &&
    arr[4] === arr[7]
  ) {
    return true;
  }
  if (
    arr[2] !== null &&
    arr[5] !== null &&
    arr[8] !== null &&
    arr[2] === arr[5] &&
    arr[5] === arr[8]
  ) {
    return true;
  }
  if (
    arr[0] !== null &&
    arr[4] !== null &&
    arr[8] !== null &&
    arr[0] === arr[4] &&
    arr[4] === arr[8]
  ) {
    return true;
  }
  if (
    arr[2] !== null &&
    arr[4] !== null &&
    arr[6] !== null &&
    arr[2] === arr[4] &&
    arr[4] === arr[6]
  ) {
    return true;
  }
  return false;
};

export default isWinning;
