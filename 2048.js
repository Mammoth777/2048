//表格大小自适应
onload=function(){
    var screenx=screen.availWidth
    var screeny=screen.availHeight
    
    if(screenx>screeny){
        for(i=0;i<4;i++){
            var temp=num[i];
            for(j=0;j<4;j++){
                document.getElementById(temp[j]).style.width=document.getElementById(temp[j]).style.height=screeny/6+"px";}
            }
    }//电脑
    else{
        for(i=0;i<4;i++){
            var temp=num[i];
            for(j=0;j<4;j++){
                document.getElementById(temp[j]).style.width=document.getElementById(temp[j]).style.height=screenx/2+"px";}
        }    
        document.getElementById("main").style.margin=0;    
    }//手机
}
//alert ("hello world");

//<方块不能移动，却产生随机数>已修复
//<底层2248,22不合并>已修复
var num=new Array(3);
var zb=new Array;  //zb,坐标
var a=new Array(3);
var b=new Array(3);
var c=new Array(3);
var d=new Array(3);
var canmove=0; //可以移动
var realstart;//是否开始
var realwin;//是否2048
var cells = new Array
var a1=a2=a3=a4=b1=b2=b3=b4=c1=c2=c3=c4=d1=d2=d3=d4="";
cells=[a1,a2,a3,a4,b1,b2,b3,b4,c1,c2,c3,c4,d1,d2,d3,d4];
a=["a1","a2","a3","a4"]
b=["b1","b2","b3","b4"]
c=["c1","c2","c3","c4"]
d=["d1","d2","d3","d4"]
num=[a,b,c,d];

//重点笔记：element.addEventListener('',要么匿名函数function(){...}要么调用不带括号的函数，false表示冒泡)
document.body.addEventListener('keydown',movecell,false);//keydown功能
document.body.addEventListener('touchstart',touchstartfunc,false);//touch功能
document.body.addEventListener('touchmove',touchmovefunc,false);
document.body.addEventListener('touchend',function(){touchact=0;},false);
//touch 
//function touchall(){     // 疑问：能否把两个函数放在一个函数里并正常调用。
    var startx,starty,endx,endy,direction,touchact;
    function touchstartfunc(event){
        //alert("keydown success");
        event.preventDefault();
        touchact=1;
        startx=event.targetTouches[0].pageX;
        starty=event.targetTouches[0].pageY;
        //alert(startx + " and " + starty);
    }
    function touchmovefunc(event){      
        endx=event.changedTouches[0].pageX;
        endy=event.changedTouches[0].pageY;
        console.log("touchmove:" + endx + " and " + endy);
        touchSlide();
    }       
    function touchSlide(){
        var dx,dy;
        dx=endx-startx;
        dy=endy-starty;
        if(dx>15){direction=0}//right
        else if(dx<15){direction=1};//left
        if(dy>15){direction=2}//down
        else if(dy<-15){direction=3};//up
        //alert("direction="+ direction);
        if(touchact===1){
        movecell('touch');}
        touchact=0;
    }
//}
//test
function test(){ 
    //debugger;
    cells[12]=2;
    cells[13]=2;
    cells[14]=4;
    cells[15]=4;
    document.getElementById("d1").innerHTML=(2);
    document.getElementById("d2").innerHTML=(2);
    document.getElementById("d3").innerHTML=(4);
    document.getElementById("d4").innerHTML=(4);
}

function startgo(){
    //debugger;
    if(realstart!=1){
    canmove=1;
    sjzb();
    canmove=1;
    sjzb();
    realstart=1
    }
    else{
        clearall();
        canmove=1;
        sjzb();
        canmove=1;
        sjzb();
        realstart=1
    }
}
function sjzb(){  //产生随机数坐标,如果坐标对应cells数组数字为0，则随机填入2 or 4
    //alert("have go");
    //debugger;

    if(canmove==0){return;}
    else{
        var temp=new Array
        for(var t=0;t<16;t++){
        var x=Math.floor(Math.random()*4);
        var y=Math.floor(Math.random()*4);  
            if(cells[x*4+y]==0){
                    temp=num[x];
                    document.getElementById(temp[y]).innerHTML=cells[x*4+y]=tof();
                    document.getElementById("score").innerHTML=score();
                    canmove=0;
                    paintColor();
                    return
            }
        }

    }
}
function tof(){  //two or four
    var s=Math.random()
    if (s>0.1){
        return 2;
    }
    else return 4;
}
function score(){  //计算得分
    var s=Math.max.apply(null,cells);
    if(realwin="" && s===2048){
        alert("You Win!!!");
        realwin=1;
        }
    return s;//apply啥意思？法克
}
function panshu(){ //判输
    for(var n=0 ;n<16;n++){
        if(cells[n]==0){return;}
    }
    for(var i=0;i<4;i++){
        for(var j=0;j<3;j++){
            if(cells[i*4+j]==cells[i*4+j+1] || cells[i*4+j]==cells[(i+1)*4+j])
                return;
        }
    }
    for(i=0;i<3;i++){
        if(cells[i*4+3]==cells[(i+1)*4+3]){
            return;
        }
    }
    return -1;
}
function cellTonum(){  //cells数组对应num二维数组，数字写入表格
    var temp=new Array;
    for (var i=0;i<num.length;i++){
        temp=num[i];
        for(var j=0;j<a.length;j++){
            document.getElementById(temp[j]).innerHTML=cells[i*4+j];
        }
    }
}
function movecell(event){ //wasd动作
    //debugger;
    //alert(event.charCode);
    //alert(event.keyCode);
    //new touch event

    if(realstart!=1){
        return;
    }
    if(event!='touch'){
        switch(event.keyCode){
            case 65:movea();break;
            case 37:movea();break;
            case 68:moved();break;
            case 39:moved();break;
            case 87:movew();break;
            case 38:movew();break;
            case 83:moves();break;
            case 40:moves();break;
            }   
    }
    else{
        switch(direction){
            case 1:movea();break;
            case 0:moved();break;
            case 3:movew();break;
            case 2:moves();break;
        }
    }
    
    paintColor();
    sjzb();
    if(panshu()==-1){
    alert("you lose!!!");
}

}
function movea(){  //左移，a
    //debugger;
    canmove=0;
    for(var n=0;n<3;n++){ //左移三次
        for(var i=0;i<4;i++){
            for(var j=0;j<3;j++){
                if(cells[i*4+j]==0 && cells[i*4+j+1]!=0){
                    cells[i*4+j]=cells[i*4+j+1];
                    cells[i*4+j+1]="";
                    canmove=1;
                }
            }
        }
    }
    //归左
    //for(var n=0;n<3;n++){
        //debugger;
        for(var i=0;i<4;i++){
            if(cells[i*4+0]==cells[i*4+1] && cells[i*4+0]!=0){
                cells[i*4+0]=cells[i*4+0]*2;
                cells[i*4+1]="";
                canmove=1;

            }
            else if(cells[i*4+1]==cells[i*4+2] && cells[i*4+1]!=0){
                cells[i*4+1]=cells[i*4+1]*2;
                cells[i*4+2]="";      
                canmove=1;         
            }
            if(cells[i*4+2]==cells[i*4+3] && cells[i*4+2]!=0){
                cells[i*4+2]=cells[i*4+2]*2;
                cells[i*4+3]="";    
                canmove=1;       
            }
            
        }
    //}    
    //合并
        for(var n=0;n<3;n++){ //左移三次
        for(var i=0;i<4;i++){
            for(var j=0;j<3;j++){
                if(cells[i*4+j]==0 && cells[i*4+j+1]!=0){
                    cells[i*4+j]=cells[i*4+j+1];
                    cells[i*4+j+1]="";
                    canmove=1;  //为1则方块们可以移动
                }
            }
        }
    }
    //再归左一次
cellTonum();//把数组里的数写入表格
}
function moved(){  //右移，d
    //debugger;
    canmove=0;
    for(var n=0;n<3;n++){ //右移三次,n-次数
        for(var i=0;i<4;i++){
            for(var j=3;j>0;j--){
                if(cells[i*4+j]==0 && cells[i*4+j-1]!=0){
                    cells[i*4+j]=cells[i*4+j-1];
                    cells[i*4+j-1]="";
                    canmove=1;
                };
            };
        };
    };
    //归右
    //debugger;
        for(var i=0;i<4;i++){ //每行合并
            if(cells[i*4+3]==cells[i*4+2] && cells[i*4+3]!=0){
                cells[i*4+3]=cells[i*4+3]*2;
                cells[i*4+2]="";
                canmove=1;
            }
            else if(cells[i*4+2]==cells[i*4+1] && cells[i*4+2]!=0){
                cells[i*4+2]=cells[i*4+2]*2;
                cells[i*4+1]="";     
                canmove=1;          
            }
            if(cells[i*4+1]==cells[i*4+0] && cells[i*4+1]!=0){
                cells[i*4+1]=cells[i*4+1]*2;
                cells[i*4+0]="";           
                canmove=1;
            }
            
        }  
    for(var n=0;n<3;n++){ //右移三次,n-次数
        for(var i=0;i<4;i++){
            for(var j=3;j>0;j--){
                if(cells[i*4+j]==0 && cells[i*4+j-1]!=0){
                    cells[i*4+j]=cells[i*4+j-1];
                    cells[i*4+j-1]="";
                    canmove=1;
                }
            }
        }
    }
    //再归右一次
cellTonum();//把数组里的数写入表格
}
function movew(){//上移，w
    //debugger;
    canmove=0;
    for (var n=0;n<3;n++){//归上
        for(var j=0;j<4;j++){
            for (var i=0;i<3;i++){
                if(cells[i*4+j]==0 && cells[(i+1)*4+j]!=0){
                    cells[i*4+j]=cells[(i+1)*4+j];
                    cells[(i+1)*4+j]="";
                    canmove=1
                }
            }
        }
    }
    for (j=0;j<4;j++){ //每列合并
        if(cells[0*4+j]==cells[1*4+j] && cells[0*4+j]!=0){
            cells[0*4+j]=cells[0*4+j]*2;
            cells[1*4+j]="";
            canmove=1;
        }
        else if(cells[1*4+j]==cells[2*4+j] && cells[1*4+j]!=0){
            cells[1*4+j]=cells[1*4+j]*2;
            cells[2*4+j]="";
            canmove=1;
        }
        if(cells[2*4+j]==cells[3*4+j] && cells[2*4+j]!=0){
            cells[2*4+j]=cells[2*4+j]*2;
            cells[3*4+j]="";
            canmove=1;
        }
    }
    for (var n=0;n<3;n++){//再归上一次
        for(var j=0;j<4;j++){
            for (var i=0;i<3;i++){
                if(cells[i*4+j]==0 && cells[(i+1)*4+j]!=0){
                    cells[i*4+j]=cells[(i+1)*4+j];
                    cells[(i+1)*4+j]="";
                    canmove=1;
                }
            }
        }
    }
    cellTonum();//把数组里的数写入表格
}
function moves(){
    canmove=0;
    for (var n=0;n<3;n++){//归下,3 times
        for(var j=0;j<4;j++){
            for (var i=3;i>0;i--){
                if(cells[i*4+j]==0 && cells[(i-1)*4+j]!=0){
                    cells[i*4+j]=cells[(i-1)*4+j];
                    cells[(i-1)*4+j]="";
                    canmove=1;
                }
            }
        }
    }
    for (j=0;j<4;j++){ //每列合并
        if(cells[3*4+j]==cells[2*4+j] && cells[3*4+j]!=0){
            cells[3*4+j]=cells[3*4+j]*2;
            cells[2*4+j]="";
            canmove=1;
        }
        else if(cells[2*4+j]==cells[1*4+j] && cells[2*4+j]!=0){
            cells[2*4+j]=cells[2*4+j]*2;
            cells[1*4+j]="";
            canmove=1;
        }
        if(cells[1*4+j]==cells[0*4+j] && cells[1*4+j]!=0){
            cells[1*4+j]=cells[1*4+j]*2;
            cells[0*4+j]="";
            canmove=1;
        }
    }
    for (var n=0;n<3;n++){//归下,3 times
        for(var j=0;j<4;j++){
            for (var i=3;i>0;i--){
                if(cells[i*4+j]==0 && cells[(i-1)*4+j]!=0){
                    cells[i*4+j]=cells[(i-1)*4+j];
                    cells[(i-1)*4+j]="";
                    canmove=1;
                }
            }
        }
    }

    cellTonum();//把数组里的数写入表格    
}

function paintColor(){
    //debugger;
    var colors;
    var temp=new Array;
    for (var i=0;i<num.length;i++){
        temp=num[i];
        for (var j=0;j<a.length;j++){
            switch(cells[i*4+j]){
                case "":colors="#c1c1c1";break;
                case 0:colors="#c1c1c1";break;
                case 2:colors="#ffc080";break;
                case 4:colors="#ffa060";break;
                case 8:colors="#ff8040";break;
                case 16:colors="#ff6020";break;
                case 32:colors="#ff4000";break;
                case 64:colors="#ff8080";break;
                case 128:colors="#ffc000";break;
                case 256:colors="#ffff00";break;
                case 512:colors="#c080ff";break;
                case 1024:colors="#c0ff40";break;
                case 2048:colors="#60ff60";break;
                case 4096:colors="#c060ff";break;
            }
            document.getElementById(temp[j]).style.backgroundColor=colors;
            colors=""
        }
    }

}
function clearall(){
     for(var n=0;n<cells.length;n++){
        cells[n]=""
    }
    cellTonum();
}