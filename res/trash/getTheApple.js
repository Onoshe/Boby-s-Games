var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#FF0000";
ctx.fillRect(0,0,150,75);
    
var ctx2 = canvas.getContext("2d");
ctx2.fillStyle = "lime";
ctx2.fillRect(50,50,150,75);
    
var ctx3 = canvas.getContext("2d");
ctx3.beginPath();
ctx3.arc(150,150,40,0,2*Math.PI);
ctx3.stroke();
ctx2.fillStyle = "blue";
ctx3.fill();
    

var myGamePiece;
var myGamePiece2;
function startGame() {
    /*myGamePiece = new component(30, 30, "gray", 10, 120);
    myGamePiece2 = new component(40, 0, "magenta", 70, 190, 'cycle');
}


function component(width, height, color, x, y, name) {
    this.name = name;
		 this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;    
    ctx = canvas.getContext("2d");
    if(this.name == 'cycle'){
					ctx.beginPath();
					ctx.arc(this.x,this.y,this.width,this.height,2*Math.PI);
					ctx.stroke();
					ctx.fillStyle = color;
					ctx.fill();
		 }else{
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
		 }
}