var button_colors=["red" , "blue" , "green" , "yellow"];
var gamepattern=[];
var userClickedPatten=[];

var started=false;
var level=0;

var rev=0;





$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");   // this will give us id of the button clicked
    userClickedPatten.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    if(rev===0){
        checkAnswer(userClickedPatten.length-1);
    }
    else if(rev===1)
    {
        revansr(userClickedPatten.length);
    }
})



function checkAnswer(currentLevel)
{
    if(gamepattern[currentLevel]===userClickedPatten[currentLevel])
    {
        if(userClickedPatten.length===gamepattern.length)
        {
            setTimeout(() => {
                nextsequence();
            }, 1000);

            if(rev===0)
            {
                rev++;
            }
            else if(rev===1){
                rev--; 
            }
        }
    }else{ 
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
        $(".sequence").addClass("hdn");

    }

}


function revansr(currentLevel)
{
    if(gamepattern[gamepattern.length - currentLevel]===userClickedPatten[currentLevel-1])
    {
        if(userClickedPatten.length===gamepattern.length)
        {
            setTimeout(() => {
                nextsequence();
            }, 1000);

            
            if(rev===0)
            {
                console.log(rev);
                rev++;
            }
            else if(rev===1){
                console.log(rev);
                rev--; 
            }
        }
    }else{
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
        $(".sequence").addClass("hdn");
    }

}

function nextsequence()
{
    userClickedPatten=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=button_colors[randomNumber];
    gamepattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    if(rev===0){
        $(".sequence").text("Same Sequence");
    }
    else if(rev===1)
    {
        $(".sequence").text("Reverse Sequence");
    }

    
        $("#"+randomChosenColor).append("<div class='circle'></div>");
    setTimeout(() => {
        $(".circle").remove();
    }, 250);
    
    
    let audio=new Audio("sounds/"+randomChosenColor+".mp3");
    audio.play();
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
    $(".sequence").removeClass("hdn");
    $("#level-title").text("Level "+level);
    nextsequence();
    started=true;
    rev=0;
}
});

