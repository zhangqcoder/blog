---
title: 语法和API
date: 2019-09-22 17:46:00
tags:
  - JavaScript
---

## 一、理解 ECMAScript 和 JavaScript 的关系

一个常见的问题是，ECMAScript 和 JavaScript 到底是什么关系？

要讲清楚这个问题，需要回顾历史。1996 年 11 月，JavaScript 的创造者 Netscape 公司，决定将 JavaScript 提交给标准化组织 ECMA，希望这种语言能够成为国际标准。次年，ECMA 发布 262 号标准文件（ECMA-262）的第一版，规定了浏览器脚本语言的标准，并将这种语言称为 ECMAScript，这个版本就是 1.0 版。

该标准从一开始就是针对 JavaScript 语言制定的，但是之所以不叫 JavaScript，有两个原因。一是商标，Java 是 Sun 公司的商标，根据授权协议，只有 Netscape 公司可以合法地使用 JavaScript 这个名字，且 JavaScript 本身也已经被 Netscape 公司注册为商标。二是想体现这门语言的制定者是 ECMA，不是 Netscape，这样有利于保证这门语言的开放性和中立性。

因此，ECMAScript 和 JavaScript 的关系是，前者是后者的规格，后者是前者的一种实现（另外的 ECMAScript 方言还有 JScript 和 ActionScript）。日常场合，这两个词是可以互换的。

## 二、熟练运用 es5、es6 提供的语法规范

[JavaScript 教程](https://wangdoc.com/javascript/)

[ECMAScript 6 入门](http://es6.ruanyifeng.com/)

## 三、熟练掌握 JavaScript 提供的全局对象（例如 Date、Math）、全局函数（例如 decodeURI、isNaN）、全局属性（例如 Infinity、undefined）

## 四、熟练应用 map、reduce、filter 等高阶函数解决问题

## 五、setInterval 需要注意的点，使用 settimeout 实现 setInterval

### setInterval 需要注意的点

在使用 setInterval 方法时，每一次启动都需要对 setInterval 方法返回的值做一个判断，判断是否是空值，若不是空值，则要停止定时器并将值设为空，再重新启动，如果不进行判断并赋值，有可能会造成计时器循环调用，在同等的时间内同时执行调用的代码，并会随着代码的运行时间增加而增加，导致功能无法实现，甚至占用过多资源而卡死奔溃。因此在每一次使用 setInterval 方法时，都需要进行一次判断。

```js
let timer = setInterval(func, 1000)
// 在其他地方再次用到setInterval(func, 1000)
if (timer !== null) {
  clearInterval(timer)
  timer = null
}
timer = setInterval(func, 1000)
```

### 使用 settimeout 实现 setInterval

```js
setIntervalFunc = () => {
  console.log(1) //使用递归
  setTimeout(setIntervalFunc, 1000)
}
setInterval()
```

## 六、JavaScript 提供的正则表达式 API、可以使用正则表达式（邮箱校验、URL 解析、去重等）解决常见问题

[RegExp 对象](https://wangdoc.com/javascript/stdlib/regexp.html)

## 七、JavaScript 异常处理的方式，统一的异常处理方案

当 JavaScript 引擎执行 JavaScript 代码时，有可能会发生各种异常，例如是语法异常，语言中缺少的功能，由于来自服务器或用户的异常输出而导致的异常。

而 Javascript 引擎是单线程的，因此一旦遇到异常，Javascript 引擎通常会停止执行，阻塞后续代码并抛出一个异常信息，因此对于可预见的异常，我们应该捕捉并正确展示给用户或开发者。

### Error 对象

throw 和 Promise.reject() 可以抛出字符串类型的异常，而且可以抛出一个 Error 对象类型的异常。

一个 Error 对象类型的异常不仅包含一个异常信息，同时也包含一个追溯栈这样你就可以很容易通过追溯栈找到代码出错的行数了。

所以推荐抛出 Error 对象类型的异常，而不是字符串类型的异常。

创建自己的异常构造函数

```js
function MyError(message) {
  var instance = new Error(message)
  instance.name = 'MyError'
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this))
  return instance
}

MyError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: MyError,
    enumerable: false,
    writable: true,
    configurable: true
  }
})

if (Object.setPrototypeOf) {
  Object.setPrototypeOf(MyError, Error)
} else {
  MyError.__proto__ = Error
}

export default MyError
```

在代码中抛出自定义的异常类型并捕捉

```js
try {
  throw new MyError('some message')
} catch (e) {
  console.log(e.name + ':' + e.message)
}
```

### Throw

```js
throw expression
```

throw 语句用来抛出一个用户自定义的异常。当前函数的执行将被停止（throw 之后的语句将不会执行），并且控制将被传递到调用堆栈中的第一个 catch 块。如果调用者函数中没有 catch 块，程序将会终止。

```js
try {
  console.log('before throw error')
  throw new Error('throw error')
  console.log('after throw error')
} catch (err) {
  console.log(err.message)
}

// before throw error
// throw error
```

### Try / Catch

```js
try {
try_statements
}
[catch (exception) {
catch_statements
}][finally {
  finally_statements
}]
```

try/catch 主要用于捕捉异常。try/catch 语句包含了一个 try 块, 和至少有一个 catch 块或者一个 finally 块，下面是三种形式的 try 声明:

- try...catch
- try...finally
- try...catch...finally

try 块中放入可能会产生异常的语句或函数

catch 块中包含要执行的语句，当 try 块中抛出异常时，catch 块会捕捉到这个异常信息，并执行 catch 块中的代码，如果在 try 块中没有异常抛出，这 catch 块将会跳过。

finally 块在 try 块和 catch 块之后执行。无论是否有异常抛出或着是否被捕获它总是执行。当在 finally 块中抛出异常信息时会覆盖掉 try 块中的异常信息。

```js
try {
  try {
    throw new Error('can not find it1')
  } finally {
    throw new Error('can not find it2')
  }
} catch (err) {
  console.log(err.message)
}

// can not find it2
```

如果从 finally 块中返回一个值，那么这个值将会成为整个 try-catch-finally 的返回值，无论是否有 return 语句在 try 和 catch 中。这包括在 catch 块里抛出的异常。

```js
function test() {
  try {
    throw new Error('can not find it1')
    return 1
  } catch (err) {
    throw new Error('can not find it2')
    return 2
  } finally {
    return 3
  }
}

console.log(test()) // 3
```

Try / Catch 性能

有一个大家众所周知的反优化模式就是使用 try/catch。

在 V8（其他 JS 引擎也可能出现相同情况）函数中使用了 try/catch 语句不能够被 V8 编译器优化。

### window.onerror

通过在 window.onerror 上定义一个事件监听函数，程序中其他代码产生的未被捕获的异常往往就会被 window.onerror 上面注册的监听函数捕获到。并且同时捕获到一些关于异常的信息。

```js
window.onerror = function(message, source, lineno, colno, error) {}
```

- message：异常信息（字符串）
- source：发生异常的脚本 URL（字符串）
- lineno：发生异常的行号（数字）
- colno：发生异常的列号（数字）
- error：Error 对象（对象）

注意：Safari 和 IE10 还不支持在 window.onerror 的回调函数中使用第五个参数，也就是一个 Error 对象并带有一个追溯栈

try/catch 不能够捕获异步代码中的异常，但是其将会把异常抛向全局然后 window.onerror 可以将其捕获。

```js
try {
  setTimeout(() => {
    throw new Error('some message')
  }, 0)
} catch (err) {
  console.log(err)
}
// Uncaught Error: some message
```

```js
window.onerror = (msg, url, line, col, err) => {
  console.log(err)
}
setTimeout(() => {
  throw new Error('some message')
}, 0)
// Error: some message
```

在 Chrome 中，window.onerror 能够检测到从别的域引用的 script 文件中的异常，并且将这些异常标记为 Script error。如果你不想处理这些从别的域引入的 script 文件，那么可以在程序中通过 Script error 标记将其过滤掉。然而，在 Firefox、Safari 或者 IE11 中，并不会引入跨域的 JS 异常，即使在 Chrome 中，如果使用 try/catch 将这些讨厌的代码包围，那么 Chrome 也不会再检测到这些跨域异常。

在 Chrome 中，如果你想通过 window.onerror 来获取到完整的跨域异常信息，那么这些跨域资源必须提供合适的跨域头信息。

### Promise 中的异常

- Promise 中抛出异常

  ```js
  new Promise((resolve, reject) => {
    reject()
  })
  Promise.resolve().then((resolve, reject) => {
    reject()
  })
  Promise.reject()
  throw expression
  ```

- Promise 中捕捉异常

  ```js
  promiseObj.then(undefined, err => {
    catch_statements
  })
  promiseObj.catch(exception => {
    catch_statements
  })
  ```

  在 JavaScript 函数中，只有 return / yield / throw 会中断函数的执行，其他的都无法阻止其运行到结束的。

  在 resolve / reject 之前加上 return 能阻止往下继续运行。

  without return：

  ```js
  Promise.resolve()
    .then(() => {
      console.log('before excute reject')
      reject(new Error('throw error'))
      console.log('after excute reject')
    })
    .catch(err => {
      console.log(err.message)
    })

  // before excute reject
  // throw error
  // after excute reject
  ```

  use return：

  ```js
  Promise.resolve()
    .then(() => {
      console.log('before excute reject')
      return reject(new Error('throw error'))
      console.log('after excute reject')
    })
    .catch(err => {
      console.log(err.message)
    })

  // before excute reject
  // throw error
  ```

- Throw or Reject

  无论是 try/catch 还是 promise 都能捕获到的是“同步”异常

  reject 是回调，而 throw 只是一个同步的语句，如果在另一个异步的上下文中抛出，在当前上下文中是无法捕获到的。

  因此在 Promise 中使用 reject 抛出异常。否则 catch 有可能会捕捉不到。

  ```js
  Promise.resolve()
    .then(() => {
      setTimeout(() => {
        throw new Error('throw error')
      }, 0)
    })
    .catch(err => {
      console.log(err)
    })

  // Uncaught Error: throw error
  ```

  ```js
  Promise.resolve()
    .then(() => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('throw error'))
        }, 0)
      })
    })
    .catch(err => {
      console.log(err)
    })

  // Error: throw error
  ```

### window.onunhandledrejection

window.onunhandledrejection 与 window.onerror 类似，在一个 JavaScript Promise 被 reject 但是没有 catch 来捕捉这个 reject 时触发。并且同时捕获到一些关于异常的信息。

```js
window.onunhandledrejection = event => {
  console.log(event.reason)
}
```

event 事件是 PromiseRejectionEvent 的实例，它有两个属性：

- event.promise：被 rejected 的 JavaScript Promise
- event.reason：一个值或 Object 表明为什么 promise 被 rejected，是 Promise.reject() 中的内容。

### window.rejectionhandled

因为 Promise 可以延后调用 catch 方法，若在抛出 reject 时未调用 catch 进行捕捉，但稍后再次调用 catch，此时会触发 rejectionhandled 事件。

```js
window.onrejectionhandled = event => {
  console.log('rejection handled')
}

let p = Promise.reject(new Error('throw error'))

setTimeout(() => {
  p.catch(e => {
    console.log(e)
  })
}, 1000)

// Uncaught (in promise) Error: throw error
// 1 秒后输出
// Error: throw error
// rejection handled
```

### 统一异常处理

代码中抛出的异常，一种是要展示给用户，一种是展示给开发者。

对于展示给用户的异常，一般使用 alert 或 toast 展示；对于展示给开发者的异常，一般输出到控制台。

在一个函数或一个代码块中可以把抛出的异常统一捕捉起来，按照不同的异常类型以不同的方式展示，对于。

需要点击确认的异常类型：

ensureError.js

```js
function EnsureError(message = 'Default Message') {
  this.name = 'EnsureError'
  this.message = message
  this.stack = new Error().stack
}
EnsureError.prototype = Object.create(Error.prototype)
EnsureError.prototype.constructor = EnsureError

export default EnsureError
```

弹窗提示的异常类型：

toastError.js

```js
function ToastError(message = 'Default Message') {
  this.name = 'ToastError'
  this.message = message
  this.stack = new Error().stack
}
ToastError.prototype = Object.create(Error.prototype)
ToastError.prototype.constructor = ToastError

export default ToastError
```

提示开发者的异常类型：

devError.js

```js
function DevError(message = 'Default Message') {
  this.name = 'ToastError'
  this.message = message
  this.stack = new Error().stack
}
DevError.prototype = Object.create(Error.prototype)
DevError.prototype.constructor = DevError

export default DevError
```

异常处理器：

抛出普通异常时，可以带上 stackoverflow 上问题的列表，方便开发者查找原因。

errorHandler.js

```js
import EnsureError from './ensureError.js'
import ToastError from './toastError.js'
import DevError from './devError.js'
import EnsurePopup from './ensurePopup.js'
import ToastPopup from './toastPopup.js'

function errorHandler(err) {
  if (err instanceof EnsureError) {
    EnsurePopup(err.message)
  } else if (err instanceof ToastError) {
    ToastPopup(err.message)
  } else if (err instanceof DevError) {
    DevError(err.message)
  } else {
    error.message += `https://stackoverflow.com/questions?q=${encodeURI(
      error.message
    )}`
    console.error(err.message)
  }
}

window.onerror = (msg, url, line, col, err) => {
  errorHandler(err)
}

window.onunhandledrejection = event => {
  errorHandler(event.reason)
}

export default errorHandler
```
