const { Sequelize } = require('sequelize');

const dbName="Travel_Memrories";
const dbUser="HarshaVaka";
const dbPassword="Vakaharsha@91";

module.exports= new Sequelize('database', 'username', 'password', {
  host: 'LAPTOP-5258JNB8\\SQLEXPRESS',
  dialect: 'mssql',
});