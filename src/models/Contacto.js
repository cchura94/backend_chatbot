const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("./../database/conexion")

const Contacto = sequelize.define(
    'Contacto',
    {
      // Model attributes are defined here
      nombres: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      apellidos: {
        type: DataTypes.STRING(50),
      },
      nro_identificaion: {
        type: DataTypes.STRING(15),
      },
      nro_whatsapp: {
        type: DataTypes.STRING(15),
      },
      saldo: {
        type: DataTypes.DECIMAL(10, 2),
      },
    },
    {
      // Other model options go here
    },
  );

  console.log(Contacto === sequelize.models.Contacto); // true

  Contacto.sync();
  
  module.exports = Contacto