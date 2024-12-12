const graph = {
  a: ["b", "c"],
  b: ["d"],
  c: ["e"],
  d: ["f"],
  e: [],
  f: [],
};

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



