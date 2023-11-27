const express = require("express");
const { v4: uuidv4 } = require('uuid');
const User = require('../models/User');
const { getAuthorizationMiddleware } = require('../middlewares/auth');
const { isAdmin } = require('../utils/user');

const router = express.Router();

router.post('/add', getAuthorizationMiddleware(isAdmin), async (req, res) => {
   const { id } = req.user;
   const { task: description } = req.body;
   const time = Date.now();

   const task = new Task({ 
      id: uuidv4(), description, created_date: time, modified_date: time, userId: id
   });

   await task.save();

   return res.render("adminDashboard.ejs",{ usersdata: users, message: 'Task added successfully' });
});

router.post('/update/:id', async (req, res) => {
   const { id: taskId, description, status } = req.params;
   const { id: userId } = req.user;

   const task = await Task.findOne({ id: taskId });

   if (!task) {
      return res.redirect('/index');
   }

   if (task.userId !== userId) {
      res.clearCookie(process.env.AUTH_COOKIE_NAME);
      return res.render("login.ejs", { errorMessage: 'Tries to access unauthorised asset' });
   }

   task.description = description || task.description;
   task.status = status || task.status;

   await task.save();

   return res.redirect('/index');
});

module.exports = router;
