const { USER_ROLE } = require('../constants/user');

const isAdmin = (user) => user.role === USER_ROLE.ADMIN;

module.exports = { 
    isAdmin,
};
