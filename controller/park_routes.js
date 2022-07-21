const express = require('express')
// making a router
const router = express.Router()
// // importing Park model to access database
require('dotenv').config()
const axios = require('axios')
const api_key = process.env.API_KEY
const MyPark = require('../models/myPark')
// const Comment = require('../models/comment')



///////////////////DELETE/////////////////////////////////////////////
router.delete('/:id', (req, res) => {
    const parkId = req.params.id
    console.log(parkId)
    MyPark.findByIdAndRemove(parkId)
        .then(Mypark => {
            console.log('////////////////////success/////////////')
            
            res.redirect('/parks/mine')
        })
        .catch(err => {
            console.log('//////////////////error////////////////',)
            res.json(err)
        })
})
// router.delete('/:parkCode', (req, res) => {
//     const pc = req.params.parkCode
//     console.log(pc)
//     MyPark.findOneAndDelete(pc)
//         .then(Mypark => {
//             console.log('////////////////////success/////////////', parkCode )
            
//             res.render('/parks/mine')
//         })
//         .catch(err => {
            
//             console.log('//////////////////error////////////////',)
//             res.json(err)
//         })
// })

// GET route for displaying an update form
router.get('/:id/edit', (req, res) => {
    const parkId = req.params.id

    MyPark.findById(parkId)
        .then(MyPark => {
            res.render('park/', { park })
        })
        .catch(err => {
            res.json(err)
        })
})

// PUT - Update
// localhost:3000/fruits/:id
router.put('/:id', (req, res) => {
    const parkId = req.params.id


    MyPark.findByIdAndUpdate(parkId, req.body, { new: true })
        .then(MyPark => {
            res.redirect(`/parks/mine`)
        })
        .catch(err => {
            res.json(err)
        })
})


/////////////////////INDEX ROUTE////////////////////////
//this will show any user that visits the site a list of all national parks 
router.get('/', (req, res) => { 
    //test using park code acad
    //url for testing should be /parks/acad
    //axios works similar to fetch but does not rquire a .then to turn data into json
    axios.get(`https://developer.nps.gov/api/v1/parks?api_key=${api_key}`)
        .then(apiRes => {
            //declaring park so i do not have to 'drill' as deep 
            const park = apiRes.data.data
            //console.log('this is the park index', park)
            //rendering(showing all the parks from API)
            res.render('parks/index', { park })
        })
        
        .catch(err=>{
            console.error('Error:', err)
            res.json(err)
        })
    
    
})


//////////////////////USER INDEX/////////////////////////////////
//still need to pake this si its not pupulated right away but rather only populates witht the parks you input 

router.get('/mine', (req, res) => { 
    // axios.get(`https://developer.nps.gov/api/v1/parks?api_key=${api_key}`)
    MyPark.find({ owner: req.session.userId })
        .then(apiRes => {
            //declaring park so i do not have to 'drill' as deep 
            const park = apiRes
            // console.log(apiRes)
            //console.log('this is the park index')
            //rendering(showing all the parks from API)
            res.render('parks/MyIndex', { park })
        })
        
        .catch(err=>{
            console.error('Error:', err)
            res.json(err)
        })
    
    
})

////////////////GET ROUTE///////////////////
//this will display create create new form
router.get('/new', (req, res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    res.render('parks/new', { username, loggedIn })
})


/////////////POST ROUTE////////////////
//need to change this to only post to user index not guest index, make user index 
router.post('/create', (req, res) => {
    req.body.owner = req.session.userId
    MyPark.create(req.body)
        .then(MyPark => {
            //console.log('/////HELLO IM CONSOLING/////')
            // console.log(myPark)
            //console.log('/////HELLO IM CONSOLING/////')
            // res.json(park)
            res.redirect('/parks/mine')
        })
        .catch(err => {
            res.json(err)
        })
})




// https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=Ch49ZnTyP3tLu90rW3KIqroRFQKmLQV97B1YtR7a





///////////////GUEST SHOW ROUTE///////////////////////////
//This shows guest user the park info 
router.get('/:parkCode', (req, res) => { 
    const pc = req.params.parkCode
    //test using park code acad
    //url for testing should be /parks/acad
    axios.get(`https://developer.nps.gov/api/v1/parks?parkCode=${pc}&api_key=${api_key}`)
        .then(apiRes => {
            const park = apiRes.data.data[0]
            //console.log('HELLO NEIL AND TI+MOOOOOOOOOOOOOOO')
            // console.log('this is the response from the api', park)
            //console.log('/////////////////////////////////////////')

            // Comment.find({parkCode: pc })
            // .then()
            // youre going to pass the comments and park data to the parks/show page for all to see 
            res.render('parks/show', { park })
        })

        .catch(err=>{
            console.error('Error:', err)
            res.json(err)
        })
    
    
})




module.exports = router