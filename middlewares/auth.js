const { pathOr } = require('ramda');
const { verifyJWT } = require('../utils/jwt');
const { isNilOrEmpty } = require('../utils/common');

/**
 * This middleware verifies if thse user is already logged in usinh
 * auth cookie and if yes the fill the user details in req.user otherwise
 * redirect to login page
 * @returns 
 */
const authenticationMiddleware = async (req, res, next) => {
    const authCookieName = process.env.AUTH_COOKIE_NAME;
    const token = pathOr('', ['cookies', authCookieName], req);

    if (isNilOrEmpty(token)) {
        return res.render("login.ejs");
    }

    try {
        const decoded = await verifyJWT(token);
        req.user = decoded;
        return next();
    } catch (error) {
        return res.render("login.ejs");
    }
};

const getAuthorizationMiddleware = (isAuthorised) => (req, res, next) => {
    const { user, } = req;

    if (!user) {
        return res.render("login.ejs");
    }

    if (isAuthorised(user)) {
        return next();
    }

    // delete cookie and redirect to login page with error message
    res.clearCookie(process.env.AUTH_COOKIE_NAME);
    return res.render("login.ejs", {
        errorMessage: 'You are not authorized to access this page',
    });
};

module.exports = {
    authenticationMiddleware,
    getAuthorizationMiddleware,
};
