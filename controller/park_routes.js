const express = require('express')
// making a router
const router = express.Router()
// // importing Park model to access database
// const Park = require('../models/park')
// const fetch = require('node-fetch')
require('dotenv').config()
// const Park =require(".controller")
const axios = require('axios')






router.get('/', (req, res) => {
    const api_key = process.env.API_KEY
    axios.get(`https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=${api_key}`)

    .then(apiResponse => {
        const parks = apiResponse.data
        console.log(apiResponse.data)
        res.render('parks/index', { parks })
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