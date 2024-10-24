const { Sequelize } = require("sequelize");
require('dotenv').config() // process.env.PORT

const sequelize = new Sequelize(process.env.BD_NAME || 'chatbot_node', process.env.BD_USER || 'postgres', process.env.BD_PASS || 'postgresql', {
  host: process.env.BD_HOST || 'localhost',
  dialect: "postgres",
  port: process.env.BD_PORT || 5433
});

module.exports = sequelize