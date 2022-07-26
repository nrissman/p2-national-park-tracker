const { response } = require('express')
const express = require('express')
// making a router
const router = express.Router()
// importing Park model to access database
const MyPark = require('../models/park')
const Comment = require('../models/comment')

// POST - Creation
// create route has to say Comment.create 
//redirect to park show page with parkid 
// localhost:3000/comments/:parkId <- A single Park can have many comments
router.post('/:parkId', (req, res) => {
    const parkCode = req.params.parkId
    req.body.author = req.session.userId
    // single park doc there is a field called comments
    req.body.parkCode = parkCode
    console.log('///////////////////hitting route//////////////////', req.body )
    Comment.create(req.body) 
        .then (comment => {
            res.redirect(`/parks/${parkCode}`)
        })
        
        .catch(err => {
            res.json(err)
        })
})

// DELETE - delete yeeting
router.delete('/delete/:parkId/:commId', (req, res) => {
    const parkId = req.params.parkId
    const commId = req.params.commId

    //find a park by its ID... then find this comment by its ID... remove the comment
    MyPark.findById(parkId)
    //because one park can have many comments we need to use commId
    .then(park => {
        const comment = park.comments.id(commId)
        //remove comment with this 
        comment.remove()
        //because we changed the comments by one we must save on the park aka the document  ALWAYS SAVE AT DOCUMENT LEVEL
        return park.save()
    })
    .then(park => {
        res.redirect(`/parks/`)
    })
    .catch(err => {
        res.send(err)
    })

})
module.exports = router



/////change check///////////////