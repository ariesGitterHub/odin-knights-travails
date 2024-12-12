const graph = {
  a: ["b", "c"],
  b: ["d"],
  c: ["e"],
  d: ["f"],
  e: [],
  f: [],
};

// Iteration

const depthFirstPrint = (graph, source) => {
  const stack = [source];

  while (stack.length > 0) {
    const current = stack.pop();
    console.log(current);

    for (let neighbor of graph[current]) {
      stack.push(neighbor);
    }
  }
};

const breathFirstPrint = (graph, source) => {
  const queue = [source];

  while (queue.length > 0) {
    const current = queue.shift();
    console.log(current);

    for (let neighbor of graph[current]) {
      queue.push(neighbor);
    }
  }
};

const depthFirstPrintRecursion = (graph, source) => {
  console.log(source);
  for (let neighbor of graph[source]) {
    depthFirstPrintRecursion(graph, neighbor)
  }
  
}
console.log('Depth First Search');
depthFirstPrint( graph, 'a'); // a c e b d f

console.log("Breath First Search");
breathFirstPrint( graph, 'a'); // a b c d e f

console.log('Depth First Search Recursion');
depthFirstPrintRecursion( graph, 'a'); // a b d f c e, write 

const set = new Set();
set.add("test");
set.add("test1");
set.add("test1"); // should not add
console.log(set.has("test"));
console.log(set.has("test2"));
console.log(set);


function knightMoves() {}


function distanceTraversed(lot) {
  const queue = [[0, 0, 0]];

  while (queue.length) {
    let [count, i, j] = queue.shift();

    if (lot[i][j] === 9) return count;
    if (lot[i][j] === -1) continue;

    //setting visited cells
    lot[i][j] = -1;

    //moving up
    if (i > 0 && lot[i - 1][j] !== -1) queue.push([count + 1, i - 1, j]);

    //moving down
    if (i + 1 < lot.length && lot[i + 1][j] !== -1)
      queue.push([count + 1, i + 1, j]);

    //moving left
    if (j > 0 && lot[i][j - 1] !== -1) queue.push([count + 1, i, j - 1]);

    //moving right
    if (j + 1 < lot[i].length && lot[i][j + 1] !== -1)
      queue.push([count + 1, i, j + 1]);
  }
  return -1;
}

let lot = [
  [1, 0, 0],
  [1, 0, 0],
  [1, 9, 0],
];

console.log(distanceTraversed(lot));


function bfs(grid, start, target) {
  const queue = [start];
  const visited = new Set();
  const parent = {};

  while (queue.length > 0) {
    const current = queue.shift();
    const [row, col] = current;

    if (current[0] === target[0] && current[1] === target[1]) {
      return reconstructPath(parent, start, target);
    }

    const neighbors = getNeighbors(grid, row, col);

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor.toString())) {
        visited.add(neighbor.toString());
        parent[neighbor.toString()] = current;
        queue.push(neighbor);
      }
    }
  }

  return null;
}

function getNeighbors(grid, row, col) {
  const neighbors = [];

  if (row > 0) neighbors.push([row - 1, col]);
  if (row < grid.length - 1) neighbors.push([row + 1, col]);
  if (col > 0) neighbors.push([row, col - 1]);
  if (col < grid[0].length - 1) neighbors.push([row, col + 1]);

  return neighbors;
}

function reconstructPath(parent, start, target) {
  const path = [target];
  let current = target;

  while (current.toString() !== start.toString()) {
    current = parent[current.toString()];
    path.unshift(current);
  }

  return path;
}

function BFS(grid, src, dst) {
  let queue = [src];
  const visited = new Set();
  let move = 0;
  const directions = [ // Knight piece can only hit 1 of 8 targets per turn.
    [-2, 1], // 1 o'clock position
    [-1, 2], // 2 o'clock position
    [1, 2], // 4 o'clock position
    [2, 1], // 5 o'clock position
    [2, -1], // 7 o'clock position
    [1, -2], // 8 o'clock position
    [-1, -2], // 10 o'clock position
    [-2, -1], // 11 o'clock position
  ];

  // Check for a grid
  if (!Array.isArray(grid) && grid.length === 0) {
    throw Error("Please recheck that a graph grid is present");
  }
  // Check if initial coordinates are correct
  if (!isOnGrid(grid, src) && !isOnGrid(grid, dst)) {
     throw Error("Neither [src] nor [dst] are found on the grid, please recheck coordinates");
  }
  if (!isOnGrid(grid, src)) {
     throw Error("[src] not found on the grid, please recheck coordinates");
  }
  if (!isOnGrid(grid, dst)) {
     throw Error("[dst] not found on the grid, please recheck coordinates");
  }

  while (queue.length > 0) {
    const [row, col] = queue.shift();
    if (row === dst[0] && col === dst[1]) {
      visited.add(`[${row},${col}]`); // REMINDER: with Set you need to convert it to a string or it will log false. Also, .add is a Set method.
      // move ++;
      // console.log(queue);
      console.log(visited);
      console.log(move);

      return;
    }

    // Mark the current cell as visited
    visited.add(`[${row},${col}]`); // REMINDER: with Set you need to convert it to a string or it will log false.  Also, .add is a Set method.
   
    for (const [dx, dy] of directions) {
      const newRow = row + dx;
      const newCol = col + dy;
      // move ++;
      // Check if the neighbor is within bounds and not visited
      if (
        isOnGrid(grid, [newRow, newCol]) &&
        !visited.has(`${newRow},${newCol}`) // REMINDER: with Set you need to convert it to a string or it will log false.  Also, .has is a Set method.
      ) {
        queue.push([newRow, newCol]);
        // distance += 1;
        // move ++
      // console.log(queue);   
        
      }
    }
  }

  // return false; // Target not found
}

BFS(chessBoard, [0, 0], [3, 3])

// Found this solution on  - https://stackoverflow.com/questions/66497915/javascript-get-shortest-path-in-binary-matrix-using-bfs
var shortestPathBinaryMatrix = function (grid) {
  if (grid[0][0] != 0) return []; // modify return type
  const queue = [[[0, 0], 1]];
  const dest = [grid.length - 1, grid[0].length - 1];
  const visited = new Map();
  visited.set([0, 0].toString(), null); // Mark source as visited

  const getNextSteps = ([x, y]) => {
    const dirs = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
      [1, 1],
      [-1, 1],
      [-1, -1],
      [1, -1],
    ];
    const nextSteps = [];
    for (const [nx, ny] of dirs) {
      if (grid[x + nx]?.[y + ny] == 0) nextSteps.push([x + nx, y + ny]);
    }
    return nextSteps;
  };

  for (let [curr, distance] of queue) {
    // Move the visited check to the loop
    if (
      curr[0] === dest[0] &&
      curr[1] === dest[1] &&
      grid[dest[0]][dest[1]] == 0
    ) {
      // Derive the path from the linked list we now have in the visited structure:
      let path = [];
      while (curr) {
        path.push(curr);
        curr = visited.get(curr.toString());
      }
      return path.reverse(); // Need to reverse to get from source to destination
    }
    for (let adj of getNextSteps(curr)) {
      // Visited-check moved here:
      if (visited.has(adj.toString())) continue;
      // Mark with the coordinates of the previous node on the path:
      visited.set(adj.toString(), curr);
      queue.push([adj, distance + 1]);
    }
  }

  return []; // must modify this as well
};

// demo
let grid = [
  [0, 0, 0],
  [1, 1, 0],
  [1, 1, 0],
];
let result = shortestPathBinaryMatrix(grid);
console.log(result);