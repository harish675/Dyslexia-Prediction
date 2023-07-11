const express= require('express');
const profileController = require('../controller/user_controller');
const router = express.Router();




router.get('/profile',profileController.profile);
router.get('/signup',profileController.SignUp);
router.get('/login',profileController.logIn);

router.post('/create',profileController.create);



module.exports=router;