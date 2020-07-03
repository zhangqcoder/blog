---
title: JavaScript编码能力
date: 2019-11-05 21:10:00
tags:
  - JavaScript
---

## 1.多种方式实现数组去重、扁平化、对比优缺点

### 数组去重

```js
// 普通数组去重
function dedupe(arr) {
  let rets = []
  for (let i = 0; i < arr.length; i++) {
    if (!rets.includes(arr[i])) rets.push(arr[i])
  }
  return rets
}

function dedupe(arr) {
  let rets = []
  arr &&
    arr.forEach(function(item) {
      if (!rets.includes(item)) rets.push(item)
    })
  return rets
}

function dedupe(array) {
  return [...new Set(array)]
}

// 对象数组去重 key为独立唯一标识
function unique(arr, key) {
  const hash = {}
  const res = []
  for (let i = 0; i < arr.length; i++) {
    if (!hash[arr[i][key]]) {
      res.push(arr[i])
      hash[arr[i][key]] = true
    }
  }
  return res
}

const unique = (arr, key) => {
  let hash = {}
  return arr.reduce((accumulator, currentValue) => {
    hash[currentValue[key]]
      ? ''
      : (hash[currentValue[key]] = true && accumulator.push(currentValue))
    return accumulator
  }, [])
}
```

### 扁平化

```js
function flatten(arr) {
  let rets = []
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      rets = rets.concat(flatten(arr[i]))
    } else {
      rets.push(arr[i])
    }
  }
  return rets
}

function flatten(arr) {
  let rets = []
  arr &&
    arr.forEach((item) => {
      if (Array.isArray(item)) {
        rets = rets.concat(flatten(item))
      } else {
        rets.push(item)
      }
    })
  return rets
}

const flatten = (arr) =>
  arr.reduce(
    (accumulator, currentValue) =>
      accumulator.concat(
        Array.isArray(currentValue) ? flatten(currentValue) : currentValue
      ),
    []
  )
```

## 2.多种方式实现深拷贝、对比优缺点

```js
// 乞丐版
function deepCopy(obj) {
  return JSON.parse(JSON.stringgify(obj))
}

// 面试够用版
function deepCopy(obj) {
  let result = obj.constructor === Array ? [] : {}
  for (let i in obj) {
    result[i] = typeof obj[i] === 'object' ? deepCopy(obj[i]) : obj[i]
  }
  return result
}
```

## 3.手写函数柯里化工具函数、并理解其应用场景和优势

理解柯里化：用闭包把参数保存起来，当参数的数量足够执行函数了，就开始执行函数。

```js
// ES6骚写法
const curry = (fn, arr = []) => (...args) =>
  ((arg) => (args.length === fn.length ? fn(...args) : curry(fn, arg)))([
    ...arr,
    ...args,
  ])
```

## 4.手写防抖和节流工具函数、并理解其内部原理和应用场景

```js
/**
 * description: 防抖
 * param {Function} fn - 定时器每次执行调用的函数
 * param {Number} [delay = 300] - 定时器执行时间间隔
 * author: Q zhang
 * 
 */
export const debounce = (fn, delay) => {
  let timer = null
  return function() {
    let args = arguments
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

/**
 * description: 节流
 * param {Function} fn - 定时器每次执行调用的函数
 * param {Number} [delay = 500] - 定时器执行时间间隔
 * author: Q zhang
 * 
 */
export const throttle = (fn, delay = 500) => {
  let flag = true
  return function() {
    let args = arguments
    if (!flag) return
    flag = false
    setTimeout(() => {
      fn.apply(this, args)
      flag = true
    }, delay)
  }
}
```

## 5.实现一个 sleep 函数

### Promise 版本

```js
function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

const t1 = +new Date()
sleep(3000).then(() => {
  const t2 = +new Date()
  console.log('t2 - t1:' + (t2 - t1))
})
```

优点：这种方式实际上是用了 setTimeout，没有形成进程阻塞，不会造成性能和负载问题。

缺点：虽然不像 callback 套那么多层，但仍不怎么美观，而且当我们需要在某过程中需要停止执行（或者在中途返回了错误的值），还必须得层层判断后跳出，非常麻烦，而且这种异步并不是那么彻底，还是看起来别扭

### Async/Await 版本

```js
function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

;(async function() {
  console.log('Do some thing, ' + new Date())
  await sleep(3000)
  console.log('Do other things, ' + new Date())
})()
```

缺点： ES7 语法存在兼容性问题，有 babel 一切兼容性都不是问题
