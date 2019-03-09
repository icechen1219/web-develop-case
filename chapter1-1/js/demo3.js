/*
  Created by IntelliJ IDEA.
  User: icechen1219
  Date: 2019/03/09
  Time: 下午10:48
  To change this template use File | Settings | File Templates.
*/
"use strict";

/*
将给定的字符串首字母大写
 */
var str = "i love javascript";
console.log(str);
var str2 = str.toUpperCase();
console.log(str); // 不改变原始变量
console.log(str2); // 通过副本返回新字符串
var part1 = str.charAt(0); // str.substr(0, 1);
var part2 = str.substr(1);
var result = part1.toUpperCase() + part2;
console.log(result);

/*
下划线转驼峰示例
 */
var str = "user_name"; // 下划线分隔
// var str2 = "userName"; // 驼峰式
var pos = str.indexOf("_"); // 4
var part1 = str.slice(0, pos); // "user";
var part2 = str.charAt(pos + 1); // "n";
var part3 = str.substring(pos + 2); //"ame";
var result = part1 + part2.toUpperCase() + part3;
console.log(result);