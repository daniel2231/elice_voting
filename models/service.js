const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        default: "서비스명"  
    },
    id:{
        type:String,
        required:true
    },
    producer:{
        type:String,
        required:true,
        default : "개발자"
    },
    link:{
        type:String, 
        required:true
    },
    votes:{
        type:Number,
       
    },
    rank:{
        type:Number,
       
    }
});

const Service = mongoose.model('service', serviceSchema);
module.exports = Service;