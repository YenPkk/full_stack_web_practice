const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom_error')

// 只要是被express方法當作參數使用的函數，基本上都會有(req, res, next)三個參數可以使用，換句話說就是express的方法會給這三個參數值

const getALLTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({}) // find()要給filter條件，若為空的{}則代表全部
    res.status(200).json({tasks}) // es6 shorthand: if the property is exactly the same as the varibale for the value while we can omit the second part
})

const createTask = asyncWrapper(async (req, res) => {  // 這邊要用async因為要等待資料 寫入db，並回傳寫入的資料()

        const task = await Task.create(req.body)
        res.status(201).json({task})  
})

const getTasks = asyncWrapper(async (req, res, next) => {

        const {id:taskID} = req.params // 這樣的寫法應該是，taskID這個變數去接req.params的值，然後整個object: id 是key, taskID是value
        const task = await Task.findOne({_id:taskID})
        if (!task){
            // // 自定義javascript 原生error物件
            // const error = new Error('Not Found');
            // error.status = 404;
            // return next(error) // 丟給error handler middleware 做處理

            // 自定義繼承至error物件
            return next(createCustomError(`No task with id: ${taskID}`, 404))

            // return res.status(404).json({msg: `No task with id : ${taskID}`})
        }
        res.status(200).json({id:req.params.id})
})


const deleteTasks = asyncWrapper(async (req, res, next) => {

        const {id:taskID} = req.params
        const task = await Task.findOneAndDelete({_id:taskID})
        if (!task){
            return next(createCustomError(`No task with id: ${taskID}`, 404))
            // return res.status(404).json({msg: `No task with id : ${taskID}`}) // id格式符合，但找不到此id
        } 
        res.status(200).json({task}) 
        
        // 以此專案delete的情境下，前端其實主要是看回傳的status code決定接下來的動作，如果是200(成功)，代表我已經刪除特定資料，此時我在做一次拿取所有資料就好，若失敗才需要回傳失敗的原因    
        // res.status(200).json({task: null, status: 'success'}) 
        // res.status(200).send()

})

// put與patch的差異在於:
// patch只會更新我們給的新資料部分並且保留沒有更新的其他部分(我們使用此)
// put則是整個overwrite，只會保留我們更新的部分
const updateTasks = asyncWrapper(async (req, res, next) => {

        const {id:taskID} = req.params
        const task = await Task.findOneAndUpdate({_id:taskID}, req.body, {
            // options object
            new: true, // 預設上是返回更新前(舊的) 物件
            // runValidators: ture, // 預設上是不執行schema的 validation // 這行有問題不知道為啥???????
            // overwrite: true // put的話要有這個選項
        })
        if (!task){
            return next(createCustomError(`No task with id: ${taskID}`, 404))
            // return res.status(404).json({msg: `No task with id : ${taskID}`})
        } 
        res.status(200).json({task}) 
})

module.exports = {
    getALLTasks,
    createTask,
    getTasks,
    updateTasks,
    deleteTasks
} // 包成object export，key會等於function_name, value會試function object(函數本身的意思)