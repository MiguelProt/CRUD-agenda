const express = require('express');
const professionals = require('../controllers/professionals');
const routes = express.Router();
routes.get('/', professionals.getAllData);

module.exports = routes;