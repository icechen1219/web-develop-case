/*
  Created by IntelliJ IDEA.
  User: icechen1219
  Date: 2019/04/12
  Time: 上午9:31
  To change this template use File | Settings | File Templates.
*/
"use strict";


/**
 * 点名组件
 * @param resources{array} 人员名单
 * @param callback{function} 停止点名时的回调函数
 * @param canRepeat{boolean} 允许重复点名
 * @constructor
 */
function CallRoll(resources, callback, canRepeat) {
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

    // 外部参数
    this.resources = resources;
    this.callback = callback;
    this.canRepeat = canRepeat;

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

/**
 * 创建结果显示框
 * @return {HTMLDivElement}
 */
CallRoll.prototype.buildBox = function () {
    // 1、创建名单滚动框标签
    var resultBox = document.createElement("div");
    resultBox.innerText = "139****5678";
    resultBox.classList.add("result-box");
    return resultBox;
};


/**
 * 创建开始/停止按钮
 * @return {HTMLButtonElement}
 */
CallRoll.prototype.buildBtn = function () {
    // 2、创建开始/停止按钮
    var btn = document.createElement("button");
    btn.innerText = "开始";
    btn.classList.add("lottery", "start");
    return btn;
};

/**
 * 向容器添加组件
 * @param component{HTMLElement} 组件DOM
 * @param index 组件位置，从0开始
 */
CallRoll.prototype.addComponent = function (component, index) {
    if (index === undefined || index >= this.container.children.length) {
        this.container.appendChild(component);
    } else if (index >= 0) {
        this.container.insertBefore(component, this.container.children[index]);
    }
};

/**
 * 初始化事件监听器
 */
CallRoll.prototype.initListener = function () {
    var that = this;
    var btn = this.container.getElementsByClassName("start")[0];

    btn && btn.unbindAll().addEventListener("click", function () {
        if (this.innerText === '开始') {
            that.start();
            this.innerText = "停止";
            this.classList.remove("start");
            this.classList.add("end");
        } else {
            that.stop();
            this.innerText = "开始";
            this.classList.remove("end");
            this.classList.add("start");

            // 调用回调函数，处理抽奖结果
            var currPhone = that.resources[that.index];
            var winner = {
                stuNo: currPhone
            };
            that.callback(winner);
            that.selectedList.push(winner);
            if (that.canRepeat !== true) {
                that.resources.splice(that.index, 1);
            }
        }
    });
};

/**
 * 初始化组件
 */
CallRoll.prototype.initComponents = function () {
    // 保证只初始化一次
    if (this.container.children.length === 0) {
        this.addComponent(this.buildBox());
        this.addComponent(this.buildBtn());
        this.initListener();
    }
};

CallRoll.prototype.start = function () {
    this.stop();

    // 在异步函数中，保存对当前对象的引用;
    var that = this;
    this.timer = setInterval(function () {
        // 改变index，让其随机指向下一个号码
        that.nextRound(randInt(that.getSize()));
    }, this.timeout);

};
CallRoll.prototype.stop = function () {
    clearInterval(this.timer);
};
/**
 * 人员名单长度
 * @returns {number}
 */
CallRoll.prototype.getSize = function () {
    return this.resources.length;
};
/**
 * 抽中名单
 * @returns {Array}
 */
CallRoll.prototype.getWinners = function () {
    return this.selectedList;
};
/**
 * 切换显示框中的名单
 * @param i{number} 随机序号
 */
CallRoll.prototype.nextRound = function (i) {
    this.index = i === undefined ? this.index : i;
    console.debug(this.index);

    // 切换号码
    var currPhone = String(this.resources[this.index]);
    this.container.getElementsByClassName("result-box")[0].innerText = currPhone.replace(/^(\d{3})\d*(\d{4})$/, "$1****$2");
};


// test for extends

/**
 * 抽奖组件
 * @param resources
 * @param callback
 * @param canRepeat
 * @param awards{array} 奖项集合
 * @constructor
 */
function Lottery(resources, callback, canRepeat, awards) {
    /**
     * 奖项集合
     */
    this.awards = awards;

    // 调用父构造函数初始化相关参数
    CallRoll.call(this, resources, callback, canRepeat);

    // 添加奖项下拉框
    this.addComponent((function (that) {
        var awardsBox = document.createElement("div");
        awardsBox.classList.add("awards");
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

        return awardsBox;
    })(this), 0);
}

// 子对象原型连接到父对象原型的副本上
Lottery.prototype = Object.create(CallRoll.prototype);
// 修改子对象原型上的构造函数，让其指向子构造函数
Lottery.prototype.constructor = Lottery;

// 重写父对象原型上的方法，使其支持新的业务逻辑
Lottery.prototype.initListener = function () {
    var that = this;
    var btn = this.container.getElementsByClassName("start")[0];

    btn && btn.unbindAll().addEventListener("click", function () {
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
            if (that.canRepeat === false) {
                that.resources.splice(that.index, 1);
            }
        }
    });
};
