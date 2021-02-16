const User = require('../models/User');

// Vérifie si un email est présent en BDD. Utile au moment de l'inscription.

const checkEmail = async (req, res, next) => {

    const user = await User.findByEmail(req.body.email);
        if (user === undefined) {
            next();
        } else {
            res.status(403).json(`L'adresse ${user.email} n'est pas disponible.`);
        }
};

module.exports = checkEmail;