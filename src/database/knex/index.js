const knex = require('knex');
const config = require('../../../knexfile.js');

const connection = knex(config.development);

module.express = connection;