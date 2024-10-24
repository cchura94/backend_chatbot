const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.BD_NAME, process.env.BD_USER, process.env.BD_PASS, {
  host: process.env.BD_HOST,
  dialect: "postgres",
  port: process.env.PORT || 5432
});

module.exports = sequelize