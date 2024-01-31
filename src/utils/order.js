const knex = require('../config/conection');
const PdfPrinter = require('pdfmake');



const orderPdf = async (request, response) => {
    const { id } = request.params;

    try {

        const infoService = await knex('clientes')
            .select(
                'clientes.nome',
                'clientes.cpf',
                'clientes.telefone',
                knex.raw('ARRAY_AGG(servico.descricao) AS servicos'),
                knex.raw('ARRAY_AGG(servico.valor) AS valores'),
                knex.raw('SUM(CAST(servico.valor AS DECIMAL)) AS total'),
                knex.raw('MIN(servicos_cliente.data_entrada) AS entrada'),
                knex.raw('MIN(servicos_cliente.data_saida) AS saida'),
            )
            .leftJoin('servicos_cliente', 'clientes.id', 'servicos_cliente.cliente_id')
            .leftJoin('servico', 'servicos_cliente.servico_id', 'servico.id')
            .where('clientes.id', id)
            .groupBy('clientes.id').first();


        let conteudo = [];
        infoService.servicos.forEach(function (servico, index) {
            let texto = index === 0 ? `serviços:${servico}` : servico;

            conteudo.push({ text: texto, margin: [0, 0, 0, 0] })
        })


        const fonts = {
            Courier: {
                normal: 'Courier',
                bold: 'Courier-Bold',
                italics: 'Courier-Oblique',
                bolditalics: 'Courier-BoldOblique'
            }
        }

        const printer = new PdfPrinter(fonts);

        const valorTotal = new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(Number(infoService.total) / 100);

        const body = [
            `Ordem de serviço`,
            `teste de pdf`,
            ` nome: ${infoService.nome}\n\
            cpf: ${infoService.cpf}\n\
            telefone: ${infoService.telefone}\n`,
            `Valor total: ${valorTotal}`,
            `Data de termino do serviço: ${infoService.saida}`,
            `________________ \n
            Fulano de tal(gerente)`
        ];


        const docDefinitions = {
            defaultStyle: {
                font: 'Courier'
            },
            content: [
                {
                    columns: [
                        { text: "Martelinho de Ouro", style: "header" }
                    ]
                },
                {
                    style: 'body',
                    text: body[0]
                },
                {
                    style: 'info',
                    text: body[2]
                },
                {
                    style: 'service',
                    text: conteudo
                },
                {
                    style: 'service',
                    text: body[3]
                },
                {
                    style: 'infoData',
                    text: body[4]
                },
                {
                    style: 'footer',
                    text: body[5]
                }
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    alignment: 'center',
                    margin: [0, 0, 0, 0]
                },
                body: {
                    fontSizer: 14,
                    bold: false,
                    alignment: 'center'
                },
                info: {
                    fontSize: 14,
                    bold: false,
                    alignment: 'left',
                    margin: [0, 40, 0, 20]
                },
                service: {
                    fontSize: 14,
                    bold: false,
                    alignment: 'left',
                    margin: [0, -17, 0, 80]
                },
                infoData: {
                    fontSize: 14,
                    bold: false,
                    alignment: 'left',
                    margin: [0, -79, 0, 0]
                },
                footer: {
                    fontSize: 14,
                    alignment: 'center',
                    margin: [0, 100, 0, 0]
                }
            }
        }

        const pdfDoc = printer.createPdfKitDocument(docDefinitions);

        const chunks = [];
        pdfDoc.on("data", (chunk) => {
            chunks.push(chunk);
        });

        pdfDoc.end();

        pdfDoc.on("end", () => {
            const results = Buffer.concat(chunks);
            return response.end(results);
        })

        // return response.status(200).json(infoService);
    } catch (error) {
        console.log(error.message);
        return response.status(500).json({ mensagem: "Erro interno do servidor" })
    }

}

module.exports = orderPdf;
