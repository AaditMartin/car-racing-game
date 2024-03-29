class Game {

  constructor(){

  }

  getState(){

    var gameStateRef  = database.ref('gameState');

    gameStateRef.on("value",function(data){
      
       gameState = data.val();

    })

  }

  update(state){

    database.ref('/').update({

      gameState: state

    });

  }

  async start(){

    if(gameState === 0){

      player = new Player();

      var playerCountRef = await database.ref('playerCount').once("value");

      if(playerCountRef.exists()){

        playerCount = playerCountRef.val();

        player.getCount();

      }

      form = new Form()

      form.display();

    }

    car1 = createSprite(100,200);

    car1.addImage("car1",car1_img);

    car2 = createSprite(300,200);

    car2.addImage("car2",car2_img);

    car3 = createSprite(500,200);

    car3.addImage("car3",car3_img);

    car4 = createSprite(700,200);

    car4.addImage("car4",car4_img);

    cars = [car1, car2, car3, car4];

    passedFinish=false;

  }

  play(){

    form.hide();
    
    Player.getPlayerInfo();

    player.getFinishedPlayers();

    if(allPlayers !== undefined){

      background(rgb(198,135,103));

      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array

      var index = 0;

      //x and y position of the cars

      var x = 200 ;

      var y;

      for(var plr in allPlayers){

        //add 1 to the index for every loop

        index = index + 1 ;
        
        //position the cars a little away from each other in x direction

        x=200+(index*200)+allPlayers[plr].xPos

        //use data form the database to display the cars in y direction

        y = displayHeight - allPlayers[plr].distance;

        cars[index-1].x = x;
        
        cars[index-1].y = y;

        textAlign(CENTER);

        textSize(20);

        text(allPlayers[plr].name,cars[index-1].x,cars[index-1].y+75)

       // console.log(index, player.index)
       
        if (index === player.index){
          
          cars[index - 1].shapeColor = "red";

          camera.position.x = displayWidth/2;

          camera.position.y = cars[index-1].y;

          if(cars[index-1].isTouching(obstaclegrp)){

            yVelocity-=0.9
            
          }

        }
       
        //textSize(15);

        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)

      }

    }

    if(player.distance){

      if(keyIsDown(38)&&player.index!==null){

        yVelocity+=0.9;

        if(keyIsDown(37)){

          xVelocity-=0.2;

        }

        if(keyIsDown(39)){

          xVelocity+=0.2

        }

      }

      else if(keyIsDown(38)&&yVelocity>0&&player.index!==null){

        yVelocity-=0.1;

        xVelocity*=0.9;

      }

      else{

        yVelocity*=0.985;

        xVelocity*=0.985;

      }

      }

      else if(passedFinish){

        yVelocity*=0.7;

        xVelocity*=0.7;

        Player.updateFinishedPlayers();

        player.place=finishedPlayers;

        player.update();

        passedFinish=true;
      }

      else{

        yVelocity*=0.8;

        xVelocity*=0.8;

      }

      player.distance+=yVelocity;

      yVelocity*=0.98;

      player.xPos+=xVelocity;

      xVelocity*=0.985;

      player.update();

      drawSprites();

    }

    displayRanks(){

      camera.position.y=0;

      camera.position.x=0;

      imageMode(CENTER);

      Player.getPlayerInfo();

      image(bronzeimg,displayWidth/-4,-100+displayHeight/9,200,240);

      image(silverimg,displayWidth/4,-100+displayHeight/10,225,270);

      image(goldimg,0,-100,250,300);

      textAlign(CENTER);

      for(var plr in allPlayers){

        if(allPlayers[plr].place===1){

          text("1st " +allPlayers[plr].name,0,85);

        }

        else if(allPlayers[plr].name===2){

          text("2nd " +allPlayers[plr].name,displayWidth/4,displayHeight/9+73);

        }

        else if(allPlayers[plr].name===3){

          text("3rd " +allPlayers[plr].name,displayWidth/-4,display/10+76);

        }

        else{

          text("honuroble mention " +allPlayers[plr].name,0,225);
          
        }

      }

    }
  
}
