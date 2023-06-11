const { DataTypes }= require("sequelize");
const db=require('../db');

const User=db.define('User',{
  name: {type:DataTypes.STRING},
  email:{type:DataTypes.STRING},
  password:{type:DataTypes.STRING}
},{
  timestamps:false
})

module.exports=User;