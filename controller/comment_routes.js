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
    const parkId = req.params.parkId
    req.body.author = req.body.userId

    MyPark.findById(parkId)
        // after we found a park 
        // take that park and add the comment
        .then(park => {
            // single park doc there is a field called comments
            park.comments.push(req.body)

            // if we change a doc, we have to return and call .save() on the doc.
            return park.save()
        })
        .then(park => {
            res.redirect(`/parks/${park._id}`)
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