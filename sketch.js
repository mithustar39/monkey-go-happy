
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;
var survivalTime=0;

function preload(){
 
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400)
  monkey=createSprite(300,300,20,50)
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
   foodGroup = new Group();
  obstacleGroup = new Group();
  
  
   ground=createSprite(200,330,800,10);
  ground.x = ground.width /2;
  ground.velocityX = -6;
}


function draw() {
  background("white")
  
  stroke("black")
  textSize(20);
  fill("white")
  survivalTime=Math.ceil(frameCount/frameRate())
  text("survival time:"+survivalTime,100,50);
  
  
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  if(keyDown("space") && monkey.y >= 280) {
      monkey.velocityY = -12;
         
    }
  
  monkey.collide(ground);
  
  
  
  if(ground.x<0){
      ground.x = ground.width /2;
  }
  
  food();
  spawnObstacles();
  
  if(monkey.isTouching(obstacleGroup)){
  ground.velocityX=0;
  foodGroup.setVelocityXEach(0);
  obstacleGroup.setVelocityXEach(0);
  obstacleGroup.setLifetimeEach(-1)
  foodGroup.setLifetimeEach(-1)
  }
  
  drawSprites();
}

function food(){
  if (frameCount % 80 === 0) {
    banana=createSprite(400,0,20,20)
    banana.y = Math.round(random(150,240));
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-5; 
    banana.lifetime=80
    foodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(400,280,10,40); 
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-5;
    obstacle.scale = 0.2;
    obstacle.lifetime = 80;
    obstacleGroup.add(obstacle);
  }
}