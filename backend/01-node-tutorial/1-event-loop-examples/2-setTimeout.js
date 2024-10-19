// started operating system process
console.log('first')
setTimeout(() => {       // setTimeout()是一個async function，這代表它會offloaded(先卸載)，待所以其他的immediate code執行完畢，才會去呼叫callback function(也就是callback function 會最後執行(這邊目前不是很確定，但至少依我講者的敘述是這樣的))
  console.log('second')  // 基本上async function 都會搭配一個callback function
}, 0)
console.log('third')
// completed and exited operating system process
