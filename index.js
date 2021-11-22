
const size = 15;
cols = window.screen.width / size;
rows = window.screen.height / size;

let arr;
let x;
let y;
let next;

function setup() {
    createCanvas(800, 400);
    arr = initialiazeArray(arr, cols, rows);
    arr = randomizeArray(arr, cols, rows);
}

function initialiazeArray(arr, cols, rows){
    arr = new Array(cols);
    for (let i = 0; i < arr.length; i++)
        arr[i] = new Array(rows);
    return arr;
}

function randomizeArray(arr, cols, rows) {
    for(let i=0; i<cols; i++)
        for(let j =0;j<rows; j++) 
            arr[i][j] = Math.floor(Math.random() * 2)
    return arr;
}

function draw() {
    background(0);
    printArray();
    next = initialiazeArray(next, cols, rows)
    checkSingleElement()
    arr = next;
}

function checkSingleElement() {
    for (let i = 0; i < cols; i++) 
        for (let j = 0; j < rows; j++) {
            let neigh = countNeighbors(arr, i, j);
            checkNeighbors(neigh, i,j);
        }
}

function checkNeighbors (neigh, i, j) {
    if (arr[i][j] == 0 && neigh == 3)
        next[i][j] = 1;
    else if (arr[i][j] == 1 && (neigh < 2 || neigh > 3)) 
        next[i][j] = 0;
    else next[i][j] = arr[i][j];
}

function printArray() {
    for (let i = 0; i < cols; i++)
        for (let j = 0; j < rows; j++) {
          setupXandY(i,j)
          printIfAlive(i,j);
    }
}

function setupXandY(i,j) {
    x = i * size;
    y = j * size;
}

function printIfAlive(i,j) {
    if (arr[i][j] == 1) {
        fill(255);
        stroke(0);
        rect(x, y, size - 1, size - 1);
    }
}

function countNeighbors(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++)
      for (let j = -1; j < 2; j++) {
        let col = (x + i + cols) % cols;
        let row = (y + j + rows) % rows;
        sum += grid[col][row];
      }
    sum -= grid[x][y];
    return sum;
}