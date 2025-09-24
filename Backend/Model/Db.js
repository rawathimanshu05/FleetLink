const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_DB_URL)

mongoose.connection.on('connected',()=>{
    console.log('Database connected successfully');
})

mongoose.connection.on('error',()=>{
    console.log('Database connection failed',error);
})
