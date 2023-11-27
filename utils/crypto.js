const crypto = require('crypto');

/**
 * generate hash for a string
 * @param {String} inputString 
 * @returns {String} hashed string
 */
const hashString = (inputString) => crypto
    .createHash('sha256')
    .update(inputString)
    .digest('hex');
    
module.exports = {
  hashString,
};
