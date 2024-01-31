const knex = require('../config/conection');
const jwt = require("jsonwebtoken");

const validarLogin = async (require, response, next) => {
    const { authorization } = require.headers;
    if (!authorization) {
        return response.status(401).json({ mensagem: 'Não autorizado! Faça o login para utilizar o sistema.' });
    }

    const token = authorization.split(' ')[1];


    try {
        const { id } = jwt.verify(token, process.env.JWT_PASS);

        const usuarioExiste = await knex('admin').where({ id: id }).first();
        if (!usuarioExiste) {
            return response.status(401).json({ mensagem: 'Não autorizado! Faça o login para utilizar o sistema.' });
        }

        const { senha: _, ...usuario } = usuarioExiste;

        req.usuario = usuario;

        next();

    } catch (error) {
        return response.status(500).json({ mensagem: 'Erro interno de servidor!' });
    }

};

module.exports = validarLogin;