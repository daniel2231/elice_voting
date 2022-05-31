const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true  
    },
    id:{
        type:String,
        required:true
    },
    producer:{
        type:String,
        required:true
    },
    link:{
        type:String, 
        required:true
    },
    votes:{
        type:Number,
        required:true
    },
    rank:{
        type:Number,
        required:true
    }
});

const Service = mongoose.model('service', serviceSchema);
module.exports = Service;