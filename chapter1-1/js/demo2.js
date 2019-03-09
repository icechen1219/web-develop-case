/*
  Created by IntelliJ IDEA.
  User: icechen1219
  Date: 2019/03/02
  Time: 下午11:10
  To change this template use File | Settings | File Templates.
*/
"use strict";

// 全局数学函数示例
var text = "some one";
console.log(isNaN(text));
var width = "9.2px";
console.log(isNaN(width));
console.log(parseInt(width));
console.log(parseFloat(width));

// Math内置数学函数对象示例
console.log(Math.floor(10 / 3));
console.log(Math.random());

// 保留小数点后两位数
var num = 10 / 3;
console.log(num);
num = Math.floor(num * 100) / 100;
console.log(num);

// 产生[0-10)之间的随机整数
var r = Math.floor(Math.random() * (10 - 0)) + 0;
console.log(r);

// 产生固定4位数的随机整数[1000-10000）
var r4 = Math.floor(Math.random() * (10000 - 1000)) + 1000;
console.log(r4);