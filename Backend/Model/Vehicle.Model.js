const mongoose = require('mongoose');

const vehicelSchema = new mongoose.Schema({
    name:{
        type:String
    },
    capacityKg :{
        type:Number
    },
    tyres:{
        type:Number
    }
},{
    timestamps : true 
})

const vehicel = mongoose.model('Vehicel',vehicelSchema)
module.exports = vehicel;