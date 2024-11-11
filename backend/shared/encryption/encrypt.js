// encrypt.js

import bcrypt from 'bcrypt';

export const hashing = {
    SALT: 10,

    passwordHash(plainPWD) {
        if (!plainPWD) {
            throw new Error('Password is required for hashing.');
        }
        return bcrypt.hashSync(plainPWD, this.SALT);
    },

    matchPassword(plainPWD, dbPWD) {
        if (!plainPWD || !dbPWD) {
            throw new Error('Both plain password and hashed password are required for comparison.');
        }
        return bcrypt.compareSync(plainPWD, dbPWD);
    }
};
