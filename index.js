const express = require('express')
const path = require('path')
// const logger = require('./middleware/logger');

const app = express()

// init middleware
// app.use(logger) // example of user made middleware

// Body parser Middleware
app.use(express.json()) // For json Data
app.use(express.urlencoded({ extended: false })) // For form/Urlencoded data

// Set static folder
app.use(express.static(path.join(__dirname, 'public'))) // setting static folder path for static files

// Members API route
app.use('/api/members', require('./routes/api/members')) // using router from members.js file

const PORT = process.env.PORT || 5000 // setting POST as enviroment variable if available or 5000

// running server on localhost with PORT
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
});
