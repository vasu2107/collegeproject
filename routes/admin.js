const express = require("express");
const Task = require('../models/Task');

const router = express.Router();

const manageTaskHandler = async (req, res) => {
    const { user } = req;

    const tasks = await Task.find({ creator: user.id });
    return res.render("manageTasks.ejs", {
        tasks, name: user.name, id: user.id,
    });
};

router.get("/abc", manageTaskHandler);

module.exports = router;

