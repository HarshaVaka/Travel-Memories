const db=require('../db');
const log4js=require('log4js');
const bcrypt = require('bcryptjs');
const User=require('../Models/User');
const logger=log4js.getLogger();

exports.addUser=async(req,res)=>{
  logger.level='debug';
  logger.debug(`Trying to add user with data:${req.body.name} ${req.body.email}`);
  const t=await db.transaction();
  const{
    name,
    email,
    password
  }=req.body;
  try{
    
      // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    const user=await User.create({
      name:name,
      email:email,
      password:hashedPassword
    },{transaction:t})

    await t.commit();

    return res.status(200).json({
      message:"User Added"
    })
  }
  catch(err){
    res.status(500).json({ error: 'Internal Server Error' });
    logger.error(`Failed to create new User`);
  }
}

exports.authUser=async(req,res)=>{
  logger.level='debug';
  logger.debug(`Trying to authenticate user:${req.body.email}`);
  const{
    email,
    password
  }=req.body;
  try{   
    const user = await User.findOne({ where: { email } });
    // If user not found or invalid password, return appropriate response
    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // User authenticated successfully
    res.status(200).json({ message: 'Authentication successful' });
  }
  catch(err){
    res.status(500).json({ error: 'Internal Server Error' });
    logger.error(`Internal server error for user auth`,err);
    console.log(err);
  }
}

