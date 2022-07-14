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
            res.render('parks/show', { park })
        })

        .catch(err=>{
            console.error('Error:', err)
            res.json(err)
        })
    
    
})





// router.get('/', (req, res) => {
//     console.log('here i am')
//     // mongoose to find all parks
//     Park.find({})
//     // return parks as json
//         .then(parks => {
//             // res.json(park)
//             
//         })
//         .catch(err => {
//             res.json(err)
//         })
// })



module.exports = router