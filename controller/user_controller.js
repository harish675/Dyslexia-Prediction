const User = require('../models/user');
module.exports.profile = function(req,res){

   //find the cookie
   if(req.cookies.user_id){
      console.log(req.cookies.user_id);
      User.findById(req.cookies.user_id)
      .then((user)=>{
         console.log("*************************");
         console.log(user);
         return res.render('profile',{
             title:'profile',
             user:user
      })
   })
   .catch((err)=>{

         return res.redirect('user/login');
      })
   }
   else{
     return res.redirect('user/login');
   }
    
       
   //   return res.render('profile',{
   //      title:"Profile",
   //      user:user
   // //   });
};


//create controller for signup page
module.exports.SignUp = function(req,res){

    return res.render('sign_up',{
      title :"Sign-Up",
    });

};

//create controller for the login page 

module.exports.logIn = function(req,res){

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
      
   
      //steps to authenticate
      //find user
        User.findOne({email:req.body.email})
          .then((user)=>{
              //handle user found 
             if(user){

             //handle password doesn't match
             if(user.password != req.body.password){
                  alert(" incorrect Password ")
                  return res.redirect('back');
               }
            //handle session creation
             res.cookie('user_id',user.id);
            return res.redirect('/user/profile');
            }
            else{
            //handle user not found
            // alert("User not found..")
            return res.redirect('back');
             }
    })
    .catch((err)=>{
    console.log('error in finding user in signing in',err);
    return;
 })
      
};

//creating the sign out function

module.exports.SignOut = function(req,res){

    const userId = req.cookies.user_id;

   //clear the user_id cookie

    res.clearCookie('user_id');

   //redirect the user to the login page

    return res.redirect('login');
}

