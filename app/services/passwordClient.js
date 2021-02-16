const bcrypt = require('bcrypt');

// Fonction de hashage bcrypt :
const hashPassword = (password) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
};

// Fonction de comparaison. Retourn true si valide, et inversement.
const checkPassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
};

module.exports = {
    hashPassword,
    checkPassword
};