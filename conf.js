/**
 * Configuration file for the simulation
 */

/* ASCII code for the Player controller */
const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;

/* Indexes for the directions array */
const RIGHT = 0;
const LEFT = 1;
const DOWN = 2;
const UP = 3;

const SCORE_THRESHOLD = 2; // Distance threshold for scoring
const DELTA_SCORE = 10; // Score increment/decrement value
const WRAP_ENABLE = false; // If True, walkers can wrap around the screen
const ROAM_PROB = 0.1; // Probability of roaming
const CHASE_PROB = 0.3; // Probability of chasing
const FLEE_PROB = 0.6; // Probability of fleeing
const MAX_WALKERS = 3; // Maximum number of walkers in the simulation
const PLAYER_ON = true; // If True, a player-controlled walker is added to the simulation
const WALKER_SPEED = 1; // Speed of the walkers
const PLAYER_SPEED = 1; // Speed of the player-controlled walker
const WALKER_GREEDY = 0.5; // Greedy ratio for the walkers
const WALKER_SCARE = 0.5; // Scare ratio for the walkers

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
  probabilities = [ROAM_PROB, ROAM_PROB + CHASE_PROB, FLEE_PROB].map(p => p / totalProb);
}
