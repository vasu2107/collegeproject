const express = require("express");
const User = require('../models/User');
const Task = require('../models/Task');
const { authenticationMiddleware } = require('../middlewares/auth');
const { isAdmin } = require('../utils/user');

const router = express.Router();

const dashboardRouteHandler = async (req, res) => {
    console.log("dashboard route");
    if (isAdmin(req.user)) {
        const users = await User.find();
        return res.render("adminDashboard.ejs",{ usersdata: users });
    }

    const tasks = await Task.find({ id: user.id });
    return res.render("userDashboard.ejs", {
        tasks, name: user.name, id: user.id,
    });
};

router.get("/", authenticationMiddleware, dashboardRouteHandler);
router.post("/", authenticationMiddleware, dashboardRouteHandler);

module.exports = router;

