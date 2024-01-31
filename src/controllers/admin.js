const knex = require('../config/conection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const login = async (require, response) => {
    const { email, senha } = require.body;
    try {
        if (!email || !senha) {
            return response.status(400).json({ mensagem: "todos os campos são obrigatórios" });
        }

        const consulta = await knex('admin').where({ email: email }).first();
        if (!consulta) {
            return response.status(404).json({ mensagem: 'Email ou senha incorreto!' });
        }

        const compararSenha = await bcrypt.compare(senha, consulta.senha);
        if (!compararSenha) {
            return response.status(404).json({ mensagem: 'Email ou senha incorreto!' });
        }

        const token = jwt.sign({ id: consulta.id }, process.env.JWT_PASS, { expiresIn: '30d' });

        const { senha: _, ...usuarioLogado } = consulta;

        return response.status(200).json({ usuario: usuarioLogado, token });

    } catch (error) {
        console.log(error.message);
        return response.status(500).json({ mensagem: 'Erro interno de servidor!' });
    }


};

module.exports = login;