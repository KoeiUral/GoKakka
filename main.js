


let walkers = [];
let player;


function setup() {
  createCanvas(WIN_WIDTH, WIN_HEIGHT);
  //synth = new p5.MonoSynth();
  //palette = [color(255, 0, 0), color(0, 255, 0), color(0, 0, 255)];

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

function draw() {
  if((frameCount % 3) == 0) {
    background(50);

    drawGrid();

    //move and draw the walkers
    for (let walker of walkers) {
      walker.update();
      walker.show();
    }
  
    showGui();
  }
}