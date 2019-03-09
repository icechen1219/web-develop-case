/*
  Created by IntelliJ IDEA.
  User: icechen1219
  Date: 2019/03/09
  Time: 下午11:23
  To change this template use File | Settings | File Templates.
*/
"use strict";

var obj = new Array(10);

/**
 * 表单重置函数
 */
function reset() {
    // TODO: 做一些表单恢复操作
}

// reset();

/**
 * 销毁函数
 */
function destroy() {
    // TODO: 清除一些全局对象
    obj = null;
}

// destroy();

/**
 * 对给定数组，进行升序排序
 * @param arr {Array}
 */
function ascSort(arr) {
    if (arr instanceof Array) {
        arr.sort(function (a, b) {
            return a - b;
        });
    } else {
        throw arr + " is not an Array!";
    }

}

/**
 * 对给定数组，进行降序排序
 * @param arr {Array}
 */
function descSort(arr) {
    if (arr instanceof Array) {
        arr.sort(function (a, b) {
            return b - a;
        });
    } else {
        throw arr + " is not an Array!";
    }
}

var abc = [9, 5, 2, 7, 1, 12, 22];
console.log("原数组：", abc);
console.log("按字母排序：", abc.sort());
ascSort(abc);
console.log("升序后：", abc);
descSort(abc);
console.log("降序后：", abc);

/**
 * 产生0-n区间的随机整数
 * @param n {number}
 * @returns {number}
 */
function randInt(n) {
    return Math.floor(Math.random() * n);
}

for (var i = 0; i < 5; i++) {
    var r = randInt(8);
    console.log(r);
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

for (var i = 0; i < 5; i++) {
    console.log(randRange(10, 20));
}

/**
 * 产生固定4位整数的随机数
 * @returns {number}
 */
function rand4Bit() {
    return randRange(1000, 10000);
}

for (var i = 0; i < 5; i++) {
    console.log(rand4Bit());
}

/**
 * 首字母大写
 * @param str {string}
 * @returns {string}
 */
function upperFirstChar(str) {
    var part1 = str.charAt(0); // str.substr(0, 1);
    var part2 = str.substr(1);
    return part1.toUpperCase() + part2;
}

/**
 * 首字母小写
 * @param str {string}
 * @returns {string}
 */
function lowerFirstChar(str) {
    var part1 = str.charAt(0); // str.substr(0, 1);
    var part2 = str.substr(1);
    return part1.toLowerCase() + part2;
}

var str = "i love javascript";
console.log("首字母大写：", upperFirstChar(str));
console.log("首字母小写：", lowerFirstChar(str));

/**
 * 下划线转驼峰
 * @param str {string}
 * @returns {string}
 */
function underlineToCamer(str) {
    var pos;
    while ((pos = str.indexOf("_")) !== -1) {
        var part1 = str.slice(0, pos);
        var part2 = str.charAt(pos + 1);
        var part3 = str.substring(pos + 2);
        str = part1 + part2.toUpperCase() + part3;
    }
    return str;
}

console.log(underlineToCamer("user_name_and_password"));

