# Codeprep JavaScript演習 配列操作編

## createEmptyArray

### 手続き型 解答

```js
function createEmptyArray() {
  return []
}
```

### Mix in 解答

```js
function createEmptyArray() {
    const always = a => _ => a
    return always([])
}
```

### 関数型 解答

```
const always = a => _ => a
const createEmptyArray = always([])

```

## createSeqArray

### 手続き型 解答

```js
function createSeqArray(n) {
  const list = []

  if (n <= 0) return []
  for (let i = 0; i < n; i += 1) {
      list.push(i + 1)
  }
  return list
}
```
### Mix in 解答

```js
function createSeqArray(n) {
  const succ = (a => b => a + b)(1)
  const isPositive = a => a > 0

  return isPositive
    ? Array.from(Array(n).keys(), succ)  
    : []
}
```

### 関数型 解答

```js
const curry2 = f => a => b => f(a, b)
const add = (a, b) => a + b
const lessThen = (a, b) => a < b
const succ = curry2(add)(1)
const isPositive = curry2(lessThen)(0) 
const range = n => [...Array(n).keys()]

const createSeqArray = n => isPositive(n) 
    ? Array.from(range(n), succ) 
    : [] 
```

## findIndexOfStr

### 手続き型 解答

```js
function findIndexOfStr(array, str) {
  const index = -1
  for (let i = 0, len = array.length; i < len; i += 1) {
      if (v.includes(str)) {
          index = i
          break
      }
  }
  return index
}
```
### Mix in 解答

```js
function findIndexOfStr(array, str) {
  const includes =  pattern => v => v.includes(pattern)

  return array.findIndex(includes(str))
}

```

### 関数型 解答

```js
const includes =  pattern => v => v.includes(pattern)
const findIndexOfStr = (array, str) => 
    array.findIndex(includes(str))
```

## filterEven

### 手続き型 解答

```js
function filterEven(array) {
  const ret_array = []
  array.forEach(v => {
    if (v % 2 == 0) {
      ret_array.push(v)
    }    
  })
  return ret_array
}
```

### Mix in 解答

```js
function filterEven(array) {
  const isEven = (a => b => b % a == 0)(2)

  return  filterEven = array => array.filter(isEven)
}

```

### 関数型 解答

```js

const curry2 = f => a => b => f(a, b)
const canDivide = (a, b) => b % a
const isEven = curry2(canDivide)(2)
const filterEven = array => array.filter(isEven)

```

## toDouble

### 手続き型 解答

```js
function toDouble(array) {
  const double_array = []
    
  for (let i = 0, len = array.length; i < len; i += 1) {
    double_array.push(v)
  }
  return double_array
}
```

### Mix in 解答

```js
function toDouble(array) {
  const double = (a => b => a * b)(2)

  return array.map(double)
}
```

### 関数型 解答

```js
const curry2 = f => a => b => f(a, b)
const multi = (a, b) => a * b
const double = curry2(multi)(2)
const toDouble = array.map(double)
```

## sortByLength

### 手続き型 解答

```js
function sortByLength(array) {
  array.sort((a, b) => a.length <= b.length)
  return array
}
```
### Mix in 解答

```js
function sortByLength(array) {
  const comparefun = (a, b) => a.length <= b.length ? 1 : -1
  return array.sort(comparefun)
}
```

### 関数型 解答

```js 
const propLessOrEqual = prop => (a, b) => a[prop] <= b[prop]
const comparator= pred => (a, b) => {
  if (pred(a, b)) return 1
  if (pred(b, a)) return -1
  return 0
}

const sortByLength = array => array.sort(comparator(propLessOrEqual('length')))

```

## max

### 手続き型 解答

```js
function max(array) {
  let _max = array.shift()
  if (_max === undefined) return -1
  array.forEach(v => {
    if (v > _max) {
      _max = v
    }
  })
  return max
}
```
### Mix in 解答

```js
function max(array) {
  return array.length ? Math.max(...array)) : -1
}
```

### 関数型 解答

```js
const partial2 = f => (a, b) => f(a, b)
const max = array => array.length ? array.reduce(partial2(Math.max)) : -1
```

## removeOdd

### 手続き型 解答

```js
function removeOdd(array) {
  const isOdd = v => v % 2 === 1
  while (array.find(isOdd)) { 
    array.splice(array.findIndex(isOdd) , 1)
  }
  return array
}
```

### Mix in 解答

```js
function removeOdd(array) {
  const isEven = (a => b => b % a === 0)(2)
  return array.filter(isEven) 
}
```

### 関数型 解答

```js
const canDivide = a => b => b % a == 0
const isEven = canDivide(2)
const removeOdd = array => array.filter(isEven) 
```

## removeOdd

### 手続き型 解答

```js
function addSumToMiddle(array) {
  const clone = [...array]
  const insertIndex = i => i * 2 + 1
  clone.forEach((v, i) => {
   	array.splice(insertIndex(i), 0, clone[i] + clone[i + 1])
  })
  array.slice(0, -1)

  return array
}
```

### Mix in 解答

```js
function addSumToMiddle(array) {
  return array.flatMap((v, i, a) => [v, v + a[i + 1] || 0])
    .slice(0, -1)
}
```

### 関数型 解答

```js

const add = (a, b) => a + b
const sliceN = n => (a,  i) => a.slice(i, i + n)
const constructFn = (v, i, a) => [v, sliceN(2)(a, i).reduce(add)]
const addSumToMiddle = array => array.flatMap(constructFn).slice(0, -1)

```

## makePrimeArray

### 手続き型1

[エラトステネスの篩](https://ja.wikipedia.org/wiki/%E3%82%A8%E3%83%A9%E3%83%88%E3%82%B9%E3%83%86%E3%83%8D%E3%82%B9%E3%81%AE%E7%AF%A9)

```js
function makePrimeArray(n) {
  const primeList = Array.from(Array(n + 1).keys())
  for (let i = 2; i <= Math.ceil(Math.sqrt(n)); i += 1) {
    for (let j = 2; j * i <= n; j += 1) {
      primeList[i * j] = false
    }
  }

  return prime.slice(2).filter(v => v);
}
```
### 手続き型2

```js
function makePrimeArray(n) {
  const isPrime = n => m => m % n !== 0 || m === n
  let primeList = Array.from(Array(n - 1).keys(), v => v + 2)
  
  for (let i = 2, len = Math.ceil(Math.sqrt(n)); i < len; i += 1) {
    if (primeList.includes(i)) {
      primeList = primeList.filter(isPrime(i))
    }
  }
  return primeList
}
```

### 関数型

```js
const notDividable = n => m => m % n !== 0 
const makeList = n => Array.from(Array(n - 1).keys(), v => v + 2)
const makePrimeArray = n => {
  const primeList = (rest, limit, acc = []) => {
    const prime = acc.push(rest.shift())      
    return prime < limit 
      ? primeList(rest.filter(notDividable(prime)), limit, acc)
      : acc.concat(rest)
  }
  return primeList(makeList(n), Math.ceil(Math.sqrt(n)))
}
```