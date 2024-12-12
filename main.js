const chessBoard = [
  ["w", "b", "w", "b", "w", "b", "w", "b"],
  ["b", "w", "b", "w", "b", "w", "b", "w"],
  ["w", "b", "w", "b", "w", "b", "w", "b"],
  ["b", "w", "b", "w", "b", "w", "b", "w"],
  ["w", "b", "w", "b", "w", "b", "w", "b"],
  ["b", "w", "b", "w", "b", "w", "b", "w"],
  ["w", "b", "w", "b", "w", "b", "w", "b"],
  ["b", "w", "b", "w", "b", "w", "b", "w"],
];

//Older code
// const isOnGrid = (theRowOrColAt, grid = chessBoard) => {
//   if (
//     theRowOrColAt[0] >= 0 &&
//     theRowOrColAt[0] < grid.length &&
//     theRowOrColAt[1] >= 0 &&
//     theRowOrColAt[1] < grid[0].length
//   ) return true;

//   return false;
// };

// Better code
const isOnGrid = (theRowOrColAt, grid = chessBoard) => {
  const [row, col] = theRowOrColAt;
  return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length; // Returns this if true
};

// Checks if initial coordinates are correct
const checkInputs = (src, dst) => {
  if (!isOnGrid(src) && !isOnGrid(dst)) {
    throw Error(
      "Neither [src] nor [dst] are found on the grid, please recheck coordinates"
    );
  }
  if (!isOnGrid(src)) {
    throw Error("[src] not found on the grid, please recheck coordinates");
  }
  if (!isOnGrid(dst)) {
    throw Error("[dst] not found on the grid, please recheck coordinates");
  }
};

// Technically better, but I prefer above code
// const isOnGrid = (theRowOrColAt, grid = chessBoard) => {
//   const [row, col] = theRowOrColAt;
//   return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;
// };

let directions = (currentPosition, grid = chessBoard) => {
  let possibleKnightMoves = [
    [currentPosition[0] - 2, currentPosition[1] + 1], // 1 o'clock position
    [currentPosition[0] - 1, currentPosition[1] + 2], // 2 o'clock position
    [currentPosition[0] + 1, currentPosition[1] + 2], // 4 o'clock position
    [currentPosition[0] + 2, currentPosition[1] + 1], // 5 o'clock position
    [currentPosition[0] + 2, currentPosition[1] - 1], // 7 o'clock position
    [currentPosition[0] + 1, currentPosition[1] - 2], // 8 o'clock position
    [currentPosition[0] - 1, currentPosition[1] - 2], // 10 o'clock position
    [currentPosition[0] - 2, currentPosition[1] - 1], // 11 o'clock position
  ];

  //Older code
  //   const isMoveOnGrid = possibleKnightMoves.filter((theRowOrColAt) => {
  //     // theRowOrColAt[0] >= 0 &&
  //     // theRowOrColAt[0] < grid.length &&
  //     // theRowOrColAt[1] >= 0 &&
  //     // theRowOrColAt[1] < grid[0].length
  //     const check = isOnGrid(theRowOrColAt);
  //     return check
  // });

  // Better code: use below since .filter() method creates a new array and performs an additional check, which isn't necessary here.
  const isMoveOnGrid = [];
  for (const move of possibleKnightMoves) {
    if (isOnGrid(move)) {
      isMoveOnGrid.push(move);
    }
  }

  // The knight piece can only move if it lands on squares of a different color than what the current square color is
  const checkSquareColor = isMoveOnGrid.filter(
    (theRowOrColAt) =>
      grid[theRowOrColAt[0]][theRowOrColAt[1]] !==
      grid[currentPosition[0]][currentPosition[1]]
  );

  return checkSquareColor;
};

// This function works backwards using the while loop to go from dst back to src to reveal the path.
const buildSolutionPath = (traversalTree, dst) => {
  let path = [dst];
  let parent = traversalTree[dst];

  while (parent) {
    path.push(parent);
    parent = traversalTree[parent];
  }

  const reversedPath = path.reverse();

  const formattedPath = reversedPath
    .map((theRowOrColAt) => `[${theRowOrColAt[0]}, ${theRowOrColAt[1]}]`)
    .join(", ");

  console.log(
    `You made it in ${reversedPath.length - 1} moves! Here is your path:`
  );
  console.log(formattedPath);
  return reversedPath;
};

const bfsKnightMoves = (src, dst, grid = chessBoard) => {
  checkInputs(src, dst);
  const traversalTree = {}; // Use an object here rather than an array (i.e., const traversalTree = [];). It's O(1) vs O(n).
  const visited = new Set();
  const queue = [src];

  while (queue.length) {
    const currentPos = queue.shift();
    visited.add(currentPos.toString());

    if (currentPos.toString() === dst.toString()) {
      // console.log(traversalTree); // This log shows what I was missing in fully grasping this code. KEEP THIS COMMENT FOR FUTURE REFERENCE.
      return buildSolutionPath(traversalTree, dst);
    }

    for (const move of directions(currentPos, grid)) {
      if (!visited.has(move.toString())) {
        traversalTree[move] = currentPos;
        queue.push(move);
      }
    }
  }
};

bfsKnightMoves([0, 0], [0, 0]); // 0 moves: [0, 0]
bfsKnightMoves([0, 0], [1, 1]); // 4 moves: [0, 0], [2, 1], [4, 0], [3, 2], [1, 1]
bfsKnightMoves([0, 0], [3, 3]); // 2 moves: [0, 0], [1, 2], [3, 3]
bfsKnightMoves([0, 0], [4, 4]); // 4 moves: [0, 0], [2, 1], [4, 0], [5, 2], [4, 4]
bfsKnightMoves([0, 0], [5, 5]); // 4 moves: [0, 0], [2, 1], [4, 2], [6, 3], [5, 5]
bfsKnightMoves([0, 0], [6, 6]); // 4 moves: [0, 0], [2, 1], [4, 2], [5, 4], [6, 6]
bfsKnightMoves([0, 0], [7, 7]); // 6 moves: [0, 0], [1, 2], [0, 4], [1, 6], [3, 7], [5, 6], [7, 7]
bfsKnightMoves([0, 0], [6, 7]); // 5 moves: [0, 0], [2, 1], [4, 2], [6, 3], [7, 5], [6, 7]
// bfsKnightMoves([-1, -1], [4, 7]) // Uncaught Error: [src] not found on the grid, please recheck coordinates