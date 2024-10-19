// npm (node package manager) 有點像是python的pip，把它當成套件管理器?!

// 在CLI中執行以下指令

// npm --version (看板本)

// local dependency - use it only in this particular project(推薦使用此)
// npm i <packageName>

// 指定packagae版本的方式
// npm i <package_name>@<版本>

// global dependecncy - use it in any project (盡量不要用，可能會出現bug)
// npm install -g <packageName>

// npx(package runner) 類似global的一個東東(若要global的效果，建議使用此)，目前不是很確定是啥
// 是npm5.2之後的一個feature，可以用來運行cli-tool(就是在shell 用的那些指令)，而不需要安裝它

// 解除安裝
// npm uninstall <packageName> //但好像刪不乾淨...最好把package.json當中紀錄的package刪除，node_modules目錄整個刪除，再重新安裝...


// package.json -manifest(顯示、表明) file (store important info about project/package) 用來記錄project用到的相關套件(dependency)
// 1. manual approach ( create package.json in the root, create properties etc)
// 2. npm init (step by step, press enter to skip)
// 3. npm init -y (everything default)
// package.json的詳細內容請參考 https://nodesource.com/blog/the-basics-of-package-json/

 
// npm install 會安裝package.json當中的dependency，所以分享project得時候要記得製造這個檔案，這樣其他使用者才可以快速安裝相依的套件，使用擬開發的Project
// 所以記得不要把node_modules目錄上傳到github(應該說要加入.gitignore檔案，連讓git追蹤都不要)

// 簡單demo一下第三方套件，就是要記得要先安裝才能使用
const _ = require('lodash')
const items = [1, [2, [3, [4]]]]
const newItems = _.flattenDeep(items)
console.log(newItems)

// dev Dependency (僅在開發時使用的package，實際產品運行中用不到)
// npm i <package> -D
// npm i <package> --save-dev

// package.json中的script屬性，如下，可以用來執行指令
// "scripts": {
//     "start": "node app.js",    // 使用 npm start執行，相當於執行node app.js的意思
//     "dev": "nodemon app.js"    // 使用 npm run dev執行(監控模式)
//   },                           // 感覺這些關鍵字是有定義過的(不是自行定義的)
// 但常規的寫法會是"start": "nodemon app.js"
