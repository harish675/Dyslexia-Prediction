const User = require('../models/user');
module.exports.profile = function(req,res){
     
   return res.render('profile',{
        title:"Profile",
      });
};


//create controller for signup page
module.exports.SignUp = function(req,res){

   if(req.isAuthenticated()){
       return res.redirect('/user/profile');
    }

    return res.render('sign_up',{
      title :"Sign-Up",
    });

};

//create controller for the login page 

module.exports.logIn = function(req,res){

   if(req.isAuthenticated()){
      return res.redirect('/user/profile');
    }

   return res.render('login_page',{
        title:"login-page",
   });
};

//handle the user creation 


module.exports.create = function(req,res){

   console.log(" create function called  it contain:",req.body);
   console.log("****************************************************");
  
   //  if(req.body.password != req.body.confirm-password ){
   //     return  res.redirect('back');
   //  }

    User.findOne({email :req.body.email})
      .then((user)=>{
          if(!user){
            User.create(req.body)
             .then((user)=>{
              console.log("user is ",user);
               return res.redirect('/user/login');
             })
             .catch((err)=>{
               console.error("Error to creating new user :",err);
               return res.redirect('back');
             })
          }
      })
      .catch((err)=>{
          
         console.log("error in finding user in sign up");
         return res.redirect('back');
      })

}

//create session for user login
module.exports.sessionCreation = function(req,res){
   
   return res.redirect('/');
};
      


//creating the sign out function

module.exports.SignOut = function(req,res,next){
     
     req.logout(function(err){
           if(err){
             return next(err);
           }

           return res.redirect('/');
     });
   
};
