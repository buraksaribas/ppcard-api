require('express-async-errors')
const express = require('express')
require('dotenv').config()
require('./src/config/dbConnect')
const app = express()
const errorHandler = require('./src/middlewares/errorHandler')
const router = require('./src/routes')
const cors = require('cors')
const corsOptions = require('./src/config/cors.config')


app.use(cors(corsOptions))

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api', router)

// Error 
app.use(errorHandler)

app.listen(process.env.PORT, () => {
	console.log(`Server is running at http://localhost:${process.env.PORT}`);
})