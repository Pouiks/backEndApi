const Joi = require('joi');

const userSchema = Joi.object({
    first_name: Joi.string()
        .required()
        .messages({  
            'string.base': `[dev-only] Le prénom doit être de type 'String'.`,
            "any.required": "Le prénom est obligatoire."
        }),
        
    city: Joi.string()
        .required()
        .messages({  
            'string.base': `[dev-only] La ville doit être de type 'String'.`,
            "any.required": "La ville est obligatoire."
        }),

    address: Joi.string() 
        .required()
        .messages({  
            'string.base': `[dev-only] L'addresse doit être de type 'String'.`,
         }), 

    email: Joi.string()
        .email()
        .required()
        .messages({  
            'string.base': `[dev-only] L'email doit être de type 'String'.`,
            'string.email': `L'email est invalide`,
            "any.required": "L'email est obligatoire."
        }), 

    password: Joi.string()
        .required()
        .pattern(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/)
        .messages({  
            'string.base': `[dev-only] Le mot de passe doit être de type 'String'.`,
            "any.required": "Le mot de passe est obligatoire.",
            "string.pattern": 'Le mot de passe doit être composé de 8 caractères minimum, dont une minuscule au moins, une majuscule au moins, un nombre au moins, et un caractère spécial parmis : !@#$%^&* .'
        }), 

    animal_id: Joi.number()
        .integer()
        .messages({  
            'number.base': `[dev-only] L'ID doit être de type 'Number'.`
        })
});

const createdUserSchema = userSchema.keys({
    password: Joi.string()
        .required()
        .messages({  
            'string.base': `[dev-only] Le mot de passe doit être de type 'String'.`,
            "any.required": "Le mot de passe est obligatoire.",
            "string.pattern": 'Le mot de passe doit être composé de 8 caractères minimum, dont une minuscule au moins, une majuscule au moins, un nombre au moins, et un caractère spécial parmis : !@#$%^&* .'
        }), 
});

module.exports = {
    userSchema,
    createdUserSchema
};
