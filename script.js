/* VARIABLES */
let fishSprite, bottle, can, crab, jelly, octopus, shell, ship, trash, screen0bg, download;
let FishImg, BottleImg, CanImg, CrabImg, JellyImg, OctopusImg, ShellImg, ShipImg, TrashImg, screen0bgImg, bgImg;
let score = 0;
let level = 1;
let startButton;
let gameStarted = false;
let screen = 0;

let x = 0;
const scrollSpeed = 2; // Adjust speed as needed
const itemRefreshRate = 60; // Frames between item repositioning

/* PRELOAD LOADS FILES */
function preload() {
  FishImg = loadImage("assets/Fish.png");
  BottleImg = loadImage("assets/Bottle.png");
  CanImg = loadImage("assets/Can.png");
  CrabImg = loadImage("assets/Crab.png");
  JellyImg = loadImage("assets/Jelly.png");
  OctopusImg = loadImage("assets/Octopus.png");
  ShellImg = loadImage("assets/Shell.png");
  ShipImg = loadImage("assets/Shipthing.png");
  TrashImg = loadImage("assets/Trash.png");
  screen0bgImg = loadImage('assets/screen0bg.png');
  bgImg = loadImage('assets/download.png');
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400, 400);

  // Resize fish image
  FishImg.resize(50, 0);

  // Create fish sprite
  fishSprite = new Sprite(FishImg, 20, 150); // Starting position at the left side of the screen
  fishSprite.visible = false; // Hide initially

  // Resize and create all other sprites with scale 0.8
  BottleImg.resize(50, 0);
  CanImg.resize(50, 0);
  CrabImg.resize(50, 0);
  JellyImg.resize(50, 0);
  OctopusImg.resize(50, 0);
  ShellImg.resize(50, 0);
  ShipImg.resize(50, 0);
  TrashImg.resize(50, 0);

  // Create start button
  startButton = createButton('Start Game');
  startButton.position(39.5, 225);
  startButton.size(100, 50);
  startButton.mousePressed(startGame);

  // Create item sprites
  crab = new Sprite(CrabImg, random(width), random(height));
  crab.scale = 1;
  crab.visible = false;

  jelly = new Sprite(JellyImg, random(width), random(height));
  jelly.scale = 1;
  jelly.visible = false;

  octopus = new Sprite(OctopusImg, random(width), random(height));
  octopus.scale = 1;
  octopus.visible = false;

  shell = new Sprite(ShellImg, random(width), random(height));
  shell.scale = 1;
  shell.visible = false;

  bottle = new Sprite(BottleImg, random(width), random(height));
  bottle.scale = 1;
  bottle.visible = false;

  can = new Sprite(CanImg, random(width), random(height));
  can.scale = 1;
  can.visible = false;

  trash = new Sprite(TrashImg, random(width), random(height));
  trash.scale = 1;
  trash.visible = false;

  ship = new Sprite(ShipImg, random(width), random(height));
  ship.scale = 1;
  ship.visible = false;
}

/* DRAW LOOP REPEATS */
function draw() {
  if (screen == 0) {
    background(screen0bgImg);
  } else if (screen == 1) {
    // Draw the image twice to create a seamless repeating effect
    image(bgImg, x, 0, width, height);
    image(bgImg, x + width, 0, width, height);

    x -= scrollSpeed;

    // Reset x position when it reaches the end of the canvas
    if (x < -width) {
      x = 0;
    }

    playGame();

    fill(0);
    textSize(20);
    text("Score: " + score, 30, 40);
    text("Level: " + level, 30, 80);

    // Check if player levels up
    if (score >= 6 * level) {
      level += 1;
      score = 0; // Reset score after leveling up
    }

    // Draw all sprites except the fish
    drawSprites();

    // Draw the fish sprite last to ensure it appears in front
    fishSprite.draw();
  }
}

function startGame() {
  gameStarted = true;
  screen = 1; // Switch to game screen
  startButton.hide();

  // Make sprites visible
  fishSprite.visible = true;
  crab.visible = true;
  jelly.visible = true;
  octopus.visible = true;
  shell.visible = true;
  bottle.visible = true;
  can.visible = true;
  trash.visible = true;
  ship.visible = true;

  // Randomly position items initially
  repositionItems();
}

function playGame() {
  // Handle player movement
  if (kb.pressing("left")) {
    fishSprite.position.x -= 5;
  }
  if (kb.pressing("right")) {
    fishSprite.position.x += 5;
  }
  if (kb.pressing("up")) {
    fishSprite.position.y -= 5;
  }
  if (kb.pressing("down")) {
    fishSprite.position.y += 5;
  }

  // Check for collisions with positive items
  if (fishSprite.overlap(crab)) {
    score += 1;
    crab.position.y = random(height);
    crab.position.x = random(width);
  }
  if (fishSprite.overlap(jelly)) {
    score += 1;
    jelly.position.y = random(height);
    jelly.position.x = random(width);
  }
  if (fishSprite.overlap(octopus)) {
    score += 1;
    octopus.position.y = random(height);
    octopus.position.x = random(width);
  }
  if (fishSprite.overlap(shell)) {
    score += 1;
    shell.position.y = random(height);
    shell.position.x = random(width);
  }

  // Check for collisions with negative items
  if (fishSprite.overlap(bottle)) {
    score -= 1;
    bottle.position.y = random(height);
    bottle.position.x = random(width);
  }
  if (fishSprite.overlap(can)) {
    score -= 1;
    can.position.y = random(height);
    can.position.x = random(width);
  }
  if (fishSprite.overlap(trash)) {
    score -= 1;
    trash.position.y = random(height);
    trash.position.x = random(width);
  }
  if (fishSprite.overlap(ship)) {
    score -= 1;
    ship.position.y = random(height);
    ship.position.x = random(width);
  }

  // Reposition items randomly as the background scrolls
  if (frameCount % itemRefreshRate === 0) {
    repositionItems();
  }
}

function repositionItems() {
  // Randomly reposition all items within the canvas
  crab.position.x = random(width);
  crab.position.y = random(height);

  jelly.position.x = random(width);
  jelly.position.y = random(height);

  octopus.position.x = random(width);
  octopus.position.y = random(height);

  shell.position.x = random(width);
  shell.position.y = random(height);

  bottle.position.x = random(width);
  bottle.position.y = random(height);

  can.position.x = random(width);
  can.position.y = random(height);

  trash.position.x = random(width);
  trash.position.y = random(height);

  ship.position.x = random(width);
  ship.position.y = random(height);
}
