var main = document.getElementById('main');
var row = document.getElementById('row');
var bottom = document.getElementById('bottom');
var bangs = document.getElementsByClassName('bangs')[0];
var liList = row.children;
var startGame = document.getElementById('startGame');
var HP = document.getElementById('HP');
var score = document.getElementById('score');
var resultList = document.getElementsByClassName('result');
HP.num = null;
score.num = null;
var interval = null;
var bangsNum = null;
var fall = null;
var opacity = null;
var keyD = [];
var keyF = [];
var keyJ = [];
var keyK = [];

onkeydown = function (e) {
    var code = e.keyCode || e.which || e.charCode;
    switch (code) {
        case 68: {
            keyJudge(0, keyD)
            break;
        }
        case 70: {
            keyJudge(1, keyF)
            break;
        }
        case 74: {
            keyJudge(2, keyJ)
            break;
        }
        case 75: {
            keyJudge(3, keyK)
            break;
        }
    }
};

function keyJudge(index, key) {
    bottom.children[index].style.background = 'rgb(45, 110, 153)';
    row.children[index].style.background = 'rgba(176, 185, 204, 0.1)';
    if (key[0].offsetTop > 610) {
        clearInterval(key[0].timeID)
        liList[index].removeChild(key[0]);
        key.shift();
        bangsNum++;
        addScore(bangsNum);
        resultList[index].style.opacity = '0.5';
        opacityAmend(resultList[index]);
    } else {
        bangsNum = 0;
        addScore('MISS');
    }
};

onkeyup = function (e) {
    var code = e.keyCode || e.which || e.charCode;
    switch (code) {
        case 68: {
            bottom.children[0].style.background = '';
            row.children[0].style.background = '';
            break;
        }
        case 70: {
            bottom.children[1].style.background = '';
            row.children[1].style.background = '';
            break;
        }
        case 74: {
            bottom.children[2].style.background = '';
            row.children[2].style.background = '';
            break;
        }
        case 75: {
            bottom.children[3].style.background = '';
            row.children[3].style.background = '';
            break;
        }
    }
};

startGame.onclick = function () {
    if (HP.num != 10) {
        animationHeight(startGame, 0)
        HP.num = 10;
        score.num = 0;
        interval = 140;
        bangsNum = 0;
        score.innerText = score.num;
        for (var i = 0; i < HP.children.length; i++) {
            HP.children[i].style.opacity = '1';
        };
        setTimeout(function () {
            whereabouts(interval);
        }, 2000)
    }
};

function whereabouts(interval) {
    clearInterval(fall);
    fall = setInterval(function () {
        var random = Math.floor(Math.random() * 4)
        var li = liList[random];
        var p = document.createElement('p');
        p.className = 'chunk';
        // if (((score.num + 1) / 500) < 1) {
        //     p.style.animation = 'whereabouts ' + (3 - ((score.num + 1) / 250)) + 's linear';
        // }else {
        //     p.style.animation = 'whereabouts 1s linear';
        // }
        li.appendChild(p);
        if (score.num) {
        }
        switch (random) {
            case 0: {
                keyD.push(p);
                break;
            }
            case 1: {
                keyF.push(p);
                break;
            }
            case 2: {
                keyJ.push(p);
                break;
            }
            case 3: {
                keyK.push(p);
                break;
            }
        }
        detection(p, li)
        p.setAttribute('index', random);
    }, interval);
};

function detection(ele, parent) {
    ele.timeID = setInterval(function () {
        var current = ele.offsetTop;
        if (current >= 800) {
            switch (Number(ele.getAttribute('index'))) {
                case 0: {
                    keyD.shift();
                    break;
                }
                case 1: {
                    keyF.shift();
                    break;
                }
                case 2: {
                    keyJ.shift();
                    break;
                }
                case 3: {
                    keyK.shift();
                    break;
                }
            }
            parent.removeChild(ele);
            clearInterval(ele.timeID)
            bangsNum = 0;
            addScore('MISS');
        }
    }, 200);
};

function addScore(text) {
    if (bangs != undefined) {
        main.removeChild(bangs);
    }
    opacity = 1;
    bangs = document.createElement('p');
    if (bangsNum > 0) {
        bangs.style.color = 'rgb(255, 157, 29)';
        score.num++;
        score.innerText = score.num;
        if (HP.num != 0) {
            if (interval >= 140) {
                if (score.num % 10 == 0) {
                    interval -= 20;
                    whereabouts(interval);
                };
            };
        };


    } else if (HP.num > 0) {
        bangs.style.color = 'rgb(179, 178, 177)';
        HP.children[10 - HP.num].style.opacity = 0;
        HP.num--;
        if (HP.num == 0) {
            animationHeight(startGame, 1080)
            clearInterval(fall);
        }
    }
    bangs.className = 'bangs';
    bangs.innerText = text;
    main.appendChild(bangs);
};

setInterval(function () {
    opacity -= 0.05;
    bangs.style.opacity = opacity;
}, 100);

function opacityAmend(ele) {//图标渐变函数
    clearInterval(ele.del);
    var step = 1;
    ele.del = setInterval(function () {
        step -= 0.1;
        ele.style.opacity = step;
        if (ele.style.opacity <= 0) {
            clearInterval(ele.del);
        }
    }, 35);
};

function animationHeight(ele, target) {//改变高度动画
    clearInterval(ele.height);
    if (target == 0) {//当目标高度为0时,改变字体大小为0
        ele.style.fontSize = 0;
    }
    var currentHeight = ele.offsetHeight;
    ele.height = setInterval(function () {
        var step = (target - currentHeight) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        currentHeight += step;
        ele.style.height = currentHeight + 'px';
        //2.3 终点检测检测
        if (currentHeight == target) {
            clearInterval(ele.height);
            if (target == 1080) {//当目标高度为500时,改变字体大小为100,设置分数文本
                ele.style.fontSize = '100px'
                ele.innerText = '分数:' + score.num + '(重新开始)';
            }
        }
    }, 10);
};