
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

//check if the user is authenticate

passport.checkAuthentication = function(req,res,next){
     
    //if user is in signed in ,then pass on the req to next function which controller action'

    if(req.isAuthenticated()){
         
        return next();
    }

    //user is not sign in
    return res.redirect('/user/login_page');

    
}

passport.setAuthenticatedUser = function (req,res,next){

     if(req.isAuthenticated()){
         //req.user contains the current signed in user from the session cookie we just sending this to locals for the views
         res.locals.user = req.user;
     }

     next();
}


module.exports =passport;

