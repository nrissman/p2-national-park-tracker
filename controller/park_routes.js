const express = require('express')
// making a router
const router = express.Router()
// // importing Park model to access database
// const Park = require('../models/park')
const fetch = require('node-fetch')





router.get('/', async (req, res) => {
    const apiUrl = `https://developer.nps.gov/api/v1/parks?api_key=T8iDnVWy0Rzjz6N4p6AK7d5BmPgvqMWNNfOlfjRZ`
    await fetch(apiUrl)
    .then(res => res.json() )

    .then(parks => {
        const apiData = parks
        console.log(parks)
        // console.log('api data', apiData )
        // res.render('parks/index', {data})
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
//             res.render('parks/index', { parks })
//         })
//         .catch(err => {
//             res.json(err)
//         })
// })



module.exports = router