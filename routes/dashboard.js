const express = require("express");
const User = require('../models/User');
const Task = require('../models/Task');
const { authenticationMiddleware } = require('../middlewares/auth');
const { isAdmin } = require('../utils/user');

const router = express.Router();

const dashboardRouteHandler = async (req, res) => {
    const { user } = req;
    if (isAdmin(user)) {
        const users = await User.find();
        return res.render("adminDashboard.ejs",{ usersdata: users, name: user.name, id: user.id });
    }

    const tasks = await Task.find({ asignee: user.id });
    return res.render("userDashboard.ejs", {
        tasks, name: user.name, id: user.id,
    });
};

router.get("/", dashboardRouteHandler);
router.post("/", dashboardRouteHandler);

module.exports = router;

