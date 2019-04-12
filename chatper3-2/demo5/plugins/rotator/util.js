/*
  Created by IntelliJ IDEA.
  User: icechen1219
  Date: 2019/04/12
  Time: 上午10:28
  To change this template use File | Settings | File Templates.
*/
"use strict";


/**
 * 动态引入外部css文件
 * @param cssUrl
 */
function importCss(cssUrl) {
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = cssUrl;
    link.media = 'all';
    document.head.appendChild(link);
}

/**
 * 产生0-n的随机整数
 * @param n{number}
 * @returns {number}
 */
function randInt(n) {
    return Math.floor(Math.random() * n);
}

/**
 * 产生[min,max)区间的随机整数
 * @param min
 * @param max
 * @returns {number}
 */
function randRange(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


/**
 * 产生固定4位整数的随机数
 * @returns {number}
 */
function rand4Bit() {
    return randRange(1000, 10000);
}

/**
 * 通过display和opacity两个样式来显示元素
 * @param timeout{number} >0时出现淡入动画效果
 */
HTMLElement.prototype.show = function (timeout) {
    this.style.display = "block";
    if (timeout > 0) {
        // 动画间隔时长
        var interval = 13;
        // 步长
        var step = interval / timeout;
        // 先显示元素
        this.style.display = "block";

        // 淡入动画开始
        this.style.opacity = 0;

        var opacity = 0;
        (function (that) {
            clearInterval(that.timer2);
            that.timer2 = setInterval(function () {
                opacity += step;
                that.style.opacity = opacity;
                if (that.style.opacity >= 1) {
                    clearInterval(that.timer2);
                }
            }, interval);
        })(this);
    } else {
        this.style.opacity = 1;
    }
};
/**
 * 隐藏元素
 */
HTMLElement.prototype.hide = function () {
    this.style.display = "none";
    this.style.opacity = 0;
};
/**
 * 批量隐藏元素
 */
HTMLCollection.prototype.hide = NodeList.prototype.hide = function () {
    for (var i = 0; i < this.length; i++) {
        this[i].hide();
    }
};

