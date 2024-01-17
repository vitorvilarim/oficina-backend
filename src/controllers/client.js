const knex = require('../config/conection');
const joi = require('joi');

const registerClient = async (require, response) => {
    const { nome, cpf, telefone } = require.body;

    try {

        const newClient = {
            nome,
            cpf,
            telefone
        }
        const insertClient = await knex('clientes').insert(newClient).returning('*');

        return response.status(201).json(insertClient);
    } catch (error) {
        console.log(error.message);
        return response.status(500).json({ mensagem: error.message })
    }
};



module.exports = {
    registerClient
};
