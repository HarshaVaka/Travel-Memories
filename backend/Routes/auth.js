const express=require('express');
const router=express.Router();
const AuthController=require('../Controllers/auth');

router.post('/register',AuthController.addUser);
router.post('/login',AuthController.authUser);

module.exports=router;