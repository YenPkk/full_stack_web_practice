// CommonJS, every file is module (by default)
// Modules - Encapsulated Code (only share minimum)
const names = require('./04-names') // require用來引入module export的東西，記住要使用相對路徑的寫法(./)，這邊引進來的是一個object
console.log(names)

const sayHi = require('./05-utils')
const data = require('./06-alternative-flavor')
console.log(data)
require('./07-mind-grenade') //注意: 你import module的時候，實際上會執行、invoke(呼叫) module一遍(就跟python一樣)
                             // 07-mind-grenade module 中有一個addValue的function會被執行，(此檔案中並沒有export東西)
sayHi('susan')
sayHi(names.john)
sayHi(names.peter)
