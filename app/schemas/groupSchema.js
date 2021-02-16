const { address } = require('faker');
const Joi = require('joi');

const groupSchema = Joi.object({
    name: Joi.string()
        .required()
        .messages({  
            'string.base': `[dev-only] Le nom doit être de type 'String'.`,
            "any.required": "Le nom est obligatoire."
        }), 

    latitude: Joi.number()
        .required()
        // .pattern(/^-?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/)
        .messages({  
            'string.base': `[dev-only] La latittude doit être de type 'String'.`,
            "any.required": "La latitude est obligatoire.",
            // "string.pattern": "[Dev-Only] La latitude doit être comprise entre [-90.000000 ... 90.000000]. Précision à 6 chiffres (max) après la virgule."
        }), 

    longitude: Joi.number()
        .required()
        // .pattern(/^-?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[1-7][0-9])(?:(?:\.[0-9]{1,6})?))$/)
        .messages({  
            'string.base': `[dev-only] La longitude doit être de type 'String'.`,
            "any.required": "La longitude est obligatoire.",
            // "string.pattern": "[Dev-Only] La latitude doit être comprise entre [-180.000000 ... 180.000000]. Précision à 6 chiffres (max) après la virgule."
        }), 

    city: Joi.string()
        .required()
        .messages({  
            'string.base': `[dev-only] La ville doit être de type 'String'.`,
            "any.required": "La ville est obligatoire."
        }), 

    country: Joi.string()
        .required()
        .messages({  
            'string.base': `[dev-only] Le pays doit être de type 'String'.`,
            "any.required": "Le pays est obligatoire."
        }), 

    address: Joi.string()
        .messages({  
            'string.base': `[dev-only] L'adresse doit être de type 'String'.`,
            "any.required": "L'adresse est obligatoire."
        }), 

    description: Joi.string()
        .required()
        .messages({  
            'string.base': `[dev-only] La description doit être de type 'String'.`,
            "any.required": "La description est obligatoire."
        }), 

    created_by: Joi.number()
        .integer()
        .messages({  
            'number.base': `[dev-only] Le champs ID 'créé par' doit être de type 'Number'.`,
            "any.required": "[dev-only] L'ID du créateur est obligatoire."
        }),
        
    chatroom_id: Joi.number()
        .integer()
        .messages({  
            'number.base': `[dev-only] L'ID du chatroom doit être de type 'Number'.`,
            'number.integer': `[dev-only] L'ID du chatroom doit être de type 'Integer'.`,
            "any.required": "[dev-only] L'ID du chatroom est obligatoire."
        })
});

module.exports = groupSchema;