const joi = require('joi');

const schemaUser = joi.object({
    nome: joi.string().required(),
    cpf: joi.string().length(11),
    telefone: joi.string().required()
})

module.exports = schemaUser;
