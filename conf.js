/**
 * Configuration file for the simulation
 */

/* ASCII code for the Player controller */
const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;
const KEY_P = 80;

/* Indexes for the directions array */
const RIGHT = 0;
const LEFT = 1;
const DOWN = 2;
const UP = 3;

const SCORE_THRESHOLD = 2; // Distance threshold for scoring
const DELTA_SCORE = 10; // Score increment/decrement value
const PLAYER_ON = true; // If True, a player-controlled walker is added to the simulation
const WALKER_SIZE = 1; // Size of the walker
const DELTA_SIZE = WALKER_SIZE / 20; // Size increment for the walker when scoring
const MIN_SIZE = 0.3; // Minimum size for the walker
const MAX_SIZE = 8; // Maximum size for the  walker


let WRAP_ENABLE = false; // If True, walkers can wrap around the screen
let ROAM_PROB = 0.1; // Probability of roaming
let CHASE_PROB = 0.3; // Probability of chasing
let FLEE_PROB = 0.6; // Probability of fleeing
let WALKER_GREEDY = 0.8; // Greedy ratio for the walkers
let WALKER_SCARE = 0.8; // Scare ratio for the walkers
let MAX_WALKERS = 3; // Maximum number of walkers in the simulation
let WALKER_SPEED = 1; // Speed of the walkers
let PLAYER_SPEED = 1; // Speed of the player-controlled walker
let TRAIL_ON = true; // If True, walkers leave a trail behind them
let TRAIL_LEN = 5; // Length of the trail for each walker
let TRAIL_DELTA = 255 / TRAIL_LEN; // Opacity decrement for the trail


/* Array of possible movement directions */
let directions = [];
let probabilities = [];

/**
 * Initializes the directions array with the four cardinal directions as p5.Vector objects.
 */
function initDirections() {
  directions = [
    createVector(1, 0),  // right
    createVector(-1, 0), // left
    createVector(0, 1),  // down
    createVector(0, -1)  // up
  ];
} 

/**
 * Normalizes the probabilities of roaming, chasing, and fleeing so that they sum to 1.
 * The normalized probabilities are stored in the global 'probabilities' array.
 */
function normalizeProbabilities() {
  let totalProb = ROAM_PROB + CHASE_PROB + FLEE_PROB;
  probabilities = [ROAM_PROB, CHASE_PROB, FLEE_PROB].map(p => p / totalProb);

  console.log("Normalized Probabilities: ", probabilities);

}
