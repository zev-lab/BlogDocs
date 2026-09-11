# ES6 核心特性详解

ECMAScript 6（简称 ES6）是 JavaScript 语言的下一代标准，它引入了大量的新特性，使得 JavaScript 在编写复杂大型应用程序时更加得心应手。本文将详细介绍 ES6 的一些最常用的核心特性。

## 1. 块级作用域的 let 和 const

在 ES6 之前，JavaScript 只有全局作用域和函数作用域，变量提升（Hoisting）经常会导致意想不到的 Bug。ES6 引入了 `let` 和 `const`，提供了块级作用域。

### let 关键字
`let` 声明的变量只在它所在的代码块内有效，不存在变量提升。

```javascript
{
  let a = 10;
  var b = 1;
}
console.log(b); // 1
// console.log(a); // ReferenceError: a is not defined
```

### const 关键字
`const` 声明一个只读的常量。一旦声明，常量的值就不能改变（对于复合类型的数据，其指向的内存地址不可变）。

```javascript
const PI = 3.1415926;
// PI = 3; // TypeError: Assignment to constant variable.

const obj = { name: "Tom" };
obj.name = "Jerry"; // 允许修改对象内部属性
console.log(obj.name); // Jerry
```

## 2. 变量的解构赋值

解构赋值允许按照一定模式，从数组和对象中提取值，对变量进行赋值。

### 数组的解构赋值
```javascript
let [a, b, c] = [1, 2, 3];
console.log(a, b, c); // 1 2 3

// 交换变量值
let x = 10, y = 20;
[x, y] = [y, x];
```

### 对象的解构赋值
对象的解构与数组有一个重要的不同：数组的元素是按次序排列的，而对象的属性没有次序。变量必须与属性同名才能取到正确的值。

```javascript
let { name, age } = { name: "Alice", age: 25 };
console.log(name, age); // Alice 25

// 起别名
let { name: userName, age: userAge } = { name: "Bob", age: 30 };
console.log(userName); // Bob
```

## 3. 模板字符串

模板字符串是增强版的字符串，用反引号（\`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。

```javascript
let name = "张三";
let age = 18;

// 嵌入变量和表达式
let info = `我的名字是${name}，明年我就${age + 1}岁了。`;
console.log(info);

// 多行字符串
let html = `
  <div>
    <span>Hello World</span>
  </div>
`;
```

## 4. 函数的扩展

### 参数默认值
ES6 允许为函数的参数设置默认值。

```javascript
function greet(name = "Guest") {
  console.log(`Hello, ${name}!`);
}
greet(); // Hello, Guest!
greet("Alice"); // Hello, Alice!
```

### rest 参数
引入 rest 参数（形式为 `...变量名`），用于获取函数的多余参数。

```javascript
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}
console.log(sum(1, 2, 3, 4)); // 10
```

### 箭头函数
箭头函数提供了一种更简洁的函数书写方式，并且**不绑定自己的 `this`**，它会捕获其所在上下文的 `this` 值作为自己的 `this` 值。

```javascript
const add = (a, b) => a + b;
console.log(add(2, 3)); // 5

// this 穿透
const person = {
  name: "Jack",
  sayHi() {
    setTimeout(() => {
      console.log(`Hi, I am ${this.name}`);
    }, 100);
  }
};
person.sayHi(); // Hi, I am Jack
```

## 5. 扩展运算符 (Spread Operator)

扩展运算符也是三个点（`...`），好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。

```javascript
// 数组拷贝
let arr1 = [1, 2, 3];
let arr2 = [...arr1]; 

// 合并数组
let combined = [...arr1, 4, 5, 6];

// 对象扩展 (ES9 引入，但常与 ES6 一起使用)
let obj1 = { a: 1, b: 2 };
let obj2 = { ...obj1, c: 3 };
```

## 6. Class 类

ES6 引入了 `class` 关键字，作为对象的模板，提供了更接近传统面向对象语言的写法。本质上是原型的语法糖。

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // 调用父类的 constructor
    this.breed = breed;
  }
  
  speak() {
    console.log(`${this.name} barks.`);
  }
}

const d = new Dog("Mitzie", "Pug");
d.speak(); // Mitzie barks.
```

## 7. Promise 与异步编程

Promise 是异步编程的一种解决方案，比传统的的回调函数更合理、更强大，有效解决了“回调地狱”。

```javascript
const fetchData = new Promise((resolve, reject) => {
  setTimeout(() => {
    let success = true;
    if (success) {
      resolve("Data loaded successfully!");
    } else {
      reject("Error loading data");
    }
  }, 1000);
});

fetchData
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

## 总结

ES6 极大地增强了 JavaScript 的表达能力，现代前端框架（Vue, React 等）几乎全面拥抱了 ES6 语法。熟练掌握上述特性是进阶高级前端工程师的必经之路。