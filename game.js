var buttonColors = [ "red", "blue", "green", "yellow"]
var gamePattern = []
var userClickedPattern = []
var level = 0;
var started = false;


$(document).keypress(function(event){
    console.log(event.key)
    if(!started){
        $("#level-title").text("level "+level)
        nextSequence();
        started = true;     
    }
});

// checking which button is pressed
$(".btn").click(function(){
    var userChosenColor = $(this).attr("id")
    userClickedPattern.push(userChosenColor)
    
    playSound(userChosenColor)
    animatePress(userChosenColor)

    // console.log(userClickedPattern);
    checkAnswer(userClickedPattern.length-1)
});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        // console.log("Success");

        if (gamePattern.length === userClickedPattern.length) {

            setTimeout(()=>{
                nextSequence();
            },1000)
        }
    }
    else{
        // console.log("wrong");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over")
        setTimeout(()=>{
            $("body").removeClass("game-over")
        },200)
        
        startOver()
    }
}


function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("level "+level)


    var randomNumber = Math.floor(Math.random()*4) 

    var randomChosenColor = buttonColors[randomNumber]
    
    gamePattern.push(randomChosenColor) 

    // console.log(gamePattern);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

}

// Start Over
function startOver(){
    $("#level-title").text("Game Over...Press any Key to Start")
    gamePattern = []
    level = 0;
    started = false;
}

// Playing audio
function playSound(name) {
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

// Button Animation

function animatePress(currentColor){
    $("#"+ currentColor).addClass("pressed")

    setTimeout(function() {
        $("#"+ currentColor).removeClass("pressed")
    }, 100);
}







