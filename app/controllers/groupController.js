const Animal = require('../models/Animal');
const Group = require('../models/Group');

const groupController = {

    // Création d'un groupe
    createGroup : async (request, response) => {
        console.log("Create group:",request.session);
        if (request.session.user.logged) {
            const newGroup = new Group(request.body);
            newGroup.created_by = request.session.user.info.animal_id;
            await newGroup.save();

            if (newGroup.id) {
                // A la suite de la création du groupe, on permet à l'animal de le rejoindre automatiquement
                const joinGroup = await Animal.join(newGroup.id, newGroup.created_by);
            
                if (joinGroup) {
                    const groups = await Animal.findAllGroups(newGroup.created_by);
                    console.log(groups);
                
                    response.status(200).json((`Le groupe a bien été créé.`, newGroup)); 
            }            
            } else {
                response.status(400).json(newGroup);
            }
        } else {
            response.status(401).json(`Vous devez être connecté pour créer un groupe.`);
        };
    },

    // Trouver un groupe via son id
    findOne: async (request, response, next) => {
        // On récupère le groupe pour l'id demandé
        try {
            const id = request.params.id;
                const oneGroup = await Group.findOne(id);

            // si on trouve le groupe on le renvoie
            if (oneGroup) {
                response.status(200).json(oneGroup);
            }
            // sinon on envoie une réponse explicite pour dire qu'on n'a rien trouvé
            else {
                response.status(404).json(`Aucun groupe à l'id ${id}`);
            }
        } catch(error) {
            response.status(500).json(error.toString());
        }
    },

    // Tous les groupes - pour la page d'accueil
    findAll: async (request, response) => {
        try {
            const groups = await Group.findAll();
            response.status(200).json(groups);
        } catch(error) {
            response.status(401).json(error)
        }
    },

    // Tous les groupes d'une ville 
    findAllByCity: async (request, response) => {
        try {
            const nameCity = request.body.name;
            console.log(request.body.name);
            const group = await Group.findAllByCity(nameCity);
            console.log(group);
            if (group) {
                response.status(200).json(group);
            } else {
                response.status(401).json(`Oups ! La recherche n'a rien donné.`);
            }
            
        } catch(error) {
            response.status(401).json(error);
        }
    },

    // Tous les animaux qui font partie d'un groupe
    findAllAnimals: async (request, response) => {
        try {
            // on récupère l'id du groupe
            const idGroup = request.params.id;
            // on récupère les animaux remplissant une condition
            const allAnimalsInTheGroup = await Group.findAllAnimals(idGroup);
            
            // envoyer les animaux
            response.status(200).json(allAnimalsInTheGroup);
        } catch(error) {
            console.trace(error);
            response.status(401).json(`Une erreur s'est produite.`, error);
        }
    },

    //Total des membres du groupe
    findTotalMembersOfAGroup: async (request, response) => {
        try {
            const id = request.params.id;
            console.log(id);
            await Group.findTotalMembers(id);
            response.status(200).json(`${id} Membres inscrits ici :D`);
        } catch (error) {
            response.status(401).json(`Une erreur s'est produite `);
        }
    },

    // Trouver les messages de la chatroom
    findAllMessages: async (req, res) => {
        try {
            const id = req.params.id;
            const messages = await Group.findAllMessages(id);
            res.status(200).json(messages);
        } catch (err) {
            res.status(500).json('Une erreur est survenue au chargement des messages.');
            console.log(err);
        }
    },

    // Permet d'aller chercher les infos d'un groupe, des animaux d'un groupe, de tous les messages et de la dernière activité
    displayGroup: async (req, res) => {
        const id = req.params.id;
        const group = await Group.findOne(id);
        const members = await Group.findAllAnimals(id);
        const messages = await Group.findAllMessages(id);
        // Ou r = message1 et a = message2 :
        lastActivity = messages.reduce(function (r, a) {
            return r.send_at > a.send_at ? r : a;
        }, 0);

        res.status(200).json({
            group,
            lastActivity: new Date(lastActivity.send_at),
            members,
            messages
        });
    }

    // Version ultérieure : Mettre à jour le groupe
    // update: async (request, response) => {
    //    
    // },

    // Version ultérieure : Supprimer un groupe
    // delete: async (request, response) => {
    //     // ici je devrais supprimer le groupe demandé
    //     try {
    //         const id = request.params.id;
    //         const groupDelete = await Group.findOne(id);
    //         // si on trouve le groupe on le supprime
    //         if(groupDelete) {
    //             await Group.destroy();
    //             response.json('Le groupe a bien été supprimé').sendStatus(200);
    //         }
    //         // sinon on envoie une réponse explicite pour dire qu'on n'a rien trouvé
    //         else {
    //             response.json(`Aucune groupe à l'id ${id}`).sendStatus(401);
    //         }
    //     } catch(error) {
    //         console.trace(error);
    //         response.json(error.toString()).status(401);
    //     }
    // },
};

module.exports = groupController;