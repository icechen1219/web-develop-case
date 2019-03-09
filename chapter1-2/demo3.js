/*
  Created by IntelliJ IDEA.
  User: icechen1219
  Date: 2019/03/10
  Time: 上午12:17
  To change this template use File | Settings | File Templates.
*/
"use strict";

// 认识作用域课堂示例
var a = 123;

function foo(a) {
    var b = a * 2;

    function bar(c) {
        console.log(a, b, c);
    }

    bar(b * 3);
}

foo(2);
console.log(a);

// 具名函数表达式的作用域演示
var tests = function loop(a) {
    console.log(a);
    if (--a > 0) {
        loop(a);
    }
};
tests(5);
loop(2); // loop的作用域被封装在其函数体内，故在全局作用域无法访问
