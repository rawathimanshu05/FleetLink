const express = require('express');
require('dotenv').config();
require('./Model/Db')
const cors = require('cors');
const bodyparser = require('body-parser');

const vehicleRoute = require('./Routes/Vehicle.Route')

const app = express();
const port = process.env.PORT 

// middleware
app.use(cors())
app.use(express.json())
app.use(bodyparser.json())
app.use('/api',vehicleRoute)



app.listen(port, ()=>{
    console.log(`Server is running on port http://localhost:${port}`);
})