/*
  Created by IntelliJ IDEA.
  User: icechen1219
  Date: 2019/04/12
  Time: 上午9:31
  To change this template use File | Settings | File Templates.
*/
"use strict";

// test for extends

/**
 *
 * @param resources{array}
 * @param callback{function}
 * @param awards{array}
 * @constructor
 */
function Lottery(resources, callback, awards) {
    /**
     * 图片轮播的顶级容器
     * @type {Element}
     */
    this.container = document.getElementsByClassName("rotator")[0];
    if (!this.container) {
        var errMsg = "没有指定轮播容器！请为轮播容器设置class='rotator'";
        document.body.innerHTML = errMsg;
        throw new Error(errMsg);
    }
    if (!callback instanceof Function) {
        var errMsg = "请设置停止抽奖的回调函数！";
        document.body.innerHTML = errMsg;
        throw new Error(errMsg);
    }
    /**
     * 资源集合
     */
    this.resources = resources;
    /**
     * 停止后的回调函数
     */
    this.callback = callback;
    /**
     * 奖项集合
     */
    this.awards = awards;

    // 内置参数
    /**
     * 名单滚动频率
     * @type {number}
     */
    this.timeout = 10;
    /**
     * 抽中的人员列表
     * @type {Array}
     */
    this.selectedList = [];
    /**
     * 全局定时器
     * @type {number}
     */
    this.timer = 0;
    /**
     * 当前资源序号
     * @type {number}
     */
    this.index = 0;

    importCss('plugins/rotator/css/rotator.css');
    this.initComponents();
}

Lottery.prototype.initComponents = function () {
    (function (that) {
        var awardsBox = document.createElement("div");
        awardsBox.classList.add("awards");
        that.container.appendChild(awardsBox);
        var awardsSel = document.createElement("select");
        awardsSel.classList.add("lottery");
        for (var i = 0; i < that.awards.length; i++) {
            var award = that.awards[i];
            awardsSel.options.add(new Option(award.name, award.value));
        }
        awardsSel.selectedIndex = -1;
        awardsSel.addEventListener("change", function () {
            this.nextElementSibling.innerText = "奖金：" + this.value;
        });
        awardsBox.appendChild(awardsSel);
        var awardsLabel = document.createElement("label");
        awardsLabel.setAttribute("for", "awards");
        awardsBox.appendChild(awardsLabel);
    })(this);


    // 1、创建名单滚动框标签
    (function (that) {
        var resultBox = document.createElement("div");
        resultBox.innerText = "139****5678";
        resultBox.classList.add("result-box");
        that.container.appendChild(resultBox);
    })(this);

    // 2、创建开始/停止按钮
    (function (that) {
        var btn = document.createElement("button");
        btn.innerText = "开始";
        btn.classList.add("lottery", "start");
        that.container.appendChild(btn);

        btn.addEventListener("click", function () {
            var awardsSel = this.parentElement.firstElementChild.firstElementChild;
            if (this.innerText === '开始') {
                if (awardsSel.selectedIndex !== -1) {
                    awardsSel.disabled = true;
                    that.start();
                    this.innerText = "停止";
                    this.classList.remove("start");
                    this.classList.add("end");
                } else {
                    alert("请选择抽奖等级！");
                }
            } else {
                awardsSel.disabled = false;
                that.stop();
                this.innerText = "开始";
                this.classList.remove("end");
                this.classList.add("start");

                // 调用回调函数，处理抽奖结果
                var currPhone = that.resources[that.index];
                var winner = {
                    phone: currPhone,
                    award: awardsSel.options[awardsSel.selectedIndex].innerText,
                    value: awardsSel.value
                };
                that.callback(winner);
                that.selectedList.push(winner);
                that.resources.splice(that.index, 1);
            }
        });
    })(this);
};

Lottery.prototype.start = function () {
    this.stop();

    // 在异步函数中，保存对当前对象的引用;
    var that = this;
    this.timer = setInterval(function () {
        // 改变index，让其随机指向下一个号码
        that.nextRound(randInt(that.getSize()));
    }, this.timeout);

};
Lottery.prototype.stop = function () {
    clearInterval(this.timer);
};
Lottery.prototype.getSize = function () {
    return this.resources.length;
};
Lottery.prototype.getWinners = function () {
    return this.selectedList;
};
Lottery.prototype.nextRound = function (i) {
    this.index = i === undefined ? this.index : i;
    console.debug(this.index);

    // 切换号码
    var currPhone = String(this.resources[this.index]);
    this.container.children[1].innerText = currPhone.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2");
};