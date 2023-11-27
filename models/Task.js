const mongoose = require("mongoose");
const { TASK_STATUS } = require('../constants/task');

const taskSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    asignee: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: TASK_STATUS.PENDING,
    },
    created_date: {
        type: Number,
        required: true,
    },
    modified_date: {
        type: Number,
        required: true,
    },
    creator: {
        type: String,
        required: true,
    },
});

const Task = mongoose.model("Task", taskSchema);

module.exports=Task;
