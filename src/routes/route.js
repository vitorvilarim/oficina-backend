const express = require('express');
const { registerClient } = require('../controllers/services');
const validateRequest = require('../middleware/schemaUser');
const schemaUser = require('../utils/validations');
const routes = express();

routes.use(express.json());


routes.post("/cadastrar", validateRequest(schemaUser), registerClient);



module.exports = routes;
