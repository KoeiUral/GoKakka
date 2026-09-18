const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;



let palette = [];
let walkers = [];
let player;

let synth;



class Walker {
  constructor(x, y) {
    if (x == undefined || y == undefined) {
      this.posX = floor(random(COLS));
      this.posY = floor(random(ROWS));
      //this.pos = createVector(floor(random(COLS)), floor(random(ROWS)));
    } else {
      this.posX = x;
      this.posY = y;
      //this.pos = createVector(x, y);
    }
    
    this.color = random(palette);
    this.score = 0;
    this.vel = 1;

    this.prey = undefined;
    this.predator = undefined;
  }
  
  setTarget(prey, predator, walkerList) {
    this.prey = walkerList[prey];
    this.predator = walkerList[predator];
  }
  
  // This function wrap the position over the grid
  wrap() {
    if (this.posX >= COLS) {
      this.posX = 0;
    } else if (this.posX < 0) {
      this.posX = COLS - 1;         
    }

    if (this.posY >= ROWS) {
      this.posY = 0;
    } else if (this.posY < 0) {
      this.posY = ROWS - 1;         
    }
  }

  boud() {
    if (this.posX >= COLS) {
      this.posX = COLS;
    } else if (this.posX < 0) {
      this.posX = 0;         
    }

    if (this.posY >= ROWS) {
      this.posY = ROWS;
    } else if (this.posY < 0) {
      this.posY = 0;         
    }
  }
  
  roam() {
    let direction = floor(random(4));
    
    switch (direction) {
      case 0:
        this.posX = this.posX + 1;
        break;
      case 1:
        this.posX = this.posX - 1;
        break;
      case 2:
        this.posY = this.posY + 1;
        break;
      case 3:
        this.posY = this.posY - 1;
        break;
    }
      
  }
  
  chase() {
    if (this.prey != undefined) {
      let d = dist(this.posX, this.posY, this.prey.posX, this.prey.posY);

      if (d != 0) {
        this.posX += round((this.prey.posX - this.posX) * this.vel / d);
        this.posY += round((this.prey.posY - this.posY) * this.vel / d);
      } else {
        this.score += 10;
      }
    }
  }
  
  flee() {
    if (this.predator != undefined) {
      let d = dist(this.posX, this.posY, this.predator.posX, this.predator.posY);

      if (d != 0) {
        this.posX -= round((this.predator.posX - this.posX) * this.vel / d);
        this.posY -= round((this.predator.posY - this.posY) * this.vel / d);
      } else {
        this.score -= 10;
      }
    }
  }
  
  move() {
    let moveProb = random();
    
    if (moveProb < 0.05) {
      this.roam();
    } else if (moveProb < 0.65) {
      this.chase();
    } else {
      this.flee();
    }
    
    this.wrap(); 
  }
  
  show() {
    let x = this.posX * CELL_SIZE + FRAME_SIZE;
    let y = this.posY * CELL_SIZE + FRAME_SIZE;
    
    noStroke();
    fill(this.color);
    rect(x, y, CELL_SIZE);
  }
}


class Player extends Walker {
  constructor() {
    super(round(COLS / 2), round(ROWS / 2));
    this.color = color(255, 0, 255);
  }
  
  move () {
    if (keyIsDown(KEY_A) || keyIsDown(LEFT_ARROW)) {
      this.posX = this.posX - 1;
    }
    if (keyIsDown(KEY_D) || keyIsDown(RIGHT_ARROW)) {
      this.posX = this.posX + 1;
    } 
    if (keyIsDown(KEY_W) || keyIsDown(UP_ARROW)) {
      this.posY = this.posY - 1;
    } 
    if (keyIsDown(KEY_S) || keyIsDown(DOWN_ARROW)) {
      this.posY = this.posY + 1;
    }
    
    this.wrap();
    this.check();
  }
  
  check() {
    if ((this.posX == this.prey.posX) && (this.posY == this.prey.posY)) {
      this.score += 10;
      synth.play('G4', 1, 0, 1/6);
    } else if ((this.posX == this.predator.posX) && (this.posY == this.predator.posY)) {
      this.score -= 10;
      synth.play('C2', 1, 0, 1/6);
    }
  }
  
}