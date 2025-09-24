const vehicel = require('../Model/Vehicle.Model')
const booking = require('../Model/Booking.Model')
const calculateRideDuration = require('../Utils/calcDuration')

const createvehicel = async(req,res) =>{
    try{
       const data = new vehicel(req.body)
         await data.save()
         return res.status(201).json({success:true,message:'Vehicel created successfully',data})
    } catch(error){
        console.log(error);
        return res.status(500).json({success:false,message:'Internal server error'})
    }
}

const getvehicel = async(req,res) =>{
    try{
          const { capacityRequired, fromPincode, toPincode, startTime } = req.query;

           // 1. Calculate ride duration & endTime
           const duration = calculateRideDuration(fromPincode,toPincode)
           const start = new Date(startTime)
           const end = new Date(start.getTime() + duration * 60 * 60 * 1000);

           // 2. Find all vehicles with enough capacity
           const vehicels = await vehicel.find({
              capacityKg : { $gte : Number(capacityRequired)}
           })

           // 3. Filter out vehicles that are already booked in this time window
            const availableVehicles = [];
            for(let fleet of vehicels){
                const overlapping = await booking.findOne({
                     vehicleId: fleet._id,
                     $or: [
                         { startTime: { $lt: end }, endTime: { $gt: start } }
                     ]
                });
                
                if(!overlapping){
                    availableVehicles.push({
                        ...fleet.toObject(),
                       estimatedRideDurationHours: duration
                    })
                }
            }

            return res.status(200).json(availableVehicles);
    } catch(error){
        console.log(error);
        return res.status(500).json({success:false,message:'Internal server error'})
    }
}


const bookingvehicel = async(req,res) =>{
    try{
        const {vehicleId,fromPincode,toPincode,startTime,customerId} = req.body 

        //  Check vehicle exists
        const Vehicle = await vehicel.findById(vehicleId)
        if(!Vehicle){
            return res.status(404).json({success:false,message:'Vehicle not found'})
        }

        // Calculate ride duration
        const estimatedRideDurationHours = Math.abs(parseInt(toPincode) - parseInt(fromPincode)) % 24;   

        // Calculate booking end time
        const bookingStart = new Date(startTime); 
        const bookingEnd = new Date(bookingStart);
        bookingEnd.setHours(bookingEnd.getHours() + estimatedRideDurationHours)

        // Check overlapping bookings
        const conflict = await booking.findOne({
            vehicleId,
            $or:[
                {startTime : {$lt : bookingEnd}, endTime : {$gt : bookingStart}}
            ]
        });

        if(conflict){
            return res.status(409).json({success:false,message:'Vehicle already booked for this time slot'})
        }

        //  Create new booking

        const newBooking = await booking.create({
            vehicleId,customerId,fromPincode,toPincode,startTime:bookingStart,endTime:bookingEnd
        })

        return res.status(201).json({success:true,message:'booking successfully',newBooking})

    } catch(error){
        console.log(error)
        return res.status(500).json({success:false,message:'Internal server error'})
    }
}

const deletebooking = async(req,res) => {
    try{
       
    } catch(error){
        console.log(error)
        return res.status(500).json({success:false,message:'Internal server error'})
    }
}



module.exports = {
    createvehicel,
    getvehicel,
    bookingvehicel
}