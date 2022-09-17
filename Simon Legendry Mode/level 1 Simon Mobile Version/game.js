var button_colors=["red" , "blue" , "green" , "yellow"];
var gamepattern=[];
var userClickedPatten=[];

var started=false;
var level=0;


$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextsequence();
        started=true;
    }
})



$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");   // this will give us id of the button clicked
    userClickedPatten.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPatten.length-1);

})



function checkAnswer(currentLevel)
{
    if(gamepattern[currentLevel]===userClickedPatten[currentLevel])
    {
        // console.log("success");
        // console.log(gamepattern[currentLevel]);

        if(userClickedPatten.length===gamepattern.length)
        {
            setTimeout(() => {
                nextsequence();
            }, 1000);
        }
    }else{
        // console.log("wrong");
        let gameover=new Audio("sounds/wrong.mp3");
        gameover.play();

        $("body").addClass("game-over");

        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Restart");
        startOver();   

        $(".reset").removeClass("hdn");
        $(".reset").text("Restart");
    }

}

// -----------------------------

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  
  // Used like so


//   -------------------------------





function nextsequence()
{
  // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPatten=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=button_colors[randomNumber];
    gamepattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

        $("#"+randomChosenColor).append("<div class='circle'></div>");
    setTimeout(() => {
        $(".circle").remove();
    }, 250);
    
    let audio=new Audio("sounds/"+randomChosenColor+".mp3");
    audio.play();

    var divs=$(".btn");
   shuffle(divs);
   setTimeout(() => {
       $(".btn").empty();
   }, 300);
   $("#legend").append(divs);
    //  divs[0].attr("id","red");
    //  for(let i=0;i<4;i++)
    //  {
    //     // console.log(divs[i]);
    //     divs[i].attr("id")=arr[temp];
    //     temp++;
    //  }


     //  Array.from(divs).forEach(element => {
    //     console.log(element.prop("id"));
    //     // element.attr("id")=divs[temp];
    //     // console.log(divs[temp]);
    //     temp++;
    //  });
            

}



function playSound(name){
    let audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");

    setTimeout(() => {
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}


function startOver(){
    level=0;
    gamepattern=[];
    started=false;
}


$(".reset").click(function(){
  if(!started){
    $(".reset").addClass("hdn");
    $("#level-title").text("Level "+level);
    nextsequence();
    started=true;
}
});


