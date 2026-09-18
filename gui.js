
const CELL_SIZE = 30;
const WIN_WIDTH = 800;
const WIN_HEIGHT = 800;
const FRAME_SIZE = 100;
const ROWS = ((WIN_HEIGHT - 2 * FRAME_SIZE) / CELL_SIZE);
const COLS = ((WIN_WIDTH - 2 * FRAME_SIZE) / CELL_SIZE);






function drawGrid() {
  noFill();
  stroke(0, 100, 255);
  strokeWeight(0.5);
  
  for (let j = 0; j < ROWS; j++) {
    for (let i = 0; i < COLS; i++) {
      // Draw the grid part
      rect(i * CELL_SIZE + FRAME_SIZE, j * CELL_SIZE + FRAME_SIZE, CELL_SIZE, CELL_SIZE);
    }
  }
}

function showGui() {
  let x;
  let offset = 0;
  
  for (let walker of walkers) {
    x = FRAME_SIZE + offset;
    fill(walker.color);
    rect(x, FRAME_SIZE/2, CELL_SIZE);
    textSize(32);
    text(walker.score, x + CELL_SIZE, FRAME_SIZE/2);
    
    offset += ((WIN_WIDTH - FRAME_SIZE) / 3);
  }
}