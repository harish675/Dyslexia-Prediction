
module.exports.home =function(req,res){

     return res.render('home',{
              title:"HomePage"
     });
     
    // return res.end('<h1> Well come to home Page </h1>');
};