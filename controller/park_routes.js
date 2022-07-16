const express = require('express')
// making a router
const router = express.Router()
// // importing Park model to access database
// const Park = require('../models/park')
// const fetch = require('node-fetch')
require('dotenv').config()
// const Park =require(".controller")
const axios = require('axios')
const api_key = process.env.API_KEY


///////////////SHOW ROUTE///////////////////////////
router.get('/:parkCode', (req, res) => { 
    const pc = req.params.parkCode
    //test using park code acad
    //url for testing should be /parks/acad
    axios.get(`https://developer.nps.gov/api/v1/parks?parkCode=${pc}&api_key=${api_key}`)
        .then(apiRes => {
            const park = apiRes.data.data[0]
            console.log('this is the response from the api', park.fullName)
            res.render('parks/guestShow', { park })
        })

        .catch(err=>{
            console.error('Error:', err)
            res.json(err)
        })
    
    
})



//////////////////////INDEX ROUTE////////////////////////
router.get('/', (req, res) => { 
    //test using park code acad
    //url for testing should be /parks/acad
    axios.get(`https://developer.nps.gov/api/v1/parks?api_key=${api_key}`)
        .then(apiRes => {
            const park = apiRes.data.data
            console.log('this is the park index', park)
            res.render('parks/index', { park })
        })

        .catch(err=>{
            console.error('Error:', err)
            res.json(err)
        })
    
    
})

router.get('/mine', (req, res) => {
    // find the fruits associated with the logged in user
    Park.find({ owner: req.session.userId })
        .then(parks => {
            res.render('parks/index', { parks })
        })
        .catch(error => {
            console.log(error)
            res.json({ error })
        })
})





module.exports = router