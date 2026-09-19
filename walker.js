/**
 * Walker.js
 * 
 * This file implements the Walker class, which is used to create the prey and predator 
 * agents in the simulation.
 */


/**
 * The WALKER class implements a simple agent that can roam, chase and flee.
 * It is used to create the prey and predator agents in the simulation.
 * The Walker holds several characteristics such as position (vector), color, score and velocity (scalar),
 * greedy ratio and scare ratio (1 - greedy ratio).
 * It also holds references to its prey and predator agents.  
 */
class Walker {
  constructor(x, y, greedy, scare, speed) {
    if (x == undefined || y == undefined) {
      /* Create the Walker in a random position on screen */
      this.pos = createVector(floor(random(COLS)), floor(random(ROWS)));
    } else {
      this.pos = createVector(x, y);
    }
    
    /**
     * Set the Walker main characteristics, greedy is a scale factor [0-1] foe how much the walker is 
     * abtracted by its prey and consecutive how much scared by its predator, as scare = 1 - greedy
     */
    this.speed = speed;
    this.greedyRatio = greedy;
    this.scareRatio = scare;

    /* Consmetic fields */
    this.color = color(random(255), random(255), random(255));;
    this.score = 0;

    /* Pointers to walker's prey and predator */
    this.prey = undefined;
    this.predator = undefined;
  }


  /**
   * 
   * @param {*} preyId: prey index in the walkers array
   * @param {*} predator: predator index in the walkers array
   * @param {*} walkerList: walkers array
   */
  setTarget(preyId, predatorId, walkerList) {
    this.prey = walkerList[preyId];
    this.predator = walkerList[predatorId];
  }
  

  /**
   * Wraps the walker's position around the grid boundaries
   */
  wrap() {
    if (this.pos.values[0] >= COLS) {
      this.pos.values[0] = 0;
    } else if (this.pos.values[0] < 0) {
      this.pos.values[0] = COLS - 1;         
    }

    if (this.pos.values[1] >= ROWS) {
      this.pos.values[1] = 0;
    } else if (this.pos.values[1] < 0) {
      this.pos.values[1] = ROWS - 1;         
    }
  }


  /**
   * Bounds the walker's position within the grid boundaries
   */
  bound() {
    if (this.pos.values[0] >= COLS) {
      this.pos.values[0] = COLS - 1;
    } else if (this.pos.values[0] < 0) {
      this.pos.values[0] = 0;         
    }

    if (this.pos.values[1] >= ROWS) {
      this.pos.values[1] = ROWS - 1;
    } else if (this.pos.values[1] < 0) {
      this.pos.values[1] = 0;         
    }
  }


  /**
   * Roam move the walker in a random direction (up, down, left, right) by one cell
   */
  roam() {
    /* Pick up a random direction */
    let direction = directions[floor(random(directions.length))];

    /* Add direction to walker position. */
    this.pos.add(direction);
  }


  /**
   * Move the walker towards/way from its prey/predator. The move is calculated as a vector 
   * from the walker to its target, scaled by the walker's velocity. 
   * @param {*} kPrey: scaling factor towards the prey
   * @param {*} kPredator: scaling factor away from the predator
   */
  move(kPrey, kPredator) {
    if ((this.prey != undefined) && (this.predator != undefined)) {
      /* Compute the direction vector between walker and its prey */
      let posPrey = p5.Vector.sub(this.prey.pos, this.pos).normalize(); // Chease

      /**
       * Compute the direction vector predator and walker, it is inverted wrt prey cause it is 
       * inverted, i.e. a negative direction
       */
      let posPredator = p5.Vector.sub(this.pos, this.predator.pos).normalize(); // Flee

      /* Weight the vectors by the walker's velocity towards/away from its prey/predator */
      posPrey.mult(kPrey);
      posPredator.mult(kPredator);
    
      /* Compute the movement vector */
      let vel = p5.Vector.add(posPrey, posPredator);// * this.speed;
      //vel.values[0] = round(vel.values[0] * this.speed);
      //vel.values[1] = round(vel.values[1] * this.speed);

      /* Add velocity to position */
      this.pos.add(vel);

    } else {
      console.log("Walker has no prey or predator");  //TOOD: fix the debug messages
    }
  }


  /**
   * Move the walker MOSTLY towards its prey.
   */
  chase() {
    this.move(this.greedyRatio , 1 - this.greedyRatio);
  }

  
  /**
   * Move the walker MOSTLY away from its predator.
   */
  flee() {
    this.move(1 - this.scareRatio, this.scareRatio);
  }
  
  /**
   * Check if the player has collided with its prey or predator. If the player collides with its prey,
   * its score increases by 10, if it collides with its predator, its score decreases by 10.
   */
  check() {
    let distPrey = this.pos.dist(this.prey.pos);
    let distPredator = this.pos.dist(this.predator.pos);

    if (distPrey < SCORE_THRESHOLD) {
      this.score += DELTA_SCORE;
    }
  }

  /**
   * Update the walker's position based on a random probability. The walker can roam, chase or flee.
   * If WRAP_ENABLE is true, the walker will wrap around the screen boundaries, otherwise it will be bounded.
   */
  update() {
    let moveProb = random();
    
    if (moveProb < probabilities[0]) {
      this.roam();
    } else if (moveProb < probabilities[1]) {
      this.chase();
    } else {
      this.flee();
    }
    
    if (WRAP_ENABLE) {
      this.wrap(); 
    } else {
      this.bound();
    }

    /* Update the score */
    this.check();
  }


  /**
   * Show the walker on the screen as a rectangle with its color and position.
   */
  show() {
    let x = this.pos.values[0] * CELL_SIZE + FRAME_SIZE;
    let y = this.pos.values[1] * CELL_SIZE + FRAME_SIZE;
    
    noStroke();
    fill(this.color);
    rect(x, y, CELL_SIZE);
  }

}


/**
 * The PLAYER class extends the Walker class and implements a player-controlled agent. 
 * The player can move using the WASD keys or the arrow keys.
 * The player has a score that increases when it collides with its prey and decreases when it collides 
 * with its predator.
 */
class Player extends Walker {
  constructor() {
    /* Initialize the player at the center of the screen */
    super(round(COLS / 2), round(ROWS / 2), WALKER_GREEDY, WALKER_SCARE, PLAYER_SPEED);

    /* Set STATIC player's color */
    this.color = color(255, 0, 255);
  }


  /**
   * Move the player based on the keyboard input. The player can move up, down, left or right using
   * the WASD keys or the arrow keys. If WRAP_ENABLE is true, the player will wrap around the screen 
   * boundaries, otherwise it will be bounded.
   */
  update() {
    let dirId = undefined;

    if (keyIsDown(KEY_A) || keyIsDown(LEFT_ARROW)) {
      dirId = LEFT;
    }
    if (keyIsDown(KEY_D) || keyIsDown(RIGHT_ARROW)) {
      dirId = RIGHT;
    } 
    if (keyIsDown(KEY_W) || keyIsDown(UP_ARROW)) {
      dirId = UP;
    } 
    if (keyIsDown(KEY_S) || keyIsDown(DOWN_ARROW)) {
      dirId = DOWN;
    }
    
    if (dirId != undefined) {
      this.pos.add(directions[dirId]);
    }

    if (WRAP_ENABLE) {
      this.wrap();
    } else {
      this.bound();
    }

    this.check();
  }

}