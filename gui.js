/**
 * Constants for the GUI
 */
const CELL_SIZE = 30;
const WIN_WIDTH = 800;
const WIN_HEIGHT = 800;
const FRAME_SIZE = 100;
const ROWS = ((WIN_HEIGHT - 2 * FRAME_SIZE) / CELL_SIZE);
const COLS = ((WIN_WIDTH - 2 * FRAME_SIZE) / CELL_SIZE);

const WIDGET_SIZE = 50;

/* Global variables for GUI elements */
let myCanvas;
let roamProbSlider;
let fleeProbSlider;
let chaseProbSlider;
let greedySlider;
let scareSlider;
let maxWalkersInput;
let walkerSpeedInput;
let playerSpeedInput;
let wrapEnabledCheck;

/* Update functions for GUI elements */
function updateRoamProb() {
  ROAM_PROB = roamProbSlider.value();
  normalizeProbabilities();
}

function updateFleeProb() {
  FLEE_PROB = fleeProbSlider.value();
  normalizeProbabilities();
}

function updateChaseProb() {
  CHASE_PROB = chaseProbSlider.value();
  normalizeProbabilities();
}

function updateGreedy() {
  GREEDY = greedySlider.value();
}

function updateScare() {
  SCARE = scareSlider.value();
}

function updateMaxWalkers() {
  let tempVal = parseInt(maxWalkersInput.value());
  if (isNaN(tempVal) === false) {
      MAX_WALKERS = tempVal;
  }
}

function updateWalkerSpeed() {
  let tempVal = parseFloat(walkerSpeedInput.value());
  if (isNaN(tempVal) === false) {
      WALKER_SPEED = tempVal;
  }
}

function updatePlayerSpeed() {
  let tempVal = parseFloat(playerSpeedInput.value());
  if (isNaN(tempVal) === false) {
      PLAYER_SPEED = tempVal;
  }
}

function wrapCheckEvent() {
  WRAP_ENABLE = wrapEnabledCheck.checked();
}

/**
 * Creates the HTML GUI elements for controlling the simulation parameters.
 */
function createHTLMGui() {
    /* Hook the canvas */
    myCanvas.parent('html_canvas');

    roamProbSlider = createSlider(0, 1, ROAM_PROB, 0.01);
    roamProbSlider.size(WIDGET_SIZE * 2);
    roamProbSlider.changed(updateRoamProb);

    fleeProbSlider = createSlider(0, 1, FLEE_PROB, 0.01);
    fleeProbSlider.size(WIDGET_SIZE * 2);
    fleeProbSlider.changed(updateFleeProb);

    chaseProbSlider = createSlider(0, 1, CHASE_PROB, 0.01);
    chaseProbSlider.size(WIDGET_SIZE * 2);
    chaseProbSlider.changed(updateChaseProb);

    greedySlider = createSlider(0, 1, WALKER_GREEDY, 0.01);
    greedySlider.size(WIDGET_SIZE * 2);
    greedySlider.changed(updateGreedy);

    scareSlider = createSlider(0, 1, WALKER_SCARE, 0.01);
    scareSlider.size(WIDGET_SIZE * 2);
    scareSlider.changed(updateScare);

    maxWalkersInput = createInput(MAX_WALKERS);
    maxWalkersInput.size(WIDGET_SIZE);
    maxWalkersInput.changed(updateMaxWalkers);

    walkerSpeedInput = createInput(WALKER_SPEED);
    walkerSpeedInput.size(WIDGET_SIZE);
    walkerSpeedInput.changed(updateWalkerSpeed);

    playerSpeedInput = createInput(PLAYER_SPEED);
    playerSpeedInput.size(WIDGET_SIZE);
    playerSpeedInput.changed(updatePlayerSpeed);

    wrapEnabledCheck = createCheckbox('WRAP', WRAP_ENABLE);
    wrapEnabledCheck.changed(wrapCheckEvent);

    /* Hook widget to html */
    roamProbSlider.parent('html_roamPSlider');
    fleeProbSlider.parent('html_fleePSlider');
    chaseProbSlider.parent('html_chasePSlider');
    greedySlider.parent('html_greedySlider');
    scareSlider.parent('html_scareSlider');
    maxWalkersInput.parent('html_maxWalkersInput');
    walkerSpeedInput.parent('html_walkerSpeedInput');
    playerSpeedInput.parent('html_playerSpeedInput');
    wrapEnabledCheck.parent('html_wrapEnabledCheck');

}







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