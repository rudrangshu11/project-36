var  dog, dogImage, happyDog, database, foodS, foodStock, feed, add, fedTime, lastFed, foodObj;

function preload()
{
  //load images here
  dogImage = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(1000, 500);
  
  dog = createSprite(750, 250, 10, 10);
  dog.addImage(dogImage);
  dog.scale = 0.25;

  database = firebase.database();
  foodS = database.ref('food')
  foodS.on("value", readStock);

  foodObj = new Food();

  feed = createButton("FEED SHAWN")
  feed.position(500,15)
  feed.mousePressed(FeedDog)

  add = createButton("ADD FOOD")
  add.position(400,15)
  add.mousePressed(AddFood)
}


function draw() {  
  background(46, 139, 87);
  if(foodS != undefined){
    /*if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    if(foodS >= 1){
      foodS = foodS - 1;
    }
    dog.addImage(happyDog);
  }*/
  foodObj.display();

  fedTime=database.ref('feedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  })
  drawSprites();
  //add styles here
  textSize(30);
  fill('white');
  stroke('white');
  text("Food Remaining :" + foodS, 650, 150);

  /*textSize(20);
  fill('white');
  stroke('white');
  te0xt("Press Up Arrow Key To Feed Shawn", 100, 400)*/

  fill(255,255,255);
  textSize(35);
  if(lastFed>= 12){
    text("Last Fed :"+ lastFed%12 + " PM", 350,30);
  }else if(lastFed==0){
    text("Last Fed : 12 AM", 350, 30);
  }else{
    text("Last Fed :"+ lastFed + " AM", 350,30);
  }
}
}

function readStock(data){
  foodS = data.val(); 
}

function writeStock(x){
  database.ref('/').update({
    food : x
  })
}

function FeedDog(){
  dog.addImage(happyDog);
  console.log(foodObj.getFoodStock());
  foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
  database.ref('/').update({
    food:foodObj.getFoodStock(),
    feedTime:hour()

  })
}

function AddFood(){
  foodS++;
  database.ref('/').update({
    food : foodS
  })
}

