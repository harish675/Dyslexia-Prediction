const express= require('express');
const userController = require('../controller/user_controller');
const router = express.Router();




router.get('/profile',userController.profile);
router.get('/signup',userController.SignUp);
router.get('/login',userController.logIn);

router.post('/create',userController.create);



module.exports=router;