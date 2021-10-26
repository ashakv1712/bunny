const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;


let engine;
let world;
let ground;
let rope
var fruit_con
var melon, bunny, bunnyImg, bgImg
var button;
var blink, sad, eat
var fruit;
var blower, blow1, blow2;

function preload(){
  melon = loadImage("assets/melon.png");
  bunnyImg = loadImage("assets/rabbit.png");
  bgImg = loadImage("assets/bg.png");
  blink = loadAnimation("assets/blink_1.png","assets/blink_2.png","assets/blink_3.png")
  sad = loadAnimation("assets/sad_1.png","assets/sad_2.png","assets/sad_3.png")
  eat = loadAnimation("assets/eat_0.png","assets/eat_1.png","assets/eat_2.png","assets/eat_3.png","assets/eat_4.png")
  blow2 = loadImage("assets/b2.png")
  blow1 = loadImage("assets/balloon.png")

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  
  eat.looping = false;
  sad.looping = false;
}


function setup() 
{
  createCanvas(500,700);
  frameRate(80)
  engine = Engine.create();
  world = engine.world;

  button = createImg("assets/cut_button.png");
  button.position(220,30)
  button.size(45,45);
  button.mouseClicked(drop)

  blower = createImg("assets/balloon.png")
blower2 = createImg("assets/b2.png")
  blower.position(10,250);
  blower.size(150,100);
  blower.mouseClicked(airblow,blower2);
  
  ground = new Ground(200,690,600,20)
  rope = new Rope(6, {x:245,y:30});

  blink.frameDelay = 8 
  sad.frameDelay = 10
  eat.frameDelay = 20;

  bunny = createSprite(250,650.100,100)
  bunny.addImage(bunnyImg)
  bunny.scale = 0.2

  bunny.addAnimation("blinking",blink);
  bunny.addAnimation("eating",eat);
  bunny.addAnimation("crying",sad);
  bunny.changeAnimation("blinking")

  var fruitOptions = {density: 0.001, frictionAir: 0.001}
  fruit = Bodies.circle(300,300,15,fruitOptions);
  Composite.add(rope.body,fruit);
  fruit_con = new Link(rope, fruit);


  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)


}



function draw() 
{
  background(51);
  imageMode(CENTER);
  image(bgImg, width/2, height/2, 500, 700)
  Engine.update(engine);

  
  
  if(fruit!=null){
    var pos = fruit.position
    image(melon,pos.x,pos.y, 60,60)
  }

  ground.show();
  rope.show()

  if(collide(fruit,bunny) == true){
   bunny.changeAnimation("eating")
   }

  if(collide(fruit,ground.body)==true){
    bunny.changeAnimation("crying")
    
  }

   drawSprites();

}
function drop(){
  rope.break();
  fruit_con.detach();
  fruit_con = null;

}
function collide(body,sprite){
  if(body!=null){
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y)
    if(d<=80){
      World.remove(world,fruit);
      fruit = null;
      return true;
    } else{
      return false;
    }
  }
}

function airblow(){
  Matter.Body.applyForce(fruit, {x:0, y:0}, {x:0.01, y:0})


}

