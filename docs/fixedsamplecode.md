# 作りながら学ぶReact入門 修正コード

## [サポートページ](https://github.com/yuumi3/react_book)


## p30 必要なnpmパッケージ

### package.config(dependencies)

```json
"dependencies": {
  "npm": "^6.14.9",
  "react": "^17.0.1",
  "react-dom": "^17.0.1"
},
"devDependencies": {
  "@babel/cli": "^7.12.10",
  "@babel/core": "^7.12.10",
  "@babel/preset-env": "^7.12.10",
  "@babel/preset-react": "^7.12.10",
  "babel-eslint": "^10.1.0",
  "babel-loader": "^8.2.2",
  "css-loader": "^5.0.1",
  "eslint": "^7.15.0",
  "eslint-loader": "^4.0.2",
  "eslint-plugin-react": "^7.21.5",
  "style-loader": "^2.0.0",
  "webpack": "^5.10.0",
  "webpack-cli": "^4.2.0",
  "webpack-dev-server": "^3.11.0"
}

```
### install

```sh 
$ mkdir -p ~/projects/project1 && cd $_
$ mkdir -p public src dist test/{src,dist}
$ git init
$ npm init 
$ npm install react react-dom
$ npm install -D webpack webpack-cli webpack-dev-server
$ npm install -D @babel/core @babel/cli @babel/preset-env @babel/preset-react
$ npm install -D eslint eslint-plugin-react@latest
$ npm install -D babel-loader babel-eslint eslint-loader css-loader style-loader 
```

### 各モジュールの使い方

#### babel

##### testfile(testBabel.js)

~/projects/project1/test/src/testBabel.js

```js
const add = (a, b) => a + b
export default add
```
##### execute

```sh
$ cd ~/projects/project1/
$ alias babel="node ./node_modules/@babel/cli/bin/babel.js"
$ babel ./test/src/testBabel.js --presets=@babel/env
```

#### eslint

##### testfile(testEslint.js)

```js
// ~/projects/project1/test/src/testEslint.js

a = 1 // a is not defined 
const b = 2 // b is assign ... but never used

```

##### execute

```sh

$ cd ~/projects/project1/
$ alias eslint="node ./node_modules/eslint/bin/eslint.js"
$ eslint --init
$ eslint ./test/src/testEslint.js

```
##### eslint --init

- To check syntax and find problems
- JavaScript modules (import/export)
- React
- Use TypeScript => No
- Code Run => all
- config file => JSON
- install them now with npm?  => Yes

#### webpack

##### testfile(testWebpack.js)

~/projects/project1/test/src/testWebpack.js

```js
import add from './testBabel'
console.log(add(2, 3))
```

##### execute

```sh

$ cd ***projectdir***/
$ alias webpack="node ./node_modules/webpack-cli/bin/cli.js"
$ webpack ./test/src/testWebpack.js -o ./test/dist/
$ node ./test/dist/main.js

```

## p32 - p35

### .babelrc

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

### .eslintrc.json

```json
{
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
	    "no-console": "off"
    },
    "settings" : {
      "react": {
        "version" : "detect"
        }
    }
}

```

### package.json

```js
{
    "name": "hello_react",
    "version": "1.0.0",
    "description": "hello react",
    "main": "index.js",
    "scripts": {
        "start": "webpack serve",
        "webpack": "webpack"
    },
    "keywords": [],
    "author": "Omas Naohiko",
    "license": "ISC",
    "dependencies": {
        "react": "^17.0.1",
        "react-dom": "^17.0.1"
    },
    "devDependencies": {
        "@babel/cli": "^7.12.10",
        "@babel/core": "^7.12.10",
        "@babel/preset-env": "^7.12.10",
        "@babel/preset-react": "^7.12.10",
        "babel-eslint": "^10.1.0",
        "babel-loader": "^8.2.2",
        "css-loader": "^5.0.1",
        "eslint": "^7.15.0",
        "eslint-loader": "^4.0.2",
        "eslint-plugin-react": "^7.21.5",
        "style-loader": "^2.0.0",
        "webpack": "^5.10.0",
        "webpack-cli": "^4.2.0",
        "webpack-dev-server": "^3.11.0"
    }
}
```

### webpack.config

```js
const path = require('path')
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    filename: 'main.js'
  },
  devServer: {
    host: '10.0.2.15',
    contentBase: path.resolve(__dirname, 'public'),
    port: 3000,
    publicPath: '/dist/'
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}
```



### public/index.html

```html
<!DOCTYPE html>
<meta charset="utf-8">
<title>React App</title>

<div id="root"></div>
<script src="./dist/main.js"></script>
```

### src/index.js

```js
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
  <h1>Hello, world!</h1>
  , document.getElementById('root')
)
```

## Referance  

- [最新版で学ぶwebpack 5入門 JavaScriptのモジュールバンドラ](https://ics.media/entry/12140/)