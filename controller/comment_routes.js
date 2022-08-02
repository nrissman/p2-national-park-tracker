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
    // console.log("++++++++++++", req.body)

    
    Comment.create(req.body)
        .then(comment => {
            // console.log('/////HELLO IM CONSOLING/////')
            // console.log(comment)
            res.redirect(`/parks/${parkCode}`)
        })
        .catch(err => {
            res.json(err)
        })
    

})



//edit button should call get route
//patch req.body.note 
//only the author should be able to update... refer to delete route
//get to an edit page that renders a form and sends a put or a patch for a specific comment 
//put or patch route should update the specific comment
//submit button should call put or patch on edit form 
//comments/commentid/
//findByIdAndUpdate


// GET route for displaying an update form
router.get('/edit/:parkCode/:commId', (req, res) => {
    const commId = req.params.commId

    Comment.findById(commId)
        .then(comment => {
            console.log('FOUND COMMENT', comment)
            res.render('parks/edit', { comment })
        })
        .catch(err => {
            res.json(err)
        })
})



router.patch('/edit/:parkCode/:commId', ( req, res ) => {
    const parkCode = req.params.parkCode
    const commId = req.params.commId
    const note = req.body.note

    //find the comment by its ID 
    Comment.findById(commId)
    
    //rediret user to edit comment page (edit.liquid)
        .then(comment => {
            // THEN --> check to see if autor is the one trying to edit comment ref ln.73
            console.log('THE COMMENT TO EDIT\n', comment)
            res.redirect('/:parkCode')
        })
})






// DELETE - delete yeeting
router.delete('/delete/:parkCode/:commId', (req, res) => {
    const parkCode = req.params.parkCode
    const commId = req.params.commId
    
    //find a park by its ID... then find this comment by its ID... remove the comment
    Comment.findById(commId)
    //because one park can have many comments we need to use commId
    //here were saying once you find the comment by id THEN do theis next thing with the comment... in this case were console logging it on like 52 to make sure were getting the right info back by calling it... were then deleting it the found comment with findByIdAndDelete... 
    
        .then(comment => {
            // console.log("THE COMMENT TO DELETE \n", comment)
            //here were saying if the comments author equals the person logged in then go ahead and do the next function 
            //we used the session to identify who is logged in 
            if (comment.author == req.session.userId) {
                //here were find the comment in comments with the user.id (wahterver) and delte that comment
                Comment.findByIdAndDelete(comment.id)
                    .then(comment => {
                        //here were saying if the comment author is confimed and the comment is deleted redirect the user back to the parks show page ie /parks/parkCode
                        res.redirect(`/parks/${parkCode}`)
                    })
                    .catch(err => {
                        res.send(err)
                    })
            } else {
                // Here were saying it the person trying to delete the comment is not the author throw and error and redirect the user back to the parks show page without deleteing the comment becasue only the author should be able to delete thier own comments.
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





