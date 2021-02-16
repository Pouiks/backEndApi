const Joi = require('joi');

const animalSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(25)
        .required()
        .messages({
            'string.base': `[dev-only] Le nom doit être de type 'String'.`,
            'string.min': `Le nom doit être composé de minimum {#limit} caractères.`,
            'string.max': `Le nom doit être composé de maximum {#limit} caractères.`,
            'any.required': `Le nom est obligatoire`
        }),

    specie: Joi.string() // V2
        .valid('Chien')
        // .required()
        .messages({
            'string.base': `[dev-only] L'espèce doit être de type 'String'.`,
            'any.invalid': `Nous n'acceptons que les chiens pour le moment. La valeur doit être {#valid}`, // trouver code err
            'any.required': `L'espèce est obligatoire.`
        }),

    age: Joi.number()
        .integer()
        .required()
        .messages({
            'number.base': `[dev-only] L'âge doit être de type 'Number'.`,
            'number.interger': `[dev-only] L'âge doit être de type 'Integer'.`,
            'any.required': `L\'âge est obligatoire.`
        }), 

    breed: Joi.string()
        .required()
        .messages({
            'string.base': `[dev-only] La race doit être de type 'String'.`,
            'any.required': `La race est obligatoire.`
        }),

    image: Joi.string() //V2
        // .required()
        .messages({ // verifier le format voir le formater (voir comment on va pouvoir récuppérer une photo envoyée par l'user : on l'enregistre dans un dossier du back (en ressources) ? dans ce cas check chemin relatif + pattern de création de l'id de la photo); + vraiment obligatoire ? dans ce cas, peut-être prévoir des avatars par défaut
            'string.base': `[dev-only] L'image doit être de type 'String'.`,
            "any.required": "La photo est obligatoire."
        }),  

    description: Joi.string()
        .required()
        .messages({ // vraiment required ? (si changement, faire attention en BDD)
            'string.base': `[dev-only] La description doit être de type 'String'.`,
            "any.required": "La description est obligatoire."
        }),  

    size: Joi.string()
        .required()
        .messages({ //verifier le format : on fait quoi ? String de type 'petit' ou 'petit-format' ou 'S', 'M' ou value de retour en nombre ? (attention si changement de type, le modifier egalement en BDD)
            'string.base': `[dev-only] La taille doit être de type 'String'.`,
            "any.required": "La taille est obligatoire."
        }), 

    sex: Joi.string()
        .required()
        .messages({  // pareil ici : 'Male'/'Femelle' ou 'F'/'M'
            'string.base': `[dev-only] Le sexe doit être de type 'String'.`,
            "any.required": "Le champs 'sexe' est obligatoire."
        }), 

    user_id: Joi.number()
        .integer()
        .greater(0) // 0 exclu
        .required()
        .messages({  
            "number.base": "[dev-only] L'ID doit être de type 'Number'.",
            "number.integer": "[dev-only] L'ID doit être un entier.",
            "number.greater": "L'ID doit être supérieur à 1.",
            "any.required": "L'ID est obligatoire."
        })
}).unknown(true);

module.exports = animalSchema;

// #1 Pour se faire rajouter une méthode .valid(...[array]), ou "array" sera une liste des breeds préalablement importée sous le format ['a', 'b', 'c'] : A VOIR AVEC LES AUTRES