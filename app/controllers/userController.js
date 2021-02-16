const User = require('../models/User');
const Animal = require('../models/Animal');
const {checkPassword, hashPassword} = require('../services/passwordClient');

const userController = {
    
    // Trouver un utilisateur via son ID
    findOne: async (request, response) => {
        try {
            const id = request.params.id;
            const user = await User.findOne(id);     
            if (user) {
                response.status(200).json(user);
            }
        } catch (error) {
            console.error(`Cet utilisateur est introuvable`, error);
            response.status(404).json(`Cet utilisateur est introuvable`);
        }
    },

    // Se connecter 
    login: async (req, res) => { 
        const user = await User.findByEmail(req.body.email);
        if (!user){
            res.status(404).json(`Cet utilisateur n'existe pas`);
        }

        if (!req.session.user) {
            req.session.user = {
                logged: false,
                general : {
                    id: req.sessionID,
                    cookie: req.headers.cookie,
                    latitude: null,
                    longitude: null
                },
                info: {
                    email: null,
                    user_id: null,
                    animal_id: null
                }
            };
        }

        const animal = await Animal.findByOwner(user.id);
        const groups = await Animal.findAllGroups(animal.id)
        if (user && animal) { 
            const grantAccess = checkPassword(req.body.password, user.password);
            if (grantAccess) {
                req.session.user.logged = true,
                req.session.user.info = { 
                    pseudo: user.name,
                    animal: animal.name,
                    email: user.email, 
                    user_id: Number(user.id),
                    animal_id: Number(animal.id),
                    image: animal.image, 
                    groups: groups
                };
                console.log("login :",req.session);
                res.status(200).json(req.session.user);
            } else {
                res.status(401).json(`Le mail ou le mot de passe sont incorrects.`)
            }
        } else if (!user){
            res.status(401).json(`Le mail ou le mot de passe sont incorrects.`)
        } else {
            res.status(500).json(`Nous rencontrons actuellement des problèmes...`);
        }
    },
    
    // Vérification d'un utilisateur connecté
    isLogged: (req, res) => {
        res.status(200).json({
            logged: req.session.user.logged,
            session: req.session.user
        });
    },

    // Mise à jour d'un compte utilisateur
    updateAccount: async (req, res) => {
        try {
            const user = await User.findOne(req.session.user.info.user_id);
            if (user.id) {
                const updatedUser = new User(req.body);
                updatedUser.id = user.id;
                if (req.body.password) {
                    if (req.body.password !== user.password) {
                        const pw = checkPassword(req.body.password, user.password);
                        if (pw) {
                            updatedUser.password = user.password;
                            res.status(401).json("Ce mot de passe a déja été utilisé.");
                        } else if (!pw) {
                            hash = hashPassword(req.body.password);
                            updatedUser.password = hash;
                            await updatedUser.save();
                            res.status(200).json(`Votre compte a été mis à jour.`);
                        }
                    } else {
                        updatedUser.password = user.password;
                        await updatedUser.save();
                        res.status(200).json(`Votre compte a été mis à jour.`);
                    }
                }
            } else {
                res.json(`Une erreur s'est produite, votre compte n'a pas été mis à jour.`)};
        } catch (err) {
            res.status(500).json(`Une erreur s'est produite.`);
            console.log(err);
        }
    },

    // Création d'un compte utilisateur
    createAccount: async (req, res) => {
        const user = new User(req.body);
        const hash = hashPassword(user.password);
        user.password = hash;
        await user.save()

        if (user.id) {
            res.status(200).json({
                user_id: user.id
            });
        } else {
            res.status(500).json(`L'inscription de l'utilisateur n'a pas été prise en compte.`);
        }
    },

    // Déconnexion
    logout: (req, res) => {
        if (req.session.user.logged) {
            req.session.destroy(() => {
                res.status(200).json({ logged: false });
            });
        } else {
            res.status(404).json(`Aucun utilisateur connecté.`);
        }
    },

    // Vérification des accès si connecté ou non
    checkAccountAccess: async (req, res, next) => { 
        if (req.session.user) {
         
            if (req.session.user.logged) {
                const id = req.params.id
                const user = await User.findOne(id);
                if (user) {
                    if (req.session.user.info.email === user.email) {
                    next();
                    } else {
                    res.status(401).json(`Vous ne pouvez pas accéder à un compte utilisateur autre que le vôtre.`);
                    }
                } else {
                    res.status(404).json(`L'utilisateur demandé n'existe pas.`);
                }
            } else {
                res.status(401).json(`Vous ne pouvez pas modifier votre compte si vous n'êtes pas connecté.`);
            }
        } else {
            res.status(500).json(`Comportement anormal : bug dans la matrice`);
        }
    },

    // Suppression du compte utilisateur
    delete: async (req, res) => {
        const id = req.params.id;
        const user = await User.findOne(id);
        if (user) {
            await User.delete(id);
        }
        res.status(200).json(`Cet utilisateur a bien été supprimé.`);
    }
};

module.exports = userController;