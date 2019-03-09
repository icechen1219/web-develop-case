/*
  Created by IntelliJ IDEA.
  User: icechen1219
  Date: 2019/03/02
  Time: 下午7:07
  To change this template use File | Settings | File Templates.
*/
"use strict";

// 日志输出示例
console.log("text info");
console.debug("debug info"); /* debug级别的日志默认不在浏览器控制台输出*/
console.info("normal info");
console.warn("warning info");
console.error("error info");
console.trace("函数调用堆栈信息");

// 计时函数示例
console.time("循环时间");
for (var i = 0; i < 5; i++) {
    // 记次函数示例
    console.count("循环次数");
}
console.timeEnd("循环时间");

// 二维数组示例
var matrix = [
    [2, 3, 5, 4, 7],
    [2, 3, 5, 4, 7],
    [2, 3, 5, 4, 7]
];

// 遍历二维数组，按行输出
for (var index in matrix) {
    console.log(index, matrix[index]);
}
// 表格输出函数，针对数组和对象的更直观调试工具
console.table(matrix);

// 用表格函数输出对象的所有属性
var js = {
    name: 'JavaScript',
    status: 'active',
    sex: 'male',
    age: 24
};

console.table(js);