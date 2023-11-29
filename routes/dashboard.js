const express = require("express");
const User = require('../models/User');
const Task = require('../models/Task');
const { isAdmin } = require('../utils/user');
const { USER_ROLE } = require('../constants/user');

const router = express.Router();

const dashboardRouteHandler = async (req, res) => {
    const { user } = req;
    if (isAdmin(user)) {
        const users = await User.find();
        const filteredUsers = users.filter((user) => user.role === USER_ROLE.STANDARD_USER);
        return res.render("adminDashboard.ejs",{ usersdata: filteredUsers, name: user.name, id: user.id });
    }

    const tasks = await Task.find({ asignee: user.id });
    return res.render("userDashboard.ejs", {
        tasks, name: user.name, id: user.id,
    });
};

router.get("/", dashboardRouteHandler);
router.post("/", dashboardRouteHandler);

module.exports = router;

