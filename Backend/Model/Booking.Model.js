const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    vehicleId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicel',
    },
    fromPincode :{
        type: String,
    },
    toPincode :{
        type: String,
    },
    startTime :{
        type: Date
    },
    endTime :{
        type: Date
    },
    customerId :{
        type : String
    }
},{
    timestamps : true 
})

const booking = mongoose.model('Booking',bookingSchema)
module.exports = booking;


