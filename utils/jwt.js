const jsonwebtoken = require('jsonwebtoken');

/**
 * create a JWT token
 * @param {Object} payload - json object to be signed
 * @returns {string} JWT
 */
const createJWT = (payload) => jsonwebtoken.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

/**
 * verify a JWT token
 * @param {Sring} token - JWT token
 * @returns {Object} decoded payload if valid token otherwise throws an error
 */
const verifyJWT = (token) => new Promise((resolve, reject) => {
    jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return reject(err);
        }

        resolve(decoded);
    });
});

module.exports = {
    createJWT,
    verifyJWT,
};
