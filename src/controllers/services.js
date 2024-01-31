const knex = require('../config/conection');
const PdfPrinter = require('pdfmake');




const serviceClient = async (request, response) => {
    const { cliente_id, servico_id, data_entrada, data_saida } = request.body;

    try {

        const arrService = servico_id.split(",");
        for (service of arrService) {
            const newService = { cliente_id, servico_id: service, data_entrada, data_saida };
            const insertService = await knex('servicos_cliente').insert(newService);
        }


        return response.status(201).json({ mensagem: "Ordem de serviço criada." });
    } catch (error) {
        console.log(error.message);
        return response.status(500).json({ mensagem: "Erro interno do servidor" })
    }
};


module.exports = serviceClient;
