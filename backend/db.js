const { Sequelize } = require('sequelize');

const dbName="Travel_Memories";
const dbUser="VakaHarsha";
const dbPassword="TravelMemories";

module.exports= new Sequelize(dbName, dbUser, dbPassword, {
  host: '192.168.1.7',
  port:'60460',
  dialect: 'mssql',
});