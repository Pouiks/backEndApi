// Import des services
const validate = require('./services/validator'); // valide le format des req.body/req.query en s'appuyant sur un schema donné
const checkEmail = require('./services/checkEmail'); // vérifie la disponibilité d'une adresse mail à la création d'un groupe

// Image
const upload = require('./services/imageProcessor.js');

// Import des schemas :
const animalSchema = require('./schemas/animalSchema');
const groupSchema = require('./schemas/groupSchema');
const messageSchema = require('./schemas/messageSchema');
const {userSchema, createdUserSchema} = require('./schemas/userSchema');

// Import des controllers
const homeController = require('./controllers/homeController')
const animalController = require('./controllers/animalController');
const userController = require('./controllers/userController');
const groupController = require('./controllers/groupController');
const messageController = require('./controllers/messageController');

const { Router } = require('express');
const router = Router(); 


/* Les routes GET */

// Page d'accueil //TODO Rajouter le nombre de membres & dernier message envoyé (dernière activité)
router.get('/home', homeController.homePage);

// Page d'un groupe et des animaux qui font partie d'un groupe 
router.get('/group/:id', groupController.displayGroup); 

// Page profil d'un animal
router.get('/animal/:id', animalController.findOne);

// Page des groupes dont l'animal fait partie
router.get('/animal_has_groups/:idAnimal', animalController.findAllGroups);

// Page profil de l'utilisateur
router.get('/account/:id', userController.findOne); 


/* Les routes POST */

/**Envoi de données */
//  Page de connexion au compte utilisateur
router.post('/login', userController.login); 

// Page de l'utilisateur connecté
router.post('/isLogged', userController.isLogged); 

//  Page de création d'un compte utilisateur 
router.post('/sign_up_user', validate(userSchema), checkEmail, userController.createAccount);

//  Page de création d'un animal 
router.post('/sign_up_animal', validate(animalSchema), animalController.createAnimal);

// Page de création d'un groupe
router.post('/group_creation', validate(groupSchema), groupController.createGroup);

// Page listant les groupes par ville //TODO Rajouter le nombre de membres
router.post('/group', groupController.findAllByCity);

// Envoyer un message sur le chatroom d'un groupe //TODO A TESTER & A VOIR AVEC LA MISE EN PLACE DU CHAT
router.post('/group_chatroom/:id', messageController.processMessage);

// Page d'accueil mise à jour avec le chargement de l'image de l'animal
router.post('/upload', upload.single('img'), homeController.upload, animalController.updateProfile);

// Page d'un animal qui rejoint un group
router.post('/group/join/:group_id', animalController.joinGroup); 

// Route de déconnexion
router.post('/logout', userController.logout);


/* Les routes PUT */

/**Modification de données */
//  Modifier un compte 
router.put('/account/:id', userController.checkAccountAccess, validate(createdUserSchema), userController.updateAccount);

// Modifier un profil 
router.put('/animal/:id', animalController.checkAccountAccess, validate(animalSchema), animalController.updateProfile); 

//  V2 - Modifier un groupe 
// router.put('/group/:id',); 


/* Les routes DELETE */

// Suppression d'un compte utilisateur //TODO A TESTER
router.delete('/delete_account/:id', userController.checkAccountAccess, userController.delete);

module.exports = router;