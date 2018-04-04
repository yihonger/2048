function Game() {
    this.gridList = new Array();
    this.valueList = new Array();
    this.colorList = new Map([[0, "#bbb"], [2,"#fff"], [4,"#ddd"],
                            [8,"#ff5"], [16,"#fa5"], [32,"#f55"], 
                            [64,"#f00"], [128,"#99f"], [256,"#55f"],
                            [512,"#f3f"], [1024,"#f0f"], [2048,"#e5e"]]);

    this.init = init;
    this.start = start;
    this.next = next;
    this.draw = draw;

    this.sortLeft = sortLeft;
    this.moveLeft = moveLeft;

    this.sortRight = sortRight;
    this.moveRight = moveRight;

    this.sortUp = sortUp;
    this.moveUp = moveUp;

    this.sortDown = sortDown;
    this.moveDown = moveDown;

    this.move = move;

    this.isWin = isWin;
    this.isOver = isOver;
    this.isFull = isFull;
    this.result = result;
}
function init() {
    var title  = document.querySelector(".title");
    var i = 0;
    var j = 0;
    for(i=0; i< 4; i++){
        this.gridList[i] = new Array();
        this.valueList[i] = new Array();
        for(j = 0; j<4; j++){
            var div = document.createElement("div");
            div.className = "p p" + i.toString() + j.toString();
            title.appendChild(div);
            this.gridList[i][j] = div;
            this.valueList[i][j] = 0;
        }
    }
}
function start() {
    this.next();
    this.next();
    this.draw();
}
function next() {
    var pos = Math.floor(Math.random()*16);
    while(this.valueList[Math.floor(pos/4)][pos%4] !== 0) {
        pos = Math.floor(Math.random()*16);
    }
    var value = Math.floor(Math.random()*2 + 1);
    this.valueList[Math.floor(pos/4)][pos%4] = 2 * value;
}
function draw() {
    var i=0, j=0;
    for(i=0; i<4; i++){
        for(j=0; j<4; j++){
            if(this.valueList[i][j] === 0){
                this.gridList[i][j].innerText = "";
            }
            else{
                this.gridList[i][j].innerText = this.valueList[i][j];       
            }
            this.gridList[i][j].style.background = this.colorList.get(this.valueList[i][j]);
        }
    }
}

function sortLeft() {
    var i=0, j=0;
    var f = 0;
    for(i=0; i<4; i++){
        f=0;
        for(j=0; j<4; j++){
            if(this.valueList[i][j] === 0) continue;
            if(j > f){
                this.valueList[i][f] = this.valueList[i][j];
                this.valueList[i][j] = 0;
            }
            f++;
        }
    }
}
function moveLeft() {
    this.sortLeft();
    var i=0, j=0;
    for(i=0; i<4; i++){
        for(j=0; j<3; j++){
            if(this.valueList[i][j] === 0) break;
            if(this.valueList[i][j] === this.valueList[i][j+1]){
                this.valueList[i][j] *= 2;
                this.valueList[i][j+1] = 0;
                this.sortLeft();
            }
        }
    }
}

function sortRight() { 
    var i = 0, j = 0;
    var f = 3;
    for(i=0; i<4; i++){
        f=3;
        for(j=3; j>=0; j--){
            if(this.valueList[i][j] === 0) continue;
            if(j < f){
                this.valueList[i][f] = this.valueList[i][j];
                this.valueList[i][j] = 0;
            } 
            f--;           
        }
    }
}
function moveRight() {
    this.sortRight();
    var i=0, j=0;
    for(i=0; i<4; i++){
        for(j=3; j>0; j--){
            if(this.valueList[i][j] === 0) break;
            if(this.valueList[i][j] === this.valueList[i][j-1]){
                this.valueList[i][j] *= 2;
                this.valueList[i][j-1] = 0;
                this.sortRight();
            }
        }
    }
}

function sortUp() {
    var i=0, j=0;
    var f = 0;
    for(j=0; j<4; j++){
        f=0;
        for(i=0; i<4; i++){
            if(this.valueList[i][j] === 0) continue;
            if(i > f){
                this.valueList[f][j] = this.valueList[i][j];
                this.valueList[i][j] = 0;
            }
            f++;
        }
    }
}
function moveUp() {
    this.sortUp();
    var i=0, j=0;
    for(j=0; j<4; j++){
        for(i=0; i<3; i++){
            if(this.valueList[i][j] === 0) break;
            if(this.valueList[i][j] === this.valueList[i+1][j]){
                this.valueList[i][j] *= 2;
                this.valueList[i+1][j] = 0;
                this.sortUp();
            }
        }
    }
}

function sortDown() {
    var i = 0, j = 0;
    var f = 3;
    for(j=0; j<4; j++){
        f=3;
        for(i=3; i>=0; i--){
            if(this.valueList[i][j] === 0) continue;
            if(i < f){
                this.valueList[f][j] = this.valueList[i][j];
                this.valueList[i][j] = 0;
            } 
            f--;           
        }
    }    
}
function moveDown() {
    this.sortDown();
    var i=0, j=0;
    for(j=0; j<4; j++){
        for(i=3; i>0; i--){
            if(this.valueList[i][j] === 0) break;
            if(this.valueList[i][j] === this.valueList[i-1][j]){
                this.valueList[i][j] *= 2;
                this.valueList[i-1][j] = 0;
                this.sortDown();
            }
        }
    }
}

function isWin() {
    var i = 0, j = 0;
    for(i=0; i<4; i++){
        for(j=0; j<4; j++){
            if(this.valueList[i][j] === 2048){
                return true;
            }
        }
    }
    return false;
}

function isFull() {
    var i = 0, j = 0;
    for(i=0; i<4; i++){
        for(j=0; j<4; j++){
            if(this.valueList[i][j] === 0){
                return false;
            }
        }
    }
    return true;
}

function isOver() {
    var i = 0, j = 0;
    if(this.isFull()){
        //水平相邻是否相等
        for(i=0; i<4; i++){
            for(j=0; j<3; j++){
                if(this.valueList[i][j] === this.valueList[i][j+1]){
                    return false;
                }
            }
        }
        //垂直相邻是否相等
        for(j=0; j<4; j++){
            for(i=0; i<3; i++){
                if(this.valueList[i][j] === this.valueList[i+1][j]){
                    return false;
                }
            }
        }
    }else{
        return false;
    }
    return true;
}

function move(keyCode) {
    if( keyCode<37 || keyCode>40 ) return;
    switch(keyCode){
        case 37: this.moveLeft(); break;
        case 38: this.moveUp(); break;
        case 39: this.moveRight(); break;
        case 40: this.moveDown(); break;
    }
    if(!this.isFull())  this.next();
}

function result() {
    var res = document.querySelector(".result");
    if(this.isWin()){
        res.innerText = "Win!!!";
        res.style.background = "#eee";
    }
    if(this.isOver()){
        res.innerText = "Game Over!";
        res.style.background = "#eee";
    }
}