// Create the variables
var monkey, monkey_animation, monkey_collided, banana, banana_animaton;
var jungle, jungle_animation, stone, stone_animation;
var ground;
var ObstaclesGroup, BananasGroup;
var obstacles;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {
  monkey_animation = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  monkey_collided = loadAnimation("Monkey_08.png");

  banana_animation = loadImage("banana.png");

  jungle_animation = loadImage("forest.webp");

  stone_animation = loadImage("stone.png");
}

function setup() {
  // Create the canvas for the game
  createCanvas(displayWidth-20, displayHeight-30);

  // Create the Ground Sprite
  ground = createSprite(200, 390, 400, 20);
  ground.visible = false;

  // Create the scene
  jungle = createSprite(displayWidth/2, displayHeight/2, displayWidth*4,displayHeight*3);
  jungle.addImage("Jungle_Image", jungle_animation);
  jungle.velocityX = -4;
  jungle.scale = 1.75

  // Create the Monkey SPrite
  monkey = createSprite(50, 370, 20, 50);
  monkey.addAnimation("Monkey_Image", monkey_animation);
  monkey.scale = 0.20;
  monkey.debug = false;

  // Create the groups
  ObstaclesGroup = new Group();
  BananasGroup = new Group();

}


function draw() {
  background(220);

  //Make the monkey colllide with the ground
  monkey.collide(ground);

  if (jungle.x < displayWidth/4) {
    jungle.x = displayWidth/2
  }






  // Make the monkey jump when the space key is pressed
  if (keyDown("space") && monkey.y >= 324) {
    monkey.velocityY = -20;
    gameState = PLAY;
  }

  if (gameState === PLAY) {

    // Increament in the score
    if (monkey.isTouching(BananasGroup)) {
      score = score + 2;
      BananasGroup.destroyEach();
    }

    if (BananasGroup.isTouching(monkey)) {
      monkey.scale = monkey.scale + 0.05;
    }

    if (ObstaclesGroup.isTouching(monkey)) {
      monkey.scale = monkey.scale - 0.02;
    }


    //reset the ground
    if (jungle.x < 0) {
      jungle.x = jungle.width / 2
    }

    camera.position.x = displayWidth/2;
    camera.position.y = monkey.position.y;

    // Add gravity to the monkey
    monkey.velocityY = monkey.velocityY + 0.8;

    // Call the created functions
    spawnObstacles();
    spawnBananas();

    if (monkey.scale <= 0.16) {
      gameState = END;
    }
  } else if (gameState === END) {
    ground.velocityX = 0;
    jungle.velocityX = 0;
    monkey.velocityX = 0;
    monkey.velocityY = 0;
    monkey.changeAnimation(monkey_collided);
    ObstaclesGroup.setVelocityXEach(0);
    BananasGroup.setVelocityXEach(0);
    ObstaclesGroup.setVelocityEach(0);
    BananasGroup.setVelocityEach(0);
    ObstaclesGroup.setLifetimeEach(-1);
    BananasGroup.setLifetimeEach(-1);
    ObstaclesGroup.destroyEach();
    BananasGroup.destroyEach();
  }

  // Draw the sprites
  drawSprites();

  //Display the score
  text("Score: " + score, 350, 50);
}

// Create the functions for spawning Obstacles and spawning Bananas
function spawnObstacles() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    var obstacles = createSprite(400, 350, 40, 10);
    obstacles.addImage(stone_animation);
    obstacles.scale = 0.25;
    obstacles.velocityX = -6;

    //assign lifetime to the variable
    obstacles.lifetime = 150;

    //add each cloud to the group
    ObstaclesGroup.add(obstacles);
  }

}

function spawnBananas() {
  //write code here to spawn the clouds
  if (frameCount % 150 === 0) {
    var banana = createSprite(400, 350, 40, 10);
    banana.y = Math.round(random(100, 150));
    banana.addImage(banana_animation);
    banana.scale = 0.05;
    banana.velocityX = -7;

    //assign lifetime to the variable
    banana.lifetime = 60;

    //add each cloud to the group
    BananasGroup.add(banana);
  }

}