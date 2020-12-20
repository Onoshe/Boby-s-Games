function randomNumbers(min, max, interval){ //This will return whole number. Min & Max inclusive
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

var myGamePiece;
var myObstacles = [];
var myPowers = [];
var myScore; 
var myGameLife;
var gameOver;
var comWidth = 30;
var comHeight = 30;
var myBackground;

function startGame() {
    gameOver = new component(30, "Consolas", "red", 120, 135, "text");
    //myGamePiece = new component(comWidth, comHeight, "red", 10, 120);
    myGamePiece = new component(30, 30, "down.jpg", 10, 120, 'image');
    myScore = new component("30px", "Consolas", "black", 280, 40, "text");
    myGameLife = new component("30px", "30px", "white", 280, 60, "text");
    myBackground = new component(656, 270, 'bground.jpg', 0, 0, 'background');
    myGameArea.start();
}

//var myCanvas = document.getElementById('myCanvas');
var myGameArea = {
    canvas : document.createElement("canvas"),
    //canvas : document.getElementById('myCanvas'),
    myCanvasDiv: document.getElementById('myCanvasDiv'),
    //canvas: myCanvas,
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        //document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        myCanvasDiv.appendChild(this.canvas);
        this.frameNo = 0;
        this.gameLife = 2;
        this.interval = setInterval(updateGameArea, 20);
        //this.pulseInterval = setInterval(updateGameArea, 0);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
    //-----New
    /*delItem : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },*/
}
function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == 'image' || type == 'background'){
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
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);}
        if(type == 'image' || type == 'background'){
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
        if(type == 'background'){
            ctx.drawImage(this.image,
                this.x+this.width,
                this.y,
                this.width, this.height);
        }
        if(type == 'cycle'){
            ctx.beginPath();
            ctx.fillStyle = color;
            //arc(xCord, yCord, radius, startAngle=0, endangle=2*Math.PI)
            var radius = this.width;
            var startAngle = this.height;
            var endAngle = 2*Math.PI;
            ctx.fillStyle = color;
            ctx.arc(this.x, this.y, radius, startAngle, endAngle);
            ctx.stroke();
            ctx.fill();
        } 
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        //----Addition2------/
        this.hitBottom();
        this.hitTop();
        this.hitLeft();
        //----Addition2------/
        if(this.type == 'background'){
            if(this.x == -(this.width)){this.x = 0;}
           // if(this.x == -100){this.x = 0; this.image.src = 'bground2.jpg';}
        } 
           //if(this.x == this.width){this.image.src = 'bground2.jpg';}       
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
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom){this.y = rockbottom}
    }
    this.hitTop = function(){
        var rocktop = 0;
        if (this.y < rocktop){this.y = rocktop}
    }
    this.hitLeft = function(){
        if (type == 'image'){
            var rockleft = 0;
            if (this.x < rockleft){myGamePiece.speedX = 0;}
        }
    } //----/Addition1-------
}
function scoreGameLife(score){
    if(score == 'incr'){
        myGameArea.gameLife += 2;
    }
    if(score == 'decr'){
        myGameArea.gameLife -= 1;
    }
}
function checkGameStatus(){
    if(myGameArea.gameLife > 0){scoreGameLife('decr');
    }
    if(myGameArea.gameLife <= 0){
        gameOver.text="GAME OVER!!!";
        gameOver.update();
        myGameArea.stop();
        //myGameLife.update();
    }
}
var obSpeed = -2;
var obInterval = 200;
function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    var y, heightP, gapP, minHeightP, maxHeightP, minGapP, maxGapP;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            myObstacles.splice(myObstacles[i], 1);
            
            //checkGameStatus();
            /*if(myGameArea.gameLife > 0;){scoreGameLife('decr');
                }else{myGameArea.stop();}*/
            
            //myGameArea.stop();
            //alert('GAME OVER!!!');
            //gameOver.text="GAME OVER!!!";
            //gameOver.update();
            //return;
        } 
    }
    //----NEW4-----
    for (i = 0; i < myPowers.length; i += 1) {
        if (myGamePiece.powerIncrease(myPowers[i])) {
            myPowers.splice(myPowers.indexOf(i), 1);
            scoreGameLife('incr');
            //myGameArea.gameLife += 2;
        } 
    }
    //----/NEW4-----
    myGameArea.clear();
    myBackground.speedX = -1;
    myBackground.newPos();
    myBackground.update();
    myGameArea.frameNo += 1;
    //myGameArea.gameLife += 1;
    /*if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(10, height, "coral", x, 0));
        myObstacles.push(new component(10, x - height - gap, "red", x, height + gap));
    }*/
    if (myGameArea.frameNo == 1 || everyinterval(obInterval)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        var lst = [0, 30, 60, 90, 100, 130, 160, 180, 200];
        //var yCord1 = randomNumbersList(lst);
        var yCord1 = randomNumbers(0, 200, 30);
        var hght = randomNumbers(50, 150, 10);
        //myObstacles.push(new component(70, 50, "coral", x, height-gap));
        //myObstacles.push(new component(70, 100, "red", x, height + gap));
        //new component(30, 30, "down.jpg", 10, 120, 'image');
        myObstacles.push(new component(70, hght, "red", x, yCord1));
        //myObstacles.push(new component(30, 30, "obst.jpg", 50, 120, 'obstaks'));
        //myObstacles.push(new component(50, 0, "blue", x, 70, 'cycle'));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].speedX = obSpeed;
        myObstacles[i].newPos();
        myObstacles[i].update();
    }
    if(myGameArea.frameNo%500 == 0){obSpeed -=1; obInterval -=100}
    //------New3 PowerPiece------
    if (myGameArea.frameNo == 10 || everyinterval(1000)) {
        var xCord = myGameArea.canvas.width;
        var yCord = randomNumbers(10, 200, 20);
        myPowers.push(new component(50, 30, "lime", xCord, yCord));
        //myObstacles.push(new component(10, x - height - gap, "coral", x, 0)); //New
    }
    for (i = 0; i < myPowers.length; i += 1) {
        myPowers[i].speedX = -3;
        myPowers[i].newPos();
        myPowers[i].update();
    }
    //------/New3 ------
    myScore.text="SCORE: " + myGameArea.frameNo;
    myGameLife.text="LIFE: " + myGameArea.gameLife;
   
    myScore.update();
    myGameLife.update();
    myGamePiece.newPos(); 
    myGamePiece.newPieceHeight();    
    myGamePiece.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function move(dir) {
    myGamePiece.image.src = 'jump.jpg';
    if(dir == 'up') {myGamePiece.speedY = -1;} 
    if(dir == 'down') {myGamePiece.speedY = 1;} 
    if(dir == 'left') {myGamePiece.speedX = -1;} 
    if(dir == 'right') {myGamePiece.speedX = 1;} 
}

function clearmove() {
    myGamePiece.image.src = 'down.jpg';
    myGamePiece.speedX = 0; 
    myGamePiece.speedY = 0; 
}

// ------New-------------
function playGame(){
    document.getElementById('myCanvasDemo').style.display = 'none';
    startGame()}

function increaseComp(){myGamePiece.changeHgt = +1; }
function decreaseComp(){myGamePiece.changeHgt = -1; }
function clearheight() {myGamePiece.changeHgt = 0; }

function pulseGame(){ myGameArea.stop();}
function restartGame(){
    myObstacles = [];
    //myGameArea.clear();
    myGameArea.stop();
    startGame()
}
function gamePiecePos(){
    var xCord = myGamePiece.x;
    var yCord = myGamePiece.y; 
    var xSpeed = myGamePiece.speedX; 
    var ySpeed= myGamePiece.speedY;
    var yMaxPos = myBackground.height - myGamePiece.height;
    alert('xCord:'+ xCord +' '+ 'yCord:'+ yCord +' '+ 'xSpeed:'+ xSpeed +' '+ 'ySpeed:'+ ySpeed+' '+ 'yMaxPos:'+ yMaxPos)
}