const express = require('express');
const app=express();
const port =8000;
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal= require('./config/passport-local-strategy');

const MongoStore = require('connect-mongo');


app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.set('view engine','ejs');
app.set('views','./views');

app.use(expressLayouts);



//create new instance of connect-mango and pass session object

const store = MongoStore.create({
   mongoUrl:'mongodb://127.0.0.1/Dyslexia_development',
});
//handle error from connect mongo
store.on('error',function(err){
  console.log('Error in connect-mango ',err);
})
//session-cookie use
app.use(session({
   name:'dyslexia',
   //todo change the secret before deployment in production mode
   secret :'something',
   saveUninitialized:false,
   resave:false,
   cookie :{
     maxAge :(1000*60*100),
   },
   store:store,

   
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/',require('./router'));
app.listen(port,function(err){
    
      if(err){

        console.log("error :",err);
      }

      console.log("server is running on port :",port);
});