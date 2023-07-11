
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    email:{
         type:String,
         required:true,
         unique:true,
    },
    password:{
          
         type:String,
         required:true
    },
    firstName :{
           type:String,
           required:true        
    },
    lastName :{
          type:String,
          required:true,
    },
    dob :{

         type:String,
         required:true
    },

    age:{

         type:Number,
         require:true,
         //it calculated automatically using the dob date
    }   
},{
    //handles created at or updated at
    timestamps :true
})

const User = mongoose.model('User',userSchema);
module.exports= User;