/////////////////////////////////
// import dependencies
/////////////////////////////////
// this allows us to load our env variables
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const parkRoutes = require('./controller/park_routes')
const userRoutes = require('./controller/user_routes')
const commentRoutes = require('./controller/comment_routes')

////////////////////////////////////////////
// Create our express application object
////////////////////////////////////////////
const app = require('liquid-express-views')(express())

////////////////////////////////////////////
// Middleware
////////////////////////////////////////////
// this is for request logging
app.use(morgan('tiny'))
app.use(methodOverride('_method'))
// parses urlencoded request bodies
app.use(express.urlencoded({ extended: false }))
// to serve files from public statically
app.use(express.static('public'))
//bring in our session middleware
const session = require('express-session')
const MongoStore = require('connect-mongo')

//here's the middleware that sets up our sessions
app.use(
	session({
		secret: process.env.SECRET,
		store: MongoStore.create({
			mongoUrl: process.env.MONGODB_URI
		}),
		saveUninitialized: true,
		resave: false
	})
)

////////////////////////////////////////////
// Routes
////////////////////////////////////////////
app.use('/parks', parkRoutes)
app.use('/users', userRoutes)
app.use('/comments', commentRoutes)

// localhost:3000/
app.get('/', (req, res) => {
	res.redirect('/parks')
	
})

////////////////////////////////////////////
// Server Listener
////////////////////////////////////////////


app.listen(process.env.PORT || 3000) 


// const PORT = process.env.PORT 

// app.listen(PORT, () => {
// 	console.log(`app is listening on port: ${PORT}`)
// })