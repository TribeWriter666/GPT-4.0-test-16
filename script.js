const canvas = document.getElementById('glitchCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const cellSize = 10;
const cols = Math.floor(canvas.width / cellSize);
const rows = Math.floor(canvas.height / cellSize);

let grid = new Array(cols).fill(null).map(() => new Array(rows).fill(null).map(() => Math.floor(Math.random() * 2)));

function drawGrid() {
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      ctx.fillStyle = grid[x][y] ? '#000' : '#fff';
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

function countNeighbors(x, y) {
  let count = 0;

  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      if (dx === 0 && dy === 0) continue;

      const nx = (x + dx + cols) % cols;
      const ny = (y + dy + rows) % rows;

      count += grid[nx][ny];
    }
  }

  return count;
}

function updateGrid() {
  const newGrid = new Array(cols).fill(null).map(() => new Array(rows).fill(null));

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      const neighbors = countNeighbors(x, y);

      if (grid[x][y]) {
        newGrid[x][y] = neighbors === 2 || neighbors === 3 ? 1 : 0;
      } else {
        newGrid[x][y] = neighbors === 3 ? 1 : 0;
      }
    }
  }

  grid = newGrid;
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawGrid();
  updateGrid();

  requestAnimationFrame(animate);
}

animate();
