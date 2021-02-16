const Joi = require('joi');

const messageSchema = Joi.object({
    content: Joi.string()
        .required()
        .messages({  
            'string.base': `[dev-only] Le contenu du message doit être de type 'String'.`,
            "any.required": "Un contenu est obligatoire à l'envoi d'un message.",
            "any.required": "[dev-only] Le contenu est obligatoire."
        }),

    send_by: Joi.number()
        .integer()
        .required()
        .messages({  
            'number.base': `[dev-only] Le champs 'envoyé par' doit être de type 'Number'.`,
            'number.integer': `[dev-only] Le champs 'envoyé par' doit être de type 'Integer'.`,
            "any.required": "[dev-only] Le champs 'envoyé par' est obligatoire."
        }),

    send_to: Joi.number()
        .integer()
        .required()
        .messages({  
            'number.base': `[dev-only] Le champs 'envoyé à' doit être de type 'Number'.`,
            'number.integer': `[dev-only] Le champs 'envoyé à' doit être de type 'Integer'.`,
            "any.required": "[dev-only] Le champs 'envoyé à' est obligatoire."
        })

});

module.exports = messageSchema;