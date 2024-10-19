// async 的另外一種寫法:Promise 搭配await(並免callback hell)

const { readFile, writeFile } = require('fs').promises  // 此寫法意思與下方等價

// const util = require('util')  
// const readFilePromise = util.promisify(readFile)  //可以使用util中的promisify方法將function 包成Promist的形式
// const writeFilePromise = util.promisify(writeFile)

// async方法搭配await的寫法(最終格式)
// await <Promise物件或任何值> // await就是"等待" 等待Promise回傳的結果(不論是resolve 還是 reject)
const start = async () => {
  try {
    const first = await readFile('./content/first.txt', 'utf8') //await寫法藥用try catch 包
    const second = await readFile('./content/second.txt', 'utf8')
    await writeFile(
      './content/result-mind-grenade.txt',
      `THIS IS AWESOME : ${first} ${second}`,
      { flag: 'a' }
    )
    console.log(first, second)
  } catch (error) {
    console.log(error)
  }
}

start()


// 自行手動包成 Promise
// const getText = (path) => {
//   return new Promise((resolve, reject) => {
//     readFile(path, 'utf8', (err, data) => {
//       if (err) {
//         reject(err)
//       } else {
//         resolve(data)
//       }
//     })
//   })
// }
// getText('./content/first.txt')
//   .then((result) => console.log(result))
//   .catch((err) => console.log(err))
