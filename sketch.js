var PLAY=1;
var End=0;
var gameState=PLAY;

var monkey,monkeyImage,ground,obstacle,
obstacleImage,banana,bananaImage,bananaGroup,
obstacleGroup,mokey;

var st=0;

var st=PLAY;

function preload(){
monkeyImage=loadAnimation("sprite_0.png",
"sprite_1.png","sprite_2.png","sprite_3.png",
"sprite_4.png","sprite_5.png","sprite_6.png",
"sprite_7.png","sprite_8.png");
  
  obstacleImage=loadImage("obstacle.png");
  bananaImage=loadImage("banana.png");
  mokey=loadImage("sprite_0.png");
}



function setup() {
  createCanvas(400,400);
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkeyImage);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
 
  obstacleGroup=new Group();
  bananaGroup=new Group();
}


function draw() {
  background("white");
  
  stroke("black");
  textSize(20);
  fill("yellow");
   text("survival  Time: "+ st,100,25);

  monkey.collide(ground);
  
  if(ground.x<0){
     ground.x=ground.width/5;
  }
  
  if(keyDown("space")){
    monkey.velocityY=-12;
  }
  
  monkey.velocityY=monkey.velocityY + 0.4;
  
st = st + Math.round(getFrameRate()/60);
  
  if(obstacleGroup.isTouching(monkey)){
    gameState=End;
  }
  
  if(gameState===End){
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    monkey.velocityY=0;
    monkey.addImage(mokey);
    bananaGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
  }
  
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
  }
  
  obstacle();
  banana();
  
  drawSprites();
 
}

function obstacle(){
  if(frameCount%300===0){
     var obstacle=createSprite(550,330,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-4;
    obstacle.scale=0.1;
    obstacle.lifetime=120;
    obstacleGroup.add(obstacle);
  }
}

function banana(){
  if(frameCount%80===0){
     var banana=createSprite(600,150,20,20);
    banana.addImage(bananaImage);
    banana.velocityX=-3;
    banana.scale=0.10; 
    banana.lifetime=180;
    banana.y=Math.round(random(120,200));
    bananaGroup.add(banana);
  } 
}