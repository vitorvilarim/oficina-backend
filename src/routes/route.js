const express = require('express');
const { registerClient } = require('../controllers/client');
const validateRequest = require('../middleware/validate');
const { schemaUser, schemaService } = require('../utils/validations');
const serviceClient = require('../controllers/services');
const orderPdf = require('../utils/order');
const routes = express();

routes.use(express.json());


routes.post("/cadastrar", validateRequest(schemaUser), registerClient);
routes.post("/servico", validateRequest(schemaService), serviceClient);
routes.get("/relatorio/:id", orderPdf);



module.exports = routes;
