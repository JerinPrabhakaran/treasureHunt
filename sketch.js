var END = 2;
var PLAY = 1;
var START = 0;
var gameState = START;
var engine ,world;
var backGround ,backgroundImg;
var lava ,lavaImg;
var player ,playerImg;
var brickImg ,brickGroup;
var inground;
var edge1 ,edge2 ,edge3;
var coinImg ,coinGroup;
var spikeImg ,spikeGroup;
var score = 0;
var treasureImg;


function preload(){
  backgroundImg = loadImage("images/background3.jpg");
  lavaImg = loadImage("images/lava2.jpg");
  playerImg = loadImage("images/player.png");
  brickImg = loadImage("images/brick.jpg");
  coinImg = loadImage("images/coin.png");
  spikeImg = loadImage("images/spike1.png");
  treasureImg = loadImage("images/treasure.png");
}
function setup() {
  createCanvas(1000,550);

 
  backGround = createSprite(500, 200, 1400, 400);
  backGround.addImage(backgroundImg);
  backGround.scale = 2;
 // backGround.x = width/2;
  backGround.velocityX = -5;

  lava = createSprite(500 ,480 ,1000 ,30);
  lava.addImage(lavaImg);
  lava.scale = 2.3
  lava.velocityX = -5;


  player  = createSprite(100 ,50 ,50 ,50);
  player.addImage(playerImg);
  player.scale = 0.15;

  player.depth = lava.depth;
  lava.depth = lava.depth + 1;

  inground = createSprite(500 ,460 ,1000 ,50);
  inground.visible = false;
  edge1 = createSprite(1020 ,250 ,50 ,1000);
  edge1.visible = false;
  edge2 = createSprite(-20 ,250 ,50 ,1000);
  edge2.visible = false;
  edge3 = createSprite(500 ,-20 ,1000 ,50);
  edge3.visible = false;


brickGroup = new Group();
coinGroup = new Group();
spikeGroup = new Group();
}

function draw() {
  background("black");
  drawSprites();
  if(gameState === START){
    backGround.velocityX = 0;
    lava.velocityX = 0;
    player.visible = false;
    textSize(35);
    fill("gold");
    text("Welcome To Treasure hunt" ,300 ,50);

    textSize(25);
    fill("gold");
    text("Get 1000 Points To Find The Treasure By Collecting The Coins." ,100 ,120);

    textSize(25);
    fill("gold");
    text("Use Arrow Keys To Move." ,350 ,190);

    textSize(25);
    fill("red");
    text("Do Not Touch The Spikes & Lava ," ,100 ,260);

    textSize(25);
    fill("gold");
    text("If You Did,You Will Lose. " ,500 ,260);

    textSize(25);
    fill("gold");
    text("Press Space To Continue" ,350 ,330);

    if(keyDown("space")){
      gameState = PLAY;
      player.visible = true;
    }
  }
if(gameState === PLAY){
  if(keyDown("up")){
    player.velocityY = -7;
  }
  if(keyDown("down")){
    player.velocityY = 7;
  }
  if(keyDown("left")){
    player.x -= 6;
  }
  if(keyDown("right")){
   player.x += 6;
  }
  if(backGround.x < 0){
    backGround.x = width/2;
  }
  if(player.isTouching(coinGroup)){
    score = score + 50;
    coinGroup.destroyEach();
  }
  bricks();
 
  player.velocityY = player.velocityY + 1.5;

}
if(player.isTouching(spikeGroup) || player.isTouching(inground)){
  gameState = END;
}

if(gameState === END){
  backGround.velocityX = 0;
  lava.velocityX = 0;
  coinGroup.setVelocityEach(0);
  spikeGroup.setVelocityEach(0);
  brickGroup.setVelocityEach(0);
  coinGroup.destroyEach();
  spikeGroup.destroyEach();
  brickGroup.destroyEach();
  player.visible = true;
  fill("red");
  textSize(35);
  text("GAME OVER" ,400 ,100);
  fill("red");
  textSize(35);
  text("Press R To Restart" ,400 ,170);
  if(keyDown("r")){
    reset();

  }

}
  if(lava.x < 0){
    lava.x = width/2;
  }


  player.collide(inground);
  player.collide(edge1);
  player.collide(edge2);
  player.collide(edge3);
  player.collide(brickGroup);
 
  fill("yellow");
  textSize(25);
  text("Score : " + score ,800 ,100);
  if(score === 1000){
    backGround.velocityX = 0;
    lava.velocityX = 0;
    coinGroup.setVelocityEach(0);
    spikeGroup.setVelocityEach(0);
    brickGroup.setVelocityEach(0);
    coinGroup.destroyEach();
    spikeGroup.destroyEach();
    brickGroup.destroyEach();
    player.visible = false;
    player.y = 5;
    var treasure = createSprite(500 ,395 ,10 ,10);
     treasure.addImage(treasureImg);
     fill("gold");
     textSize(45);
     text("YOU WON!" ,400 ,100);
  }

}
function bricks() {
  if (frameCount % 80 === 0) {
    var brick = createSprite(random(500 ,1000), random(250 ,400),40,10);
    brick.addImage(brickImg);
    brick.scale = 0.5;
    brick.velocityX = -5;
    brickGroup.add(brick);

   var coin = createSprite(brick.x ,brick.y - 75,10 ,10);
   coin.addImage(coinImg);
   coin.scale = 0.1;
   coin.velocityX = -5;
   coinGroup.add(coin);

   if(frameCount % 110 === 0){
    var spike = createSprite(brick.x - 90 ,brick.y - 55,10 ,10);
    var ran = Math.round(random(1,2));
    switch(ran) {
      case 1: spike.x = brick.x + 90;
              break;
      case 2: spike.x = brick.x - 90
              break;
      default: break;
    }
    spike.addImage(spikeImg);
    spike.scale = 0.05;
    spike.velocityX = -5;
    spikeGroup.add(spike);
   }
   coinGroup.add(coin);
  }

}

function reset(){
  gameState = START;
  score = 0;
player.y = 50 ;
}