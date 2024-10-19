//這些global的變數是在整個程式當中都可以存取使用的，概念有點像python中的__name__之類的變數，是預先存在的，不需自行定義

// GLOBALS  - NO WINDOW !!!!

// __dirname  - path to current directory
// __filename - file name
// require    - function to use modules (CommonJS)
// module     - info about current module (file)
// process    - info about env where the program is being executed

console.log(__dirname)

//callback function
setInterval(() => {
  console.log('hello world')
}, 1000)
