/**
 * Constants for the GUI
 */
const WIN_WIDTH = 800;
const WIN_HEIGHT = 800;
const FRAME_SIZE = 100;
const CELL_SIZE = 30; // Size of each cell in the grid
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
let trailEnabledCheck;
let walkerTrailInput;

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
  Walkers_UpdateCharacteristics();
}

function updateScare() {
  SCARE = scareSlider.value();
  Walkers_UpdateCharacteristics();
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
      Walkers_UpdateCharacteristics();
  }
}

function updatePlayerSpeed() {
  let tempVal = parseFloat(playerSpeedInput.value());
  if (isNaN(tempVal) === false) {
      PLAYER_SPEED = tempVal;
      // TODO: PLAYER_SPEED not really used so far, but we can implement it in the future if needed
  }
}

function wrapCheckEvent() {
  WRAP_ENABLE = wrapEnabledCheck.checked();
}

function trailCheckEvent() {
  TRAIL_ON = trailEnabledCheck.checked();
}

function updateWalkerTrail() {
  let tempVal = parseInt(walkerTrailInput.value());
  if (isNaN(tempVal) === false && tempVal > 0) {
      TRAIL_LEN = tempVal;
      TRAIL_DELTA = 255 / TRAIL_LEN;
  }
}


/**
 * Handles key presses for controlling the simulation. The 'P' key toggles the paused state of the simulation.
 */
function keyPressed() {
    if (keyCode === KEY_P) {
      PAUSED = (PAUSED) ? false : true;
    }
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

    maxWalkersInput = createInput(MAX_WALKERS.toString());
    maxWalkersInput.size(WIDGET_SIZE);
    maxWalkersInput.changed(updateMaxWalkers);

    walkerSpeedInput = createInput(WALKER_SPEED.toString());
    walkerSpeedInput.size(WIDGET_SIZE);
    walkerSpeedInput.changed(updateWalkerSpeed);

    playerSpeedInput = createInput(PLAYER_SPEED.toString());
    playerSpeedInput.size(WIDGET_SIZE);
    playerSpeedInput.changed(updatePlayerSpeed);

    wrapEnabledCheck = createCheckbox('WRAP', WRAP_ENABLE);
    wrapEnabledCheck.changed(wrapCheckEvent);

    trailEnabledCheck = createCheckbox('TRAIL', TRAIL_ON);
    trailEnabledCheck.changed(trailCheckEvent);

    walkerTrailInput = createInput(TRAIL_LEN.toString());
    walkerTrailInput.size(WIDGET_SIZE);
    walkerTrailInput.changed(updateWalkerTrail);

    /* Hook widget to html */
    roamProbSlider.parent('html_roamPSlider');
    fleeProbSlider.parent('html_fleePSlider');
    chaseProbSlider.parent('html_chasePSlider');
    greedySlider.parent('html_greedySlider');
    scareSlider.parent('html_scareSlider');
    maxWalkersInput.parent('html_maxWalkersInput');
    walkerSpeedInput.parent('html_walkerSpeedInput');
    playerSpeedInput.parent('html_playerSpeedInput');
    walkerTrailInput.parent('html_walkerTrailInput');
    wrapEnabledCheck.parent('html_wrapEnabledCheck');
    trailEnabledCheck.parent('html_trailEnabledCheck');

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

function showPauseMsg() {
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("PAUSED", WIN_WIDTH / 2, WIN_HEIGHT / 2);
}


function showGui() {
  let x;
  let offset = 0;
  
  for (let walker of walkers) {
    x = FRAME_SIZE + offset;
    fill(walker.color);
    rect(x, FRAME_SIZE/2, CELL_SIZE);
    textSize(32);
    textAlign(CENTER, BOTTOM);
    text(walker.score, x + CELL_SIZE, FRAME_SIZE/2);
    
    offset += ((WIN_WIDTH - FRAME_SIZE) / 3);
  }
}