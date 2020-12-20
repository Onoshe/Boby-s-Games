//----Baloon Game Sounds
var bBgroundSoundSrc = 'res/baloonGameBgrdSound.mp3';
var bBurstSoundSrc = 'res/baloonBurst.mp3';
var bScratchSoundSrc = 'res/baloonScratch.mp3';
var bGameOverSoundSrc = 'res/GameOverChariots.mp3';
var bGameWonSrc = 'res/baloonGameWon.mp3';

var bBgroundSound = new Audio(bBgroundSoundSrc);
var bBurstSound = new Audio(bBurstSoundSrc);
var bScratchSound = new Audio(bScratchSoundSrc);
var bGameOverSound = new Audio(bGameOverSoundSrc);
var bGameWonSound = new Audio(bGameWonSrc);


var bgroundSoundSrc = 'res/gameBgrdSound1.mp3';
var correctSoundSrc = 'res/gameSoundCorrect.mp3';
var wrongSoundSrc = 'res/gameSoundWrong.mp3';
var bgroundSound = new Audio(bgroundSoundSrc); //Creating a music object
var correctSound = new Audio(correctSoundSrc);
var wrongSound = new Audio(wrongSoundSrc);

function playBackgroundSound(event){
    bgroundSound.pause();
    if(event == 'on'){
        bgroundSound.play();
        bgroundSound.loop = true;    
    }
    if(event == 'off'){
        bgroundSound.pause();
        bgroundSound.currentTime = 0;
    }
    //bgroundSound = new Audio(bgroundSoundSrc);
}

function playEatAppleSound(){
    correctSound.play();
    correctSound.loop = false;
}
function playHitObSound(){
    wrongSound.play();
    wrongSound.loop = false;
}


$(function(){
    $('#test1').click(function(){
        var lst = [10, 20, 40, 5, 90];
        //var a = randomListFunction(lst);
        var a = randomNumbers(2, 10, 2);
        $('#test1').css('background-color', 'green');
        playBackgroundSound();
    }); 
});


/* -------- Responsive Page Definition ---------- */
function responsiveGameArea(){
    smallScreen(a);
    mediumScreen(b);

}

function smallScreen(a){
    if (a.matches){
        $('#myCanvas').attr('width', 260);
        $('#myCanvas').attr('height', 300);
        obWdt = 10;
        appleXCord = 235;
        myScoreXCord = 200; 
        gameAWdt = 260; gameAHgt = 300;
        rollBall1XCord = 50; rollBall2XCord = 100;
        rollBall3XCord = 150; rollBall4XCord = 200;
        //$('#footerBar').css('display', 'none');
    }
}
var a = window.matchMedia("(max-width: 350px)") //For small devices. Phones 350px and down
smallScreen(a);
a.addListener(smallScreen);

function mediumScreen(b){
    if (b.matches){
        $('#myCanvas').attr('width', 300);
        $('#myCanvas').attr('height', 300);
        obWdt = 20;
        appleXCord = 275; 
        gameAWdt = 300; gameAHgt = 300;
        rollBall1XCord = 60; rollBall2XCord = 120;
        rollBall3XCord = 180; rollBall4XCord = 240;
        //$('#footerBar').css('display', 'block'); 
    }
}
var b = window.matchMedia("(min-width: 350px)") //For medium devices. Phones 350px and up
mediumScreen(b);
b.addListener(mediumScreen);
/* -------- /Responsive Page Definition ---------- */

/*----- Active Page Function ---------*/
var activePage;
function activePageFunction222(page){
    //activePage = $.mobile.activePage.attr('id');
    if(page == 'home'){
        //stopMyGame();  //Stop Game1
        //stopGame2();  //Stop Game2 
        alert('home'); 
    }
}

var activePageCntl;
function activePageCheckStart(){
    activePageCntl = setInterval(activePageFunction, 1000);
}
function activePageCheckStop(){
    clearInterval(activePageCntl);
}
var activePage;
var t = 0;
function activePageFunction(){
    activePage = $.mobile.activePage.attr('id');
    t += 1;
    $('#text123').text(t);
    if(activePage == 'home'){
        stopMyGame();  //Stop Game1
        stopGame2();  //Stop Game2 
        activePageCheckStop();
    }
}
