const express = require('express');
const { registerClient } = require('../controllers/client');
const validateRequest = require('../middleware/validate');
const { schemaUser, schemaService } = require('../utils/validations');
const serviceClient = require('../controllers/services');
const routes = express();

routes.use(express.json());


routes.post("/cadastrar", validateRequest(schemaUser), registerClient);
routes.post("/servico", validateRequest(schemaService), serviceClient);



module.exports = routes;
