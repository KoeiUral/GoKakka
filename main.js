/**
 * main.js
 * 
 * This file contains the main logic for the simulation, including setup and draw functions.
 * It initializes the walkers, handles their updates, and manages the GUI elements.
 */

/* Global main variables for list of walkers and single player */
let walkers = [];
let player;

/* Global main variable for simulation paused state */
let PAUSED = false;
let SLOWDOWN_RATE = 3;

/**
 * Updates the characteristics of all walkers in the simulation based on the current global settings.
 * This function is called whenever the user changes the greedy, scare, or speed settings in the GUI.
 * It iterates through the list of walkers and updates their characteristics accordingly.
 */
function Walkers_UpdateCharacteristics() {
  for (let walker of walkers) {
    walker.updateCharacteristics(WALKER_GREEDY, WALKER_SCARE, WALKER_SPEED);
  }
}


/**
 * Sets up the simulation environment, initializes walkers, and configures the GUI.
 * It also sets the relationships between walkers as prey and predator.
 */
function setup() {
  myCanvas = createCanvas(WIN_WIDTH, WIN_HEIGHT);
  createHTLMGui();

  /* Initialize global variables */
  initDirections();
  normalizeProbabilities();
  
  if (PLAYER_ON) {
    player = new Player();
    walkers.push(player);
  }
  
  for (let i = 0; i < MAX_WALKERS - PLAYER_ON; i++) {
    walkers.push(new Walker(undefined, undefined, WALKER_GREEDY, WALKER_SCARE, WALKER_SPEED));
  }
  
  // Set relations -> prey, predator
  for (let i = 0; i < MAX_WALKERS; i++) {  
    walkers[i].setTarget((i + 1) % MAX_WALKERS, (i + MAX_WALKERS - 1) % MAX_WALKERS, walkers);
  }
    
}


/**
 * Draws the simulation frame, including the grid and all walkers.
 * The draw function is called repeatedly by p5.js to update the simulation.
 */
function draw() {
  if((frameCount % SLOWDOWN_RATE) == 0) {
    background(50);

    drawGrid();

    if (PAUSED) {
      showPauseMsg();
    } else {
      // Move and draw the walkers
      for (let walker of walkers) {
        walker.update();
        walker.show();
      }
  }
  
    showGui();
  }
}