const Animal = require('../models/Animal');

const animalController = {

    // Ajout d'un animal
    createAnimal: async (req, res) => {
        const animal = new Animal(req.body);
        animal.user_id = req.body.user_id; // Données du front.
        await animal.save();
        if (animal.id) {
            res.status(200).json(animal);
        } else {
            res.status(401).json(animal); 
        }
    },

    // On récupère un animal via son ID
    findOne : async (req, res) => {
        try {
            const id = req.params.id;
            const animal = await Animal.findOne(id);     
            if (animal) {
                res.status(200).json(animal);
            }
        } catch (err) {
            console.log(`Une erreur s'est produite dans la recherche de l'animal : `, err);
            res.status(401).json(`L'animal que vous recherchez est introuvable.`);
        }
    },

    // Rejoindre un groupe
    joinGroup : async (req, res) => {
        try {
            const group_id = req.params.group_id;

            const animal_id = req.session.user.info.animal_id;
            console.log('Join group, animal_id: ', req.session);

            const inscription = await Animal.join(group_id, animal_id);
            console.log('Join group, réponse BDD : ', inscription);
            if (inscription) {
                const groups = await Animal.findAllGroups(animal_id);
                req.session.user.info.groups = groups;
                res.status(200).json(`Vous avez bien rejoint le groupe.`);
            }
        } catch (error){
            console.log(error);
            res.status(401).json(`Une erreur s'est produite, l'animal n'a pas rejoint le groupe.`);
        }
    },

    // Récupérer tous les groupes dont l'animal fait partie
    findAllGroups : async (request, response) => {
        try {
            const idAnimal = request.session.user.info.animal_id;
            const animalHasGroups = await Animal.findAllGroups(idAnimal);

            if (animalHasGroups) {
                response.status(200).json((`Les groupes dont vous êtes membre.`, animalHasGroups));
            }
        } catch (error) {
            console.log(error);
            response.status(401).json(`Une erreur s'est produite.`);
        }
    }, 

    // Vérifie que l'utilisateur est connecté puis qu'il tente d'accèder à son propre profil :
    checkAccountAccess: async (req, res, next) => {
        if (req.session.user) {
            if (req.session.user.logged) {
                const id = req.params.id
                const animal = await Animal.findOne(id);
                if (animal) {
                    if (req.session.user.info.animal_id === animal.id) {
                    next();
                    } else {
                    res.status(401).json(`Vous ne pouvez pas modifier un profil autre que le vôtre.`);
                    }
                } else {
                    res.status(404).json(`L'utilisateur demandé n'existe pas.`);
                }
            } else {
                res.status(401).json(`Vous ne pouvez pas modifier votre profil si vous n'êtes pas connecté.`);
            }
        } else {
            res.status(401).json(`Vous ne pouvez pas modifier votre profil si vous n'êtes pas connecté.`);
        }
    },

    // Mise à jour du profil animal
    updateProfile : async (req, res) => {
        const source = req.session.user ? req.session.user.info.animal_id : req.body.animal_id;
        const animal = await Animal.findOne(source);
 
        if (animal.id) { 
            const updatedAnimal = new Animal(animal);
        
            updatedAnimal.id = animal.id;
            if (req.body.animal_id) {
                updatedAnimal.id = req.body.animal_id;
                updatedAnimal.image = req.res.locals.fileName;
            } else {
                updatedAnimal.id = req.session.user.info.animal_id;
            }
            await updatedAnimal.save();
            
            if (updatedAnimal) {
                res.status(200).json(`Le profil de votre animal a été mis à jour.`);
            } else {
                res.status(500).json(`Nous rencontrons des problèmes...`);
            }
        } else {
            res.status(404).json(`Le profil est introuvable.`)
        }
    },
};

module.exports = animalController;