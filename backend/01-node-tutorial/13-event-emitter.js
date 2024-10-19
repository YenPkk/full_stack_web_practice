// get back the class
// if want custom extend from class
// otherwise just for emitting and handling events create instance
const EventEmitter = require('events') //這是一個class，原來javascript也有物件....(之後可能要去了解下)

const customEmitter = new EventEmitter()

// on and emit(發射) methods
// keep track of the order
// additional arguments
// built-in modules utilize it

// 用on來註冊一個event(並監聽，不確定)，<event_name>, <callback_func>
customEmitter.on('response', (name, id) => {
  console.log(`data recieved user ${name} with id:${id}`)
})

customEmitter.on('response', () => {
  console.log('some other logic here')
})

// emit(<要emit的event>) 會執行event的callback_func
customEmitter.emit('response', 'john', 34) // 之後填入的參數可以塞到callback_func當中
