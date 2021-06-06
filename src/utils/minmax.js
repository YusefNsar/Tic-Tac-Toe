const evaluate = (arr) => {
  if (
    arr[0] !== null &&
    arr[1] !== null &&
    arr[2] !== null &&
    arr[0] === arr[1] &&
    arr[1] === arr[2]
  ) {
    if (arr[0] === "X") {
      return 10;
    } else if (arr[0] === "O") {
      return -10;
    }
  }
  if (
    arr[3] !== null &&
    arr[4] !== null &&
    arr[5] !== null &&
    arr[3] === arr[4] &&
    arr[4] === arr[5]
  ) {
    if (arr[3] === "X") {
      return 10;
    } else if (arr[3] === "O") {
      return -10;
    }
  }
  if (
    arr[6] !== null &&
    arr[7] !== null &&
    arr[8] !== null &&
    arr[6] === arr[7] &&
    arr[7] === arr[8]
  ) {
    if (arr[6] === "X") {
      return 10;
    } else if (arr[6] === "O") {
      return -10;
    }
  }
  if (
    arr[0] !== null &&
    arr[3] !== null &&
    arr[6] !== null &&
    arr[0] === arr[3] &&
    arr[3] === arr[6]
  ) {
    if (arr[0] === "X") {
      return 10;
    } else if (arr[0] === "O") {
      return -10;
    }
  }
  if (
    arr[1] !== null &&
    arr[4] !== null &&
    arr[7] !== null &&
    arr[1] === arr[4] &&
    arr[4] === arr[7]
  ) {
    if (arr[1] === "X") {
      return 10;
    } else if (arr[1] === "O") {
      return -10;
    }
  }
  if (
    arr[2] !== null &&
    arr[5] !== null &&
    arr[8] !== null &&
    arr[2] === arr[5] &&
    arr[5] === arr[8]
  ) {
    if (arr[2] === "X") {
      return 10;
    } else if (arr[2] === "O") {
      return -10;
    }
  }
  if (
    arr[0] !== null &&
    arr[4] !== null &&
    arr[8] !== null &&
    arr[0] === arr[4] &&
    arr[4] === arr[8]
  ) {
    if (arr[0] === "X") {
      return 10;
    } else if (arr[0] === "O") {
      return -10;
    }
  }
  if (
    arr[2] !== null &&
    arr[4] !== null &&
    arr[6] !== null &&
    arr[2] === arr[4] &&
    arr[4] === arr[6]
  ) {
    if (arr[2] === "X") {
      return 10;
    } else if (arr[2] === "O") {
      return -10;
    }
  }
  return 0;
};

const isMoveLeft = (board) => {
  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      return true;
    }
  }
  return false;
};

const minmax = (board, depth, isMax, alpha, beta) => {
  let score = evaluate(board);
  if (score === 10) {
    return score - depth;
  }
  if (score === -10) {
    return score + depth;
  }

  if (isMoveLeft(board) === false) {
    return 0;
  }

  if (isMax) {
    let best = -1000;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = "X";
        best = Math.max(best, minmax(board, depth + 1, false, alpha, beta));
        alpha = Math.max(alpha, best);
        board[i] = null;
        if (beta <= alpha) {
          break;
        }
      }
    }
    return best;
  } else {
    let best = 1000;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = "O";
        best = Math.min(best, minmax(board, depth + 1, true, alpha, beta));
        beta = Math.min(beta, best);
        board[i] = null;
        if (beta <= alpha) {
          break;
        }
      }
    }
    return best;
  }
};

const findBestMove = (board, player) => {
  let bestMove = -1;
  if (player === "X") {
    let bestVal = -1000;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = "X";
        let moveVal = minmax(board, 0, false, -1000, 1000);
        board[i] = null;
        if (moveVal > bestVal) {
          bestVal = moveVal;
          bestMove = i;
        }
      }
    }
  } else {
    let bestVal = 1000;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = "O";
        let moveVal = minmax(board, 0, true, -1000, 1000);
        board[i] = null;
        if (moveVal < bestVal) {
          bestVal = moveVal;
          bestMove = i;
        }
      }
    }
  }
  return bestMove;
};

export default findBestMove;
