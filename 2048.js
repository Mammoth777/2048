/**
 *       x0 x1 x2 x3
 *      ------------   
 *  y0 | 00 01 02 03 
 *  y1 | 04 05 06 07 
 *  y2 | 08 09 10 11
 *  y3 | 12 13 14 15 
 */
function Game(opt) {
    this.nums = new Array(16);
    this.colorList = opt.colorList;
    this._init();
}
Game.prototype = {
    constructor: Game,
    _init: function () {
        this.nums.fill(0);
        this.hasMove = true;
        this.createNewBlock();
        this.hasMove = true;
        this.createNewBlock();
        this._bind();
    },
    createNewBlock: function () {
        if (this.hasMove) {
            this.hasMove = false;
            // 找到值为0的方块
            var arr = this.nums,
                zeroArr = [];
            arr.forEach(function (v, i) {
                if (v === 0) {
                    zeroArr.push(i);
                }
            })
            // create random 2 or 4
            var r = zeroArr[Math.floor(Math.random() * zeroArr.length)]; //获取this.nums中value为零的index
            this.nums[r] = Math.random() < 0.1 ? 4 : 2;
            console.log(r, this.nums);
            this.render();
        }
    },
    // listen keyboard 
    _bind: function () {
        var that = this;
        document.addEventListener('keydown', function (e) {
            //console.log(e.keyCode);  //a65 d68 w87 s83  &&  ←37 →39 ↑38 ↓40
            switch (e.keyCode) {
                case 65 || 37: that.move('x', false); break; // left
                case 68 || 39: that.move('x', true); break; // right
                case 87 || 38: that.move('y', false); break; // up
                case 83 || 40: that.move('y', true); break; // down
            }
        })
    },
    move: function (axis, direction) { // x true(右) x false(左) y true(下) y fasle(上)
        // 按顺序判断该方向4个数字,(跳过0),相同则相加
        // 1. 横/竖 循环4次,每次循环生成一个包含该条4个数字的数组 
        // 2. direction 决定是否反转数组 --> 按下左,下需要在排序前后分别反转,合计2次
        // 3. 去除数组内的 0 
        // 4. 倒序遍历,相同则相加.然后重新遍历至无相同
        // 5. 在空白处生成新数字
        var self = this;
        function sort(arr) { //敲黑板,划重点🐶
            var newArr = [];
            //按一下合并一整条(2222=>8),奈何原效果非此,改用下面的
            /* (function s(arr) {
                newArr = arr.filter(function (v) { return v != 0 }); //去除0   
                for (var i = newArr.length; i > 0; i--) { // 合并相同,并归零其一
                    if (newArr.length == 1) { break };
                    if (newArr[i] == newArr[i - 1]) {
                        newArr[i] *= 2;
                        newArr[i - 1] = 0;
                        s(newArr);
                    }
                }
            })(arr); */
            //按一下合并当前条可见的可合并数字,即 2222=>0044
            (function (arr) {
                newArr = arr.concat();
                newArr = newArr.filter(v => v != 0); //去除0   ES6箭头函数
                for (var i = newArr.length; i > 0; i--) { // 合并相同,并归零其一
                    if (newArr[i] === newArr[i - 1]) {
                        newArr[i] *= 2;
                        newArr[i - 1] = 0
                        i--;
                    }
                }
                newArr = newArr.filter(v => v != 0); //去除0   ES6箭头函数
            })(arr);

            [].unshift.apply(newArr, new Array(4 - newArr.length).fill(0));  //并把0加到开头,补足4位
            if (arr.toString() != newArr.toString()) { //数组相等判定.如果不相等,说明有变动过了
                self.hasMove = true;
            }
            //this.arr = newArr.concat(); //深copy给this.arr ..[是否需要深复制呢?待定]
            return newArr;
        }
        var a = this.nums; // a[x * 4 + y] -- 第 x 行 ,第 y 列 
        for (var i = 0; i < 4; i++) {
            var line = [];
            for (var j = 0; j < 4; j++) {
                if (axis == 'x') { //横向
                    line.push(a[i * 4 + j]);
                } else if (axis == 'y') { //纵向
                    line.push(a[j * 4 + i]);
                }
            }
            if (!direction) {
                line.reverse();
                var sl = sort(line).reverse();
            } else {
                sl = sort(line); // sorted line
            }
            for (var j = 0; j < 4; j++) {
                if (axis == 'x') { //横向
                    a[i * 4 + j] = sl[j];
                } else if (axis == 'y') { //纵向
                    a[j * 4 + i] = sl[j];
                }

            }
        }
        console.log(this.nums);
        // console.log(this);
        this.createNewBlock();
    },
    render: function () {
        function ln2(num) { //2的n次方
            for (var i = 1; i < 15; i++) {
                if (Math.pow(2, i) === num * 1) {
                    return i;
                };
            };
            if(i == 15){
                throw "num is wrong ; should be 2^n ,n >= 1; num = " + num;
            }
            
        }
        var ss = document.querySelectorAll('span');
        for (var i = 0; i < ss.length; i++) {
            ss[i].innerHTML = this.nums[i] == 0 ? '' : this.nums[i];
            ss[i].style.backgroundColor = ss[i].innerHTML ? this.colorList[ln2(+ss[i].innerHTML) - 1 ] : ''; 
            console.log(ss[i].innerHTML);
        }
    }
}

var config = {
    colorList: [
        "#EDE0C8",
        "#EDE0C8", //4
        "#F2B179",
        "#F59563", //16
        "#F67C5F",
        "#F65E3B",  //64
        "#EDCF72", //128
        "#EDCC61", //256
        "#EDC850", //512
        "#EDC53F", //1024
        "red", //2048
        "red", //4096
        "red", //9192
    ]
}
var game = new Game(config);
console.log(game.nums);