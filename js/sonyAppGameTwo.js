function randomNumbers_2(min, max, interval){ //This will return whole number. Min & Max inclusive
    var numList = [];
    var minNum = min;
    var maxNum = max;
    var inter = interval;
    var range = (maxNum - minNum);
    //var selectedIndex = Math.floor(Math.random() * Math.floor(range));
    var rangeInter = range/inter;
    var selectedIndex = Math.floor(Math.random() * Math.floor(rangeInter+1));
    for(var i = min; i <= max; i += inter){
        numList.push(i);
    }
    var result = numList[selectedIndex];
    return result;
}
function randomNumbersList(list){ //This will return whole number. Min & Max inclusive
    var selectedIndex = Math.floor(Math.random() * Math.floor(list.length));
    var randNo = list[selectedIndex];
    return randNo;
}
/*$(function(){
    $('#test1').click(function(){
        var list1 = [1, 2, 4, 6];
        var r = randomNumbersList(list1);
        $('#test1').text(r);
    });
});*/
//var canvasg2 = document.getElementById("myCanvasScreenG2");
//var ctxg2 = canvasg2.getContext("2d");

var gameScreenWidth_2 = 480; var gameScreenHght_2 = 270;
var txtXCord_2 = 480 -130;  //Text position
var scrBdXCord_2 = 480-150;
function getScreenPros(){
    var sw = screen.width;
    var sh = screen.height;
    if(sw <= 350){setGameScreen_SmallScreen();
    }else if(sw > 350 && sw <= 450){setGameScreen_MediumScreen();
    }else{setGameScreen_LargeScreen();}
} 
function setGameScreen_SmallScreen(){
    //350px Screen Max
    gameScreenWidth_2 = 280;
    gameScreenHght_2 = 270;
    $('#myCanvasDemo2').css('width', gameScreenWidth_2+'px');
    $('#myCanvasDemo2').css('height', gameScreenHght_2+'px');
    txtXCord_2 = gameScreenWidth_2 - 130;
    scrBdXCord_2 = gameScreenWidth_2 - 150;
}
function setGameScreen_MediumScreen(){
    //450px Screen Max
    gameScreenWidth_2 = 400;
    gameScreenHght_2 = 270;
    $('#myCanvasDemo2').css('width', gameScreenWidth_2+'px');
    $('#myCanvasDemo2').css('height', gameScreenHght_2+'px');
    txtXCord_2 = gameScreenWidth_2 - 130;
    scrBdXCord_2 = gameScreenWidth_2 - 150;
}
function setGameScreen_LargeScreen(){
    //451px Screen and Above
    gameScreenWidth_2 = 480;
    gameScreenHght_2 = 270;
    $('#myCanvasDemo2').css('width', gameScreenWidth_2+'px');
    $('#myCanvasDemo2').css('height', gameScreenHght_2+'px');
    txtXCord_2 = gameScreenWidth_2 - 130;
    scrBdXCord_2 = gameScreenWidth_2 - 150;
}

var myGamePiece_2;
var myObstacles_2 = [];
var myPowers_2 = [];
var myScore_2; 
var myGameLife_2;
var gameOver_2;
var comWidth_2 = 30;
var comHeight_2 = 30;
var myBackground_2;
var gamePcCount_2 = 1;
var boss1;
var myObstSpeed_2;
var myKilledViruses;
var myScoreBoard_2;
var rainFallCont1 = []; 
var rainFallCont2 = [];

function startGame_2() {
    gameOver_2 = new component_2("60px", "Consolas", "red", 120, 135, "text");
    //myGamePiece_2 = new component_2(comWidth_2, comHeight_2, "red", 10, 120);
    myGamePiece_2 = new component_2(30, 30, "res/img/bobyShoot.png", 10, 120, 'image', gamePcCount_2);
    //myScoreBoard_2 = new component_2(100, 100, "coral", scrBdXCord_2, 20, 'scoreBoard');    
    myScore_2 = new component_2("20px", "Consolas", "black", txtXCord_2, 40, "text");
    myGameLife_2 = new component_2("20px", "30px", "red", txtXCord_2, 60, "text");
    //myObstSpeed_2 = new component_2("20px", "30px", "black", txtXCord_2, 80, "text");
    myKilledViruses = new component_2("20px", "30px", "red", txtXCord_2, 80, "text");
    //myLostCount = new component_2("20px", "30px", "white", txtXCord_2, 100, "text");
    myBackground_2 = new component_2( gameScreenWidth_2, gameScreenHght_2, 'res/img/bground.jpg', 0, 0, 'background');
    //boss1 = new component_2(30, 50, "navy", 420, 50, 'boss');
    myGameArea_2.start();
    timeCountControl('stop');
    currentCount = 0;
    timeCountControl('start');
    startShoot = true;

}

//var myCanvas = document.getElementById('myCanvas');

var myGameArea_2 = {
    canvas : document.createElement("canvas"),
    //canvas : document.getElementById('myCanvas'),
    screenContG2: document.getElementById('screenContG2'),
    //canvas: myCanvas,
    start : function() {
        getScreenPros();
        this.canvas.width = gameScreenWidth_2;
        this.canvas.height =gameScreenHght_2;
        this.contextg2 = this.canvas.getContext("2d");
        //document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        screenContG2.appendChild(this.canvas);
        this.frameNo = 0;
        this.gameLife = 2;
        this.obstSpeed = 1;
        this.lostCountNo = 0;
        this.killedCount = 0;
        this.interval = setInterval(updateGameArea_2, 20);
        //this.pulseInterval = setInterval(updateGameArea_2, 0);
        },
    clear : function() {
        this.contextg2.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
    //-----New
    /*delItem : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },*/
}
function component_2(width, height, color, x, y, type, id) {
    this.type = type;
    if (type == 'image' || type == 'background' || type == 'obstImage' || type == 'powerImage'){
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    //New
    this.changeHgt = 0;
    this.x = x;
    this.y = y;
    this.id = id;
    this.grav = 1;   
    this.update = function() {
        ctxg2 = myGameArea_2.contextg2;
        //ctxg2 = canvas.getContext("2d");
        if (this.type == "text") {
            //ctx.font = '30px Arial';
            ctxg2.font = this.width + " " + this.height;
            ctxg2.fillStyle = color;
            ctxg2.fillText(this.text, this.x, this.y);
        }
        if(type == 'image' || type == 'background' || type == 'obstImage' || type == 'powerImage'){
            ctxg2.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
            if(type == 'background'){
                ctxg2.drawImage(this.image,
                    this.x+this.width,
                    this.y,
                    this.width, this.height);
            }
            if(type == 'cycle'){
                ctxg2.beginPath();
                ctxg2.fillStyle = color;
                //arc(xCord, yCord, radius, startAngle=0, endangle=2*Math.PI)
                var radius = this.width;
                var startAngle = this.height;
                var endAngle = 2*Math.PI;
                ctxg2.fillStyle = color;
                ctxg2.arc(this.x, this.y, radius, startAngle, endAngle);
                ctxg2.stroke();
                ctxg2.fill();
            } 
        }
        /*else if(type == 'rect'){
            ctxg2.fillStyle = color;
            ctxg2.fillRect(this.x, this.y, this.width, this.height);
        }*/ 
        else {
            ctxg2.fillStyle = color;
            ctxg2.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        //----Addition2------/
        this.hitBottom();
        this.hitTop();
        this.hitLeft();
        this.hitRight();
        //----Addition2------/
        if(this.type == 'background'){
            if(this.x == -(this.width)){this.x = 0;}
           // if(this.x == -100){this.x = 0; this.image.src = 'bground2.jpg';}
        } 

        /*if(this.type == 'boss'){
            var rockbottom = myGameArea_2.canvas.height - this.height;
            var hitTop = randomNumbers_2(0, 100, 10);
            var hitBotm = randomNumbers_2(200, rockbottom, 10);
            this.y += this.grav;
            if(this.y >= hitBotm){this.y = hitBotm; this.grav *= -1;
            }else if(this.y <= 0){this.y = 0; this.grav *= -1;}
        }*/
        
    }
    this.newPieceHeight = function() {
        this.height += this.changeHgt;       
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
    this.crashWithBullent = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            //if(myBulletsCont[i].crashWith(myObstacles_2[i])){
            this.splice(this, 1);
            crash = false;
        }
        return crash;
    }
    //----Addition1------
    this.powerIncrease = function(otherobjP) {
        var myleftP = this.x;
        var myrightP = this.x + (this.width);
        var mytopP = this.y;
        var mybottomP = this.y + (this.height);
        var otherleftP = otherobjP.x;
        var otherrightP = otherobjP.x + (otherobjP.width);
        var othertopP = otherobjP.y;
        var otherbottomP = otherobjP.y + (otherobjP.height);
        var powerChg = true;
        if ((mybottomP < othertopP) || (mytopP > otherbottomP) || (myrightP < otherleftP) || (myleftP > otherrightP)) {
            powerChg = false;
        }
        return powerChg;
    }

    this.hitBottom = function(){
        var rockbottom = myGameArea_2.canvas.height - this.height;
        if (this.y > rockbottom){this.y = rockbottom}
    }
    this.hitTop = function(){
        var rocktop = 0;
        if (this.y < rocktop){this.y = rocktop}
    }
    this.hitLeft = function(){
        if (type == 'image'){
            var rockleft = 0;
            if (this.x < rockleft){myGamePiece_2.speedX = 0;}
        }
    }
    this.hitRight = function(){
        if (type == 'image'){
            var rockright =  myGameArea_2.canvas.width - this.width;
            if (this.x > rockright){myGamePiece_2.speedX = 0;}
        }
    } //----/Addition1------
}
var lifeDecr = true;
function obstCrashFunction(){
    myGameArea_2.gameLife -= 1;

}
function scoreGameLife(score){
    if(score == 'incr'){
        myGameArea_2.gameLife += 1;
        playEatAppleSound_2();

    }
    if(score == 'decr'){
        myGameArea_2.gameLife -= 1;
        playHitObSound_2();     
    }
}
/*function checkGameStatus(){
    if(myGameArea_2.gameLife > 0){scoreGameLife('decr');
    playHitObSound_2();
    }
    if(myGameArea_2.gameLife <= 0){
        gameOver_2.text="GAME OVER!!!";
        gameOver_2.update();
        myGameArea_2.stop();
        //myGameLife_2.update();
    }
}*/
//Note: 'obSpeed_2' and 'obIntreal' has to be controlled simultaneusly.
//Starting ratio: obSpeed_2 = -1 & obInterval = 300; -2/150; -3/130;
//-4/100; -5/80; -6/60; -7/50; -8/40; -9/30; -10/20
var obIntervalList_2 = [400, 300, 200, 150, 130, 110, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10] //400 is a dummie ie, to take care of 0 position
var obSpeed_2 = -2;
var obInterval_2 = 200;
var obFrameCount = 0;
var obID = 0; 
var obFrameIndexPlus = 0;
var obstacleFrames;
var obIncluded = 0;
var gameIsOver_2 = false; 
var shoot = false;
var myBullets;
var myBulletsCont = [];
var bLentCount = 0;
var rainTime = false;
var startShoot = false;
function updateGameArea_2() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    var y, heightP, gapP, minHeightP, maxHeightP, minGapP, maxGapP;
    if(myGameArea_2.gameLife == 0){myGameArea_2.stop(); gameEnd_2();
    }else{
        for (i = 0; i < myObstacles_2.length; i++) {
            if (myGamePiece_2.crashWith(myObstacles_2[i])){
                var obFrameIndex = myObstacles_2.indexOf(myObstacles_2[i]);
                obFrameIndexPlus += 1;
                //$('#tCon2').val('Index: '+obFrameIndex);
                //$('#tCon3').val(obstacleFrames.id);
                obFrameCrash(obstacleFrames.id);
               // $('#tCon4').val('Lent: '+myObstacles_2.length);
                myObstacles_2.splice(obFrameIndex, 1);
                //scoreGameLife('decr');
                //lifeDecr = true;
            //}
            
            //checkGameStatus();
            //myGameArea_2.stop();
            //alert('GAME OVER!!!');
            //gameOver_2.text="GAME OVER!!!";
            //gameOver_2.update();
            //return;
            } 
        }
        //----NEW4-----
        for (i = 0; i < myPowers_2.length; i += 1) {
            if (myGamePiece_2.powerIncrease(myPowers_2[i])) {
                myPowers_2.splice(myPowers_2.indexOf(i), 1);
                scoreGameLife('incr');
                //myGameArea_2.gameLife += 2;
            } 
        }
        //----/NEW4-----
        myGameArea_2.clear();
        myBackground_2.speedX = -1;
        myBackground_2.newPos();
        myBackground_2.update();
        myGameArea_2.frameNo += 1;
        //myGameArea_2.gameLife += 1;
        if (myGameArea_2.frameNo == 1 || everyinterval_2(obInterval_2)) {
            x = myGameArea_2.canvas.width;
            minHeight = 20;
            maxHeight = 200;
            height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
            minGap = 50;
            maxGap = 200;
            gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
            var lst = [0, 30, 60, 90, 100, 130, 160, 180, 200];
            //var yCord1 = randomNumbersList(lst);
            var yCord1 = randomNumbers_2(0, 200, 2); //(0, 200, 30);
            var hght = randomNumbers_2(20, 50, 10); //(0, 200, 30);
            //myObstacles_2.push(new component_2(70, hght, "goApp.png", x, yCord1, 'obstImage'));
            obID += 1;
            //myObstacles_2.push(new component_2(70, hght, "red", x, yCord1, 'rect', 'myID'+id)); 
            obstacleFrames = new component_2(hght, hght, "res/img/obs.png", x, yCord1, 'obstImage', 'myID'+obID);
            if(myObstacles_2.includes(obstacleFrames.id)){obIncluded += 1
            }else{myObstacles_2.push(obstacleFrames);}
            //myObstacles_2.push(obstacleFrames);
            //$('#timeControl2').text(obstacleFrames.id);
            lifeDecr = true;

        }
        for (i = 0; i < myObstacles_2.length; i += 1) {
            if(myObstacles_2[i].x < 0-myObstacles_2[i].width){myObstacles_2.splice(i, 1); 
                myGameArea_2.lostCountNo += 1;  scoreGameLife('decr')}
            myObstacles_2[i].speedX = obSpeed_2;
            myObstacles_2[i].newPos();
            myObstacles_2[i].update();
        }
        //Change Obstacle Speed and Interval a every 40 seconds.
        //if(currentCount%20 == 0){obSpeed_2 -= 1; obInterval =-parseInt(obIntervalList_2[-obSpeed_2])}
        
        //------PowerPiece------
        if (myGameArea_2.frameNo == 10 || everyinterval_2(1000)) {
            var xCord = myGameArea_2.canvas.width;
            var yCord = randomNumbers_2(10, 200, 20);
            myPowers_2.push(new component_2(50, 30, "res/img/heart1.png", xCord, yCord, 'powerImage',));
            //myObstacles_2.push(new component_2(10, x - height - gap, "coral", x, 0)); //New
        }
        for (i = 0; i < myPowers_2.length; i += 1) {
            myPowers_2[i].speedX = -3;
            myPowers_2[i].newPos();
            myPowers_2[i].update();
        }
        //------Rainfall ----------------------------
        var xCordMax = myGameArea_2.canvas.width;
        var yCordMax = myGameArea_2.canvas.height;
        if (rainTime == true && everyinterval_2(1)) {
            var xCord1 = randomNumbers_2(1, xCordMax, 5);
            var rain1 = new component_2(2, 7, "white", xCord1, 0, 'rain');
            rainFallCont1.push(rain1);
            var xCord2 = randomNumbers_2(1, xCordMax, 5);
            var rain2 = new component_2(2, 4, "white", xCord2, 0, 'rain');
            rainFallCont2.push(rain2);
        }
        for (i = 0; i < rainFallCont1.length; i += 1) {
            if(rainFallCont1[i].y+11 > yCordMax){rainFallCont1.splice(rainFallCont1.indexOf(rainFallCont1[i]), 1);}
            if(rainFallCont2[i].y+11 > yCordMax){rainFallCont2.splice(rainFallCont2.indexOf(rainFallCont2[i]), 1);} 
            rainFallCont1[i].speedY = 5;
            rainFallCont1[i].newPos();
            rainFallCont1[i].update();
            
            rainFallCont2[i].speedY = 3;
            rainFallCont2[i].newPos();
            rainFallCont2[i].update();
        }



        //------/New3 ------
        myScore_2.text="SCORE: " + myGameArea_2.frameNo;
        myGameLife_2.text="LIFE: " + myGameArea_2.gameLife;
        //myObstSpeed_2.text="SPEED: " + myGameArea_2.obstSpeed;
        myKilledViruses.text="KILLED: " + myGameArea_2.killedCount;
        //myLostCount.text="LOST: " + myGameArea_2.lostCountNo;
        gameOver_2.text="GAME OVER!!!";
       
        //myScoreBoard_2.update();
        myScore_2.update();
        myGameLife_2.update();
        myGamePiece_2.newPos(); 
        myGamePiece_2.newPieceHeight();    
        myGamePiece_2.update();
        /*boss1.update();
        boss1.newPos();*/
        //myObstSpeed_2.update(); 
        //myLostCount.update();
        myKilledViruses.update();

        if(shoot == true){
            myBullets = new component_2(15, 3, 'black', myGamePiece_2.x+20, myGamePiece_2.y+5);
            myBulletsCont.push(myBullets);
            //playGunShotSound();
            shoot = false;
        } 
        for (i = 0; i < myBulletsCont.length; i += 1) {
            if(myBulletsCont[i].x > 480){myBulletsCont.splice(i, 1);}
            myBulletsCont[i].speedX = 5;
            myBulletsCont[i].newPos();
            myBulletsCont[i].update();
            
        }
        var myBulletsContLength = myBulletsCont.length;
        var myObstacles_2Length = myObstacles_2.length;
        var maxLength = (Math.max(myBulletsContLength, myObstacles_2Length));
        
        for (i = 0; i < maxLength; i += 1) {
            var bLentCount1 = 0;
            if(myBulletsCont[bLentCount1].crashWith(myObstacles_2[i])){
                //myObstacles_2[i].image.src = "res/img/v1.jpeg";
                myBulletsCont.splice(bLentCount1, 1);
                myObstacles_2.splice(i, 1);
                myGameArea_2.killedCount += 1;

                virusKillSound.currentTime = 0;
                playVirusKillSound();
                myBackground_2.image.src = "res/img/bgroundDead.png";
                setTimeout(function(){myBackground_2.image.src = "res/img/bground.jpg";}, 100)
            }
            if(bLentCount1 > myBulletsCont.length){bLentCount1 = 1}else{bLentCount1 += 1};
            $('#tCon4').val('MaxLent: '+maxLength);
            $('#tCon3').val('BLent: '+myBulletsContLength);
        }
        //if(gameIsOver_2 == true){gameOver_2.update(); gameIsOver_2 = false }
    }
}


function crashWithFunction(){
    for (i = 0; i < myBulletsCont.length; i += 1) {
        if(myBulletsCont[i].crashWith(myObstacles_2[i])){
            //myObstacles_2[i].image.src = "res/img/v1.jpeg";
            myBulletsCont.splice(i, 1);
            myObstacles_2.splice(i, 1);
            
            virusKillSound.currentTime = 0;
            playVirusKillSound();
            myBackground_2.image.src = "res/img/bgroundDead.png";
            setTimeout(function(){myBackground_2.image.src = "res/img/bground.jpg";}, 100)
        }
    }
}

function everyinterval_2(n) {
    if ((myGameArea_2.frameNo / n) % 1 == 0) {return true;}
    return false;
}
var bSpd = 5;
function move_2(dir) {
    //bSpd = parseInt($('#slider-1').val());
    //myGamePiece_2.image.src = 'res/img/jump.jpg';
    if(dir == 'up') {myGamePiece_2.speedY = -bSpd;} 
    if(dir == 'down') {myGamePiece_2.speedY = bSpd} 
    if(dir == 'left') {myGamePiece_2.speedX = -bSpd;} 
    if(dir == 'right') {myGamePiece_2.speedX = bSpd;} 
}

function clearmove_2() {
    //myGamePiece_2.image.src = 'res/img/down.jpg';
    myGamePiece_2.speedX = 0; 
    myGamePiece_2.speedY = 0; 
}

// ------New-------------
function playGame_2(){
    document.getElementById('myCanvasDemo2').style.display = 'none';
    startGame_2(); playBackgroundSound_2('on');
    $('#bobyDivG2').css('display', 'none');
    $('#gameOverCont_2').css('display', 'none');
    $('#keyCont').css('display', 'flex');

    $('#game2StartBtn').css('display', 'none');
    $('#game2StopBtn').css('display', 'block');
    //$('#game2RestartBtn').css('display', 'none');

    activePageCheckStart(); //Call activePage check function
}
function gameEnd_2(){
    $('#game2StopBtn').css('display', 'none');
    $('#game2RestartBtn').css('display', 'none');
    $('#game2RestartBtn').css('display', 'block');

    $('#gameOverSp2_2').text(myGameArea_2.frameNo);
    $('#gameOverSp3_2').text(myGameArea_2.killedCount);
    $('#gameOverCont_2').css('display', 'flex');
    $('#pg2HeaderBarRightBtn').css('display', 'block');
    defaultParas();
    startShoot = false;   
}

function increaseComp(){myGamePiece_2.changeHgt = +1; }
function decreaseComp(){myGamePiece_2.changeHgt = -1; }
function clearheight() {myGamePiece_2.changeHgt = 0; }


function stopGame2(){
    myGameArea_2.stop(); defaultParas(); 
    playBackgroundSound_2('off');
    $('#game2StopBtn').css('display', 'none');
    $('#game2StartBtn').css('display', 'none');
    $('#game2RestartBtn').css('display', 'block');
    startShoot = false;
    $('#bobyDivG2').css('display', 'flex');

    $('#screenContG2 > canvas').css('display', 'none');  //Hide game2 canvas container when game end
    $('#myCanvasDemo2').css('display', 'flex');
    $('#bobyDivG2').css('color', 'black');
    $('#myCanvasDemo2').css('background-image', 'url("res/img/bground.jpg")');
    $('#bobySpan1G2, #bobySpan2G2').css('color', 'white');
    $('#bobySpan1G2, #bobySpan2G2').css('text-shadow', 'none');
    
}

function restartGame_2(){
    $('#game2StopBtn').css('display', 'block');
    $('#game2RestartBtn').css('display', 'none');
    $('#gameOverCont_2').css('display', 'none');
    $('#bobyDivG2').css('display', 'none');
    $('#pg2HeaderBarRightBtn').css('display', 'none');

    $('#screenContG2 > canvas').css('display', 'flex');
    $('#myCanvasDemo2').css('display', 'none');
    obFrameCount = 0;
    obID = 0;
    myObstacles_2 = [];
    myPowers_2 = [];
    bSpd = 10;
    currentCount = 0;
    rainTime = false;
    //myGameArea_2.clear();
    myGameArea_2.stop();
    updateGameArea_2();
    startGame_2(); playBackgroundSound_2('on');
    
    //bgroundSound.currentTime = 0;
    //playBackgroundSound_2('on');
    activePageCheckStart(); //Call activePage check function
}

$(function(){
    $('#pg2HeaderBarRightBtn').click(function(){
        myGameArea_2.stop(); 
        defaultParas(); 
        playBackgroundSound_2('off');
    }); 
});

//----- Stop Game2 Confirmation
function stopMyGame2Call(){
    if (confirm('Do you want to exit?')){
        stopGame2();
    }
}
function stopMyGame2Call22(){
    $('#myConfirmationContPryG2').css('display', 'flex');
    
}
$(function(){    //Confirmation - YES
    $('#myConfirmationYBtnG2').click(function(){
        $('#myConfirmationContPryG2').css('display', 'none');
        stopGame2();
    }); 
});
$(function(){    //Confirmation - NO
    $('#myConfirmationNBtnG2').click(function(){
        $('#myConfirmationContPryG2').css('display', 'none');
    }); 
});


function gamePiecePos(){
    var xCord = myGamePiece_2.x;
    var yCord = myGamePiece_2.y; 
    var xSpeed = myGamePiece_2.speedX; 
    var ySpeed= myGamePiece_2.speedY;
    var yMaxPos = myBackground_2.height - myGamePiece_2.height;
    //alert('xCord:'+ xCord +' '+ 'yCord:'+ yCord +' '+ 'xSpeed:'+ xSpeed +' '+ 'ySpeed:'+ ySpeed+' '+ 'yMaxPos:'+ yMaxPos)
    alert('obSpeed_2: '+obSpeed_2+' obInterval_2: '+obInterval_2);
}
/*
function everyobInterval_2(n) {
    everyinterval_2(obInterval_2);
    if ((myGameArea_2.frameNo / n) % 1 == 0) {return true;}
    lifeDecr = true;
}*/

//Time Control
var timeCount;
var currentCount = 0; 
function timeCountControl(action){
    if(action == 'start'){
        timeCount = setInterval(timeCountFunction, 1000);
    }
    if(action == 'stop'){
        clearInterval(timeCount);
    }
}
var x = 1;
var xCount = 120;
var startRain = 0;
function timeCountFunction(){
    currentCount += 1; 
    $('#tCon').val('Time: '+currentCount);
    if(currentCount%10 == 0){
        if(xCount <= 10){xCount = 10
        }else{
            xCount -= 10;
        }
       obInterval_2 = xCount;
    }
    //lifeDecr = true;
    myGameArea_2.obstSpeed = x;
   // bSpd = x;
   //$('#tCon2').val('obIn : '+obInterval_2);


   //----RainFall Timer------
   if(currentCount == 60 || currentCount == 150 || currentCount == 300){rainTime = true;} //To begin the loop
   if(currentCount == 80 || currentCount == 210 || currentCount == 460){rainTime = false;}
   //if(currentCount == 10 || currentCount == 25 || currentCount == 50){rainTime = true;} //To begin the loop
   //if(currentCount == 20 || currentCount == 30 || currentCount == 60){rainTime = false;}

   //$('#text111').text(currentCount); $('#text12').text(rainTime);
}

function defaultParas(){
    obSpeed_2 = -2; obInterval_2 = 200; x= 1; xCount = 200;
    timeCountControl('stop');
    currentCount = 0;
    rainTime = false;
    startShoot = false;
    activePageCheckStop(); //Stop activePage check function
}
$(function(){
    $('#test1').click(function(){
    }); 
});

var obFrameGlobalCount = 0;
function obFrameCrash(frameNo){
    $('#tCon5').val(obFrameGlobalCount += 1);
    myGameArea_2.gameLife -= 1;
    playHitObSound_2();
}

function shootFun(){
    if(startShoot == true){
        gunShotSound.currentTime = 0;
        playGunShotSound();
        shoot = true;
        //$('#key0g2').css('border-color', 'white');
        
    }
    setTimeout(function(){$('#key0g2').css('border-color', 'gray'); }, 50)
    $('#key0g2').css('border-color', 'white');
}
//----Game Sounds
var bBgroundSoundSrc = 'res/baloonGameBgrdSound.mp3';
var bBurstSoundSrc = 'res/baloonBurst.mp3';
var bScratchSoundSrc = 'res/baloonScratch.mp3';
var bgameOver_2SoundSrc = 'res/gameOver_2Chariots.mp3';
var bGameWonSrc = 'res/baloonGameWon.mp3';
var gunShotSrc = 'res/gunShot1.mp3';
var virusKillSrc = 'res/virusKillSound.mp3';

var bBgroundSound = new Audio(bBgroundSoundSrc);
var bBurstSound = new Audio(bBurstSoundSrc);
var bScratchSound = new Audio(bScratchSoundSrc);
var bgameOver_2Sound = new Audio(bgameOver_2SoundSrc);
var bGameWonSound = new Audio(bGameWonSrc);
var gunShotSound = new Audio(gunShotSrc);
var virusKillSound = new Audio(virusKillSrc);

var bgroundSoundSrc = 'res/gameBgrdSound3.mp3';
var correctSoundSrc = 'res/gameSoundCorrect.mp3';
var wrongSoundSrc = 'res/gameSoundWrong.mp3';
var bgroundSound = new Audio(bgroundSoundSrc); //Creating a music object
var correctSound = new Audio(correctSoundSrc);
var wrongSound = new Audio(wrongSoundSrc);

function playBackgroundSound_2(event){
    bgroundSound.pause();
    if(event == 'on'){
        bgroundSound.currentTime = 0;
        bgroundSound.play();
        bgroundSound.loop = true;    
    }
    if(event == 'off'){
        bgroundSound.pause();
        bgroundSound.currentTime = 0;
    }
    //bgroundSound = new Audio(bgroundSoundSrc);
}

function playEatAppleSound_2(){
    correctSound.play();
    correctSound.loop = false;
}
function playHitObSound_2(){
    wrongSound.currentTime = 0;
    wrongSound.play();
    wrongSound.loop = false;
}
function playGunShotSound(){
    gunShotSound.play();
    gunShotSound.loop = false;
}
function playVirusKillSound(){
    virusKillSound.play();
    virusKillSound.loop = false;
}

$(function(){
    $('#test1').click(function(){
        var lst = [10, 20, 40, 5, 90];
        //var a = randomListFunction(lst);
        var a = randomNumbers_2(2, 10, 2);
        $('#test1').css('background-color', 'green');
        playBackgroundSound_2();
    }); 
});

/*
// -------- Responsive Page Definition ----------
function responsiveGameAreaG2(){
    smallScreen_G2(a);
    mediumScreen_G2(b);
    largeScreen_G2(c);

} 
function smallScreen_G2(a){
    if (a.matches){             //If media query matches
       setGameScreen_SmallScreen();
    }
}
var a = window.matchMedia("(max-width: 350px)") //For small devices. Phones 350px and down
smallScreen_G2(a);  //Calll listener function at run time
a.addListener(smallScreen_G2); //Attach listener function on state changes

function mediumScreen_G2(b){
    if (b.matches){
        setGameScreen_MediumScreen();
    }
}
var b = window.matchMedia("(max-width: 450px)") //For medium devices. Phones with screens up to 450px
mediumScreen_G2(b);
b.addListener(mediumScreen_G2);


function largeScreen_G2(c){
    if (c.matches){
        setGameScreen_LargeScreen();
    }
}
var c = window.matchMedia("(min-width: 451px)") //For large devices. Phones with 451px screens and above
largeScreen_G2(c);
c.addListener(largeScreen_G2);
// -------- /Responsive Page Definition ----------

*/

