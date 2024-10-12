const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("chatbot_node", "postgres", "postgresql", {
  host: "localhost",
  dialect: "postgres",
  port: 5433
});

module.exports = sequelize