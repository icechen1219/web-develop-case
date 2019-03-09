/*
  Created by IntelliJ IDEA.
  User: icechen1219
  Date: 2019/03/02
  Time: 下午11:06
  To change this template use File | Settings | File Templates.
*/
"use strict";

/**
 * 创建一个nxm的二维数组，并全部填充为0
 * @param n{number}
 * @param m{number}
 * @returns {any[]}
 */
var initTwoDimArray = function (n, m) {
    var arr = [];
    for (var i = 0; i < n; i++) {
        var tmp = [];
        for (var j = 0; j < m; j++) {
            tmp.push(0);
        }
        arr.push(tmp);
    }
    return arr;
};

console.table(initTwoDimArray(4, 4));

/**
 * 格式化数值，保留指定精度
 * @param num {number} 待格式化数值
 * @param precision {number} 精度，整数
 * @returns {number}
 */
var numberFormat = function (num, precision) {
    // 默认保留两位小数
    if (precision === undefined) {
        precision = 2;
    }
    var pow = Math.pow(10, parseInt(precision));
    var result = Math.floor(num * pow) / pow;
    return result;
};
console.log(numberFormat(10 / 3, 5));


