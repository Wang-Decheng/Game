var FRAME = 60;
var WIDTH = 200;
var HEIGHT = 100;

var GROUND_HEIGHT = 0;
var GRIVITY = 1;
var SCORE_PER_SECONG = 10;

var PLAYER_HEIGHT = 30;
var PLAYER_WIDTH = 20;
var PLAYER_X = 10;
var INITIAL_SPEED = 10;

var PROBILITY = 0.05;
var MIN_WIDTH = 20;
var MIN_HEIGHT = 30;
var HEIGHT_RANGE = 10;
var WIDTH_RANGE = 10;
var LIMIT_OF_OBSTACLE = FRAME * 1;
var cnt = 0;

var player = 
{
    x:PLAYER_X,
    y:HEIGHT - GROUND_HEIGHT,
    status:0,
    time_Of_Last_Jump:0,
};

var cvs = document.getElementById("cnvs");
var cxt = cvs.getContext("2d");
cxt.fillStyle="#ff0000";
cxt.moveTo(player.x , player.y);
cxt.lineTo(player.x + player.width , player.y);
cxt.lineTo(player.x + player.width , player.y - player.height);
cxt.lineTo(player.x , player.y - player.height);
cxt.lineTo(player.x , player.y);
cxt.stroke();