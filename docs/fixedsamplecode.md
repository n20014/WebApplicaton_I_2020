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
    "@babel/cli": "^7.12.8",
    "@babel/core": "^7.12.9",
    "@babel/preset-env": "^7.12.7",
    "@babel/preset-react": "^7.12.7",
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
$ npm install -D eslint eslint-loader eslint-plugin-react
$ npm install -D css-loader style-loader babel-loader
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

## p32

### .babelrc

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

### .eslintrc.json



```json
{
  "env": { // ESLintが使用される環境の設定
    "browser": true,     // JSをブラウザで動かす
    "es2021": true      // ES&を使う
  },
  "parserOptions": { // パーサーの設定
    "sourceType": "module", // 
    "ecmaFeatures": {
        "jsx": true
    }
  },
  "plugins": ["react"], // React用のプラグインを使う
  "extends": ["eslint:recommended", "plugin:react/recommended"], // ルールのデフォルトを設定(ESlintのお勧めを設定している)
  "rules": {
    "no-console": "off" // console.logを使えるようにする
  }
}
```

### webpack.config

```js
module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "production",

  // メインとなるJavaScriptファイル（エントリーポイント）
  // src ディレクトリを作成
  entry: "./src/index.js",
  // dist ディレクトリ作成
  output: {
    //  出力ファイルのディレクトリ名
    path: `${__dirname}/dist`,
    // 出力ファイル名
    filename: 'main.js'
  },
  devserver: {
    contentBase: `${__dirname}/dist`,
    open: true
  }
  module: {
    rules: [
      {
        // 拡張子 .jsx?$ の場合 (css-loader, stype-loader 適用)
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "eslint-loader"
        }
      },
      {
        // 拡張子 .css の場合 (css-loader, stype-loader 適用)
        test: /\.css$/,
        use: [
          {
            loader: ["css-loader", "style-loader"]
          }
        ]
      },  
      {
        // 拡張子 .js の場合 (babel-loader 適用)
        test: /\.(js|jsx)$/,
        // ローダーの処理対象から外すディレクトリ
        exclude: /node_modules/,
        use: [
          {
            // Babel を利用する
            loader: "babel-loader",
            // Babel のオプションを指定する
            options: {
              presets: [
                // プリセットを指定することで、ES2020 を ES5 に変換
                "@babel/preset-env",
              ],
            },
          },
        ],
      },
    ],
  },
}
```


## Referance

- [最新版で学ぶwebpack 5入門 JavaScriptのモジュールバンドラ](https://ics.media/entry/12140/)