const express= require('express');
const passport = require('passport');
const userController = require('../controller/user_controller');

const router = express.Router();




router.get('/profile',userController.profile);
router.get('/signup',userController.SignUp);
router.get('/login',userController.logIn);

router.post('/create',userController.create);
//use passport as middle where to authenticate 
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'user/login'},
 ),userController.sessionCreation);

module.exports=router;