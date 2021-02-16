const Animal = require('../models/Animal');
const Group = require('../models/Group');
const upload = require('../services/imageProcessor');

const homeController = {
    //  préconfigure l'application dès l'arrivée sur la page /home
    homePage: async(_, response) => {
        try {
            // On cherche tous les groupes existants sur la carte de la page d'accueil
            const allGroups = await Group.findAll();

            // On cherche pour le slide de la page d'accueil les 8 derniers inscrits
            const lastAnimalsSignedUp = await Animal.lastAnimalsSignedUp();

            // On les renvoie
            response.status(200).json({allGroups, lastAnimalsSignedUp});
        } catch (error) {
           console.trace(error)
        }
    },

    // Met à jour l'image du profil connecté sur la page d'accueil
    upload : (req, res, next) => {
        try {
            const file = req.file;
            res.locals.fileName = file.filename;
            console.log(file.path)
            next();
        } catch (error) {
            console.error(error);
        }
    },
};

module.exports = homeController;