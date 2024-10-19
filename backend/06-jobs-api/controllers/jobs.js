const Job = require('../models/Job')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

// 注意Job中的所有route都必須使用userID，因為邏輯是有這個ID的資料才能撈取
const getAllJobs = async (req, res) => {
    const jobs = await Job.find({createdBy: req.user.userID}).sort('createdAt')
    res.status(StatusCodes.OK).json({jobs, count:jobs.length})
}

const getJob = async (req, res) => {
    const {user:{userID}, params:{id:jobId}} = req // params:{id:jobId}，注意{id:jobId}這一部分是alias
    // console.log(jobId) // 有alias就只能用alias

    const job = await Job.findOne({_id:jobId, createdBy:userID}) // await要記得，已經兩次了八...
    if (!job){
        throw new NotFoundError(`No job id: ${jobId}`)
    }
    res.status(StatusCodes.OK).json({job})
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userID // 我們把userID存在這裡，拿出來塞給req.body要拿去產生Document
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
}

const updateJob = async (req, res) => {
    const {
        body: {company, position},
        user: {userID},    // 這個是middleware給的使用者id
        params: {id:jobId} // 這個是job_id，是client端要給的
    } = req

    if (company === '' || position === '') {
        throw new BadRequestError('company or position fields cannot be empty')
    }

    const job = await Job.findByIdAndUpdate(
        {_id:jobId, createdBy: userID},
        req.body,
        {new: true}
    )
    if (!job){
        throw new NotFoundError(`No job id: ${jobId}`)
    }
    res.status(StatusCodes.OK).json({job})
}

const deleteJob = async (req, res) => {
    const {
        user: {userID},    
        params: {id:jobId} 
    } = req

    const job = await Job.findByIdAndDelete(
        {_id:jobId, createdBy: userID},
        req.body,
    )
    if (!job){
        throw new NotFoundError(`No job id: ${jobId}`)
    }
    res.status(StatusCodes.OK).send()

}

module.exports = {
    getAllJobs, 
    getJob,
    createJob,
    updateJob,
    deleteJob
}