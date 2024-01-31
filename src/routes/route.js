const express = require('express');
const { registerClient } = require('../controllers/client');
const validateRequest = require('../middleware/validate');
const { schemaUser, schemaService, schemaAdmin, schemaLogin } = require('../utils/validations');
const serviceClient = require('../controllers/services');
const orderPdf = require('../utils/order');
const validarLogin = require('../middleware/validateLogin');
const login = require('../controllers/admin');
const registerAdmin = require('../controllers/registerAdmin');
const routes = express();

routes.use(express.json());

routes.post("/login", validateRequest(schemaLogin), login);
routes.use(validarLogin);
routes.post("/cadastrar-admin", validateRequest(schemaAdmin), registerAdmin);
routes.post("/cadastrar", validateRequest(schemaUser), registerClient);
routes.post("/servico", validateRequest(schemaService), serviceClient);
routes.get("/relatorio/:id", orderPdf);



module.exports = routes;
