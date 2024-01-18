const joi = require('joi');

const schemaUser = joi.object({
    nome: joi.string().required(),
    cpf: joi.string().length(11),
    telefone: joi.string().required()
});


const schemaService = joi.object({
    cliente_id: joi.number().required(),
    servico_id: joi.string().required(),
    data_entrada: joi.string().required(),
    data_saida: joi.string().required()
});

module.exports = {
    schemaUser,
    schemaService
};
