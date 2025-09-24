const express = require('express');
const { vehicelerror, bookingerror } = require('../Middleware/Error.Middleware');
const { createvehicel, getvehicel, bookingvehicel } = require('../Controller/Vehicle.Controller');

const router = express.Router();

router.post('/createvehicel',vehicelerror,createvehicel)

router.get('/vehicel/avilable',bookingerror,getvehicel)

router.post('/booking/vehicle',bookingerror,bookingvehicel)

module.exports = router;