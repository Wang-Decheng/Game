var cnt = 0;
        var color_Before = "red";
        var color_After = "Green";
        //这两个值控制前后两种颜色
        function on_click( pos )
        {
            var x = Math.floor(pos / 10);
            var y = pos % 10;//获取触发点击时间的按钮的横纵坐标
            var dx = [0,1,-1,0,0];
            var dy = [0,0,0,-1,1];//移动方向
            for(var i = 0 ; i <= 4 ; i++)
            {
                var tx = x + dx[i];
                var ty = y + dy[i];
                if(tx < 1 || tx > 3 || ty < 1 || ty > 3)continue;//判断是否越界
                var btn = document.getElementById(""+tx+ty);
                //判断颜色并更改，cnt用于记录更改后的颜色的数量
                if(btn.style.backgroundColor == color_Before)
                {
                    btn.style.backgroundColor = color_After;
                    cnt++;
                }
                else
                {
                    btn.style.backgroundColor = color_Before;
                    cnt--;
                }
            }
            if(cnt >= 9)//全部为更改后的颜色的话，游戏胜利，结束
            {
                Gameover();
                Recover();
            }
        }
        function Gameover()
        {
            alert("恭喜你获胜");
        }
        function Recover()//重置颜色
        {
            for(var i = 1;i <= 3; i++)
            {
                for(var j = 1 ;j <= 3;j++)
                {
                    var Id  = "" + i + j;
                    var btn = document.getElementById(Id);
                    btn.style = color_Before;
                }
            }
        }