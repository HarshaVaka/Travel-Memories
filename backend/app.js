const express =require('express');
const cors=require('cors');
const log4js=require('log4js');

const app=express();
app.use(express.json()); // for parsing JSON bodies



//Logger Configuration

let date=new Date();
let today=date.toDateString();
log4js.configure({
  appenders:{
    fileAppender:{
      type:'file',
      filename:`./logs/${today}.log`,
      maxLogSize:5000000,
      keepFileExt:true,
      compress:true
    }
  },
  categories:{
    default:{
      appenders:['fileAppender'],
      level:'info'
    }
  }
});

const logger=log4js.getLogger();
logger.level='info';



//Cors
var corsOptions ={
  origin:['http://localhost:4200','http://localhost:4300'],
  Credentials:true
}
app.use(cors(corsOptions));


//Database
const db=require('./db');
const dbName="Travel_Memrories";
db.authenticate()
  .then(() =>{
    logger.info(`conneced to Database: ${dbName}`);
    console.log(`conneced to Database: ${dbName}`);
  })
  .catch(err =>{
    logger.error(`Failed to connect to Database: ${dbName} -${err} -${new Error().stack}`);
    console.log(`Failed to connect to Database: ${dbName}`);
  })

//Models Init
require('./Models/modelInit');



// Routes
app.get('/', (req, res) => {
  res.send('Hello, world!');
});



const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
