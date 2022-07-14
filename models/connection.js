//requiring dotenv package on this page to get things out of our .env file
require('dotenv').config()
//getting mongoose so we can use it here 
const mongoose = require('mongoose')


const DATABASE_URI = process.env.DATABASE_URI
const config = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

//this connects our mongodb to mongoose
mongoose.connect(DATABASE_URI, config)

mongoose.connection
// first .on handles the opening of the connections
// here were running code block on open
// console.logging a string
.on('open', () => console.log('Connected to Mongoose'))
// since we have opened a connection we've got to close it
// here were running a code block on close
.on('close', () => console.log('Disconnected from Mongoose'))
// handle any error that might happen
// here were running a code block if theres an error
// using console.error to see that error
.on('error', err => console.error(err))

module.exports = mongoose