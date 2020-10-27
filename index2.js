var FRAME = 60;//游戏帧率
var WIDTH = 800;//canvas长宽
var HEIGHT = 400;

var GROUND_HEIGHT = 30;//地面高度
var GRIVITY = 0.7;//重力
var SCORE_PER_SECONG = 10;//每秒获得的分数

var PLAYER_HEIGHT = 30;//人物长宽
var PLAYER_WIDTH = 20;
var PLAYER_X = 50;//人物横坐标
var INITIAL_SPEED = 15;//跳跃时向上的初速度

// var PROBILITY = 0.9;//障碍物生成概率
var MIN_WIDTH = 20;//障碍物最小尺寸
var MIN_HEIGHT = 35;
var HEIGHT_RANGE = 20;//障碍物长宽随机范围
var WIDTH_RANGE = 20;
var DISTANCE_RANGE = 150;
// var LIMIT_OF_OBSTACLE = 250 + forward_Speed/1000;//生成障碍物间隔
var LIMIT_OF_OBSTACLE = 200;
var INITIAL_FORWARD_SPEED = 250;
var HARD = 0.00001;//随分数前进速度增长的速度
var MAX_HARD = 400;//最大难度 or 速度

var player = 
{
    x:PLAYER_X,
    y:HEIGHT - GROUND_HEIGHT,
    status:0,//跳跃状态
    time_Of_Last_Jump:0,//距离上次跳跃时间
    width:PLAYER_WIDTH,
    height:PLAYER_HEIGHT,
};

var obstacle =
{
    x:0,
    y:0,
    height:0,
    width:0,
};

var data =
{
    score:0,
    highest:0,
};

var time_Of_Last_Obstacle = 0;
var distance_Of_Obstacle = LIMIT_OF_OBSTACLE;
var forward_Speed = INITIAL_FORWARD_SPEED;//前进速度
var obstacles = [];
var timeout = false;

var cvs = document.getElementById("cnvs");
cvs.width = WIDTH;
cvs.height = HEIGHT;
var cxt = cvs.getContext("2d");
// var Timer = setInterval("update()",1000/FRAME);//定时器
var bdy = document.getElementById("bdy");
bdy.addEventListener("mousedown",function(event){cvs_click()});//监听器
time();

function time()
{
    if(timeout) return;
    update();
    setTimeout(time,1000/FRAME);
}

function update()
{
    cvs.width = WIDTH;
    cvs.height = HEIGHT;
    cxt.fillStyle = "#FFFFFF";
    cxt.fillRect(0,0,WIDTH,HEIGHT);//清空画布
    update_All_Elements();//更新所有元素的坐标等
    draw_Ground();//绘制游戏元素
    draw_Player();
    draw_Obstacle();
    draw_UI();
    check();//判断是否与障碍物碰撞
}

function cvs_click()//鼠标点击时，若不是跳跃状态，进入跳跃状态
{
    // console.log(1);
    if(player.status != 0)return;
    player.status = 1;
    time_Of_Last_Jump = 0;
}

function update_All_Elements()
{
    //update player
    if(player.status == 1)
    {
        time_Of_Last_Jump++;
        var time = time_Of_Last_Jump;
        player.y = HEIGHT - GROUND_HEIGHT + 0.5*GRIVITY*time*time-INITIAL_SPEED*time;//计算跳跃时的高度
        if(player.y > HEIGHT-GROUND_HEIGHT)//落地
        {
            player.y = HEIGHT-GROUND_HEIGHT;
            player.status = 0;
        }
    }
    //update obstacles
    time_Of_Last_Obstacle++;//生成障碍物
    if(time_Of_Last_Obstacle / FRAME  *  forward_Speed > distance_Of_Obstacle)
    {
        time_Of_Last_Obstacle = 0;
        // if(Math.random() < PROBILITY)
        // {
        //     addObstacle();
        // }
        distance_Of_Obstacle = LIMIT_OF_OBSTACLE + Math.random()*DISTANCE_RANGE + forward_Speed/9.5;
        addObstacle();
    }
    
    for(var i = 0; i < obstacles.length ; i++)//障碍物向左移动
    {
        obstacles[i].x -= Math.ceil(forward_Speed/FRAME);
        //console.log(forward_Speed/FRAME);
        if(obstacles[i].x + obstacles[i].width < 0)//移除屏幕外障碍物
        {
            obstacles.shift();
        }
    }
    //update UI
    data.score += Math.ceil(SCORE_PER_SECONG/FRAME);
    console.log(Math.ceil(SCORE_PER_SECONG/FRAME));
    if(data.score > data.highest)
    {
        data.highest = data.score;
    }
    //update the hardship
    forward_Speed += data.score * HARD;
    if(forward_Speed > MAX_HARD)forward_Speed = MAX_HARD;
    // console.log(forward_Speed);
}

function addObstacle()
{
    var obs = {
        width:Math.ceil(MIN_WIDTH+Math.random()*WIDTH_RANGE),
        height:Math.ceil(MIN_HEIGHT+Math.random()*HEIGHT_RANGE),
        x:WIDTH,
        y:HEIGHT-GROUND_HEIGHT
    };
    obs.x-=obs.width;
    obstacles.push(obs);
}

function draw_Ground()
{
    cxt.fillStyle = "#FFFFFF";
    cxt.fillRect(0,0,WIDTH,HEIGHT);
    cxt.moveTo(0,HEIGHT-GROUND_HEIGHT);
    cxt.lineTo(WIDTH,HEIGHT-GROUND_HEIGHT);
    cxt.stroke();
}

function draw_Obstacle()
{
    //console.log(1);
    for(var i = 0; i < obstacles.length ; i++)
    {
        // console.log(obstacles.length);
        cxt.moveTo(obstacles[i].x , obstacles[i].y);
        cxt.lineTo(obstacles[i].x , obstacles[i].y - obstacles[i].height);
        cxt.lineTo(obstacles[i].x + obstacles[i].width , obstacles[i].y - obstacles[i].height);
        cxt.lineTo(obstacles[i].x + obstacles[i].width , obstacles[i].y);
        cxt.lineTo(obstacles[i].x , obstacles[i].y);
        cxt.stroke();
    }
}

function draw_Player()
{
    cxt.moveTo(player.x , player.y);
    cxt.lineTo(player.x + player.width , player.y);
    cxt.lineTo(player.x + player.width , player.y - player.height);
    cxt.lineTo(player.x , player.y - player.height);
    cxt.lineTo(player.x , player.y);
    cxt.stroke();
}

function check()
{
    for(var i = 0; i < obstacles.length ;i++)
    {
        if(player.y >= obstacles[i].y && ((player.x >= obstacles[i].x && player.x <=obstacles[i].x + obstacles[i].width) || (player.x + player.width >= obstacles[i].x && player.x + player.width <= obstacles[i].x + obstacles[i].width)))
        {
            gameover();
            return;
        }
    }
}



function draw_UI()
{
    cxt.fillStyle = "#000000";
    cxt.font = "normal 15px 楷体";
    cxt.textAlign = "center";
    cxt.fillText("分数："+ data.score.toString(),WIDTH*9/10,HEIGHT/11);

    cxt.fillStyle = "#000000";
    cxt.font = "normal 15px 楷体";
    cxt.textAlign = "center";
    cxt.fillText("最高分："+ data.highest.toString(),WIDTH*9/10,HEIGHT*2/11);

}

function gameover()
{
    timeout = true;
    cxt.fillStyle = "#FFFFFF";
    cxt.fillRect(0,0,WIDTH,HEIGHT);
    cxt.fillStyle = "#000000";
    cxt.font = "normal 15px 楷体";
    cxt.textAlign = "center";
    cxt.fillText("游戏失败\n当前分数为："+data.score.toString()+"\n最高分数为:"+data.highest.toString()+"\n点击按钮以重新开始",WIDTH/2,HEIGHT/2);
    
    data.score = 0;
    for(var i = 0;i < obstacles.length ;i++)
    {
        obstacles.shift();
    }

    // var btn = document.getElementById("btn");
    // btn.style.display = "block";
}

function renew()
{
    data.score = 0;
    for(var i = 0;i < obstacles.length ;i++)
    {
        obstacles.shift();
    }
    player.status = 0;
    player.y = HEIGHT - GROUND_HEIGHT;
    forward_Speed = INITIAL_FORWARD_SPEED;
    // var btn = document.getElementById("btn");
    // btn.style.display = "none";
    if(!timeout)return;
    timeout = false;
    time();
}