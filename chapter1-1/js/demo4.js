/*
  Created by IntelliJ IDEA.
  User: icechen1219
  Date: 2019/03/09
  Time: 下午10:59
  To change this template use File | Settings | File Templates.
*/
"use strict";

/*
数组的创建方式
*/
var a1 = [];
var a2 = [9, 5, 2, 7];
var a3 = new Array(8);
console.log(a1);
console.log(a2);
console.log(a3);

// 创建一个长度为10的数组，元素初始化为0
var arr1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
console.log("method 1: ", arr1);
var arr2 = new Array(10);
for (var index = 0; index < arr2.length; index++) {
    arr2[index] = 0;
}
console.log("method 2: ", arr2);
var arr3 = [];
for (var i = 0; i < 10; i++) {
    arr3.push(0);
}
console.log("method 3: ", arr3);

// 向数组尾部追加新元素，并返回新长度
var len = a3.push(18);
console.log('数组新长度：' + len, a3);
// 根据下标索引数组元素
a3[0] = 9;
console.log(a3);

// 数组拼接
var a4 = a2.concat(a3);
console.log(a2, a3, a4);

// 数组按字符串自然排序，非字符串类型自动转换为字符串后进行排序
a4.sort();
console.log('按字母自然升序排列：', a4);

// 自定义排序规则
a4.sort(function (a, b) {
    return a - b;
});
console.log('按数值自然升序排列：', a4);

// 数组的翻转函数
a4.reverse();
console.log('翻转数组顺序后：', a4);

// 数组转字符串，以特定字符分隔
var a4Str = a4.join("/");
console.log(a4Str);
