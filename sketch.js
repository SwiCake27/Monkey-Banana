
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0
var survivalTime=0
var yes=false
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  monkey=createSprite(30,315,10,10);
ground=createSprite(400,400,900,10);
obstacleGroup=createGroup();
  FoodGroup=createGroup();
}


function draw() {
background(225)
    monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  monkey.collide(ground)
    ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
    text("score:"+score,10,10)
  if (yes===false){
  survivalTime = survivalTime + Math.round(getFrameRate()/60);
}
text("survivalTime:"+survivalTime,300,10)
    if(keyDown("space")&& monkey.y >= 300) {
        monkey.velocityY = -20;
     
    }
    monkey.velocityY = monkey.velocityY + 0.8
  
  spawnObstacles();
  spawnFood();
   if(obstacleGroup.isTouching(monkey)){
yes=true
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
      monkey.velocityY=0;
      FoodGroup.setVelocityXEach(0);
     obstacleGroup.setVelocityXEach(0);
     
   }
      
   if(FoodGroup.isTouching(monkey)){
     
 score=score+10
   FoodGroup.destroyEach();
   }
     
  drawSprites();
}
       
function spawnObstacles(){
 if (frameCount % 80 === 0){
   var obstacle = createSprite(400,390,10,40);
   obstacle.velocityX = -6;
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
     obstacle.addImage(obstacleImage);
          
        
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
   if (score%100===0&&score>0){
      obstacle.velocityX=-(6+score/100);
   }
 }
}

function spawnFood() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    var banana = createSprite(600,300,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //add each cloud to the group
    FoodGroup.add(banana);
  }
}

