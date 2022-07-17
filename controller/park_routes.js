const express = require('express')
// making a router
const router = express.Router()
// // importing Park model to access database
// const Park = require('../models/park')
require('dotenv').config()
const axios = require('axios')
const api_key = process.env.API_KEY



////////////////GET ROUTE///////////////////
//this will display create form 
router.get('/new', (req, res) => {
    res.render('parks/new')
})


/////////////POST ROUTE////////////////
//need to change this to only post to user index not guest index, make user index 
router.post('/', (req, res) => {
    req.body.owner = req.session.userId

    Park.create(req.body)
        .then(park => {
            console.log(park)
            // res.json(park)
            res.redirect('parks')
        })
        .catch(err => {
            res.json(err)
        })
})


/////////////////////GUEST INDEX ROUTE////////////////////////
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
    //test using park code acad
    //url for testing should be /parks/acad
    //axios works similar to fetch but does not rquire a .then to turn data into json
    axios.get(`https://developer.nps.gov/api/v1/parks?api_key=${api_key}`)
    .then(apiRes => {
        //declaring park so i do not have to 'drill' as deep 
        const park = apiRes.data.data
        //console.log('this is the park index', park)
        //rendering(showing all the parks from API)
        res.render('parks/userIndex', { park })
    })
    
    .catch(err=>{
        console.error('Error:', err)
        res.json(err)
    })
    
    
})







///////////////GUEST SHOW ROUTE///////////////////////////
//This shows guest user the park info 
router.get('/:parkCode', (req, res) => { 
    const pc = req.params.parkCode
    //test using park code acad
    //url for testing should be /parks/acad
    axios.get(`https://developer.nps.gov/api/v1/parks?parkCode=${pc}&api_key=${api_key}`)
        .then(apiRes => {
            const park = apiRes.data.data[0]
            console.log('this is the response from the api', park.fullName)
            res.render('parks/show', { park })
        })

        .catch(err=>{
            console.error('Error:', err)
            res.json(err)
        })
    
    
})



module.exports = router