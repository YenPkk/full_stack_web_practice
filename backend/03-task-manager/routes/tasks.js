const express = require('express');
const router = express.Router();
const {
    getALLTasks,
    createTask,
    getTasks,
    updateTasks,
    deleteTasks
} = require('../controllers/tasks');


router.route('/').get(getALLTasks).post(createTask);
router.route('/:id').get(getTasks).patch(updateTasks).delete(deleteTasks);


module.exports = router;