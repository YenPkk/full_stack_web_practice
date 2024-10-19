// local
const secret = 'SUPER SECRET'
// share
const john = 'john_value'
const peter = 'peter_value'

// 每一個js file都是一個module，這個指令可以看這一個file的相關資料
console.log(module)

//exports 是一個object，是module的一個屬性(module也是一個object)
module.exports = { john, peter } //把這兩個變數用{}包成object，share出去，也就是在其他file(module)中可以用require引入進來
                                 //這樣包的話變數名稱會是key, 對應的值會是value
