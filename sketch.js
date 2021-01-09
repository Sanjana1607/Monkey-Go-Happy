
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var ground
var bg, bgImg
var FoodGroup, obstacleGroup
var gameOver, gameOverImg, restart, restartImg
var score=0
var survivalTime = 0
var PLAY=0
var END=1
var gameState = PLAY



function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  gameOverImg = loadImage("gameOver.png");
  bgImg = loadImage("jungle1.jpg")
  restartImg = loadImage("restart.png")
}



function setup() {
  createCanvas(600,400)
  
  bg = createSprite(300,200,600,400)
  bg.addImage("bg", bgImg)
  bg.scale = 3
  
  
  monkey = createSprite(80,315,20,20)
  monkey.addAnimation("moving", monkey_running)
  monkey.scale = 0.15
  
  ground = createSprite(300,360,600,7)
  ground.shapeColor = ("black")
  
  gameOver = createSprite(300,150)
  gameOver.addImage("gameOver", gameOverImg)
  
  
  restart= createSprite(300,255)
  restart.addImage("restart", restartImg)
  restart.scale = 0.3
   
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  
  
}


function draw() {
  background("yellow")
  
  
    
  if(mousePressedOver(restart)&& gameState ===END)
    {
      reset();
    }
  
   if(gameState===PLAY)
     {

      if(keyDown("space")&& monkey.y >= 300)
        {  
          monkey.velocityY =-15
        } 
      monkey.velocityY = monkey.velocityY+0.8
       
       gameOver.visible = false
       restart.visible = false
       
  bg.velocityX = -4        
  if (bg.x < 0)
  {
    bg.x = bg.width/2
  }
     }
  
  if(gameState ===END)
    {
     gameOver.visible = true
    restart.visible = true
     bananaGroup.destroyEach()
     obstacleGroup.destroyEach()
     bg.velocityX = 0
     monkey.velocityX = 0
     monkey.velocityY =0
     
    
      
      
      
      
    }
  
  
  
  
  
  
  
   if(monkey.isTouching(bananaGroup))
     {
      score = score+1 
      bananaGroup.destroyEach()
      
     }
   
  if(monkey.isTouching(obstacleGroup))
    {
      obstacleGroup.destroyEach()
      gameState = END 
      
    }
  
  
  
  
  monkey.collide(ground)
  spawnBanana();
  spawnRocks();
  
  drawSprites();
  
  stroke("black")
  text(20)
  fill("black")
  text("SCORE:" +score, 200,20)
  
  
  text("SURVIVAL TIME:" +round(frameCount/30),20,20)
  
}

function spawnBanana()
{
  if(frameCount%150===0)
    {
      banana = createSprite(601,round(random(120,200)),20,20)
      banana.addImage("banana",bananaImage)
      banana.scale = 0.2
      banana.velocityX= -5 
      banana.depth= monkey.depth
      banana.lifetime = 200
      monkey.depth= monkey.depth+1 
      bananaGroup.add(banana)
    }
}

function spawnRocks()
{
  if(frameCount%200===0)
    {
      obstacle = createSprite(601,330,20,20)
      obstacle.addImage(obstacleImage)
      obstacle.scale = 0.12
      obstacle.velocityX = -5
      obstacle.depth= monkey.depth
      obstacle.lifetime = 200
      monkey.depth= monkey.depth+1
      obstacleGroup.add(obstacle)
    }
}

function reset()
{
  gameState = PLAY
  score = 0
  
}

