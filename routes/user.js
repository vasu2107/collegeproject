const express = require('express');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/User');
const { createJWT } = require('../utils/jwt');
const { hashString } = require('../utils/crypto');
const { USER_ROLE } = require('../constants/user');

const router = express.Router();

const createTokenAndRedirectToDashboard = async (user, res) => {
    const jwtToken = createJWT(user);
    const authCookieName = process.env.AUTH_COOKIE_NAME;
    
    res.cookie(authCookieName, jwtToken, { httpOnly: true, secure: true });
    
    return res.redirect('/index');
};

// login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ name: username, password: hashString(password) });
  
    if (!user) {
      return res.render("login.ejs", { errorMessage: 'Invalid username or password' });
    }
  
    return createTokenAndRedirectToDashboard(user, res);
});
  
  // signup route
router.post('/signup', async (req, res) => {
    try {
          const { name, email, password } = req.body;
          const id = uuidv4();
          const user = await User.findOne({ email });
          
          if (user) {
              return res.render("signup.ejs", {
                  errorMessage: 'User already exists',
              });
          }
  
          const newUser = new User({ name, email, password: hashString(password), id, role: USER_ROLE.STANDARD_USER });
  
          await newUser.save();
  
          return createTokenAndRedirectToDashboard({
            name, email, role: USER_ROLE.STANDARD_USER, id,
          }, res);
      } catch (error) {
          return res.render("signup.ejs", {
              errorMessage: 'Something went wrong. Failed To Register user',
          });
      }
});

router.get('/signup', (_, res) => res.render('signup.ejs'));

module.exports = router;
