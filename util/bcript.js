const bcryptLib = require('bcryptjs');

async function hashPassword(password) {
    try {
        const saltRounds = 10;
        const hashedString = await bcryptLib.hash(password, saltRounds);
        return hashedString;
    } catch (error) {
        throw new Error('Error hashing the string: ' + error);
    }
}

async function comparePasswords(password, hashedPassword) {
    try {
        const isMatch = await bcryptLib.compare(password, hashedPassword);
        return isMatch;
    } catch (error) {
        throw new Error('Error comparing passwords: ' + error);
    }
}

const bcrypt = { hashPassword, comparePasswords }

module.exports = bcrypt