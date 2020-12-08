# JavaScript 外部入力テンプレート

## オススメ

```js
(stdin => {
  // Define Function

  // Declare Variable
  const inputs  = stdin.toString().trim().split('\n')

  // Main Procedure
  const result = ((lines) => {

    return lines

  })(inputs)
  
  // Display
  console.log(result);

})(require('fs').readFileSync('/dev/stdin', 'utf8'))
```

## [Paiza 標準入力サンプル問題セット](https://paiza.jp/works/mondai/stdin/problem_index?language_uid=javascript)

### 1つのデータの入力, 1行のデータの入力

```js

(stdin => {
  const inputs  = stdin.toString().trim().split('\n')
  const line = inputs[0]
  // Display
  console.log(line)

})(require('fs').readFileSync('/dev/stdin', 'utf8'))

```

### 3行のデータの入力

```js

(stdin => {
  const inputs  = stdin.toString().trim().split('\n')
  const lines = inputs.slice(0, 3)
  // Display
  console.log(lines.join('\n'))

})(require('fs').readFileSync('/dev/stdin', 'utf8'))

```

### n行のデータの入力

```js

(stdin => {
  const inputs  = stdin.toString().trim().split('\n')
  const n = parseInt(inputs[0], 10)
  const lines = inputs.slice(1, n + 1)
  // Display
  console.log(lines.join('\n'))

})(require('fs').readFileSync('/dev/stdin', 'utf8'))


```

### n個のデータの入力

```js

(stdin => {
  const inputs  = stdin.toString().trim().split('\n')
  const n = parseInt(inputs[0], 10)
  const words = inputs[1].split(' ').slice(0, n)
  // Display
  console.log(words.join('\n'))

})(require('fs').readFileSync('/dev/stdin', 'utf8'))

```

### カンマ区切りの3つのデータの入力 

```js

(stdin => {
  const inputs  = stdin.toString().trim().split('\n')
  const words = inputs[0].split(',').slice(0, 3)
  // Display
  console.log(words.join('\n'))

})(require('fs').readFileSync('/dev/stdin', 'utf8'))

```

### カンマ区切りのN個のデータの入力 

```js

(stdin => {
  const inputs  = stdin.toString().trim().split('\n')
  const n = parseInt(inputs[0], 10)
  const words = inputs[1].split(',').slice(0, n)
  // Display
  console.log(words.join('\n'))

})(require('fs').readFileSync('/dev/stdin', 'utf8'))

```
