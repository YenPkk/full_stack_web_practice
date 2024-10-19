// module export的另外一種寫法，這種寫法export出去的就是object型態
//export本來就是一個object，這樣的寫法就是用key, value的形式去使用

module.exports.items = ['item1', 'item2']

const person = {
  name: 'bob',
}

module.exports.singlePerson = person


// 以上寫法等同於
// const items = ['item1', 'item2']
// const person = {
//   name: 'bob',
// }
// module.exports = {items, person}