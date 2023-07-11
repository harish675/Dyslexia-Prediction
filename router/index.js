const express  = require('express');

const router = express.Router();

const homeController = require('../controller/home');

console.log('router is loaded....');
router.get('/',homeController.home);
router.use('/user',require('./user'));







module.exports =router;