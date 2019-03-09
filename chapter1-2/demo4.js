/*
  Created by IntelliJ IDEA.
  User: icechen1219
  Date: 2019/03/10
  Time: 上午12:21
  To change this template use File | Settings | File Templates.
*/
"use strict";

// 作用域提升示例1
a = 2;
var a;
console.log(a);

// 作用域提升示例2
console.log(b);
var b = 2;

// 作用域提升示例3
foo();

function foo() {
    console.log(c);
    var c = 2;
}

// 作用域提升示例4
// foo2();
var foo2 = function bar() {
    console.log(c);
    var c = 2;
};

// 作用域提升示例5
// 5.1
var d = 1;
var d = 2;
console.log(d);

// 5.2
foo3();

function foo3() {
    console.log(d);
}

function foo3() {
    console.log(d, d);
}

// 5.3
foo4();
var foo4; // 变量跟函数重名时，变量的声明被忽略

function foo4() {
    console.log(1);
}

foo4 = function () {
    console.log(2);
};
foo4();
