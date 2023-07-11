
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
//authentication using passport

passport.use(new LocalStrategy({
      
       usernameField:'email'
},
function(email,password,done){
     
     //find user and create identity
     User.findOne({email:email})
     .then((user)=>{
      
          //handling incorrect password
         if(! user || user.password != password){
             console.log("invalid UserName and Password");
             return done(null,false);
         }
         //return user
         return done(null,user);
     })
     .catch((err)=>{
        console.log('Error in finding the user --->Passport');
        return done(err);
     });
}
));
//serializing to user decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){

    return done(null, user.id);
})

//deserializing the user from the key in the cookie

passport.deserializeUser(function(id,done){
    
      User.findById(id)
      .then((user)=>{
        return done(null,user);
      })
      .catch((err)=>{
         console.log("error in finding user ---> Passport");
         return done(err);
      })
});

module.exports =passport;

