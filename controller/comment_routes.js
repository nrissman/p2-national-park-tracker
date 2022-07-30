const { response } = require('express')
const express = require('express')
// making a router
const router = express.Router()
// importing Park model to access database
const Comment = require('../models/comment')

// POST - Creation
// localhost:3000/comments/:parkId <- A single Park can have many comments
router.post('/:parkCode', (req, res) => {
    const parkCode = req.params.parkCode
    req.body.author = req.session.userId
    req.body.parkCode = parkCode
    console.log("++++++++++++", req.body)

    
    Comment.create(req.body)
        .then(comment => {
            console.log('/////HELLO IM CONSOLING/////')
            console.log(comment)
            res.redirect(`/parks/${parkCode}`)
        })
        .catch(err => {
            res.json(err)
        })
    

})

// DELETE - delete yeeting
router.delete('/delete/:parkCode/:commId', (req, res) => {
    const parkCode = req.params.parkCode
    const commId = req.params.commId
    
    //find a park by its ID... then find this comment by its ID... remove the comment
    Comment.findById(commId)
    //because one park can have many comments we need to use commId
        .then(comment => {
            console.log("THE COMMENT TO DELETE \n", comment)
            if (comment.author == req.session.userId) {
                Comment.findByIdAndDelete(comment.id)
                    .then(comment => {
                        res.redirect(`/parks/${parkCode}`)
                    })
                    .catch(err => {
                        res.send(err)
                    })
            } else {
                res.redirect(`/parks/${parkCode}`)
            }
            //remove comment with this 
            //because we changed the comments by one we must save on the park aka the document  ALWAYS SAVE AT DOCUMENT LEVEL
        })
        .catch(err => {
            res.send(err)
        })
    
})
module.exports = router





// MyPark.findById(parkId)
//     // after we found a park 
//     // take that park and add the comment
//     .then(park => {
//         // single park doc there is a field called comments
//         park.comments.push(req.body)

//         // if we change a doc, we have to return and call .save() on the doc.
//         return park.save()
//     })
//     .then(park => {
//         res.redirect(`/parks/${park._id}`)
//     })
//     .catch(err => {
//         res.json(err)
//     })