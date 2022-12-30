
var man,manImage;
var wall,wallImage;
var zombie,zombieImage;
var bullet,bulletImage;
var score;
var bulletGroup,zombieGroup;
var bulletSound,zombieSound;
var backgroundMusic;

function preload(){
  manImage = loadImage("./assets/man.png")
  wallImage = loadImage("./assets/wall.jpeg")
  bulletImage = loadImage("./assets/bullet.png")
  zombie1Image = loadAnimation("zombie2/zo1.png","zombie2/zo2.png","zombie2/zo3.png","zombie2/zo4.png","zombie2/zo5.png","zombie2/zo6.png")
  zombieImage = loadAnimation("./assets/zombie1/z1.png","./assets/zombie1/z2.png","./assets/zombie1/z3.png","./assets/zombie1/z5.png","./assets/zombie1/z6.png","./assets/zombie1/z7.png","./assets/zombie1/z8.png","./assets/zombie1/z9.png","./assets/zombie1/z10.png","./assets/zombie1/z11.png")
  bulletSound = loadSound("./assets/bullet.mp3");
  zombieSound = loadSound("./assets/zombie.mp3");
  backgroundMusic = loadSound("./assets/backgroundMusic.mp3");
}


function setup(){
  createCanvas(windowWidth,windowHeight)
  backgroundMusic.setVolume(0.1);
  backgroundMusic.play()
  backgroundMusic.loop = true 
  man = createSprite(120,400)
  man.addImage(manImage)
  man.scale = 1.2
  man.debug = false
  man.setCollider("rectangle",0,0,25,100)

  bulletGroup = new Group();
  zombieGroup = new Group();

  score = 0;


  


  

}

function draw(){
  background(wallImage)

  spawnZombies()
  
  if (keyDown("space")){
    spawnBullets();
  }
  if (keyDown(UP_ARROW) && man.y>=100){
    man.y-=5
  }
  if (keyDown(DOWN_ARROW) && man.y<=height-100){
    man.y+=5
  }

  bulletGroup.isTouching(zombieGroup,killZombie)
  fill("black")
  textSize(40)
  text("score: "+ score, width/2,60);
  if(zombieGroup.isTouching(man)){
    //zombieGroup.setVelocityXEach(0);
    gameOver();
    zombieGroup.setVelocityXEach(0);

  }
  
  drawSprites()
}
function killZombie(B,Z){
  Z.destroy();
  B.destroy();
  score = score+5
  
}

function spawnZombies(){
  if(frameCount % 100===0){
    zombie = createSprite(width,random(100,height-100))
    zombie.addAnimation("first",zombieImage)
    zombie.addAnimation("second",zombie1Image)
    var rand = Math.round(random(1,2))
    switch(rand){
      case 1:zombie.changeAnimation("first");
      break;
      case 2:zombie.changeAnimation("second");
      break;
      default:break;
    }
    zombie.scale = 0.4
    zombie.velocityX = -3
    zombieGroup.add(zombie)
    zombieSound.setVolume(0.2)
    zombieSound.play()
    zombie.debug = false 
  }
}
function spawnBullets(){
  bullet = createSprite(man.x+20,man.y-30);
  bullet.addImage(bulletImage)
  bullet.velocityX = 2
  bullet.scale = 0.2
  bulletGroup.add(bullet)
  bulletSound.setVolume(0.1)
  bulletSound.play()
  

}
function gameOver() {
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!!",
      imageUrl:
       "https://clipground.com/images/animated-clipart-zombies-2.jpg",
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}


