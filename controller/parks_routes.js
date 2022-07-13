const express = require('express')
// making a router
const router = express.Router()
// importing Park model to access database
const Park = require('../models/park')

// DELETE - Delete
router.delete('/:id', (req, res) => {
    const parkId = req.params.id

    Park.findByIdAndRemove(parkId)
        .then(park => {
            res.redirect('/parks')
        })
        .catch(err => {
            res.json(err)
        })
})

// GET route for displaying an update form
router.get('/:id/edit', (req, res) => {
    const parkId = req.params.id

    Park.findById(parkId)
        .then(park => {
            res.render('parks/edit', { park })
        })
        .catch(err => {
            res.json(err)
        })
})

// PUT - Update
// localhost:3000/parks/:id
router.put('/:id', (req, res) => {
    const parkId = req.params.id

    req.body.readyToEat = req.body.readyToEat === 'on' ? true : false

    Park.findByIdAndUpdate(parkId, req.body, { new: true })
        .then(park => {
            res.redirect(`/parks/${park._id}`)
        })
        .catch(err => {
            res.json(err)
        })
})

// GET route for displaying my form for create
router.get('/new', (req, res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    res.render('parks/new', { username, loggedIn })
})

// POST - Create
router.post('/', (req, res) => {
    req.body.readyToEat = req.body.readyToEat === 'on' ? true : false

    // now that we have user specific parks, we'll add a username upon creation
    // remember, when we login, we saved the username to the session object
    // using the ._id to set the owner field
    
    req.body.owner = req.session.userId

    console.log(req.body)
    Park.create(req.body)
        .then(park => {
            console.log(park)
            // res.json(park)
            res.redirect('/parks')
        })
        .catch(err => {
            res.json(err)
        })
})

// GET - Index
// localhost:3000/parks
router.get('/', (req, res) => {
    // mongoose to find all parks
    Park.find({})
    // return parks as json
        .then(parks => {
            // res.json(park)
            res.render('parks/index', { parks })
        })
        .catch(err => {
            res.json(err)
        })
})

router.get('/mine', (req, res) => {
    // find the parks associated with the logged in user
    Park.find({ owner: req.session.userId })
        .then(parks => {
            res.render('parks/index', { parks })
        })
        .catch(error => {
            console.log(error)
            res.json({ error })
        })
})


// GET - Show
// localhost:3000/parks/:id <- change with the id being passed in
router.get('/:id', (req, res) => {
    const parkId = req.params.id

    Park.findById(parkId)
    // populate our User models fields
    // comment has an author field and that is the ref to the User model
    // always going to be a string of the value you want to populate
    // this also has to be anohter model 
        .populate('comments.author')
        // send back some json
        .then(park => {
            // res.json(park)
            const userId = req.session.userId
            const username = req.session.username
            res.render('parks/show', { park, userId, username })
        })
        .catch(err => {
            res.json(err)
        })
})

module.exports = router