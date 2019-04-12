"use strict";

/**
 * 图片轮播构造函数
 * @param resources{array} 图片url数组
 * @param canClick{boolean} 是否添加按钮点击事件
 * @param hover{boolean} 是否添加悬停事件
 * @constructor
 */
function Rotator(resources, canClick, hover) {
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
    // 外部参数
    /**
     * 图片集合
     * @type {Array}
     */
    this.resources = resources;
    /**
     * 是否添加悬浮事件
     * @type {boolean}
     */
    this.hover = hover;
    /**
     * 是否添加数字点击事件
     * @type {boolean}
     */
    this.canClick = canClick;

    // 内置参数
    /**
     * 图片切换频率
     * @type {number}
     */
    this.timeout = 3000;
    /**
     * 图片轮播定时器
     * @type {number}
     */
    this.timer = 0;
    /**
     * 切换动画定时器
     * @type {number}
     */
    this.timer2 = 0;
    /**
     * 当前图片资源序号
     * @type {number}
     */
    this.index = 0;

    importCss('plugins/rotator/css/rotator.css');
    this.initComponents();
}

/**
 * 初始化图片轮播所需组件及事件
 */
Rotator.prototype.initComponents = function () {
    // 控制只初始化一次
    if (this.container.children.length === 0) {
        // FIXME：轮播的原理非常多，根据需要选择。注意changeImg函数需要同步修改。
        (function buildImageArea(that) {
            // 1、创建单个img标签，循环改变其src属性实现
            // var img = document.createElement("img");
            // img.src = that.resources[0];
            // that.container.appendChild(img);

            // 2、通过改变背景图片地址轮播
            // that.container.style.backgroundImage = "url('" + that.resources[0] + "')";

            // 3、创建一组img标签，通过显示/隐藏属性实现轮播
            var ul = document.createElement("ul");
            for (var i = 0; i < that.getSize(); i++) {
                var li = document.createElement("li");
                ul.appendChild(li);

                var img = document.createElement("img");
                img.src = that.resources[i];
                li.appendChild(img);
            }
            that.container.appendChild(ul);
        })(this);

        // 创建数字列表显示区
        (function buildNumberArea(that) {
            var numberShow = document.createElement("div");
            numberShow.className = "number";
            that.container.appendChild(numberShow);
            for (var i = 0; i < that.getSize(); i++) {
                var numSpan = document.createElement("span");
                numSpan.innerText = i + 1;
                numberShow.appendChild(numSpan);

                // 按钮点击事件
                if (that.canClick) {
                    numSpan.addEventListener("click", function () {
                        // 直接跳转到指定的图片
                        that.nextRound(parseInt(this.innerText) - 1);
                        // 然后重启轮播
                        that.start();
                    })
                }
            }
            numberShow.firstElementChild.classList.add("on");
        })(this);


        // 容器鼠标悬停事件
        (function handleHover(that) {
            if (that.hover) {
                that.container.addEventListener("mouseover", function () {
                    that.stop();
                });
                that.container.addEventListener("mouseout", function () {
                    that.start();
                });
            }
        })(this);
    }
};

/**
 * 开启轮播
 */
Rotator.prototype.start = function () {
    this.stop();

    // 在异步函数中，保存对Rotator对象的引用;
    var that = this;
    // FIXME：直接用setInterval(that.changeImg, 2000)，this会被绑定到全局对象Window上，从而导致逻辑错误
    // 解决方式：1、通过匿名函数创建闭包，保存that对当前对象的引用。
    this.timer = setInterval(function () {
        // 改变index，让其指向下一张图片
        // FIXME：一定要记得求余，否则超出数组下标
        that.nextRound((that.index + 1) % that.getSize());
    }, this.timeout);

    // 2、通过Function.prototye.bind(thisArg)方法强制指定this为当前对象。
    // var changeImg2 = this.changeImg.bind(this);
    // this.timer = setInterval(changeImg2, this.timeout);
};

/**
 * 结束轮播
 */
Rotator.prototype.stop = function () {
    clearInterval(this.timer);
};

/**
 * 获取图片资源的个数
 * @returns {number}
 */
Rotator.prototype.getSize = function () {
    return this.resources.length;
};

/**
 * 切换图片
 * @param i{number} 图片序号
 */
Rotator.prototype.nextRound = function (i) {
    this.index = i === undefined ? this.index : i;
    console.debug(this.index);
    // 改变数字序号的样式
    var numSpanList = this.container.lastElementChild.children;
    for (var j = 0; j < numSpanList.length; j++) {
        numSpanList[j].classList.remove("on");
    }
    numSpanList[this.index].classList.add("on");

    // 切换图片
    // 第一种轮播方式
    // this.container.firstElementChild.src = this.resources[this.index];

    // 第二种轮播方式
    // this.container.style.backgroundImage = "url('" + this.resources[this.index] + "')";

    // 第三种轮播方式，可以添加动画效果
    // 动画持续时间一定要低于轮播切换时间，否则会出现交叉更改index的问题
    this.container.firstElementChild.children.hide();
    var timeout = this.timeout * 2 / 3;
    this.container.firstElementChild.children[this.index].show(timeout);
};
