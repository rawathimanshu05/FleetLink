const Joi = require('joi');

const vehicelerror = (req,res,next) => {
    const Schema = Joi.object({
        name : Joi.string().trim().required(),
        capacityKg : Joi.number().min(0).required(),
        tyres : Joi.number().min(2).required()
    })
    const {error} = Schema.validate(req.body)
    if(error){
        return res.status(400).json({success:false,message:error.details[0].message})
    }
    next()
}

const bookingerror = (req,res,next) => {
    const Schema = Joi.object({
        vehicleId : Joi.string().required(),
        fromPincode : Joi.string().required(),
        toPincode : Joi.string().required(),
        startTime : Joi.date().required(),
        endTime : Joi.date(),
        customerId : Joi.string().required()
    })
    const {error} = Schema.validate(req.body)
    if(error){
        return res.status(400).json({success:false,message:error.details[0].message})
    }
    next()
}


module.exports = {
    vehicelerror,
    bookingerror
}