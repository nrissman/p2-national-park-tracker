const express = require('express')
// making a router
const router = express.Router()
// // importing Park model to access database
require('dotenv').config()
const axios = require('axios')
const api_key = process.env.API_KEY
const MyPark = require('../models/MyPark')
const Comment = require('../models/comment')



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

// // GET route for displaying an update form
// router.get('/:id/edit', (req, res) => {
//     const parkId = req.params.id

//     MyPark.findById(parkId)
//         .then(MyPark => {
//             res.render('park/', { park })
//         })
//         .catch(err => {
//             res.json(err)
//         })
// })

// // PUT - Update
// // localhost:3000/fruits/:id
// router.put('/:id', (req, res) => {
//     const parkId = req.params.id


//     MyPark.findByIdAndUpdate(parkId, req.body, { new: true })
//         .then(MyPark => {
//             res.redirect(`/parks/mine`)
//         })
//         .catch(err => {
//             res.json(err)
//         })
// })


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
            //console.log(apiRes)
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
router.post('/create', async (req, res) => {
    req.body.owner = req.session.userId
    
    const park = await MyPark.find({parkCode: req.body.parkCode})
            if (park[0]){
                res.redirect('/parks/mine')
            } else{
                MyPark.create(req.body)
                .then(MyPark => {
                        // res.json(park)
                        res.redirect('/parks/mine')
                    })
                    .catch(err => {
                        res.json(err)
                    })

            }
        

})










///////////////GUEST SHOW ROUTE///////////////////////////
//This shows guest user the park info 
router.get('/:parkCode', (req, res) => { 
    //console.log('//////////////////', req.params.parkCode)
    const pc = req.params.parkCode
    console.log('+++++++++++++', pc)
    //test using park code acad
    //url for testing should be /parks/acad
            //console.log('HELLO NEIL AND TI+MOOOOOOOOOOOOOOO')
            // console.log('this is the response from the api', park)
            //console.log('/////////////////////////////////////////')
            Comment.find({parkCode: pc })
            .then(comments => {
                MyPark.find({parkCode: pc})
                .then(park => {
                    park.parkCode = pc
                    console.log('////////',park)
                    res.render('parks/show', { park, comments, userId: req.session.userId })
                })
                
            })
            // youre going to pass the comments and park data to the parks/show page for all to see 
            //need to query comments and filter by parkCode then all parks will show with any associated comments 
            .catch(err=>{
                console.error('Error:', err)
                res.json(err)
            })
    
    
})




module.exports = router